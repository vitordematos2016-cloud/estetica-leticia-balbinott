import { useCallback, useState } from 'react';
import { SelectionProvider } from './context/SelectionContext';
import { TreatmentsFilterProvider } from './context/TreatmentsFilterContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Splash } from './components/layout/Splash';
import { CompactReloadIntro } from './components/layout/CompactReloadIntro';
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
import { Reviews } from './components/sections/Reviews';
import { Faq } from './components/sections/Faq';
import { InstagramShowcase } from './components/sections/InstagramShowcase';
import { Scheduling } from './components/sections/Scheduling';
import { Location } from './components/sections/Location';
import { FinalCta } from './components/sections/FinalCta';
import { wasSplashAlreadyShown } from './utils/splashSession';

type OpeningType = 'completa' | 'compacta' | 'finalizada';

function App() {
  const [openingType, setOpeningType] = useState<OpeningType>(() =>
    wasSplashAlreadyShown() ? 'compacta' : 'completa',
  );
  const finishOpening = useCallback(() => setOpeningType('finalizada'), []);

  return (
    <SelectionProvider>
      <TreatmentsFilterProvider>
        {openingType === 'completa' && <Splash onFinish={finishOpening} />}
        {openingType === 'compacta' && <CompactReloadIntro onFinish={finishOpening} />}
        <Header />
        <main>
          <Hero splashFinished={openingType === 'finalizada'} />
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
