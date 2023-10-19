import { Hero, Navbar } from "./components";

const LandingPage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-tr from-[#0F1117] from-40% to-[#130C36] px-5">
      <Navbar />
      <Hero />
    </div>
  );
};
export default LandingPage;
