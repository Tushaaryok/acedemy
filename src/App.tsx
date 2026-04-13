import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import StatsCounter from './components/StatsCounter/StatsCounter';
import Features from './components/Features/Features';
import Courses from './components/Courses/Courses';
import Faculty from './components/Faculty/Faculty';
import Results from './components/Results/Results';
import Gallery from './components/Gallery/Gallery';
import Testimonials from './components/Testimonials/Testimonials';
import Admission from './components/Admission/Admission';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingActions from './components/Global/FloatingActions';
import Preloader from './components/Global/Preloader';

function App() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <StatsCounter />
        <Features />
        <Courses />
        <Faculty />
        <Results />
        <Gallery />
        <Testimonials />
        <Admission />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
