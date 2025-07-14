import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setRole(user.role || 'user');
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${editingId}/role`, { role });
      toast.success('Role updated');
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">👤 Manage Users</h2>
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.verified ? (
                    <span className="text-green-600 font-semibold">✔ Verified</span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">✘ Unverified</span>
                  )}
                </td>
                <td className="p-3">
                  {editingId === user._id ? (
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="input dark:bg-gray-800"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className="capitalize">{user.role || 'user'}</span>
                  )}
                </td>
                <td className="p-3">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-3 flex gap-2">
                  {editingId === user._id ? (
                    <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                      <FaSave />
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
