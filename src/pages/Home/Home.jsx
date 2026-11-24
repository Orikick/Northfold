import Footer from "@/components/layout/Footer/Footer.jsx";
import Header from "@/components/layout/Header/Header.jsx";
import SkipLink from "@/components/layout/SkipLink/SkipLink.jsx";
import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll.jsx";
import Clients from "@/components/sections/Clients/Clients.jsx";
import Contact from "@/components/sections/Contact/Contact.jsx";
import Hero from "@/components/sections/Hero/Hero.jsx";
import Numbers from "@/components/sections/Numbers/Numbers.jsx";
import Projects from "@/components/sections/Projects/Projects.jsx";
import Services from "@/components/sections/Services/Services.jsx";
import Team from "@/components/sections/Team/Team.jsx";

export default function Home() {
  return (
    <SmoothScroll>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <Clients />
        <Services />
        <Numbers />
        <Team />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
