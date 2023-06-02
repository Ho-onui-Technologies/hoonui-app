import { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }

  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;

    // Extract first name, last name, and email address from attributes
    const firstName = attributes.first_name;
    const lastName = attributes.last_name;

    // Handle cases where there might be more than one email address
    // Here we just pick the first one but you might want to handle it differently
    const emailAddress = attributes.email_addresses && attributes.email_addresses.length > 0
      ? attributes.email_addresses[0].email_address
      : '';

    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          user_id: id,
          first_name: firstName,
          last_name: lastName,
          email_address: emailAddress
        },
      ], { onConflict: 'user_id' })

    if (error) {
      console.error('Error upserting user:', error)
    } else {
      console.log('User upserted:', data)
    }
  }

  res.json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: {
    id: string;
    attributes: {
      first_name: string;
      last_name: string;
      email_addresses: { email_address: string }[];
      [key: string]: any;
    };
    [key: string]: any;
  };
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";