import { useState, useEffect, Suspense } from 'react';

import { lusitana } from '@ui/fonts';
import { Card } from '@ui/dashboard/cards';
import RevenueChart from '@ui/dashboard/revenue-chart';
import LatestInvoices from '@ui/dashboard/latest-invoices';

import { fetchLatestInvoices, fetchCardData } from '@/src/lib/data';
import { LatestInvoice, CardData } from '@/src/lib/definitions';

// fired data
import { latestInvoices as LAST_INV, cardData as CARD } from '@/src/lib/placeholder-data';

export default function Dashboard() {
  
  const [latestInvoices, setLatestInvoices ] = useState<LatestInvoice[]>([]);
  const [cardData, setCardData] = useState<CardData>({
    numberOfCustomers:0,
    numberOfInvoices:0,
    totalPaidInvoices:'0',
    totalPendingInvoices:'0',
  });

  useEffect(() => {
    Promise.all([
      // fetching revenue
      fetchLatestInvoices(),
      fetchCardData()
    ]).then(([res1,res2]) => {
      setLatestInvoices(res1);
      setCardData(res2);
    })
    .catch((err)=>{
      // console.error(err);
      setLatestInvoices(LAST_INV);
      setCardData(CARD);
    });
    
  }, []);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cardData.totalPaidInvoices} type="collected" />
        <Card title="Pending" value={cardData.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={cardData.numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={cardData.numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}