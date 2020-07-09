import Head from "next/head";

export default function Layout({ children, imgLink }) {
  return (
    <div>
      <Head>
        <meta name="language" content="ka" />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" href="apple-touch-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="apple-touch-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="apple-touch-iphone4.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="apple-touch-ipad-retina.png"
        />
      </Head>
      <div>{children}</div>
    </div>
  );
}
