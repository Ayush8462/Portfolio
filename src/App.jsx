import NavBar from "./components/NavBar";
// import ParticlesBackground from "./components/ParticlesBackground";
import About from "./sections/About";
import Home from "./sections/Home";
// import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
// import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import React from "react";
import IntroAnimation from "./components/IntroAnimation";

export default function App(){
  const [introDone, setIntroDone] = React.useState(false);

  return (
    <>
    {!introDone ? (
      <IntroAnimation onFinish={() => setIntroDone(true)} />
    ) : (
    <div className="relative gradient text-white">
      <CustomCursor />
      {/* <ParticlesBackground /> */}

      <NavBar />
      <Home />
      <About />
      <Skills />
      <Projects />
      {/* <Experience /> */}
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
    )}
    </>
  )
}
