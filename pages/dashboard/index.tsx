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

const DashboardPage = () => {
  const [ load, setLoad] = useState('loading');

  setTimeout(() => { // making a wait
    setLoad('loaded');
  },600);

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