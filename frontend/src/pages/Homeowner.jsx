import React, { useState, useEffect } from 'react';
import { createHomeowner, createProperty, createTaxRecord, getProperties } from '../services/api';

function Homeowner() {
  const [homeownerData, setHomeownerData] = useState({
    fullName: '',
    phone: '',
    address: '',
    age: '',
  });

  const [propertyData, setPropertyData] = useState({
    address: '',
    type: 'House',
    size: '',
    value: '',
    yearBuilt: '',
    description: '',
  });

  const [taxData, setTaxData] = useState({
    propertyId: '',
    year: '',
    amount: '',
    transactionDetails: '',
  });

  const [properties, setProperties] = useState([]); // State to store properties
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperties();
        setProperties(response.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleHomeownerSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHomeowner(homeownerData);
      setMessage('Homeowner data saved successfully!');
    } catch (error) {
      setMessage('Failed to save homeowner data.');
    }
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    try {
      await createProperty(propertyData);
      setMessage('Property data saved successfully!');
    } catch (error) {
      setMessage('Failed to save property data.');
    }
  };

  const handleTaxSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTaxRecord(taxData);
      setMessage('Tax record saved successfully!');
    } catch (error) {
      setMessage('Failed to save tax record.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Homeowner Dashboard</h1>

      <form onSubmit={handleHomeownerSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Homeowner Information</h2>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="input"
            value={homeownerData.fullName}
            onChange={(e) => setHomeownerData({ ...homeownerData, fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="input"
            value={homeownerData.phone}
            onChange={(e) => setHomeownerData({ ...homeownerData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="input"
            value={homeownerData.address}
            onChange={(e) => setHomeownerData({ ...homeownerData, address: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="input"
            value={homeownerData.age}
            onChange={(e) => setHomeownerData({ ...homeownerData, age: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Save Homeowner
        </button>
      </form>

      <form onSubmit={handlePropertySubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Property</h2>
        <div>
          <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="propertyAddress"
            className="input"
            value={propertyData.address}
            onChange={(e) => setPropertyData({ ...propertyData, address: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="propertyType"
            className="input"
            value={propertyData.type}
            onChange={(e) => setPropertyData({ ...propertyData, type: e.target.value })}
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div>
          <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700">
            Size (sqft)
          </label>
          <input
            type="number"
            id="propertySize"
            className="input"
            value={propertyData.size}
            onChange={(e) => setPropertyData({ ...propertyData, size: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="propertyValue" className="block text-sm font-medium text-gray-700">
            Value
          </label>
          <input
            type="number"
            id="propertyValue"
            className="input"
            value={propertyData.value}
            onChange={(e) => setPropertyData({ ...propertyData, value: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700">
            Year Built
          </label>
          <input
            type="number"
            id="yearBuilt"
            className="input"
            value={propertyData.yearBuilt}
            onChange={(e) => setPropertyData({ ...propertyData, yearBuilt: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="input"
            value={propertyData.description}
            onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Save Property
        </button>
      </form>

      <form onSubmit={handleTaxSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold mb-4">Add Tax Record</h2>
        <div>
          <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
            Property ID
          </label>
          <select
            id="propertyId"
            className="input"
            value={taxData.propertyId}
            onChange={(e) => setTaxData({ ...taxData, propertyId: e.target.value })}
            required
          >
            <option value="">Select a property</option>
            {properties.map((property) => (
              <option key={property._id} value={property._id}>
                {property.address}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="taxYear" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            id="taxYear"
            className="input"
            value={taxData.year}
            onChange={(e) => setTaxData({ ...taxData, year: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="taxAmount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="taxAmount"
            className="input"
            value={taxData.amount}
            onChange={(e) => setTaxData({ ...taxData, amount: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="transactionDetails" className="block text-sm font-medium text-gray-700">
            Transaction Details
          </label>
          <textarea
            id="transactionDetails"
            className="input"
            value={taxData.transactionDetails}
            onChange={(e) => setTaxData({ ...taxData, transactionDetails: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Save Tax Record
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default Homeowner;
