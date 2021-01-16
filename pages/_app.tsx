import { AppProps } from 'next/app';

// Styles
import '../styles/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
