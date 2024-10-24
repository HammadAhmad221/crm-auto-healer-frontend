import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import axios from "axios";

const DriverDetails = () => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setDriver(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching driver details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [id]);

  if (loading) return <Loading />;
  if (!driver) return <div>Driver not found</div>;

  return (
    <>
      <HomeButton />
      <BackButton backto="/drivers" />

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Driver Details</h2>
        <div className="bg-white p-4 border border-gray-200">

        <div className="mb-6">
          <strong className="block text-lg font-medium">Name:</strong>
          <p className="detailsTruncate">{driver.name}</p>
        </div>
        <div className="mb-6">
          <strong className="block text-lg font-medium">License Number:</strong>
          <p className="detailsTruncate">{driver.licenseNumber}</p>
        </div>
        <div className="mb-6">
          <strong className="block text-lg font-medium">Created At:</strong>
          <p className="detailsTruncate">{new Date(driver.date).toLocaleDateString()}</p>
        </div>
        <div className="mb-6">
          <strong className="block text-lg font-medium">Certifications:</strong>
          <ul>
            {driver.certifications && driver.certifications.length > 0 ? (
              driver.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))
            ) : (
              <li>No certifications listed</li>
            )}
          </ul>
        </div>
        <div className="mb-6">
          <p className="detailsTruncate">
            <strong>Phone Number:</strong> {driver.contactDetails.phoneNumber}
          </p>
          <br />
          <p className="detailsTruncate">
            <strong>Email:</strong> {driver.contactDetails.email}
          </p>
        </div>
        <div className="flex justify-end mt-8">
          <Link
            to={`/drivers/${driver._id}/edit`}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
          >
            Edit Driver
          </Link>
          <button
            onClick={async () => {
              if (
                window.confirm("Are you sure you want to delete this customer?")
              ) {
                try {
                  await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`,
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  navigate("/drivers");
                } catch (error) {
                  console.error("Error deleting customer:", error);
                }
              }
            }}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
