import Head from "next/head";
import styles from './layout.module.css'


export default function Layout({ children,imgLink }) {
  return (

    <div>
      <Head>
        <title>Next blog</title>
        <meta name="description"content="Blog builded on nextjs. react server side renderer" />
        <meta name="copyright" content="company name" />
        <meta name="language" content="GE" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content="Next blog"/>
        <meta name="og:description" content="Blog builded on nextjs. react server side renderer"/>
        {imgLink && <meta name="og:image" content={imgLink} />}

      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
