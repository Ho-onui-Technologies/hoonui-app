import Image from 'next/image';
import LandingHeader from './landing-header';0

const ServiceCard = ({ title, description, imgUrl }) => (
  <div className="bg-white shadow-md p-6 rounded-lg">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <img className="mt-4 rounded-lg" src={imgUrl} alt={`${title} illustration`} />
  </div>
);

const Intro = () => {
  const services = [
    {
      title: 'Data Engineering',
      description:
        'Our data engineering services help you harness the power of cloud services to efficiently and securely transform, store, and analyze your data.',
      imgUrl: 'assets/de.svg', // Replace with your image URL
    },
    {
      title: 'Web Development',
      description:
        'We create high-quality, responsive, and scalable websites that are tailored to your business needs.',
      imgUrl: 'assets/wd2.svg', // Replace with your image URL
    },
    {
      title: 'Data Analytics',
      description:
        'We provide data-driven insights and help businesses make better decisions using advanced analytics techniques and tools.',
      imgUrl: 'assets/da.svg', // Replace with your image URL
    },
  ];

  return (
    <div>
      <LandingHeader />

      <section className="pt-10 pb-10 mt-16 mb-16 md:mb-12">
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
            cutting-edge technology. At Ho'onui Technologies LLC, we strive to create lasting
            partnerships and deliver exceptional results for our clients.
          </p>
        </div>
        <Image
          src="/assets/js.svg"
          width={600}
          height={500}
          alt="Javascript Illustration"
        />
      </section>

      <section className="pt-10 flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                imgUrl={service.imgUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Intro
