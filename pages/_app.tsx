import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const _changeState = () => {
    Router.events.on("routeChangeStart", _start);
    Router.events.on("routeChangeComplete", _end);
    Router.events.on("routeChangeError", _end);
  };
  const _start = () => setLoading(true);
  const _end = () => setLoading(false);

  _changeState();

  useEffect(() => {
    return () => {
      _changeState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {loading ? <h1>Loading...</h1> : <Component {...pageProps} />}
    </Layout>
  );
}

export default MyApp;
