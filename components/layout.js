import Head from "next/head";
import styles from './layout.module.css'


export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Next blog</title>
        <meta name="description" content="150 words" />
        <meta name="copyright" content="company name" />
        <meta name="language" content="GE" />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
