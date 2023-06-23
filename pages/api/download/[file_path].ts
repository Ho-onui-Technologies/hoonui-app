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
    let { file_path } = req.query;
    file_path = String(file_path).replace('.js', '');
    const { data, error } = await supabase.storage
      .from('hoonui_technologies')
      .createSignedUrl(`invoices/${file_path}`, 1000,{
        download: true,
      });

    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ message: `Error fetching data: ${error}: invoices/${file_path}` });
      return;
    }
    if (data && data.signedUrl) {
      res.status(200).json({ signedUrl: data.signedUrl });
    }
  } else {
    console.error('Method Not Allowed');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
}