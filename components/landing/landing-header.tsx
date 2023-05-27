import Image from 'next/image';

const LandingHeader = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center">
        <Image
          src="/assets/connection.png"
          width={40}
          height={40}
          alt="Icon"
        />
        &nbsp;
        <h1 className="text-5xl md:text-5xl tracking-tighter leading-tight md:pr-8">
          Ho'onui Technologies LLC
        </h1>
      </div>
      <nav className="flex items-center space-x-4">
        <a className="text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-150">
          About
        </a>
        <div>
          <a
            href="mailto:info@hoonuitechnologies.dev"
            className="text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-150"
          >
            Contact
          </a>
        </div>
      </nav>
    </section>
  )
}

export default LandingHeader