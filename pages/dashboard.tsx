import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { UserButton } from "@clerk/nextjs";
import Container from '../components/container';
import { createClient } from '@supabase/supabase-js';


export default function Dashboard() {
  const [invoices, setInvoices] = useState(null);
  const [clientInfo, setClientInfo] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [state, setState] = useState(false);

  const submenuNav = [
    { title: "Overview", path: "overview" },
    { title: "Invoices", path: "invoices" },
    { title: "Billing", path: "billing" },
    { title: "Plans", path: "plans" },
  ];

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Pro version", path: "javascript:void(0)" },
    { title: "Upgrade", path: "javascript:void(0)" },
    { title: "Support", path: "javascript:void(0)" },
  ]

  const [activeSubmenu, setActiveSubmenu] = useState(submenuNav[0].path);

  async function getClientInfo() {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    // Database connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Environment variables SUPABASE_PROJECT_URL or SUPABASE_API_KEY are not defined");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    });

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching data: ', error);
      return;
    }

    // @ts-ignore
    setClientInfo(data);
  }

  async function getAllInvoices() {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    // Database connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Environment variables SUPABASE_PROJECT_URL or SUPABASE_API_KEY are not defined");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    });

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching data: ', error);
      return;
    }

    // @ts-ignore
    setInvoices(data);
  }

  async function downloadInvoice(file_path: string) {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    // Database connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Environment variables SUPABASE_PROJECT_URL or SUPABASE_API_KEY are not defined");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    });

    file_path = String(file_path).replace('.js', '');
    const { data, error } = await supabase.storage
      .from('hoonui_technologies')
      .createSignedUrl(`${userId}/${file_path}`, 1000, {
        download: true,
      });

    if (error) {
      console.error('Error fetching data: ', error);
      return;
    }
    if (data && data.signedUrl) {
      return data.signedUrl;
    }

  }

  useEffect(() => {
    if (isLoaded && userId) {
      getAllInvoices().catch((error) => {
        console.error("An error occurred:", error);
      });
      getClientInfo().catch((error) => {
        console.error("An error occurred:", error);
      });
    }
  }, [isLoaded, userId, getToken]);

  const onDownloadClick = async (fileName) => {
    try {
      const signedUrl = await downloadInvoice(fileName); // get the signed URL directly

      if (!signedUrl) {
        console.error('There has been a problem with your fetch operation: signedUrl is null');
        return;
      }

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = signedUrl; // use the signed URL directly

      // Set the downloadable file name
      a.download = fileName;

      // Append the anchor tag to the document body
      document.body.appendChild(a);

      // Trigger a click event on the anchor tag
      a.click();

      // Clean up
      document.body.removeChild(a);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Container>
      <header className="text-base lg:text-sm">
        <div className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-full fixed inset-x-0" : ""}`}>
          <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
            <a href="javascript:void(0)">
              <img
                src="/assets/Black logo - no background.png"
                width={200}
                height={50}
                alt="Float UI logo"
              />
            </a>
            <div className="lg:hidden">
              <button className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"}`}>
            <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
              <form onSubmit={(e) => e.preventDefault()} className='flex-1 items-center justify-start pb-4 lg:flex lg:pb-0'>
              </form>
              {
                navigation.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <a href={item.path} className="block text-gray-700 hover:text-gray-900">
                        {item.title}
                      </a>
                    </li>
                  )
                })
              }
              <UserButton />
            </ul>
          </div>
        </div>
        <nav className="border-b">
          <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
            {
              submenuNav.map((item, idx) => (
                <li key={idx} className={`py-1 ${activeSubmenu === item.path ? "border-b-2 border-indigo-600" : ""}`}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveSubmenu(item.path); }} className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
                    {item.title}
                  </a>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
      {clientInfo?.map(info => (
        <div className="rounded-lg bg-neutral-100 p-6 text-neutral-700 shadow-lg">
          <h2 className="mb-5 text-3xl font-semibold">Hello {info.client_name}</h2>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-200 opacity-100" />
          <h2 className="mb-5 text-xl font-semibold">Current Status: {info.current_status}</h2>
        </div>
      ))
      }
      {activeSubmenu === submenuNav[0].path && (
        <div>
          {/* Content for Overview */}
        </div>
      )}
      {activeSubmenu === submenuNav[1].path && (
        <section className="text-slat-100 overflow-hidden">
          <div className="mt-12 relative h-max overflow-auto mx-auto max-w-7xl">
            <table className="w-full table-auto text-sm text-left min-w-full divide-y divide-gray-200">
              <thead className="text-gray-600 font-medium border-b">
                <tr>
                  {/* header row */}
                  {["Invoice Number", "Name", "Date of Issue", "Hours", "Action"].map((header) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices?.map((user) => (
                  <tr key={user.invoice_id}>
                    {/* data row */}
                    {[user.invoice_number, user.name, user.date_of_issue, user.hours].map((item) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          onDownloadClick(user.name);
                        }}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </Container>
  );
}