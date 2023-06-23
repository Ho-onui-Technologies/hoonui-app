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
                <div className="border w-fit rounded-xl m-5 shadow-sm">
                  <Link href='/sign-in' className="text-xl font-medium px-4 py-2 rounded-l-xl text-white m-0 bg-blue-500 hover:bg-blue-600 transition">Login</Link><Link href='/sign-up' className="text-xl font-medium px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition">Register</Link>
                </div>
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