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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (deliverable) {
      setGrade(deliverable['Grade %'] || '');
      setLetterGrade(deliverable['Letter Grade'] || '');
      setStatus(deliverable.Status || 'pending');
    }
  }, [deliverable]);

  const handleGradeChange = (newGrade: string) => {
    setGrade(newGrade);
    
    // Auto-set status based on grade
    if (newGrade && newGrade !== '' && newGrade !== 'Not specified' && newGrade !== 'Not graded') {
      setStatus('graded');
    } else {
      setStatus('pending');
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    
    // If status is changed to pending and there's a grade, clear the grade
    if (newStatus === 'pending' && grade) {
      setGrade('');
      setLetterGrade('');
    }
  };

  const handleSave = async () => {
    if (!deliverable) return;

    setIsLoading(true);
    
    try {
      const updatedDeliverable: Deliverable = {
        ...deliverable,
        'Grade %': grade,
        'Letter Grade': letterGrade,
        'Status': status
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
            <label className="form-label">Due Date</label>
            <div className="form-value">{deliverable['Close Date']}</div>
          </div>

          <div className="form-group">
            <label className="form-label">Weight</label>
            <div className="form-value">{deliverable['Weight %']}%</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="grade">Grade %</label>
            <input
              id="grade"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={grade}
              onChange={(e) => handleGradeChange(e.target.value)}
              className="form-input"
              placeholder="Enter grade percentage"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="letterGrade">Letter Grade</label>
            <input
              id="letterGrade"
              type="text"
              value={letterGrade}
              onChange={(e) => setLetterGrade(e.target.value)}
              className="form-input"
              placeholder="Enter letter grade (e.g., A+, B-)"
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
