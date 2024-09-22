import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';
import { CustomerField } from '@/src/lib/definitions'

type ResponseData = { customers: CustomerField[] };

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const data = await sql<CustomerField>`
    SELECT
      id,
      name
      FROM customers
      ORDER BY name ASC
    `;

    res.status(200).json({ customers:data.rows });
  } catch (error) {
    // console.error('Database Error:', error);
    res.status(200).json({
      customers:[]
    });
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  try {
    if(req.method === 'GET'){ return GET(req, res); };
  } catch (error) {
    
    res.status(200).json({
      customers:[]
    });
    // throw new Error('Failed to fetch revenue data.');
  };
};


