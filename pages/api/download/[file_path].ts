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
    file_path = String(file_path);
    const { data, error } = await supabase.storage
      .from('hoonui_technologies')
      .download(file_path)

    if (error) {
      throw error
    }

    if (data) {
      const url = URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = url
      link.download = file_path.split('/').pop() || 'file'
      link.click()
    }

    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ message: `Error fetching data: ${error}` });
      return;
    }

    res.status(200).json({ message: 'File downloaded successfully' });
  } else {
    console.error('Method Not Allowed');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
}