'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  "Status"?: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = decodeURIComponent(params.id as string);
  
  const [course, setCourse] = useState<Course | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);

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
    return `${average.toFixed(1)}%`;
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
        <div className="deliverables-list">
          {deliverables.length === 0 ? (
            <div className="empty-state">
              No deliverables found for this course.
            </div>
          ) : (
            deliverables
              .sort((a, b) => {
                // Sort by due date, with empty dates at the end
                const dateA = a['Close Date'] || '';
                const dateB = b['Close Date'] || '';
                
                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;
                
                return new Date(dateA).getTime() - new Date(dateB).getTime();
              })
              .map((deliverable, index) => {
                const hasGrade = deliverable['Grade %'] && deliverable['Grade %'] !== '' && deliverable['Grade %'] !== 'Not graded';
                const itemClass = hasGrade ? 'deliverable-item graded' : 'deliverable-item';

                return (
                  <div key={index} className={itemClass}>
                    <div className="deliverable-header">
                      <div className="deliverable-category">{deliverable["Category"] || 'Assignment'}</div>
                      <div className="deliverable-weight">{deliverable["Weight %"] || '0'}%</div>
                    </div>
                    
                    <div className="deliverable-title">{deliverable["Deliverable"] || 'Untitled Deliverable'}</div>
                    
                    <div className="deliverable-dates">
                      <div className="date-item">
                        <span className="date-label">Opens:</span>
                        <span className="date-value">{deliverable["Open Date"] || 'Not specified'}</span>
                      </div>
                      <div className="date-item">
                        <span className="date-label">Due:</span>
                        <span className="date-value">{deliverable["Close Date"] || 'Not specified'}</span>
                      </div>
                    </div>
                    
                    <div className="deliverable-grade">
                      <span className="grade-label">Grade:</span>
                      <span className="grade-value">{deliverable["Grade %"] || 'Not graded'}</span>
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

