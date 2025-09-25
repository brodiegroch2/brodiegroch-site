'use client'

import { useState, useEffect } from 'react';
import { calculateGradeAndGPA, isValidGrade, formatGradeInput } from '@/utils/gradeCalculator';

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

interface DeliverableEditModalProps {
  deliverable: Deliverable | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedDeliverable: Deliverable) => void;
}

export default function DeliverableEditModal({ 
  deliverable, 
  isOpen, 
  onClose, 
  onSave 
}: DeliverableEditModalProps) {
  const [grade, setGrade] = useState('');
  const [letterGrade, setLetterGrade] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (deliverable) {
      setGrade(deliverable['Grade %'] || '');
      setLetterGrade(deliverable['Letter Grade'] || '');
      setStatus(deliverable.Status || 'pending');
      
      // Parse the due date and convert to YYYY-MM-DD format for the date input
      const closeDate = deliverable['Close Date'];
      if (closeDate) {
        try {
          const date = new Date(closeDate);
          if (!isNaN(date.getTime())) {
            setDueDate(date.toISOString().split('T')[0]);
          } else {
            setDueDate('');
          }
        } catch (error) {
          setDueDate('');
        }
      } else {
        setDueDate('');
      }
    }
  }, [deliverable]);

  const handleGradeChange = (newGrade: string) => {
    setGrade(newGrade);
    
    // Auto-calculate letter grade
    if (newGrade && isValidGrade(newGrade)) {
      const { letterGrade: calculatedLetterGrade } = calculateGradeAndGPA(newGrade);
      setLetterGrade(calculatedLetterGrade);
      setStatus('graded');
    } else {
      setLetterGrade('');
      // Only change status to pending if grade is completely empty
      if (!newGrade || newGrade.trim() === '') {
        setStatus('pending');
      }
    }
  };

  const handleClearGrade = () => {
    setGrade('');
    setLetterGrade('');
    setStatus('pending');
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    
    // If status is changed to pending and there's a grade, clear the grade
    if (newStatus === 'pending' && grade) {
      handleClearGrade();
    }
  };

  const handleDateChange = (newDate: string) => {
    setDueDate(newDate);
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleSave = async () => {
    if (!deliverable) return;

    setIsLoading(true);
    
    try {
      // Format the new due date
      let formattedDueDate = deliverable['Close Date'];
      if (dueDate) {
        try {
          const date = new Date(dueDate);
          if (!isNaN(date.getTime())) {
            // Keep the original time if it exists, otherwise use 11:59 PM
            const originalDate = new Date(deliverable['Close Date']);
            const hasTime = !isNaN(originalDate.getTime()) && 
                           (originalDate.getHours() !== 0 || originalDate.getMinutes() !== 0);
            
            if (hasTime) {
              // Preserve original time
              date.setHours(originalDate.getHours());
              date.setMinutes(originalDate.getMinutes());
            } else {
              // Default to 11:59 PM
              date.setHours(23);
              date.setMinutes(59);
            }
            
            formattedDueDate = date.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });
          }
        } catch (error) {
          // Keep original date if formatting fails
          formattedDueDate = deliverable['Close Date'];
        }
      }

      const updatedDeliverable: Deliverable = {
        ...deliverable,
        'Grade %': grade,
        'Letter Grade': letterGrade,
        'Status': status,
        'Close Date': formattedDueDate
      };

      // Call the API to update the deliverable
      const response = await fetch('/api/data/deliverables', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDeliverable),
      });

      if (response.ok) {
        onSave(updatedDeliverable);
        onClose();
      } else {
        console.error('Failed to update deliverable');
        alert('Failed to update deliverable. Please try again.');
      }
    } catch (error) {
      console.error('Error updating deliverable:', error);
      alert('Error updating deliverable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setGrade('');
    setLetterGrade('');
    setStatus('pending');
    setDueDate('');
    onClose();
  };

  if (!isOpen || !deliverable) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Deliverable</h2>
          <button className="modal-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Deliverable</label>
            <div className="form-value">{deliverable['Deliverable']}</div>
          </div>

          <div className="form-group">
            <label className="form-label">Course</label>
            <div className="form-value">{deliverable['Course ID']}</div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <div className="form-value">{deliverable['Category']}</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="dueDate">Due Date</label>
            <div className="date-input-container">
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="form-input date-input"
              />
              <button
                type="button"
                className="calendar-btn"
                onClick={() => document.getElementById('dueDate')?.focus()}
                title="Open calendar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            {dueDate && (
              <div className="date-preview">
                New due date: {formatDateForDisplay(dueDate)}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Weight</label>
            <div className="form-value">{deliverable['Weight %']}%</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="grade">Grade</label>
            <div className="grade-input-container">
              <input
                id="grade"
                type="text"
                value={grade}
                onChange={(e) => handleGradeChange(e.target.value)}
                className="form-input"
                placeholder="Enter grade (e.g., 87, 87%, 87/100, 15/20)"
              />
              {grade && (
                <button
                  type="button"
                  onClick={handleClearGrade}
                  className="clear-grade-btn"
                  title="Clear grade"
                >
                  ×
                </button>
              )}
            </div>
            {grade && isValidGrade(grade) && (
              <div className="grade-preview">
                Calculated: {formatGradeInput(grade)}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="letterGrade">Letter Grade</label>
            <input
              id="letterGrade"
              type="text"
              value={letterGrade}
              onChange={(e) => setLetterGrade(e.target.value)}
              className="form-input"
              placeholder="Auto-calculated from percentage"
              readOnly
            />
          </div>


          <div className="form-group">
            <label className="form-label" htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-secondary" 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
