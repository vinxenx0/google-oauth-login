// ✅ Home pública mejorada: oculta botón de login si el usuario está autenticado
// ✅ Locales actualizados: 'dashboard', 'login', 'welcome'
// ✅ Manejo mejorado de errores en fetch

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/auth/user', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(JSON.parse(data));
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
      {!loading && !user && (
        <Link href="/auth/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow">{t('login')}</button>
        </Link>
      )}
      {!loading && user && (
        <Link href="/dashboard">
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow">{t('dashboard')}</button>
        </Link>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}