import Hero from '@/src/components/Hero/Hero';
import StatsCounter from '@/src/components/StatsCounter/StatsCounter';
import Features from '@/src/components/Features/Features';
import Courses from '@/src/components/Courses/Courses';
import Faculty from '@/src/components/Faculty/Faculty';
import Results from '@/src/components/Results/Results';
import Gallery from '@/src/components/Gallery/Gallery';
import Testimonials from '@/src/components/Testimonials/Testimonials';
import Admission from '@/src/components/Admission/Admission';
import Contact from '@/src/components/Contact/Contact';
import AppDownload from '@/src/components/AppDownload/AppDownload';
import Preloader from '@/src/components/Global/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <StatsCounter />
        <Features />
        <Courses />
        <Faculty />
        <Results />
        <AppDownload />
        <Gallery />
        <Testimonials />
        <Admission />
        <Contact />
      </main>
    </>
  );
}
