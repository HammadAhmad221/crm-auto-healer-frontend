import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/users/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <Loading />;

  return (
    <>
      <HomeButton />
      <BackButton backto="/users" />

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">User Details</h2>
        <div className="bg-white p-4 border border-gray-200">
          <div className="mb-6">
            <strong className="block text-lg font-medium">Name:</strong>
            <p className="detailsTruncate">{user.name}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium">Email:</strong>
            <p className="detailsTruncate">{user.email}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium">Role:</strong>
            <p className="detailsTruncate">{user.role}</p>
          </div>
          <div className="mb-6">
            <strong className="block text-lg font-medium">Joined:</strong>
            <p className="detailsTruncate">
              {new Date(user.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-end mt-8">
            <Link
              to={`/users/${user._id}/edit`}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
            >
              Edit User
            </Link>
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this customer?"
                  )
                ) {
                  try {
                    await axios.delete(
                      `${import.meta.env.VITE_BACKEND_URL}api/users/${id}`,
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    navigate("/users");
                  } catch (error) {
                    console.error("Error deleting user:", error);
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

export default UserDetails;
