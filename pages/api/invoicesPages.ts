import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';

import { ITEMS_PER_PAGE } from '@/configs/api-config';

type ResponseData = {
  totalPages: number
};

interface QueryParams{ query?:string; };

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const reqQuery: QueryParams = req.query;
    const query = reqQuery.query || '';

  const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;
  
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    // return invoices.rows;
  
    // console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoices.');

    res.status(200).json({
      totalPages
    });
    // return data.rows;
  } catch (error) {
    // console.error('Database Error:', error);
    res.status(200).json({
      totalPages:1
    });
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("ENDOINT REACHED")
  try {
    if(req.method === 'GET'){
      return GET(req, res);
    };
    
  } catch (error) {
    console.error('GET ENDPOINT ERROR:', error);
    res.status(200).json({
      totalPages:1
    });
    // throw new Error('Failed to fetch revenue data.');
  };
};


