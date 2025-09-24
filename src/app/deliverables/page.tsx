'use client'

import { useState, useEffect } from 'react';

interface Deliverable {
  "Course ID": string;
  "Category": string;
  "Deliverable": string;
  "Open Date": string;
  "Close Date": string;
  "Weight %": string;
  "Grade %": string;
  "Letter Grade": string;
}

export default function DeliverablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadDeliverables = async () => {
      try {
        const response = await fetch('/api/data/deliverables');
        const data = await response.json();
        setDeliverables(data);
      } catch (error) {
        console.error('Error loading deliverables:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeliverables();
  }, []);

  const filteredDeliverables = filter === 'all' 
    ? deliverables 
    : deliverables.filter(d => d["Category"] === filter);

  const categories = [...new Set(deliverables.map(d => d["Category"]))];

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (closeDate: string, grade: string) => {
    if (grade && grade !== '') return 'completed';
    
    const now = new Date();
    const due = new Date(closeDate);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 3) return 'urgent';
    if (diffDays <= 7) return 'warning';
    return 'normal';
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Deliverables</h1>
        <p className="page-subtitle">Track assignments, projects, and course deliverables</p>
        <div className="data-section">
          <div className="empty-state">Loading deliverables...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Deliverables</h1>
      <p className="page-subtitle">Track assignments, projects, and course deliverables</p>
      
      <div className="data-section">
        <h2 className="section-title">Assignment Information</h2>
        
        {/* Filter Buttons */}
        <div className="deliverables-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="deliverables-grid">
          {filteredDeliverables.length === 0 ? (
            <div className="empty-state">
              No deliverables data available. Load data from Deliverables.json to display assignment information.
            </div>
          ) : (
            filteredDeliverables.map((deliverable, index) => (
              <div key={index} className={`deliverable-card ${getStatusColor(deliverable["Close Date"], deliverable["Grade %"])}`}>
                <div className="deliverable-header">
                  <h3 className="deliverable-name">{deliverable["Deliverable"]}</h3>
                  <div className="deliverable-course">{deliverable["Course ID"]}</div>
                </div>
                
                <div className="deliverable-category">
                  <span className="category-badge">{deliverable["Category"]}</span>
                </div>
                
                <div className="deliverable-dates">
                  <div className="date-item">
                    <strong>Open Date:</strong> {formatDate(deliverable["Open Date"])}
                  </div>
                  <div className="date-item">
                    <strong>Due Date:</strong> {formatDate(deliverable["Close Date"])}
                  </div>
                </div>
                
                <div className="deliverable-weight">
                  <strong>Weight:</strong> {deliverable["Weight %"]}%
                </div>
                
                {deliverable["Grade %"] && deliverable["Grade %"] !== '' ? (
                  <div className="deliverable-grade">
                    <div className="grade-percentage">{deliverable["Grade %"]}%</div>
                    <div className="grade-letter">{deliverable["Letter Grade"]}</div>
                  </div>
                ) : (
                  <div className="deliverable-status">
                    <span className="status-text">Not Graded</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
