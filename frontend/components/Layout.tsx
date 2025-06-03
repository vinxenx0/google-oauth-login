
// components/Layout.tsx

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 pb-10 container mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
