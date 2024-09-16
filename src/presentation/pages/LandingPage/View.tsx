import {
  CallToAction,
  Features,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
} from "./components";

const LandingPage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <main className="flex-1 mt-10 md:mt-0 bg-gradient-to-tr from-[#0F1117] from-40% to-[#130C36]">
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};
export default LandingPage;
