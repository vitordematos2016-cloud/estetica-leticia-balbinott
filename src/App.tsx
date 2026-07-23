import { SelectionProvider } from './context/SelectionContext';
import { TreatmentsFilterProvider } from './context/TreatmentsFilterContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SelectionWidget } from './components/selection/SelectionWidget';
import { BackToTop } from './components/ui/BackToTop';
import { Hero } from './components/sections/Hero';
import { BrandLoop } from './components/sections/BrandLoop';
import { Manifesto } from './components/sections/Manifesto';
import { About } from './components/sections/About';
import { Credentials } from './components/sections/Credentials';
import { Purpose } from './components/sections/Purpose';
import { Differentials } from './components/sections/Differentials';
import { SkinConcerns } from './components/sections/SkinConcerns';
import { Treatments } from './components/sections/Treatments';
import { FeaturedTreatments } from './components/sections/FeaturedTreatments';
import { PersonalAssessment } from './components/sections/PersonalAssessment';
import { HowItWorks } from './components/sections/HowItWorks';
import { Aftercare } from './components/sections/Aftercare';
import { Experience } from './components/sections/Experience';
import { Technologies } from './components/sections/Technologies';
import { Gallery } from './components/sections/Gallery';
import { FacadeYears } from './components/sections/FacadeYears';
import { AuthorizedResults } from './components/sections/AuthorizedResults';
import { Offers } from './components/sections/Offers';
import { Reviews } from './components/sections/Reviews';
import { Faq } from './components/sections/Faq';
import { InstagramShowcase } from './components/sections/InstagramShowcase';
import { MySelectionSection } from './components/sections/MySelectionSection';
import { Scheduling } from './components/sections/Scheduling';
import { Location } from './components/sections/Location';
import { FinalCta } from './components/sections/FinalCta';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <SelectionProvider>
      <TreatmentsFilterProvider>
        <Header />
        <main>
          <Hero />
          <BrandLoop />
          <Manifesto />
          <About />
          <Credentials />
          <Purpose />
          <Differentials />
          <SkinConcerns />
          <Treatments />
          <FeaturedTreatments />
          <PersonalAssessment />
          <HowItWorks />
          <Aftercare />
          <Experience />
          <Technologies />
          <Gallery />
          <FacadeYears />
          <AuthorizedResults />
          <Offers />
          <Reviews />
          <Faq />
          <InstagramShowcase />
          <MySelectionSection />
          <Scheduling />
          <Location />
          <FinalCta />
          <Contact />
        </main>
        <Footer />
        <SelectionWidget />
        <BackToTop />
      </TreatmentsFilterProvider>
    </SelectionProvider>
  );
}

export default App;
