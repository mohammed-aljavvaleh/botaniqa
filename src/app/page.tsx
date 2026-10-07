import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Menu from '@/components/Menu';
import Location from '@/components/Location';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Menu />
      <Location />
      <Footer />
    </main>
  );
}
