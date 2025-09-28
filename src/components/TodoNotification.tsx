'use client'

import Link from 'next/link';
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

export default function TodoNotification() {
  const [hasPendingDeliverables, setHasPendingDeliverables] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPendingDeliverables = async () => {
      try {
        const response = await fetch('/api/data/deliverables');
        const deliverables: Deliverable[] = await response.json();
        
        // Check if there are any deliverables that are:
        // 1. Not graded
        // 2. Not submitted
        // 3. Not past due
        const now = new Date();
        const pendingDeliverables = deliverables.filter(deliverable => {
          const closeDate = new Date(deliverable["Close Date"]);
          const isNotPastDue = closeDate > now;
          
          const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                          deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
          
          const isSubmitted = deliverable['Status'] === 'submitted';
          
          return isNotPastDue && !hasGrade && !isSubmitted;
        });
        
        setHasPendingDeliverables(pendingDeliverables.length > 0);
      } catch (error) {
        console.error('Error checking pending deliverables:', error);
        setHasPendingDeliverables(false);
      } finally {
        setLoading(false);
      }
    };

    checkPendingDeliverables();
    
    // Listen for deliverable updates
    const handleDeliverableUpdate = () => {
      console.log('TodoNotification: Refreshing due to deliverable update');
      checkPendingDeliverables();
    };
    
    // Add event listener for deliverable updates
    window.addEventListener('deliverableUpdated', handleDeliverableUpdate);
    
    // Check every 30 seconds for updates
    const interval = setInterval(checkPendingDeliverables, 30000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('deliverableUpdated', handleDeliverableUpdate);
    };
  }, []);

  if (loading || !hasPendingDeliverables) {
    return null;
  }

  return (
    <Link href="/todo" className="todo-notification">
      <div className="notification-circle">
        <svg className="notification-icon" viewBox="0 0 24 24" fill="none">
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}
