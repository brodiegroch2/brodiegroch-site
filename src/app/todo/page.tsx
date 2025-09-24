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

export default function TodoPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Filter for deliverables without due dates and sort them
  const undatedDeliverables = deliverables
    .filter(deliverable => 
      !deliverable["Close Date"] || deliverable["Close Date"] === "" || deliverable["Close Date"] === "Not specified"
    )
    .sort((a, b) => {
      const courseA = a['Course ID'] || '';
      const courseB = b['Course ID'] || '';
      if (courseA !== courseB) {
        return courseA.localeCompare(courseB);
      }
      const deliverableA = a['Deliverable'] || '';
      const deliverableB = b['Deliverable'] || '';
      return deliverableA.localeCompare(deliverableB);
    });

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">To Do</h1>
        <p className="page-subtitle">Deliverables without due dates that need attention</p>
        <div className="data-section">
          <div className="empty-state">Loading undated deliverables...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">To Do</h1>
      <p className="page-subtitle">Deliverables without due dates that need attention</p>
      
      <div className="data-section">
        <h2 className="section-title">Undated Deliverables</h2>
        <div className="deliverables-grid">
          {undatedDeliverables.length === 0 ? (
            <div className="empty-state">
              No undated deliverables found. All assignments have due dates.
            </div>
          ) : (
            undatedDeliverables.map((deliverable, index) => (
              <div key={index} className="deliverable-card todo-item">
                <div className="deliverable-header">
                  <h3 className="deliverable-name">{deliverable["Deliverable"]}</h3>
                  <div className="deliverable-course">{deliverable["Course ID"]}</div>
                </div>
                
                <div className="deliverable-category">
                  <span className="category-badge">{deliverable["Category"]}</span>
                </div>
                
                <div className="deliverable-weight">
                  <strong>Weight:</strong> {deliverable["Weight %"]}%
                </div>
                
                <div className="todo-status">
                  <div className="status-icon">⚠️</div>
                  <div className="status-text">No Due Date Set</div>
                </div>
                
                <div className="todo-action">
                  <button className="action-btn">
                    Set Due Date
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
