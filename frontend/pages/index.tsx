// frontend/pages/index.tsx 
// pages/index.tsx - DISEÑO MODERNIZADO
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          {t('welcome_title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          {t('welcome_subtitle')}
        </p>
        
        {!loading && !user && (
          <Link href="/auth/login">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {t('get_started')} &rarr;
            </button>
          </Link>
        )}
        
        {!loading && user && (
          <Link href="/dashboard">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {t('go_to_dashboard')} &rarr;
            </button>
          </Link>
        )}
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all">
          <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{t('feature1_title')}</h3>
          <p className="text-gray-600">{t('feature1_description')}</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all">
          <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{t('feature2_title')}</h3>
          <p className="text-gray-600">{t('feature2_description')}</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all">
          <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{t('feature3_title')}</h3>
          <p className="text-gray-600">{t('feature3_description')}</p>
        </div>
      </div>
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