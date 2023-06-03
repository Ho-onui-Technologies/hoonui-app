import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";


const DashboardHeader = () => {
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
        &nbsp;
        <h1 className="text-5xl md:text-5xl tracking-tighter leading-tight md:pr-8">
          Ho'onui Technologies LLC
        </h1>
      </div>
      <nav className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
      </nav>

    </section>
  )
}

export default DashboardHeader