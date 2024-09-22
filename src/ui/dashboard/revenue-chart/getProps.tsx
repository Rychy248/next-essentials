import { fetchRevenue } from '@/src/lib/data';

export const getServerSideProps = async () => {
  const revenue = await fetchRevenue();

  return {
    props: {
      revenue,
    },
  };
};

export default getServerSideProps;