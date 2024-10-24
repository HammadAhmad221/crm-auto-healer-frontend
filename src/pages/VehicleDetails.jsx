import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import axios from "axios";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const toggleCustomerDetails = () => {
    setShowCustomerDetails((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/vehicles/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setVehicle(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}api/vehicles/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/vehicles");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  if (!vehicle) {
    return <Loading />;
  }

  return (
    <>
      <HomeButton />
      <BackButton backto="/vehicles" />

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Vehicle Details</h2>
        <div className="bg-white p-4 border border-gray-200">
          <div className="mb-6">
            <strong className="block text-lg font-medium">Make:</strong>
            <p className="detailsTruncate">{vehicle.make}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium">Model:</strong>
            <p className="detailsTruncate">{vehicle.model}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium">Year:</strong>
            <p className="detailsTruncate">{vehicle.year}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium">Created At:</strong>
            <p className="detailsTruncate">{new Date(vehicle.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium text-gray-700">
              Customer:
            </strong>

            <p
              className="detailsTruncate cursor-pointer hover:text-blue-800 hover:underline transition-colors duration-200 select-none"
              onClick={toggleCustomerDetails}
            >
              {vehicle?.customer?.name}
            </p>

            {showCustomerDetails && (
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
                <p className="text-lg text-gray-600">
                  <strong>Name:</strong> {vehicle?.customer?.name}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Email:</strong> {vehicle?.customer?.email}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Phone:</strong> {vehicle?.customer?.phone}
                </p>
              </div>
            )}
          </div>
        <div className="flex justify-end mt-6">
          <Link
            to={`/vehicles/${vehicle._id}/edit`}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
          >
            Edit Vehicle
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800"
          >
            Delete
          </button>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default VehicleDetails;
