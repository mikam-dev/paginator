"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home({}) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3000/api/db').then((response) => {
    response.json().then((body) => {
      setIsConnected(body?.connectedToDb);
    });
  })
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by reading&nbsp;
          <code className={styles.code}>README.MD</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
      {isConnected ?
        <h2>
          Connected to Mongo DB with Mongoose
        </h2>
        :
        <h2>
          Error Connected To Mongo DB
        </h2>
      }
      </div>
    </main>
  )
}
