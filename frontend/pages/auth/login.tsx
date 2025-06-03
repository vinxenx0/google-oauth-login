
// pages/auth/login.tsx
// pages/auth/login.tsx - DISEÑO MODERNO SAAS
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

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Formulario */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accede a tu cuenta</h1>
            <p className="text-gray-600">Gestiona todos tus servicios en un solo lugar</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordar sesión
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => window.location.href = 'http://localhost:8000/auth/login'}
              >
                Iniciar sesión
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes cuenta?{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Regístrate
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2025 MyApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
      
      {/* Panel derecho - Imagen */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-4">Potencia tu productividad</h2>
            <p className="text-xl mb-8">
              Conecta todas tus herramientas en una sola plataforma y optimiza tu flujo de trabajo diario.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Integraciones con Google Workspace
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Seguridad empresarial
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Soporte 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}