// src/pages/UserList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import Loading from "../components/Loading";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/users`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin"/>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Users</h2>
        <Link
          to="/users/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New User
        </Link>
{loading?(<Loading/>):(        <div className="scrollbar-custom overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className="truncate max-w-xs" title={user.name}>
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className="max-w-xs" title={user.email}>
                      {user.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className="truncate max-w-xs" title={user.role}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                    <button
                      onClick={() => navigate(`/users/${user._id}`)}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      onClick={() => navigate(`/users/${user._id}/edit`)}
                      className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          try {
                            await axios.delete(
                              `${import.meta.env.VITE_BACKEND_URL}api/users/${
                                user._id
                              }`,
                              {
                                headers: {
                                  Authorization: localStorage.getItem("token"),
                                },
                              }
                            );
                            setUsers((prevUsers) =>
                              prevUsers.filter((c) => c._id !== user._id)
                            );
                          } catch (error) {
                            console.error("Error deleting user:", error);
                          }
                        }
                      }}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
      </div>
    </>
  );
};

export default UserList;
