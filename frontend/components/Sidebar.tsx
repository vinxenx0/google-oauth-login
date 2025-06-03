// components/Sidebar.tsx
// components/Sidebar.tsx - MODERNIZADO
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface Props {
  onSelect: (section: 'summary' | 'profile' | 'logins') => void;
  currentSection: string;
}

export default function Sidebar({ onSelect, currentSection }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const isActive = (section: string) => 
    currentSection === section ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' : 'text-gray-700 hover:bg-gray-100';

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{t('dashboard')}</h2>
      </div>
      
      <nav className="py-4">
        <button 
          onClick={() => onSelect('summary')} 
          className={`w-full text-left px-6 py-3 flex items-center ${isActive('summary')}`}
          aria-current={currentSection === 'summary' ? 'page' : undefined}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t('summary')}
        </button>
        
        <button 
          onClick={() => onSelect('profile')} 
          className={`w-full text-left px-6 py-3 flex items-center ${isActive('profile')}`}
          aria-current={currentSection === 'profile' ? 'page' : undefined}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {t('profile')}
        </button>
        
        <button 
          onClick={() => onSelect('logins')} 
          className={`w-full text-left px-6 py-3 flex items-center ${isActive('logins')}`}
          aria-current={currentSection === 'logins' ? 'page' : undefined}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          {t('access')}
        </button>
      </nav>
      
      <div className="p-4 border-t border-gray-200 mt-auto">
        <a 
          href="/auth/logout" 
          className="w-full text-left px-6 py-3 flex items-center text-red-600 hover:bg-red-50 rounded-md"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {t('logout')}
        </a>
      </div>
    </aside>
  );
}
