
import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';
import {
  InvoicesTable,
} from '@/src/lib/definitions'
import { ITEMS_PER_PAGE } from '@/configs/api-config';

type ResponseData = {
  invoicesTable: InvoicesTable[]
};

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {

    interface QueryParams{
      query?:string;
      currentPage?:number;
    };
    const reqQuery: QueryParams = req.query;
    const query = reqQuery.query || '';
    const currentPage = reqQuery.currentPage || 1;
    console.log(reqQuery)
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    console.log(currentPage)
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    // return invoices.rows;
  
    // console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoices.');

    res.status(200).json({
      invoicesTable:invoices.rows
    });
    // return data.rows;
  } catch (error) {
    // console.error('Database Error:', error);
    res.status(200).json({
      invoicesTable:[]
    });
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if(req.method === 'GET'){
      return GET(req, res);
    };
    
  } catch (error) {
    console.error('GET ENDPOINT ERROR:', error);
    res.status(200).json({
      invoicesTable:[]
    });
    // throw new Error('Failed to fetch revenue data.');
  };
};


