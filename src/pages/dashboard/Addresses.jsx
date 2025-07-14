import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Addresses = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null); // ✅ define user state here

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    postBox: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // 🔁 Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(res.data);
        if (res.data.address) {
          setAddress(res.data.address);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const isAddressEmpty = !user?.address?.fullName;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    try {
      await axios.put(`http://localhost:5000/api/user/address`, address, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success("Address saved");

      // 🔁 Refetch user
      const res = await axios.get('http://localhost:5000/api/user/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      toast.error("Failed to save address");
    }
  };

  if (!user) return <p className="text-center dark:text-white">Loading...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Shipping Address</h2>

      {isAddressEmpty && !editing && (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">You have not added any address yet.</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            ➕ Add Address
          </button>
        </div>
      )}

      {editing && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          <input name="fullName" value={address.fullName} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded dark:bg-gray-700" />
          <input name="phone" value={address.phone} onChange={handleChange} placeholder="Phone Number" className="p-2 border rounded dark:bg-gray-700" />
          <input name="street" value={address.street} onChange={handleChange} placeholder="Street Address" className="p-2 border rounded dark:bg-gray-700" />
          <input name="postBox" value={address.postBox} onChange={handleChange} placeholder="Post Box (Optional)" className="p-2 border rounded dark:bg-gray-700" />
          <input name="city" value={address.city} onChange={handleChange} placeholder="City" className="p-2 border rounded dark:bg-gray-700" />
          <input name="postalCode" value={address.postalCode} onChange={handleChange} placeholder="Postal Code" className="p-2 border rounded dark:bg-gray-700" />
          <input name="country" value={address.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded dark:bg-gray-700" />

          <div className="flex justify-between">
            <button onClick={saveAddress} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">💾 Save</button>
            <button onClick={() => setEditing(false)} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}

      {!editing && !isAddressEmpty && (
        <div className="text-sm space-y-1 mt-2 dark:text-white">
          <p><strong>Name:</strong> {user.address.fullName}</p>
          <p><strong>Phone:</strong> {user.address.phone}</p>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Post Box:</strong> {user.address.postBox}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Postal Code:</strong> {user.address.postalCode}</p>
          <p><strong>Country:</strong> {user.address.country}</p>
          <button onClick={() => setEditing(true)} className="mt-3 bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700">✏️ Edit Address</button>
        </div>
      )}
    </div>
  );
};

export default Addresses;
