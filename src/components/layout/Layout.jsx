import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FlyAnimLayer from '../cart/FlyAnimLayer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <FlyAnimLayer />
      <main className="flex-grow overflow-x-hidden flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
