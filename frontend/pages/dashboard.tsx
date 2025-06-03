
// pages/dashboard.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:8000/auth/user', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) router.replace('/');
        else setUser(JSON.parse(data));
      });
  }, [router]);

  if (!user) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="text-center">
      <img src={user.picture} alt="avatar" className="rounded-full w-24 h-24 mb-4 mx-auto" />
      <h1 className="text-xl font-bold">{user.name}</h1>
      <p>{user.email}</p>
      <a href="/auth/logout">
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded">{t('logout')}</button>
      </a>
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