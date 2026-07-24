import { useCallback, useState } from 'react';
import { SelectionProvider } from './context/SelectionContext';
import { TreatmentsFilterProvider } from './context/TreatmentsFilterContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Splash } from './components/layout/Splash';
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
import { HowItWorks } from './components/sections/HowItWorks';
import { Aftercare } from './components/sections/Aftercare';
import { Experience } from './components/sections/Experience';
import { ThoughtfulDetails } from './components/sections/ThoughtfulDetails';
import { Technologies } from './components/sections/Technologies';
import { FacadeYears } from './components/sections/FacadeYears';
import { AuthorizedResults } from './components/sections/AuthorizedResults';
import { Offers } from './components/sections/Offers';
import { Reviews } from './components/sections/Reviews';
import { Faq } from './components/sections/Faq';
import { InstagramShowcase } from './components/sections/InstagramShowcase';
import { Scheduling } from './components/sections/Scheduling';
import { Location } from './components/sections/Location';
import { FinalCta } from './components/sections/FinalCta';
import { wasSplashAlreadyShown } from './utils/splashSession';

function App() {
  const [splashFinished, setSplashFinished] = useState(() => wasSplashAlreadyShown());
  const handleSplashFinish = useCallback(() => setSplashFinished(true), []);

  return (
    <SelectionProvider>
      <TreatmentsFilterProvider>
        <Splash onFinish={handleSplashFinish} />
        <Header />
        <main>
          <Hero splashFinished={splashFinished} />
          <BrandLoop />
          <Manifesto />
          <About />
          <Credentials />
          <Purpose />
          <Differentials />
          <SkinConcerns />
          <Treatments />
          <HowItWorks />
          <Aftercare />
          <Experience />
          <ThoughtfulDetails />
          <Technologies />
          <FacadeYears />
          <AuthorizedResults />
          <Offers />
          <Reviews />
          <Faq />
          <InstagramShowcase />
          <Scheduling />
          <Location />
          <FinalCta />
        </main>
        <Footer />
        <SelectionWidget />
        <BackToTop />
      </TreatmentsFilterProvider>
    </SelectionProvider>
  );
}

export default App;
