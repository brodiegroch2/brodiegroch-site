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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch('/api/data/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

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
            courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-header">
                  <h3 className="course-id">{course["Course ID"]}</h3>
                  <div className="course-credits">{course["Credit Hours"]} Credits</div>
                </div>
                <h4 className="course-name">{course["Course Name"]}</h4>
                <p className="course-description">{course["Course Description"]}</p>
                <div className="course-instructor">
                  <div className="instructor-name">
                    <strong>Instructor:</strong> {course["Professor/Teacher Name"]}
                  </div>
                  <div className="instructor-email">
                    <strong>Email:</strong> 
                    <a href={`mailto:${course["Professor/Teacher Email"]}`} className="email-link">
                      {course["Professor/Teacher Email"]}
                    </a>
                  </div>
                </div>
                {course["Course Average Weighted Grade"] && (
                  <div className="course-grade">
                    <strong>Current Grade:</strong> {course["Course Average Weighted Grade"]}%
                  </div>
                )}
                <div className="course-actions">
                  <Link href={`/courses/${course["Course ID"]}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
