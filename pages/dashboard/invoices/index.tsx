
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Search from '@ui/search';
import Table from '@ui/invoices/table';
import { CreateInvoice } from '@ui/invoices/buttons';
import { inter, lusitana } from '@ui/fonts';
import { fetchInvoicesPages } from '@/src/lib/data';
import Pagination from '@/src/ui/invoices/pagination';

type SearchParams = {
  query?: string;
  page?: number;
};

type ServerProps = {
  searchParams:SearchParams;
  totalPages:number;
};

/**
  No necessary because getServerSideProps can't reach the api
  interface InvoicePageResponse {
    totalPages:number
  };
*/

export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
  const query:string = 
    Array.isArray(context.query.query) 
    ? context.query.query[0]
      ? context.query.query[0]
      : ''
    : context.query.query
      ? context.query.query
      : ''
  ;
  const currentPage = context.query.currentPage;
  /**
    const res = await fetch('/api/invoicesPages');
    const { totalPages }: InvoicePageResponse = await res.json();
   */
  const totalPages = await fetchInvoicesPages(query);
  
  return {
    props: {
      searchParams: {
        query: Array.isArray(query) ? query[0] : query || '',
        currentPage: currentPage ? parseInt(currentPage as string, 10) : 1,
      },
      totalPages
    },
  };
};
// }) satisfies GetServerSideProps<{ searchParams: SearchParams }>;

export default function Page({
  searchParams,
  totalPages
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  const query:string = searchParams?.query || '';
  const currentPage:number = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
        <Table query={query} />
        {/* <Table query={query} currentPage={currentPage} /> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}