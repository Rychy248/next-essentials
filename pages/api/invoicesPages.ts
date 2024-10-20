import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';

import { ITEMS_PER_PAGE } from '@/configs/api-config';

type GetResponseData = {
  totalPages: number
};

type DeleteResponse={
  success:Boolean
};

interface QueryParams{ query?:string; };

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData>
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


async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse>
) {
  try {
    const reqQuery : { id?:string } = req.query;
    const result = await sql`DELETE FROM invoices WHERE id = ${reqQuery.id}`;
    res.status(200).json({
      success: result.rowCount > 0
    });
  } catch (error) {
    res.status(500).json({
      success:false
    });
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse|GetResponseData>
) {
  try {
    if(req.method === 'GET'){
      return GET(req, res);
    };
    if(req.method === 'DELETE'){
      return DELETE(req, res);
    };
  } catch (error) {
    console.error('GET ENDPOINT ERROR:', error);
    res.status(200).json({
      totalPages:1
    });
    // throw new Error('Failed to fetch revenue data.');
  };
};


