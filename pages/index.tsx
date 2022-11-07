import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.scss"; // Module styles

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Practice Project</h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/index.tsx</code>
      </p>

      <div className={styles.grid}>
        <Link href="/users">
          <h2 className={styles.card}>Users &rarr;</h2>
        </Link>

        <Link href="/posts">
          <h2 className={styles.card}>Posts &rarr;</h2>
        </Link>
      </div>
    </main>
  );
};

export default Home;
