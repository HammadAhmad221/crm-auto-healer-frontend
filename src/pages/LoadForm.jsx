import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";

const LoadForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState({
    vehicleId: "",
    driverId: "",
    customerId: "",
    amount: "",
    pickupLocation: "",
    deliveryLocation: "",
    loadDetails: "",
    status: "Assigned",
  });
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchVehiclesDriversAndCustomers = async () => {
      try {
        const [vehiclesResponse, driversResponse, customersResponse] =
          await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_URL}api/vehicles`, {
              headers: { Authorization: localStorage.getItem("token") },
            }),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, {
              headers: { Authorization: localStorage.getItem("token") },
            }),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
              headers: { Authorization: localStorage.getItem("token") },
            }),
          ]);
        setVehicles(
          // vehiclesResponse.data.sort((a, b) => a.make.localeCompare(b.make))
          vehiclesResponse.data.data
        );
        setDrivers(
          // driversResponse.data.sort((a, b) => a.name.localeCompare(b.name))
          driversResponse.data
        );
        setCustomers(
          // customersResponse.data.sort((a, b) => a.name.localeCompare(b.name))
          customersResponse.data.data
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVehiclesDriversAndCustomers();

    if (isEdit) {
      const fetchLoad = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}api/loads/${id}`,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          setLoad(response.data);
        } catch (error) {
          console.error("Error fetching load:", error);
        }
      };
      fetchLoad();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setLoad({ ...load, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setLoad({ ...load, [actionMeta.name]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}api/loads/${id}`,
          load,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        navigate("/loads");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/loads`, load, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        navigate("/loads");
      }
    } catch (error) {
      console.error("Error saving load:", error);
      toast.error(error.response.data.message);
    }
  };

  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle?._id,
    label: vehicle.make,
  }));

  const driverOptions = drivers.map((driver) => ({
    value: driver?._id,
    label: driver.name,
  }));

  const customerOptions = customers.map((customer) => ({
    value: customer?._id,
    label: customer?.name,
  }));

  return (
    <>
      <HomeButton />
      <BackButton backto="/loads" />

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">
          {isEdit ? "Edit Load" : "Add New Load"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 border border-gray-200"
        >
          {/* Vehicle Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle
            </label>
            <Select
              name="vehicleId"
              value={vehicleOptions.find(
                (option) => option.value === load.vehicleId?._id
              )}
              onChange={handleSelectChange}
              options={vehicleOptions}
              isSearchable
              className="mt-1 block w-full"
              placeholder="Select a vehicle"
              required
            />
          </div>

          {/* Driver Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Driver
            </label>
            <Select
              name="driverId"
              value={driverOptions.find(
                (option) => option.value === load.driverId?._id
              )}
              onChange={handleSelectChange}
              options={driverOptions}
              isSearchable
              className="mt-1 block w-full"
              placeholder="Select a driver"
            />
          </div>

          {/* Customer Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Customer
            </label>
            <Select
              name="customerId"
              value={customerOptions.find(
                (option) => option.value === load.customerId?._id
              )}
              onChange={handleSelectChange}
              options={customerOptions}
              isSearchable
              className="mt-1 block w-full"
              placeholder="Select a customer"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={load.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Pickup Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={load.pickupLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Delivery Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Delivery Location
            </label>
            <input
              type="text"
              name="deliveryLocation"
              value={load.deliveryLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Load Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Load Details
            </label>
            <textarea
              name="loadDetails"
              value={load.loadDetails}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={load.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
            >
              {isEdit ? "Update Load" : "Create Load"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoadForm;
