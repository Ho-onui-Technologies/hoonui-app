import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import DashboardHeader from '../components/dashboard/dashboard-header';
import Container from '../components/container';

export default function Dashboard() {
  const [invoices, setInvoices] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`/api/invoices/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchInvoices();
  }, [userId]);

  const downloadInvoice = async (fileName) => {
    try {
      const response = await fetch(`/api/download/${fileName}.js`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const signedUrl = data.signedUrl;
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = signedUrl;

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
      <DashboardHeader />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
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
                <button
                  className="text-s font-small px-3 py-1.5 rounded-xl text-white m-0 bg-blue-500 hover:bg-blue-600 transition"
                  onClick={() => downloadInvoice(user.name)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}