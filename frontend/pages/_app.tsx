
// pages/_app.tsx

// frontend/pages/_app.tsx
import { AuthProvider } from '../hooks/useAuth';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
