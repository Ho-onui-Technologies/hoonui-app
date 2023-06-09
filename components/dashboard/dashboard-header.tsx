import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";


const DashboardHeader = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/assets/Black logo - no background.png"
            width={400}
            height={400}
            alt="Icon"
          />
        </a>
      </div>
      <nav className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
      </nav>

    </section>
  )
}

export default DashboardHeader