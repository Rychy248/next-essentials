
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@ui/invoices/buttons';
import InvoiceStatus from '@ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/src/lib/utils';
import { InvoicesTable as InvoiceTableType } from '@/src/lib/definitions';
import { InvoicesTableSkeleton } from '@ui/skeletons';
import { useSearchParams } from 'next/navigation';

interface TableResponse {
  invoicesTable:InvoiceTableType[];
};

export default function InvoicesTable({
  query,
  // currentPage,
}: {
  query:string,
  // currentPage:number,
}) {
  
  /** GET THE CURRENT PAGE AT THIS WAY IS POSSIBLE CAUSE THIS COMPONENT IS AT THE CLIENT SIDE */
  const searchParams = useSearchParams();
  const currentPage = searchParams
    ? Number(searchParams.get('currentPage'))
    : 1
  ;
  /** GET THE CURRENT INSTEAD OF PROPS*/
  
  const [load, setLoad] = useState<string>('loading');
  const [invoices, setInvoices] = useState<InvoiceTableType[]>([]);
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  useEffect(() => {
    let isMounted: boolean = true;
    setLoad('loading');
    (async function(){
      try {
        let paramsUrl = '';
        if (query || currentPage) {
          paramsUrl += '?';
        };
        if(query){
          paramsUrl += query ? `query=${query}` :'';
          paramsUrl += `&currentPage=${currentPage ?? 1}`;
        }else if(currentPage){
          paramsUrl += `currentPage=${currentPage ?? 1}`;
        };
        const res = await fetch(`/api/filteredInvoices${paramsUrl}`);
        const result: TableResponse = await res.json();
        if(isMounted) setInvoices(result.invoicesTable); ;
      } catch (error) {
        // console.log(error);
      } finally{
        if(isMounted) setLoad('loaded'); ;
      };
    })()
      .catch(console.log)
    ;

    return () => { isMounted = false; };

  }, [query,currentPage]);

  if (load === 'loading') {
    return(<InvoicesTableSkeleton />);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
            
            {
              (!invoices || invoices.length == 0) && (
                <div className="flex items-center justify-between border-b pb-4">
                  <h1>No registers founded</h1>
                </div>
              )
            }
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
                          {
              (!invoices || invoices.length == 0) && (
                <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center" colSpan={6}>
                    
                      <h1>No registers founded</h1>
                    
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
