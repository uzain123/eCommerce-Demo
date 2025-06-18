import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';                 // Core CSS
import 'primeicons/primeicons.css';                              // Icons
import '@/styles/globals.css';                                   // Your custom styles

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
