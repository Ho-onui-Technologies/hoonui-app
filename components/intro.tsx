import Link from 'next/link';

const Intro = () => {
  return (
    <div>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-5xl tracking-tighter leading-tight md:pr-8">
          Ho'onui Technologies LLC
        </h1>
        <nav className="flex items-center space-x-4">
          <a className="text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-150">
            About
          </a>
          <a className="text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-150">
            Contact
          </a>
        </nav>
      </section>

      <section className="mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          Ho'onui Technologies LLC is a software consulting firm based in Honolulu, HI.
        </h1>
      </section>
      <section className="mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
          Our Work
        </h1>
      </section>

      <section className="mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-3xl tracking-tighter leading-tight md:pr-8 w-3/5">
          Our expertise ranges from data engineering to traditional software engineering.
          With a wealth of experience gained from working in Silicon Valley, our projects
          are united by a focus on enhancing business performance and innovation through
          cutting-edge technology. At Ho'onui Technologies LLC, we strive to create lasting
          partnerships and deliver exceptional results for our clients.
        </h1>
      </section>

      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
          Ho'onui:
        </h1>
        <h1 className="text-5xl md:text-5xl tracking-tighter leading-tight md:pr-8">
          refers to the phase in the Hawaiian moon calendar that is growing in size, which symbolizes a time of growth and expansion.
        </h1>
      </section>

    </div>
  )
}

export default Intro
