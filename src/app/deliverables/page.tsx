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
  "GPA": string;
  "Status": string;
}

export default function DeliverablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [filteredDeliverables, setFilteredDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadDeliverables = async () => {
      try {
        const response = await fetch('/api/data/deliverables');
        const data = await response.json();
        setDeliverables(data);
        setFilteredDeliverables(data);
      } catch (error) {
        console.error('Error loading deliverables:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeliverables();
  }, []);

  // Filter deliverables based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredDeliverables(deliverables);
    } else {
      const filtered = deliverables.filter(deliverable => 
        deliverable.Status === statusFilter
      );
      setFilteredDeliverables(filtered);
    }
  }, [deliverables, statusFilter]);

  // Sort deliverables: ungraded by due date first, then graded at bottom
  const sortedDeliverables = filteredDeliverables.sort((a, b) => {
    const hasGradeA = a['Grade %'] && a['Grade %'] !== '' && a['Grade %'] !== 'Not specified' && a['Grade %'] !== 'Not graded';
    const hasGradeB = b['Grade %'] && b['Grade %'] !== '' && b['Grade %'] !== 'Not specified' && b['Grade %'] !== 'Not graded';
    
    // If one is graded and one isn't, put graded at bottom
    if (hasGradeA && !hasGradeB) return 1;
    if (!hasGradeA && hasGradeB) return -1;
    
    // If both are graded or both are ungraded, sort by due date
    const dateA = a['Close Date'] || '';
    const dateB = b['Close Date'] || '';
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  const handleDeliverableClick = (deliverable: Deliverable) => {
    setSelectedDeliverable(deliverable);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDeliverable(null);
  };

  const handleDeliverableUpdate = (updatedDeliverable: Deliverable) => {
    setDeliverables(prev => 
      prev.map(deliverable => 
        deliverable['Course ID'] === updatedDeliverable['Course ID'] &&
        deliverable['Deliverable'] === updatedDeliverable['Deliverable'] &&
        deliverable['Close Date'] === updatedDeliverable['Close Date']
          ? updatedDeliverable
          : deliverable
      )
    );
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
      
      {/* Filter Controls */}
      <div className="filter-section">
        <div className="filter-controls">
          <label htmlFor="status-filter" className="filter-label">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Deliverables</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
          </select>
          <div className="filter-count">
            Showing {sortedDeliverables.length} of {deliverables.length} deliverables
          </div>
        </div>
      </div>
      
      <div className="data-section">
        <h2 className="section-title">Assignment Information</h2>
        
        <div id="deliverables-container" className="deliverables-grid">
          {sortedDeliverables.length === 0 ? (
            <div className="empty-state">
              No deliverables data available. Load data from Deliverables.json to display assignment information.
            </div>
          ) : (
            sortedDeliverables.map((deliverable, index) => {
              const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
              const isSubmitted = deliverable['Status'] === 'submitted';
              let cardClass = 'deliverable-card';
              if (hasGrade) {
                cardClass += ' graded';
              } else if (isSubmitted) {
                cardClass += ' submitted';
              }
              
              return (
                <div 
                  key={index} 
                  className={`${cardClass} clickable-deliverable`}
                  onClick={() => handleDeliverableClick(deliverable)}
                  style={{ cursor: 'pointer' }}
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
                      <span className="date-value">{deliverable['Close Date'] || 'Not specified'}</span>
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
                    <div className="grade-item">
                      <span className="grade-label">GPA:</span>
                      <span className="grade-value">{deliverable.GPA || 'Not graded'}</span>
                    </div>
                  </div>
                  
                  <div className="deliverable-status">
                    <span className="status-label">Status:</span>
                    <span className={`status-value status-${deliverable.Status || 'pending'}`}>
                      {deliverable.Status || 'pending'}
                    </span>
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
