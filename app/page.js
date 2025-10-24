import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuienesSomos from '@/components/QuienesSomos';
import Servicios from '@/components/Servicios';
import Planes from '@/components/Planes';
import Transformaciones from '@/components/Transformaciones';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <QuienesSomos />
      <Servicios />
      <Planes />
      <Transformaciones />
      <Contacto />
      <Footer />
    </main>
  );
}