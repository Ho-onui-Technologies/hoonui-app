import Image from 'next/image';
import { motion, useAnimation, useInView } from "framer-motion";
import LandingHeader from './landing-header';
import ChipTabs from './landing-navbar';
import { useEffect, useRef, useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiDatabase,
  FiBarChart,
  FiMonitor
} from "react-icons/fi";
import { IconType } from 'react-icons';

interface FeatureProps {
  position: number;
  index: number;
  title: string;
  description: string;
  Icon: IconType;
}

const Feature = ({
  position,
  index,
  title,
  description,
  Icon,
}: FeatureProps) => {
  const translateAmt =
    position >= index ? index * 100 : index * 100 - 100 * (index - position);

  return (
    <motion.div
      animate={{ x: `${-translateAmt}%` }}
      transition={{
        ease: "easeInOut",
        duration: 0.35,
      }}
      className={`relative flex min-h-[250px] w-10/12 max-w-lg shrink-0 flex-col justify-between overflow-hidden p-8 shadow-lg md:w-3/5 ${index % 2 ? "bg-black text-white" : " bg-white"
        }`}
    >
      <Icon className="absolute right-2 top-2 text-7xl opacity-20" />
      <h3 className="mb-8 text-3xl font-bold">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

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

const Intro = () => {
  const [position, setPosition] = useState(0);

  const shiftLeft = () => {
    if (position > 0) {
      setPosition((pv) => pv - 1);
    }
  };

  const shiftRight = () => {
    if (position < features.length - 1) {
      setPosition((pv) => pv + 1);
    }
  };

  return (
    <div>
      <ChipTabs />

      {/* <section className="pt-10 pb-10 mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          Ho'onui Technologies is a software consulting firm based in Honolulu, HI.
        </h1>
      </section>

      <section className="pt-10 pb-10 flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <div>
          <h1 className="text-5xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
            Our Work
          </h1>
          <p className="text-3xl md:text-3xl tracking-tighter leading-tight md:pr-8 w-7/8">
            Our expertise ranges from data engineering to traditional software engineering.
            With a wealth of experience gained from working in Silicon Valley, our projects
            are united by a focus on enhancing business performance and innovation through
            cutting-edge technology. At Ho'onui, we strive to create lasting
            partnerships and deliver exceptional results for our clients.
          </p>
        </div>
        <Image
          src="/assets/js.svg"
          width={600}
          height={500}
          alt="Javascript Illustration"
        />
      </section> */}

      <section className="text-slat-100 overflow-hidden px-8 py-24 md:px-12 md:py-32">
        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none relative z-10">
            <Reveal>
              <h1 className="pointer-events-auto text-5xl font-black text-slate-800 md:text-7xl">
                Ho'onui Technologies<span className="text-indigo-500">.</span>
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
                <button className="px-4 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                  Contact us
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-between gap-4">
            <h2 className="text-4xl font-bold leading-[1.2] md:text-5xl">
              We develop it all. <span className="text-neutral-500">Our Services:</span>
            </h2>
            <div className="flex gap-2">
              <button
                className="h-fit bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
                onClick={shiftLeft}
              >
                <FiChevronLeft />
              </button>
              <button
                className="h-fit bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
                onClick={shiftRight}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            {features.map((feat, index) => (
              <Feature {...feat} key={index} position={position} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Intro

const features = [
  {
    title: "Web Development",
    Icon: FiMonitor,
    description:
      "We create high-quality, responsive, and scalable websites that are tailored to your business needs.",
  },
  {
    title: "Data Analytics",
    Icon: FiBarChart,
    description:
      "We provide data-driven insights and help businesses make better decisions using advanced analytics techniques and tools.",
  },
  {
    title: "Cloud Engineering",
    Icon: FiDatabase,
    description:
      "Our data engineering services help you harness the power of cloud services to efficiently and securely transform, store, and analyze your data.",
  }
];
