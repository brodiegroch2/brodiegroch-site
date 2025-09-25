'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DeliverableEditModal from '@/components/DeliverableEditModal';

interface Course {
  "Course ID": string;
  "Course Name": string;
  "Course Average Weighted Grade": string;
  "Credit Hours": string;
  "Course Description": string;
  "Professor/Teacher Name": string;
  "Professor/Teacher Email": string;
}

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

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = decodeURIComponent(params.id as string);
  
  const [course, setCourse] = useState<Course | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPage, setPendingPage] = useState(0);
  const [submittedPage, setSubmittedPage] = useState(0);
  const [gradedPage, setGradedPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesRes, deliverablesRes] = await Promise.all([
          fetch('/api/data/courses'),
          fetch('/api/data/deliverables')
        ]);
        
        const coursesData = await coursesRes.json();
        const deliverablesData = await deliverablesRes.json();
        
        // Find the specific course
        const foundCourse = coursesData.find((c: Course) => c["Course ID"] === courseId);
        setCourse(foundCourse || null);
        
        // Filter deliverables for this course
        const courseDeliverables = deliverablesData.filter((d: Deliverable) => d["Course ID"] === courseId);
        setDeliverables(courseDeliverables);
        
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadData();
    }
  }, [courseId]);

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

  const calculateWeightedAverage = (deliverables: Deliverable[]) => {
    let totalWeightedPoints = 0;
    let totalWeight = 0;
    let gradedCount = 0;
    
    deliverables.forEach(deliverable => {
      const weight = parseFloat(deliverable['Weight %']) || 0;
      const grade = parseFloat(deliverable['Grade %']);
      
      if (!isNaN(grade) && grade > 0) {
        totalWeightedPoints += (grade * weight);
        totalWeight += weight;
        gradedCount++;
      }
    });
    
    if (totalWeight === 0) {
      return 'No grades available';
    }
    
    const average = totalWeightedPoints / totalWeight;
    return `${Math.round(average)}%`;
  };

  const calculateCompletionPercentage = (deliverables: Deliverable[]) => {
    const totalWeight = deliverables.reduce((sum, deliverable) => {
      const weight = parseFloat(deliverable['Weight %']) || 0;
      return sum + weight;
    }, 0);
    
    const completedWeight = deliverables.reduce((sum, deliverable) => {
      const weight = parseFloat(deliverable['Weight %']) || 0;
      const isGraded = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                      deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
      const isSubmitted = deliverable['Status'] === 'submitted';
      
      if (isGraded || isSubmitted) {
        return sum + weight;
      }
      return sum;
    }, 0);
    
    return totalWeight > 0 ? ((completedWeight / totalWeight) * 100).toFixed(1) : '0';
  };

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
      prev.map(deliverable => {
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

  const getDeliverableClasses = (deliverable: Deliverable) => {
    const classes = ['deliverable-item', 'clickable-deliverable'];
    
    // Check if graded (highest priority)
    const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                    deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
    if (hasGrade) {
      classes.push('graded');
    }
    
    // Check if submitted (medium priority)
    if (deliverable['Status'] === 'submitted') {
      classes.push('submitted');
    }
    
    // Check if due within next week (lowest priority)
    const now = new Date();
    const dueDate = new Date(deliverable['Close Date']);
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue >= 0 && daysUntilDue <= 7) {
      classes.push('due-soon');
    }
    
    return classes.join(' ');
  };

  // Pagination handlers
  const handlePendingPrev = () => {
    if (pendingPage > 0) {
      setPendingPage(pendingPage - 1);
    }
  };

  const handlePendingNext = () => {
    setPendingPage(pendingPage + 1);
  };

  const handleSubmittedPrev = () => {
    if (submittedPage > 0) {
      setSubmittedPage(submittedPage - 1);
    }
  };

  const handleSubmittedNext = () => {
    setSubmittedPage(submittedPage + 1);
  };

  const handleGradedPrev = () => {
    if (gradedPage > 0) {
      setGradedPage(gradedPage - 1);
    }
  };

  const handleGradedNext = () => {
    setGradedPage(gradedPage + 1);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="back-button">
          <Link href="/courses" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '8px', verticalAlign: 'middle'}}>
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Courses
          </Link>
        </div>
        <h1 className="page-title">Course Details</h1>
        <div className="data-section">
          <div className="empty-state">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container">
        <div className="back-button">
          <Link href="/courses" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '8px', verticalAlign: 'middle'}}>
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Courses
          </Link>
        </div>
        <h1 className="page-title">Course Not Found</h1>
        <div className="data-section">
          <div className="empty-state">The requested course could not be found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="back-button">
        <Link href="/courses" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginRight: '8px', verticalAlign: 'middle'}}>
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Courses
        </Link>
      </div>
      
      <h1 className="page-title">{course["Course Name"]}</h1>
      <p className="page-subtitle">{course["Course ID"]} - Detailed Information</p>
      
      <div className="data-section">
        <h2 className="section-title">Course Information</h2>
        <div className="course-detail-card">
          <div className="course-header">
            <div className="course-id">{course["Course ID"]}</div>
            <div className="course-credits">{course["Credit Hours"]} Credits</div>
          </div>
          
          <div className="course-title">{course["Course Name"]}</div>
          
          <div className="course-description">
            <p>{course["Course Description"]}</p>
          </div>
          
          <div className="course-details">
            <div className="course-detail">
              <div className="course-detail-label">Average Grade</div>
              <div className="course-detail-value">{calculateWeightedAverage(deliverables)}</div>
            </div>
            <div className="course-detail">
              <div className="course-detail-label">Completion %</div>
              <div className="course-detail-value">{calculateCompletionPercentage(deliverables)}%</div>
            </div>
          </div>
          
          <div className="course-professor">
            <div className="professor-name">{course["Professor/Teacher Name"]}</div>
            {course["Professor/Teacher Email"] && course["Professor/Teacher Email"] !== 'Not specified' ? (
              <a href={`mailto:${course["Professor/Teacher Email"]}`} className="professor-email">
                {course["Professor/Teacher Email"]}
              </a>
            ) : (
              <div className="professor-email">No email provided</div>
            )}
          </div>
          
          {course["Course ID"] === 'MATH 238' && (
            <div className="course-actions">
              <a 
                href="https://www.pearson.com/en-ca/higher-education/products-services/mylab/login-mylab.html" 
                target="_blank" 
                className="view-details-btn"
              >
                Pearson MyLab
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="data-section">
        <h2 className="section-title">Course Deliverables</h2>
        {deliverables.length === 0 ? (
          <div className="empty-state">
            No deliverables found for this course.
          </div>
        ) : (
          (() => {
            const pendingDeliverables = deliverables.filter(d => d['Status'] === 'pending');
            const submittedDeliverables = deliverables.filter(d => d['Status'] === 'submitted');
            const gradedDeliverables = deliverables.filter(d => d['Status'] === 'graded');
            
            const columns = [];
            
            // Add pending column if it has deliverables
            if (pendingDeliverables.length > 0) {
              const sortedPending = pendingDeliverables.sort((a, b) => {
                const dateA = new Date(a['Close Date']).getTime();
                const dateB = new Date(b['Close Date']).getTime();
                // Handle invalid dates by putting them at the end
                if (isNaN(dateA) && isNaN(dateB)) return 0;
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateA - dateB;
              });
              const totalPendingPages = Math.ceil(sortedPending.length / itemsPerPage);
              const startPendingIndex = pendingPage * itemsPerPage;
              const endPendingIndex = startPendingIndex + itemsPerPage;
              const currentPendingItems = sortedPending.slice(startPendingIndex, endPendingIndex);
              
              columns.push(
                <div key="pending" className="deliverables-column">
                  <h3 className="column-title">Pending ({sortedPending.length})</h3>
                  <div className="column-content">
                    {currentPendingItems.map((deliverable, index) => (
                      <div key={index} className={getDeliverableClasses(deliverable)} onClick={() => handleDeliverableClick(deliverable)}>
                        <div className="deliverable-header">
                          <div className="deliverable-title">{deliverable['Deliverable']}</div>
                          <div className="deliverable-course">{deliverable['Course ID']}</div>
                        </div>
                        <div className="deliverable-dates">
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
                        </div>
                        <div className="deliverable-status">
                          <span className="status-label">Status:</span>
                          <span className="status-value status-${deliverable.Status || 'pending'}">{deliverable.Status || 'pending'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPendingPages > 1 && (
                    <div className="column-pagination">
                      <button className="pagination-btn" disabled={pendingPage === 0} onClick={handlePendingPrev}>Previous</button>
                      <span className="pagination-info">{pendingPage + 1} of {totalPendingPages}</span>
                      <button className="pagination-btn" disabled={pendingPage >= totalPendingPages - 1} onClick={handlePendingNext}>Next</button>
                    </div>
                  )}
                </div>
              );
            }
            
            // Add submitted column if it has deliverables
            if (submittedDeliverables.length > 0) {
              const sortedSubmitted = submittedDeliverables.sort((a, b) => {
                const dateA = new Date(a['Close Date']).getTime();
                const dateB = new Date(b['Close Date']).getTime();
                // Handle invalid dates by putting them at the end
                if (isNaN(dateA) && isNaN(dateB)) return 0;
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateA - dateB;
              });
              const totalSubmittedPages = Math.ceil(sortedSubmitted.length / itemsPerPage);
              const startSubmittedIndex = submittedPage * itemsPerPage;
              const endSubmittedIndex = startSubmittedIndex + itemsPerPage;
              const currentSubmittedItems = sortedSubmitted.slice(startSubmittedIndex, endSubmittedIndex);
              
              columns.push(
                <div key="submitted" className="deliverables-column">
                  <h3 className="column-title">Submitted ({sortedSubmitted.length})</h3>
                  <div className="column-content">
                    {currentSubmittedItems.map((deliverable, index) => (
                      <div key={index} className={getDeliverableClasses(deliverable)} onClick={() => handleDeliverableClick(deliverable)}>
                        <div className="deliverable-header">
                          <div className="deliverable-title">{deliverable['Deliverable']}</div>
                          <div className="deliverable-course">{deliverable['Course ID']}</div>
                        </div>
                        <div className="deliverable-dates">
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
                        </div>
                        <div className="deliverable-status">
                          <span className="status-label">Status:</span>
                          <span className="status-value status-${deliverable.Status || 'pending'}">{deliverable.Status || 'pending'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalSubmittedPages > 1 && (
                    <div className="column-pagination">
                      <button className="pagination-btn" disabled={submittedPage === 0} onClick={handleSubmittedPrev}>Previous</button>
                      <span className="pagination-info">{submittedPage + 1} of {totalSubmittedPages}</span>
                      <button className="pagination-btn" disabled={submittedPage >= totalSubmittedPages - 1} onClick={handleSubmittedNext}>Next</button>
                    </div>
                  )}
                </div>
              );
            }
            
            // Add graded column if it has deliverables
            if (gradedDeliverables.length > 0) {
              const sortedGraded = gradedDeliverables.sort((a, b) => {
                const dateA = new Date(a['Close Date']).getTime();
                const dateB = new Date(b['Close Date']).getTime();
                // Handle invalid dates by putting them at the end
                if (isNaN(dateA) && isNaN(dateB)) return 0;
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateB - dateA; // Latest first for graded
              });
              const totalGradedPages = Math.ceil(sortedGraded.length / itemsPerPage);
              const startGradedIndex = gradedPage * itemsPerPage;
              const endGradedIndex = startGradedIndex + itemsPerPage;
              const currentGradedItems = sortedGraded.slice(startGradedIndex, endGradedIndex);
              
              columns.push(
                <div key="graded" className="deliverables-column">
                  <h3 className="column-title">Graded ({sortedGraded.length})</h3>
                  <div className="column-content">
                    {currentGradedItems.map((deliverable, index) => (
                      <div key={index} className={getDeliverableClasses(deliverable)} onClick={() => handleDeliverableClick(deliverable)}>
                        <div className="deliverable-header">
                          <div className="deliverable-title">{deliverable['Deliverable']}</div>
                          <div className="deliverable-course">{deliverable['Course ID']}</div>
                        </div>
                        <div className="deliverable-dates">
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
                        </div>
                        <div className="deliverable-status">
                          <span className="status-label">Status:</span>
                          <span className="status-value status-${deliverable.Status || 'pending'}">{deliverable.Status || 'pending'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalGradedPages > 1 && (
                    <div className="column-pagination">
                      <button className="pagination-btn" disabled={gradedPage === 0} onClick={handleGradedPrev}>Previous</button>
                      <span className="pagination-info">{gradedPage + 1} of {totalGradedPages}</span>
                      <button className="pagination-btn" disabled={gradedPage >= totalGradedPages - 1} onClick={handleGradedNext}>Next</button>
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <div className="deliverables-columns" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                {columns}
              </div>
            );
          })()
        )}
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

