import '@ui/global.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { lusitana } from '@ui/fonts';
import Layout from '@/src/components/dashboard/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // no layout
  const noLayoutRoutes = ['/login', '/', '/_error'];
  const shouldUseLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <div className={lusitana.className}>
      {shouldUseLayout
        ?(
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ):(
          <Component {...pageProps} />
        )
      }
    </div>
  );
};

export default MyApp;
