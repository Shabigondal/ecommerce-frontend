import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    subcategory: '',
    quantity: '',
    description: '',
    image: null
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products');
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/products/${editingId}`, data);
        toast.success('Product updated');
      } else {
        await axios.post('http://localhost:5000/api/admin/products', data);
        toast.success('Product added');
      }
      setForm({ name: '', price: '', category: '', subcategory: '', quantity: '', description: '', image: null });
      setEditingId(null);
      setFormVisible(false);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to submit product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      quantity: product.quantity,
      description: product.description,
      image: null
    });
    setEditingId(product._id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      toast.success('Deleted successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
  <h2 className="text-2xl font-bold">📦 Manage Products</h2>

  <div className="flex flex-col sm:flex-row gap-4">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full sm:w-auto"
    />
    <button
      onClick={() => {
        setFormVisible(!formVisible);
        setForm({ name: '', price: '', category: '', subcategory: '', quantity: '', description: '', image: null });
        setEditingId(null);
      }}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2 w-full sm:w-auto"
    >
      <FaPlus /> {formVisible ? 'Cancel' : 'Add Product'}
    </button>
  </div>
</div>


      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
          <input type="text" placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none" />
          <input type="number" placeholder="Price" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none" />
          <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none">
            <option value="">Select Category</option>
            <option value="watch">Watch</option>
            <option value="perfume">Perfume</option>
          </select>
          <select required value={form.subcategory} onChange={e => setForm({ ...form, subcategory: e.target.value })}className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none">
            <option value="">Select Subcategory</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
          <input type="text" placeholder="description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none" />
          <input type="number" placeholder="Quantity" required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none" />
          <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Subcategory</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map(p => (
              <tr key={p._id} className="border-b dark:border-gray-700">
                <td className="p-3">
                  {p.image ? (
                    <img src={`http://localhost:5000/images/${p.image}`} alt={p.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <span className="italic text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.subcategory}</td>
                <td className="p-3">PKR{p.price}</td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded border ${currentPage === num ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
