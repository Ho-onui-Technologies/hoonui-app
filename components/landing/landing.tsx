import Contact from './contact';
import Hero from "./hero";
import Features from "./features";
import { useState } from 'react';
import { Link, animateScroll as scroll } from "react-scroll";


const Intro = () => {
  const [state, setState] = useState(false)

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Services", path: "services-section" },
    { title: "Contact", path: "contact-section" }
  ]

  return (
    <div>
      <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              <img
                src="/assets/Black logo - no background.png"
                width={200}
                alt="Icon"
              />
            </a>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {
                navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-gray-700 hover:text-indigo-600">
                      <button>
                        <Link
                          activeClass="active"
                          to={item.path}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                        >
                          {item.title}
                        </Link>
                      </button>
                    </li>
                  )
                })
              }
              <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
              <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                <li>
                  <a href="/sign-up" className="block py-3 text-center text-gray-700 hover:text-indigo-500 border rounded-lg md:border-none">
                    Sign up
                  </a>
                </li>
                <li>
                  <a href="sign-in" className="block py-3 px-4 font-medium text-center text-white bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-500 active:shadow-none rounded-lg shadow md:inline">
                    Login
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <section className="text-slat-100 overflow-hidden px-8 py-48 md:px-12 md:py-52">
        <div id="home-section" className="relative mx-auto max-w-7xl">
          <Hero />
        </div>
      </section>
      <section className="overflow-hidden px-8 py-12">
        <div id="services-section" className="mx-auto max-w-7xl">
          <Features />
        </div>
      </section>
      <section className="overflow-hidden px-8 py-12">
        <div id="contact-section" className="mx-auto max-w-7xl">
          <Contact />
        </div>
      </section>
    </div>
  )
}

export default Intro;
