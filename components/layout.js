import Head from "next/head";


export default function Layout({ children,imgLink }) {
  return (
    <div>
      <Head>
      <meta name="language" content="ka" />
      </Head>
      <div>{children}</div>
    </div>
  );
}
