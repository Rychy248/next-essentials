import { AppProps } from 'next/app';
import '@ui/global.css';
import { lusitana } from '@ui/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={lusitana.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
