'use client'

import { useState, useEffect } from 'react';

interface Item {
  id: string;
  type: string;
  data: any;
  updated_at: string;
}

export default function GptDbViewer() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/gpt/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await fetch(`/api/gpt/items?id=${id}`, { method: 'DELETE' });
      fetchItems();
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatJSON = (data: any) => {
    return JSON.stringify(data, null, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      task: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      note: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      event: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      metric: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    };
    return colors[type] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              GPT Database Viewer
            </h1>
            <button
              onClick={fetchItems}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="mb-4 text-gray-600 dark:text-gray-300">
            Total items: {items.length}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Item List */}
            <div className="space-y-4">
              {Object.entries(groupedItems).map(([type, typeItems]) => (
                <div key={type} className="card">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold capitalize flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(type)}`}>
                        {type}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({typeItems.length})
                      </span>
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {typeItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedItem?.id === item.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(item.updated_at)}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem(item.id);
                            }}
                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="text-sm font-medium truncate">
                          {item.data.title || item.data.name || item.data.content?.substring(0, 50) || item.id}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          ID: {item.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Item Detail */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Details</h2>
                {selectedItem && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedItem.type)}`}>
                    {selectedItem.type}
                  </span>
                )}
              </div>
              {selectedItem ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ID
                    </label>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      {selectedItem.id}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Updated At
                    </label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(selectedItem.updated_at)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data
                    </label>
                    <pre className="text-xs bg-gray-50 dark:bg-gray-800 p-4 rounded overflow-x-auto max-h-96 overflow-y-auto">
                      {formatJSON(selectedItem.data)}
                    </pre>
                  </div>
                  <button
                    onClick={() => deleteItem(selectedItem.id)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Item
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  Select an item to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

