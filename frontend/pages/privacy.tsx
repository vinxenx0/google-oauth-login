// frontend/pages/privacy.tsx
import Layout from '../components/Layout';
import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const PrivacyPage: NextPage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/auth/user', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(JSON.parse(data));
        else setUser(null);
      });
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{t('privacy.title')}</h1>
        <p>{t('privacy.content')}</p>
        <Link href="/">{t('privacy.backToHome')}</Link>
      </div>
    </Layout>
  );
};