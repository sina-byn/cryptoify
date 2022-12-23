import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cryptoify</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='a web-app for you to keep track of prices in the crypto world'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='app-container'>Cryptoify</main>
    </>
  );
}
