import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Database connection
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Retrieves invoice data associated with specific user_id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { user_id } = req.query;

    const { data: invoices, error } = await supabase
      .from('invoice_users')
      .select('*')
      .eq('clerk_user_id', user_id);

    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ message: `Error fetching data: ${error}` });
      return;
    }

    res.status(200).json(invoices);
  } else {
    console.error('Method Not Allowed');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
}