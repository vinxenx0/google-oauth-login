
// pages/auth/login.tsx

// pages/auth/login.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/auth/user', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) router.replace('/dashboard');
        else window.location.href = 'http://localhost:8000/auth/login';
      });
  }, [router]);

  return <p className="text-center p-4">Redirecting...</p>;
}
