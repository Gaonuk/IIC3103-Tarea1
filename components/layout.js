import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import Search from './search'

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <title>Tarea 1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="hidden md:flex items-center justify-end md:flex-1">
            <Search />
          </div>
          <div class="lg:text-center">
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              IIC3103 - Taller de Integracion
            </h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tarea 1
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Consumir una API
            </p>
          </div>
          <main>{children}</main>
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/" class='transform hover:-translate-y-0.5'>
                <a class='text-indigo-700 transform hover:-translate-y-0.5'>← Back to home</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
