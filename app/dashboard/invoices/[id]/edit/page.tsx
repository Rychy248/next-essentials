
'use server'
import Form from '@ui/invoices/edit-form';
import Breadcrumbs from '@ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchCustomers, fetchInvoiceById } from '@/src/lib/data'; // if this would be wanted to use in the frontend side, we have to move this to the api/

export default async function Page(
  { params }:{ params: { id:string }} //destructured param
) {
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ]);

  if(!invoice){
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}