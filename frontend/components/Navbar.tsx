
// components/Navbar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

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

  const changeLang = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <Link href="/">
        <span className="font-bold text-lg">{t('home')}</span>
      </Link>
      <div className="space-x-4">
        {user ? (
          <Link href="/dashboard" className="underline">{t('dashboard')}</Link>
        ) : (
          <Link href="/auth/login" className="underline">{t('login')}</Link>
        )}
        <button onClick={() => changeLang('en')} className="underline">EN</button>
        <button onClick={() => changeLang('es')} className="underline">ES</button>
      </div>
    </header>
  );

  
};



export default Navbar;

