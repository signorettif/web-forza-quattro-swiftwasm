import { AppProps } from "next/app";

// Css resets
import "styles/resets/reset.local.css";
import "styles/resets/normalize.css";

// Custom styles
import "styles/variables.css";
import "styles/globals.css";
import "styles/typography.css";
import "../styles/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
