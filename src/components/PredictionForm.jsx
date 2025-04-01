import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PredictionForm = ({ onPredictionResult }) => {
  const [formData, setFormData] = useState({
    hbA1c: '',
    albumin: '',
    urineCreatinine: '',
    serumCreatinine: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/predict-kidney-health`,
        formData
      );
      setPrediction(response.data);
      onPredictionResult(response.data, formData);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score <= 33) return '#22c55e'; // green
    if (score <= 66) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getRiskLevel = (score) => {
    if (score <= 33) return 'Low';
    if (score <= 66) return 'Medium';
    return 'High';
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kidney Health Prediction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">HbA1c (%)</label>
          <input
            type="number"
            name="hbA1c"
            step="0.1"
            value={formData.hbA1c}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Albumin (mg/L)</label>
          <input
            type="number"
            name="albumin"
            value={formData.albumin}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Urine Creatinine (mg/dL)</label>
          <input
            type="number"
            name="urineCreatinine"
            value={formData.urineCreatinine}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Serum Creatinine (mg/dL)</label>
          <input
            type="number"
            name="serumCreatinine"
            step="0.1"
            value={formData.serumCreatinine}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Calculating...' : 'Calculate Risk'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-6 space-y-4">
          <div className="text-lg font-semibold">
            Risk Level: <span className="text-indigo-600">{getRiskLevel(prediction.riskScore)}</span>
          </div>
          
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${prediction.riskScore}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: getRiskColor(prediction.riskScore) }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Low Risk</span>
            <span>Medium Risk</span>
            <span>High Risk</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionForm; 