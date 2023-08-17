import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';


const LandingHeader = () => {
  const { sessionId } = useAuth();
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
        {(() => {
          if (sessionId) {
            return (
              <>
                <Link
                  href='/dashboard'
                  className="text-xl font-medium px-4 py-2 rounded-xl text-white m-0 bg-blue-500 hover:bg-blue-600 transition"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            )
          } else {
            return (
              <>
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
                <Link href="/sign-in">
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </Link>
              </>
            )
          }
          return null;
        })()}
      </nav>

    </section>
  )
}

export default LandingHeader