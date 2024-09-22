import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';
import { Revenue } from '@/src/lib/definitions'
import { revenue as REVENUE } from '@/src/lib/placeholder-data';

type ResponseData = {
  revenue: Revenue[]
};

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;

    res.status(200).json({
      revenue:data.rows
    });
    // return data.rows;
  } catch (error) {
    // console.error('Database Error:', error);
    res.status(200).json({
      revenue:REVENUE
    });
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if(req.method === 'GET'){
      return GET(req, res);
    };
    
  } catch (error) {
    console.error('GET ENDPOINT ERROR:', error);
    res.status(200).json({
      revenue:REVENUE
    });
    // throw new Error('Failed to fetch revenue data.');
  };
};
