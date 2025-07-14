import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

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
      if (editingId) {
        // Update
        await axios.put(
          `http://localhost:5000/api/services/${editingId}`,
          { name, price, duration, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create
        await axios.post(
          'http://localhost:5000/api/services',
          { name, price, duration, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
    <div>
      <h2>🛠️ Manage Services</h2>

      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
          <input
        type="text"
        placeholder="Duration (e.g., 30 mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
    />
    <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
    ></textarea>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {services.map((s) => (
          <li key={s._id}>
            <strong>{s.name}</strong> - Rs.{s.price}
            <p>Duration: {s.duration} minutes</p>
            <p>{s.description}</p>
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServices;
