import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/emails`
        );
        setEmails(response.data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <Loading/>;

  return (
   <>
    <HomeButton/>
    <BackButton/>
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Inbox</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{email.subject}</h3>
                  <p className="text-gray-600">TO: {email.to}</p>
                  <p className="text-sm text-gray-500">{email.date}</p>
                </div>
                <div className="text-right">
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p>No emails found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
   </>
  );
};

export default EmailList;
