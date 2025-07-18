import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/services');
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = { name, price, duration, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/services/${editingId}`, payload, config);
      } else {
        await axios.post('http://localhost:5000/api/services', payload, config);
      }

      setName('');
      setPrice('');
      setDuration('');
      setDescription('');
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Error saving service', err);
    }
  };

  const handleEdit = (service) => {
    setName(service.name);
    setPrice(service.price);
    setDuration(service.duration);
    setDescription(service.description);
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchServices();
    } catch (err) {
      console.error('Error deleting service', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🛠️ Manage Services</h2>

      <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Duration (e.g., 30)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded col-span-1 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-1 md:col-span-2"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <ul className="space-y-4">
        {services.map((s) => (
          <li key={s._id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600">Rs.{s.price} | Duration: {s.duration} mins</p>
            <p className="mt-2">{s.description}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServices;
