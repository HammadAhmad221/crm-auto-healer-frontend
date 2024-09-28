import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link, useLocation } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';

const GenerateInvoiceFromLoad = () => {
  const location = useLocation();
  const { loadId, customerId, amount } = location.state || {};
  
  const [loadDetails, setLoadDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [error, setError] = useState('');
  const invoiceData ={
    customerId,
    loadId,
    amount,
    status:"Unpaid",
  }

  useEffect(() => {
    const createInvoice = async () =>{
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`,invoiceData);
        }catch(error){
            console.error('Error creating Invoice:', error);
            setError('Failed to Create Invoice');
        }
    }
    const fetchLoadDetails = async () => {
      try {
        const loadResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads/${loadId}`);
        setLoadDetails(loadResponse.data);
      } catch (error) {
        console.error('Error fetching load details:', error);
        setError('Failed to fetch load details');
      }
    };

    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers/${customerId}`);
        setCustomerDetails(customerResponse.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setError('Failed to fetch customer details');
      }
    };
    createInvoice();
    fetchLoadDetails();
    fetchCustomerDetails();
  }, [loadId, customerId]);

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
      pdf.save(`invoice_${loadId}.pdf`);
    });
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!loadDetails || !customerDetails) {
    return <Loading/>;
  }

  return (
    <>
      <HomeButton />
      <BackButton />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div id="invoice-pdf" className="p-8 border border-gray-300">
          {/* Invoice Header */}
          {/* <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-700">INVOICE</h1>
              <p className="text-sm text-gray-500">Load ID: {loadDetails._id}</p>
              <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-semibold text-gray-800">Drive Point Logistics LLC</h2>
              <p className="text-sm text-gray-500">Phone: 407-809-5670</p>
              <p className="text-sm text-gray-500">Payment methods: Zelle, Cashapp, Credit Card</p>
            </div>
          </div> */}
                  <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">INVOICE</h1>
            <p className="text-sm text-gray-500">Load ID: {loadDetails._id}</p>
            <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-gray-800">Drive point logistics Llc</h2>
            <p className="text-sm text-gray-500">Phone: 407-809-5670</p>
            <Link to='https://drivepointlogistics.com' className="text-sm text-gray-500">https://drivepointlogistics.com</Link>
            <p className="text-2xl font-bold text-gray-500">Payment methods</p>
            <p className="text-sm text-gray-500">Zelle - Cashapp - Credit card</p>
          </div>
        </div>
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700">Bill To:</h3>
            <p className="text-sm text-gray-600">{customerDetails.name}</p>
            <p className="text-sm text-gray-600">{customerDetails.address.street}</p>
            <p className="text-sm text-gray-600">{customerDetails.address.city}, {customerDetails.address.state}, {customerDetails.address.zipCode}</p>
          </div>
          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 text-left py-2 px-4 text-sm font-semibold text-gray-700">Description</th>
                <th className="border-b-2 border-gray-300 text-right py-2 px-4 text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 py-2 px-4 text-sm text-gray-700 max-w-80 whitespace-normal break-words">FROM: {loadDetails.pickupLocation}</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 py-2 px-4 text-sm text-gray-700 max-w-80 whitespace-normal break-words">TO: {loadDetails.deliveryLocation}</td>
                </tr>
                <tr>
                <td className="py-2 px-4 text-sm text-gray-700 font-semibold">Total</td>
                <td className="py-2 px-4 text-right text-sm text-gray-700 font-semibold">${amount.toFixed(2) || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          {/* Payment Status */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700">Payment Status:</h3>
            <p className={`text-sm font-semibold ${loadDetails.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
              UnPaid
            </p>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500 text-center">
            <p>Thank you for your business!</p>
            <p className="mt-4">This is a computer-generated document and does not require a signature.</p>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={downloadPdf}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateInvoiceFromLoad;
