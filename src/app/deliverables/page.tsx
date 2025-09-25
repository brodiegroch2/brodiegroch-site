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
  "Status"?: string;
}

export default function DeliverablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded' | 'submitted'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'course' | 'weight'>('dueDate');

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

  // Filter deliverables based on selected filter
  const filteredDeliverables = deliverables.filter(deliverable => {
    const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                    deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
    const isSubmitted = deliverable['Status'] === 'submitted';
    
    switch (filter) {
      case 'pending':
        return !hasGrade && !isSubmitted;
      case 'graded':
        return hasGrade;
      case 'submitted':
        return isSubmitted && !hasGrade;
      default:
        return true;
    }
  });

  // Sort deliverables based on selected sort option
  const sortedDeliverables = filteredDeliverables.sort((a, b) => {
    switch (sortBy) {
      case 'course':
        return (a['Course ID'] || '').localeCompare(b['Course ID'] || '');
      case 'weight':
        const weightA = parseFloat(a['Weight %']) || 0;
        const weightB = parseFloat(b['Weight %']) || 0;
        return weightB - weightA; // Descending order
      case 'dueDate':
      default:
        const dateA = a['Close Date'] || '';
        const dateB = b['Close Date'] || '';
        
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        
        return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
  });

  // Calculate statistics
  const stats = {
    total: deliverables.length,
    pending: deliverables.filter(d => {
      const hasGrade = d['Grade %'] && d['Grade %'] !== '' && 
                      d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded';
      const isSubmitted = d['Status'] === 'submitted';
      return !hasGrade && !isSubmitted;
    }).length,
    graded: deliverables.filter(d => {
      const hasGrade = d['Grade %'] && d['Grade %'] !== '' && 
                      d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded';
      return hasGrade;
    }).length,
    submitted: deliverables.filter(d => d['Status'] === 'submitted').length
  };

  const getStatusBadge = (deliverable: Deliverable) => {
    const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                    deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
    const isSubmitted = deliverable['Status'] === 'submitted';
    
    if (hasGrade) {
      return <span className="status-badge graded">Graded</span>;
    } else if (isSubmitted) {
      return <span className="status-badge submitted">Submitted</span>;
    } else {
      return <span className="status-badge pending">Pending</span>;
    }
  };

  const getUrgencyClass = (dueDate: string) => {
    if (!dueDate) return '';
    
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 3) return 'urgent';
    if (daysUntilDue <= 7) return 'soon';
    return '';
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
      
      {/* Statistics Overview */}
      <div className="stats-overview">
        <div className="stat-item">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-item submitted">
          <div className="stat-number">{stats.submitted}</div>
          <div className="stat-label">Submitted</div>
        </div>
        <div className="stat-item graded">
          <div className="stat-number">{stats.graded}</div>
          <div className="stat-label">Graded</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="controls-section">
        <div className="filter-group">
          <label className="filter-label">Filter by status:</label>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({stats.pending})
            </button>
            <button 
              className={`filter-btn ${filter === 'submitted' ? 'active' : ''}`}
              onClick={() => setFilter('submitted')}
            >
              Submitted ({stats.submitted})
            </button>
            <button 
              className={`filter-btn ${filter === 'graded' ? 'active' : ''}`}
              onClick={() => setFilter('graded')}
            >
              Graded ({stats.graded})
            </button>
          </div>
        </div>
        
        <div className="sort-group">
          <label className="sort-label">Sort by:</label>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'course' | 'weight')}
          >
            <option value="dueDate">Due Date</option>
            <option value="course">Course</option>
            <option value="weight">Weight</option>
          </select>
        </div>
      </div>
      
      <div className="data-section">
        <h2 className="section-title">
          {filter === 'all' ? 'All Deliverables' : 
           filter === 'pending' ? 'Pending Deliverables' :
           filter === 'submitted' ? 'Submitted Deliverables' :
           'Graded Deliverables'} 
          ({sortedDeliverables.length})
        </h2>
        
        <div className="deliverables-grid">
          {sortedDeliverables.length === 0 ? (
            <div className="empty-state">
              No deliverables match your current filter. Try adjusting your filter settings.
            </div>
          ) : (
            sortedDeliverables.map((deliverable, index) => {
              const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                              deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
              const isSubmitted = deliverable['Status'] === 'submitted';
              const urgencyClass = getUrgencyClass(deliverable['Close Date']);
              
              let cardClass = 'deliverable-card';
              if (hasGrade) {
                cardClass += ' graded';
              } else if (isSubmitted) {
                cardClass += ' submitted';
              }
              if (urgencyClass) {
                cardClass += ` ${urgencyClass}`;
              }
              
              return (
                <div key={index} className={cardClass}>
                  <div className="deliverable-header">
                    <div className="deliverable-badges">
                      <span className="category-badge">{deliverable['Category'] || 'Assignment'}</span>
                      {getStatusBadge(deliverable)}
                    </div>
                    <div className="weight-badge">{deliverable['Weight %'] || '0'}%</div>
                  </div>
                  
                  <div className="deliverable-content">
                    <h3 className="deliverable-title">{deliverable['Deliverable'] || 'Untitled Deliverable'}</h3>
                    <div className="deliverable-course">{deliverable['Course ID'] || 'Unknown Course'}</div>
                    
                    <div className="deliverable-dates">
                      <div className="date-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span className="date-label">Opens:</span>
                        <span className="date-value">{deliverable['Open Date'] || 'Not specified'}</span>
                      </div>
                      <div className="date-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                          <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span className="date-label">Due:</span>
                        <span className="date-value">{deliverable['Close Date'] || 'Not specified'}</span>
                      </div>
                    </div>
                    
                    {(hasGrade || deliverable['Letter Grade']) && (
                      <div className="deliverable-grades">
                        <div className="grade-display">
                          <span className="grade-label">Grade:</span>
                          <span className="grade-value">{deliverable['Grade %'] || 'Not graded'}</span>
                        </div>
                        {deliverable['Letter Grade'] && (
                          <div className="grade-display">
                            <span className="grade-label">Letter:</span>
                            <span className="grade-value">{deliverable['Letter Grade']}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
