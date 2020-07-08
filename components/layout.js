import Head from "next/head";
import styles from './layout.module.css'


export default function Layout({ children,imgLink }) {
  return (
    <div>
      <Head>
      <meta name="language" content="ka" />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
