'use client'

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDeliverables();
  }, []);

  const fetchDeliverables = async () => {
    try {
      const response = await fetch('/api/data/deliverables');
      const data = await response.json();
      setDeliverables(data);
    } catch (error) {
      console.error('Error fetching deliverables:', error);
    }
  };

  const saveDeliverables = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/admin/save-deliverables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliverables),
      });

      if (response.ok) {
        setMessage('✅ Changes saved to GitHub successfully!');
        // Trigger GitHub webhook to update repository
        await fetch('/api/admin/trigger-deployment', { method: 'POST' });
      } else {
        setMessage('❌ Error saving changes');
      }
    } catch (error) {
      setMessage('❌ Error saving changes');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDeliverable = (index: number, field: string, value: string) => {
    const updated = [...deliverables];
    (updated[index] as any)[field] = value;
    setDeliverables(updated);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">📝 Deliverables Editor</h1>
        <p className="page-subtitle">Manage and edit deliverable data</p>
      </div>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('✅') ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {message}
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={saveDeliverables}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold w-full sm:w-auto"
        >
          {loading ? '💾 Saving...' : '💾 Save to GitHub'}
        </button>
      </div>

      <div className="responsive-grid">
          {deliverables.map((deliverable: any, index: number) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course ID</label>
                  <input
                    type="text"
                    value={deliverable['Course ID'] || ''}
                    onChange={(e) => updateDeliverable(index, 'Course ID', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={deliverable.Category || ''}
                    onChange={(e) => updateDeliverable(index, 'Category', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deliverable</label>
                  <input
                    type="text"
                    value={deliverable.Deliverable || ''}
                    onChange={(e) => updateDeliverable(index, 'Deliverable', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Open Date</label>
                  <input
                    type="text"
                    value={deliverable['Open Date'] || ''}
                    onChange={(e) => updateDeliverable(index, 'Open Date', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Close Date</label>
                  <input
                    type="text"
                    value={deliverable['Close Date'] || ''}
                    onChange={(e) => updateDeliverable(index, 'Close Date', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight %</label>
                  <input
                    type="text"
                    value={deliverable['Weight %'] || ''}
                    onChange={(e) => updateDeliverable(index, 'Weight %', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
