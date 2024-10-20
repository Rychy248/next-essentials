import dynamic from 'next/dynamic';
import Loading from '@/src/ui/dashboard/Loading';
import { useState, Suspense } from 'react';
const Dashboard = dynamic(
  () => 
    import('@/src/ui/dashboard'),
  {
    suspense:true
  }
);

// https://nextjs.org/learn/dashboard-app/partial-prerendering
// WITH APP DIR, we can use the experimental:
// pre-rendering to achive a loading combining the static and dynamic render
// this is still experimental
// and only need to set into the next.config.js 
/**
### next.config.js
  const nextConfig = {
    experimental: {
      ppr: 'incremental',
    },
  };

###  in the file where we will need the config
export const experimental_ppr = true;
// only that line because next automatically know what is static and dynamic 
// based on the suspense and fallback wrapped code.
 */

const DashboardPage = () => {
  const [ load, setLoad] = useState('loading');

  setTimeout(() => { // making a wait
    setLoad('loaded');
  },100);

  /**HERE THE SUSPENSE IS UNNECESARY, BUT FOR LEARN IT WAS ADDED
   * -- THE SUSPENSE IS MORE USSEFULL IN COMPONENTES REDERED AT THE SERVER SIDE
   * --- OR WHE IS FETCHING DATA 
   */
  return (
    load === 'loaded'
      ?(
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      ):(
        <Loading />
      )
  );
};
export default DashboardPage;