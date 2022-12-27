import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='a web-app for you to keep track of prices in the crypto world'
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/bitcoin-light-theme.svg'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/bitcoin-dark-theme.svg'
          media='(prefers-color-scheme: dark)'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
