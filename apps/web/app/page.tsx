import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden relative">
      <Header isAuthenticated={false} />
      <Hero/>
      <Features/>
      <Showcase/>
      <Footer/>
    </div>
  );
}
