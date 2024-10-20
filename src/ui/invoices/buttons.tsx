import { useEffect, useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


export function DeleteInvoice({ id, setItemDeleted }: { id: string, setItemDeleted:(state:string) => void }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  // TODO ENABLE AN END POINT TO SUPPORT THE DELETE ACTION

  async function deleteInvoice(){

    try {
      const url = `/api/invoicesPages?id=${id}`;
      const data = await (
        await fetch(url,{
          method:'DELETE',
          headers:{
            'Content-type':'applications/json; charset=UTF-8'
          },
        })
      ).json()
      
      if (data.success){
        setItemDeleted(id);
      };
    } catch (error) {
      console.log(error)
    };
  };

  return (
    
    <button onClick={deleteInvoice} className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  
  );
};


/** AS THE DOCUMENTATION SAID, I CANT USE DIRECTLY A SERVER ACTION, HERE BECAUSE THIS IS RENDER FROM A PAGE FROM PAGES/, AND 
 * SERVER ACTIONS ONLY WORKS WITH PAGES/ DIR, SO THE PROBLEM IS NOT THE ACTIONS, THE PROBLEM IS THIS CANT BE PERFORMED DIRECTLY FROM PAGES/ DIR
 */
// export function DeleteInvoice({ id }: { id: string }) { 
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  
//   return (
//     <form action={deleteInvoiceWithId}>
//       <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4" />
//       </button>
//     </form>
//   );
// }

