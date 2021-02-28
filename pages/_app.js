import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/pulse/bootstrap.min.css"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
