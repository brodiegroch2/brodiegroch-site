'use client'

import { useState, useEffect } from 'react';

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
}

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [countdown, setCountdown] = useState({ days: '--', hours: '--', minutes: '--' });
  const [nextAssignment, setNextAssignment] = useState('Loading...');

  useEffect(() => {
    // Load data
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
        
        // Calculate stats
        calculateStats(coursesData, deliverablesData);
        calculateCountdown(deliverablesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const calculateStats = (coursesData: Course[], deliverablesData: Deliverable[]) => {
    // Update DOM elements with calculated stats
    const totalCourses = coursesData.length;
    const completedDeliverables = deliverablesData.filter(d => d["Grade %"] && d["Grade %"] !== "").length;
    const upcomingDeadlines = deliverablesData.filter(d => {
      const closeDate = new Date(d["Close Date"]);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return closeDate > now && closeDate <= weekFromNow;
    }).length;
    
    // Calculate average grade
    const gradedDeliverables = deliverablesData.filter(d => d["Grade %"] && d["Grade %"] !== "");
    const totalWeightedGrade = gradedDeliverables.reduce((sum, d) => {
      const grade = parseFloat(d["Grade %"]) || 0;
      const weight = parseFloat(d["Weight %"]) || 0;
      return sum + (grade * weight / 100);
    }, 0);
    const totalWeight = gradedDeliverables.reduce((sum, d) => sum + (parseFloat(d["Weight %"]) || 0), 0);
    const averageGrade = totalWeight > 0 ? Math.round(totalWeightedGrade / totalWeight * 100) / 100 : 0;
  };

  const calculateCountdown = (deliverablesData: Deliverable[]) => {
    const now = new Date();
    const upcomingDeliverables = deliverablesData
      .filter(d => {
        const closeDate = new Date(d["Close Date"]);
        return closeDate > now;
      })
      .sort((a, b) => new Date(a["Close Date"]).getTime() - new Date(b["Close Date"]).getTime());

    if (upcomingDeliverables.length > 0) {
      const nextDeliverable = upcomingDeliverables[0];
      setNextAssignment(nextDeliverable["Deliverable"]);
      
      const updateCountdown = () => {
        const now = new Date();
        const targetDate = new Date(nextDeliverable["Close Date"]);
        const timeDiff = targetDate.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          
          setCountdown({
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0')
          });
        }
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="welcome-section">
            <h1 className="hero-title">
              Welcome back, Brodie! 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle'}}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </h1>
            <p className="hero-subtitle">Here&apos;s what&apos;s happening in your academic journey today</p>
          </div>
          <div className="countdown-section">
            <div className="countdown-card">
              <div className="countdown-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="countdown-content">
                <div className="countdown-label">Next Due Date</div>
                <div className="countdown-timer">
                  <div className="time-unit">
                    <span className="time-value">{countdown.days}</span>
                    <span className="time-label">Days</span>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-unit">
                    <span className="time-value">{countdown.hours}</span>
                    <span className="time-label">Hours</span>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-unit">
                    <span className="time-value">{countdown.minutes}</span>
                    <span className="time-label">Mins</span>
                  </div>
                </div>
                <div className="countdown-assignment">{nextAssignment}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{courses.length}</div>
            <div className="stat-label">Active Courses</div>
            <div className="stat-trend">+2 this semester</div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{deliverables.filter(d => d["Grade %"] && d["Grade %"] !== "").length}</div>
            <div className="stat-label">Completed</div>
            <div className="stat-trend">Great progress!</div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{deliverables.filter(d => {
              const closeDate = new Date(d["Close Date"]);
              const now = new Date();
              const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
              return closeDate > now && closeDate <= weekFromNow;
            }).length}</div>
            <div className="stat-label">Due This Week</div>
            <div className="stat-trend">Stay focused!</div>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">97%</div>
            <div className="stat-label">Average Grade</div>
            <div className="stat-trend">Excellent work!</div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <a href="/courses" className="quick-action-card">
            <div className="quick-action-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="quick-action-content">
              <h3>View Courses</h3>
              <p>Manage your course information</p>
            </div>
          </a>
          
          <a href="/deliverables" className="quick-action-card">
            <div className="quick-action-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="quick-action-content">
              <h3>Assignments</h3>
              <p>Track your deliverables</p>
            </div>
          </a>
          
          <a href="/schedule" className="quick-action-card">
            <div className="quick-action-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="quick-action-content">
              <h3>Schedule</h3>
              <p>View your class schedule</p>
            </div>
          </a>
          
          <a href="/quick-links" className="quick-action-card">
            <div className="quick-action-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="quick-action-content">
              <h3>Quick Links</h3>
              <p>Access important resources</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
