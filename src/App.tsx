import { SelectionProvider } from './context/SelectionContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SelectionWidget } from './components/selection/SelectionWidget';
import { Hero } from './components/sections/Hero';
import { BrandLoop } from './components/sections/BrandLoop';
import { Manifesto } from './components/sections/Manifesto';
import { About } from './components/sections/About';
import { Purpose } from './components/sections/Purpose';
import { Differentials } from './components/sections/Differentials';
import { Treatments } from './components/sections/Treatments';
import { FeaturedTreatments } from './components/sections/FeaturedTreatments';
import { HowItWorks } from './components/sections/HowItWorks';
import { Experience } from './components/sections/Experience';
import { Gallery } from './components/sections/Gallery';
import { FacadeYears } from './components/sections/FacadeYears';
import { AuthorizedResults } from './components/sections/AuthorizedResults';
import { Offers } from './components/sections/Offers';
import { Reviews } from './components/sections/Reviews';
import { Faq } from './components/sections/Faq';
import { MySelectionSection } from './components/sections/MySelectionSection';
import { Scheduling } from './components/sections/Scheduling';
import { Location } from './components/sections/Location';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <SelectionProvider>
      <Header />
      <main>
        <Hero />
        <BrandLoop />
        <Manifesto />
        <About />
        <Purpose />
        <Differentials />
        <Treatments />
        <FeaturedTreatments />
        <HowItWorks />
        <Experience />
        <Gallery />
        <FacadeYears />
        <AuthorizedResults />
        <Offers />
        <Reviews />
        <Faq />
        <MySelectionSection />
        <Scheduling />
        <Location />
        <Contact />
      </main>
      <Footer />
      <SelectionWidget />
    </SelectionProvider>
  );
}

export default App;
