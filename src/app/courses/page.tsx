'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
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
        
        setCourses(coursesData);
        setDeliverables(deliverablesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const calculateWeightedAverage = (courseDeliverables: Deliverable[]) => {
    let totalWeightedPoints = 0;
    let totalWeight = 0;
    
    courseDeliverables.forEach(deliverable => {
      const weight = parseFloat(deliverable['Weight %']) || 0;
      const grade = parseFloat(deliverable['Grade %']);
      
      if (!isNaN(grade) && grade > 0) {
        totalWeightedPoints += (grade * weight);
        totalWeight += weight;
      }
    });
    
    if (totalWeight === 0) {
      return 'No grades available';
    }
    
    const average = totalWeightedPoints / totalWeight;
    return `${average.toFixed(1)}%`;
  };

  const calculateCompletionPercentage = (courseDeliverables: Deliverable[]) => {
    const totalWeight = courseDeliverables.reduce((sum, deliverable) => {
      const weight = parseFloat(deliverable['Weight %']) || 0;
      return sum + weight;
    }, 0);
    
    const completedWeight = courseDeliverables.reduce((sum, deliverable) => {
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

  const getCardClass = (completionPercentage: string) => {
    const completionValue = parseFloat(completionPercentage);
    if (completionValue >= 100) {
      return 'course-card completed';
    } else if (completionValue >= 50) {
      return 'course-card in-progress';
    } else {
      return 'course-card not-started';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Courses</h1>
        <p className="page-subtitle">Manage your academic courses and track your progress</p>
        <div className="data-section">
          <div className="empty-state">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Courses</h1>
      <p className="page-subtitle">Manage your academic courses and track your progress</p>
      
      <div className="data-section">
        <h2 className="section-title">Course Information</h2>
        <div className="courses-grid">
          {courses.length === 0 ? (
            <div className="empty-state">
              No courses data available. Load data from Courses.json to display course information.
            </div>
          ) : (
            courses.map((course, index) => {
              const courseId = course["Course ID"] || 'Not specified';
              const courseName = course["Course Name"] || 'Not specified';
              const credits = course["Credit Hours"] || 'Not specified';
              const fullDescription = course["Course Description"] || 'No description available';
              const description = fullDescription.length > 100 ? fullDescription.substring(0, 100) + '...' : fullDescription;
              const professorName = course["Professor/Teacher Name"] || 'Not specified';
              const professorEmail = course["Professor/Teacher Email"] || '';
              
              // Calculate weighted average and completion for this course
              const courseDeliverables = deliverables.filter(deliverable => 
                deliverable["Course ID"] === courseId
              );
              const averageGrade = calculateWeightedAverage(courseDeliverables);
              const completionPercentage = calculateCompletionPercentage(courseDeliverables);
              const cardClass = getCardClass(completionPercentage);

              return (
                <Link key={index} href={`/courses/${courseId}`} className={cardClass}>
                  <div className="course-header">
                    <div className="course-id">{courseId}</div>
                    <div className="course-credits">{credits} Credits</div>
                  </div>
                  
                  <div className="course-title">{courseName}</div>
                  <div className="course-description">{description}</div>
                  
                  <div className="course-details">
                    <div className="course-detail">
                      <div className="course-detail-label">Average Grade</div>
                      <div className="course-detail-value">{averageGrade}</div>
                    </div>
                    <div className="course-detail">
                      <div className="course-detail-label">Completion %</div>
                      <div className="course-detail-value">{completionPercentage}%</div>
                    </div>
                  </div>
                  
                  <div className="course-professor">
                    <div className="professor-name">{professorName}</div>
                    {professorEmail && professorEmail !== 'Not specified' ? (
                      <a 
                        href={`mailto:${professorEmail}`} 
                        className="professor-email"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {professorEmail}
                      </a>
                    ) : (
                      <div className="professor-email">No email provided</div>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
