import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface RevealProps {
  children: JSX.Element;
}

export const Reveal = ({ children }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-fit overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute bottom-1 left-0 right-0 top-1 z-20 bg-indigo-600"
      />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="pointer-events-none relative z-10">
      <Reveal>
        <h1 className="pointer-events-auto text-6xl font-black text-slate-800 md:text-8xl">
          Ho'onui Technologies
        </h1>
      </Reveal>
      <Reveal>
        <h2 className="pointer-events-auto my-2 text-2xl text-slate-800 md:my-4 md:text-4xl">
          We're a{" "}
          <span className="font-semibold text-indigo-500">
            Software Consulting Firm
          </span>
          {" "}based out of Honolulu, HI
        </h2>
      </Reveal>
      <Reveal>
        <p className="pointer-events-auto max-w-xl text-sm text-slate-800 md:text-base">
          Our expertise ranges from data engineering to traditional software engineering.
          With a wealth of experience gained from working in Silicon Valley, our projects
          are united by a focus on enhancing business performance and innovation through
          cutting-edge technology.
        </p>
      </Reveal>
      <Reveal>
        <div className="pointer-events-auto bg-white min-h-[100px] flex items-center justify-center">
          <button
            className="px-4 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            onClick={() => window.location.href = 'mailto:info@hoonuitechnologies.dev?subject=Inquiry%20About%20Software%20Consulting%20Services'}>
            Contact us
          </button>
        </div>
      </Reveal>
    </div>
  )
};

export default Hero;