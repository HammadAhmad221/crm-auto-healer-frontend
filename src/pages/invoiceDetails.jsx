import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const InvoiceDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setError('Failed to fetch invoice details');
      }
    };

    fetchInvoice();
  }, [id]);

  const downloadPdf = () => {
    const input = document.getElementById('invoice-pdf');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
      const x = (pdfWidth - imgWidth * ratio) / 2;
      const y = 10; 
  
      pdf.addImage(imgData, 'PNG', x, y, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`invoice_${invoice._id}.pdf`);
    });
  };
  

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!invoice) {
    return <p>Loading...</p>;
  }

  return (
<>
<HomeButton/>
<BackButton/>

<div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div id="invoice-pdf" className="p-8 border border-gray-300">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">INVOICE</h1>
            <p className="text-sm text-gray-500">Load Id: {invoice.loadId._id}</p>
            <p className="text-sm text-gray-500">Date: {new Date(invoice.date).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-gray-800">Drive point logistics Llc</h2>
            <p className="text-sm text-gray-500">Phone: 407-809-5670</p>
            <Link to='https://drivepointlogistics.com' className="text-sm text-gray-500">https://drivepointlogistics.com</Link>
            <p className="text-2xl font-bold text-gray-500">Payment methods</p>
            <p className="text-sm text-gray-500">Zelle - Cashapp - Credit card</p>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700">Bill To:</h3>
          <p className="text-sm text-gray-600">{invoice.customerId?.name}</p>
          <p className="text-sm text-gray-600">{invoice.customerId?.address?.street}</p>
          <p className="text-sm text-gray-600">{invoice.customerId?.address?.city}, {invoice.customerId?.address?.state}, {invoice.customerId?.address?.zipCode}</p>
        </div>

        {/* Invoice Details */}
                  <table className="w-full mb-8 border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 text-left py-2 px-4 text-sm font-semibold text-gray-700">Description</th>
                <th className="border-b-2 border-gray-300 text-right py-2 px-4 text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 py-2 px-4 text-sm text-gray-700 max-w-80 whitespace-normal break-words">FROM: {invoice.loadId?.pickupLocation}</td>
                {/* <td className="border-b border-gray-200 py-2 px-4 text-right text-sm text-gray-700">${loadDetails.amount.toFixed(2) || 'N/A'}</td> */}
              </tr>
              <tr>
                <td className="border-b border-gray-200 py-2 px-4 text-sm text-gray-700 max-w-80 whitespace-normal break-words">TO: {invoice.loadId?.deliveryLocation}</td>
                </tr>
                <tr>
                <td className="py-2 px-4 text-sm text-gray-700 font-semibold">Total</td>
                <td className="py-2 px-4 text-right text-sm text-gray-700 font-semibold">${invoice?.amount.toFixed(2) || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

        {/* Payment Status */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700">Payment Status:</h3>
          <p className={`${invoice.status === 'Paid' ? 'text-green-600' : invoice.status === 'Unpaid' ? 'text-red-600' : 'text-yellow-600'} text-sm font-semibold`}>
            {invoice.status}
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 text-center">
          <p>Thank you for your business!</p>
          <p className="mt-4">This is a computer-generated document and does not require a signature.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-8">
        <button
          onClick={downloadPdf}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-4"
        >
          Download PDF
        </button>
        {localStorage.getItem("token") &&
        <>

         <Link
          to={`/invoices/${invoice._id}/edit`}
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
        >
          Edit Invoice
        </Link>
        <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this invoice?')) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                });
                // navigate('/invoices');
              window.alert('Invoice deleted successfully');

              } catch (error) {
                console.error('Error deleting invoice:', error);
              }
            }
          }}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
        >
          Delete
        </button>
        </>
        }
      </div>
    </div>
</>
  );
};

export default InvoiceDetails;
