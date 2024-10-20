'use client'
import Form from '@ui/invoices/create-form';
import Breadcrumbs from '@ui/invoices/breadcrumbs';

export default async function CreateInvoice() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices',
            href: '/dashboard/invoices' 
          },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
};