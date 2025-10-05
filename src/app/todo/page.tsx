'use client'

import { useState, useEffect } from 'react';
import DeliverableEditModal from '@/components/DeliverableEditModal';

interface Deliverable {
  "Course ID": string;
  "Category": string;
  "Deliverable": string;
  "Open Date": string;
  "Close Date": string;
  "Weight %": string;
  "Grade %": string;
  "Letter Grade": string;
  "Status": string;
}

export default function TodoPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDeliverableClick = (deliverable: Deliverable) => {
    setSelectedDeliverable(deliverable);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDeliverable(null);
  };

  const handleDeliverableUpdate = (updatedDeliverable: Deliverable) => {
    setDeliverables(prevDeliverables => 
      prevDeliverables.map(deliverable => {
        // Try multiple matching strategies
        const courseMatch = deliverable['Course ID'] === updatedDeliverable['Course ID'];
        const deliverableMatch = deliverable['Deliverable'] === updatedDeliverable['Deliverable'];
        const openDateMatch = deliverable['Open Date'] === updatedDeliverable['Open Date'];
        
        // Primary match: Course ID + Deliverable + Open Date
        const primaryMatch = courseMatch && deliverableMatch && openDateMatch;
        
        // Fallback match: Course ID + Deliverable (in case Open Date changed)
        const fallbackMatch = courseMatch && deliverableMatch;
        
        return (primaryMatch || fallbackMatch) ? updatedDeliverable : deliverable;
      })
    );
  };

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
      <div className="page-header">
        <h1 className="page-title">To Do</h1>
        <p className="page-subtitle">Deliverables without due dates that need attention</p>
      </div>
      
      <div className="data-section">
        <h2 className="section-title">Undated Deliverables</h2>
        <div className="deliverables-grid responsive-grid">
          {undatedDeliverables.length === 0 ? (
            <div className="empty-state">
              All deliverables have due dates! Great job staying organized.
            </div>
          ) : (
            undatedDeliverables.map((deliverable, index) => {
              const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && deliverable['Grade %'] !== 'Not graded';
              const cardClass = hasGrade ? 'deliverable-card graded' : 'deliverable-card todo-card';
              
              return (
                <div 
                  key={index} 
                  className={`${cardClass} clickable-deliverable`}
                  onClick={() => handleDeliverableClick(deliverable)}
                >
                  <div className="deliverable-header">
                    <div className="deliverable-category">{deliverable['Category'] || 'Assignment'}</div>
                    <div className="deliverable-weight">{deliverable['Weight %'] || '0'}%</div>
                  </div>
                  
                  <div className="deliverable-title">{deliverable['Deliverable'] || 'Untitled Deliverable'}</div>
                  <div className="deliverable-course">{deliverable['Course ID'] || 'Unknown Course'}</div>
                  
                  <div className="deliverable-dates">
                    <div className="date-item">
                      <span className="date-label">Opens:</span>
                      <span className="date-value">{deliverable['Open Date'] || 'Not specified'}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Due:</span>
                      <span className="date-value todo-highlight">No due date set</span>
                    </div>
                  </div>
                  
                  <div className="deliverable-grades">
                    <div className="grade-item">
                      <span className="grade-label">Grade:</span>
                      <span className="grade-value">{deliverable['Grade %'] || 'Not graded'}</span>
                    </div>
                    <div className="grade-item">
                      <span className="grade-label">Letter:</span>
                      <span className="grade-value">{deliverable['Letter Grade'] || 'Not graded'}</span>
                    </div>
                  </div>
                  
                  <div className="todo-note">
                    <span className="todo-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="todo-text">Needs due date</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <DeliverableEditModal
        deliverable={selectedDeliverable}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleDeliverableUpdate}
      />
    </div>
  );
}
