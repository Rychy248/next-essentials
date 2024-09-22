// 'use client'; #NO NECESSARY AT PAGES, cause all are client side, for app all are server side
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams() || '';
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlerSearch = useDebouncedCallback((term) =>{
    const params = new URLSearchParams(searchParams);
    if(term){
      params.set('query',term);
      params.set('currentPage','1');
    }else{
      params.delete('query');
      params.delete('currentPage');
    }
    replace(`${pathname}?${params.toString()}`);
  },500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e:any)=>{
          handlerSearch(e.target.value)
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
