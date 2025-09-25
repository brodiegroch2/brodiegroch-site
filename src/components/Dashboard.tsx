'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DeliverableEditModal from './DeliverableEditModal';
import { calculateCourseGPA, calculateGradeAndGPA } from '@/utils/gpaCalculator';

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

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [countdown, setCountdown] = useState({ days: '--', hours: '--', minutes: '--' });
  const [nextAssignment, setNextAssignment] = useState('Loading...');
  const [stats, setStats] = useState({
    completedDeliverables: '0/0',
    upcomingDeadlines: 0,
    averageGrade: '0%',
    gpa: '0.00'
  });
  const [recentActivityPage, setRecentActivityPage] = useState(0);
  const [upcomingDeadlinesPage, setUpcomingDeadlinesPage] = useState(0);
  const [recentActivityTotalPages, setRecentActivityTotalPages] = useState(0);
  const [upcomingDeadlinesTotalPages, setUpcomingDeadlinesTotalPages] = useState(0);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 4;

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
        updateRecentActivity(deliverablesData);
        updateUpcomingDeadlines(deliverablesData);
        updateCoursePerformance(coursesData, deliverablesData);
        updateProgressOverview(coursesData, deliverablesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Update sections when pagination state changes
  useEffect(() => {
    if (deliverables.length > 0) {
      updateRecentActivity(deliverables);
      updateUpcomingDeadlines(deliverables);
    }
  }, [recentActivityPage, upcomingDeadlinesPage, deliverables]);

  const calculateStats = (coursesData: Course[], deliverablesData: Deliverable[]) => {

    // Count completed deliverables (graded OR submitted)
    const completedDeliverables = deliverablesData.filter(deliverable => {
      const isGraded = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                      deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
      const isSubmitted = deliverable['Status'] === 'submitted';
      return isGraded || isSubmitted;
    }).length;
    const totalDeliverables = deliverablesData.filter(deliverable => 
      deliverable['Course ID'] && deliverable['Course ID'] !== ''
    ).length;

    // Count upcoming deadlines (next 7 days) - exclude already graded items and submitted items
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = deliverablesData.filter(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      const isGraded = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                      deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
      const isSubmitted = deliverable['Status'] === 'submitted';
      return dueDate >= now && dueDate <= nextWeek && !isGraded && !isSubmitted;
    }).length;

    // Calculate weighted average grade based on course averages and credit hours
    const courseAverages: { [key: string]: { average: number; creditHours: number } } = {};
    
    coursesData.forEach(course => {
      const courseId = course['Course ID'];
      const courseDeliverables = deliverablesData.filter(d => d['Course ID'] === courseId);
      const gradedDeliverables = courseDeliverables.filter(d => 
        d['Grade %'] && d['Grade %'] !== '' && 
        d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded'
      );
      
      if (gradedDeliverables.length > 0) {
        const totalGrade = gradedDeliverables.reduce((sum, deliverable) => {
          return sum + parseFloat(deliverable['Grade %']);
        }, 0);
        const averageGrade = totalGrade / gradedDeliverables.length;
        courseAverages[courseId] = {
          average: averageGrade,
          creditHours: parseFloat(course['Credit Hours']) || 0
        };
      }
    });

    let weightedSum = 0;
    let totalCreditHours = 0;
    
    Object.values(courseAverages).forEach(courseData => {
      weightedSum += courseData.average * courseData.creditHours;
      totalCreditHours += courseData.creditHours;
    });

    const averageGrade = totalCreditHours > 0 ? Math.round(weightedSum / totalCreditHours) : 0;

    // Calculate GPA based on average grade percentage using grading scale
    const gradeResult = calculateGradeAndGPA(averageGrade);
    const overallGPA = gradeResult.gradePoints.toFixed(1);

    // Update state for display
    setStats({
      completedDeliverables: `${completedDeliverables}/${totalDeliverables}`,
      upcomingDeadlines: upcomingDeadlines,
      averageGrade: `${averageGrade}%`,
      gpa: overallGPA
    });
  };

  const calculateCountdown = (deliverablesData: Deliverable[]) => {
    const now = new Date();
    
    // Filter for deliverables that:
    // 1. Haven't passed their due date yet
    // 2. Don't have a grade (not graded yet)
    // 3. Aren't submitted (if status exists)
    const upcomingDeliverables = deliverablesData
      .filter(d => {
        const closeDate = new Date(d["Close Date"]);
        const isNotPastDue = closeDate > now;
        
        // Check if it has a grade (exclude graded assignments)
        const hasGrade = d['Grade %'] && d['Grade %'] !== '' && 
                        d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded';
        
        // Include if it's not past due AND doesn't have a grade
        return isNotPastDue && !hasGrade;
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
        } else {
          // If time has passed, set to 00:00:00
          setCountdown({
            days: '00',
            hours: '00',
            minutes: '00'
          });
        }
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000); // Update every second for real-time countdown
      
      return () => clearInterval(interval);
    } else {
      // No upcoming ungraded/unsubmitted deliverables
      setNextAssignment('No upcoming assignments');
      setCountdown({
        days: '--',
        hours: '--',
        minutes: '--'
      });
    }
  };

  const updateRecentActivity = (deliverablesData: Deliverable[]) => {
    const container = document.getElementById('recent-activity');
    const pagination = document.getElementById('recent-activity-pagination');
    const prevBtn = document.getElementById('recent-activity-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('recent-activity-next') as HTMLButtonElement;
    const pageInfo = document.getElementById('recent-activity-page-info');
    
    if (!container) return;

    // Get recently graded items
    const gradedItems = deliverablesData.filter(deliverable => 
      deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
      deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded'
    ).sort((a, b) => new Date(b['Close Date']).getTime() - new Date(a['Close Date']).getTime());

    if (gradedItems.length === 0) {
      container.innerHTML = '<div class="empty-state">No recent activity</div>';
      if (pagination) pagination.style.display = 'none';
      return;
    }

    const totalPages = Math.ceil(gradedItems.length / itemsPerPage);
    setRecentActivityTotalPages(totalPages);
    const startIndex = recentActivityPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = gradedItems.slice(startIndex, endIndex);

    container.innerHTML = currentItems.map(deliverable => `
      <div class="activity-item clickable-activity" data-deliverable='${JSON.stringify(deliverable)}'>
        <div class="activity-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="activity-content">
          <div class="activity-title">${deliverable['Deliverable']}</div>
          <div class="activity-details">${deliverable['Course ID']} • ${new Date(deliverable['Close Date']).toLocaleDateString()}</div>
        </div>
        <div class="activity-grade">${deliverable['Grade %']}%</div>
      </div>
    `).join('');

    // Add click handlers to activity items
    container.querySelectorAll('.clickable-activity').forEach(item => {
      item.addEventListener('click', () => {
        const deliverableData = JSON.parse(item.getAttribute('data-deliverable') || '{}');
        handleDeliverableClick(deliverableData);
      });
    });

    // Update pagination
    if (pagination && prevBtn && nextBtn && pageInfo) {
      if (totalPages > 1) {
        pagination.style.display = 'flex';
        // Don't set disabled directly on DOM - let React handle it
        pageInfo.textContent = `${recentActivityPage + 1} of ${totalPages}`;
      } else {
        pagination.style.display = 'none';
      }
    }
  };

  const updateUpcomingDeadlines = (deliverablesData: Deliverable[]) => {
    const container = document.getElementById('upcoming-deadlines-list');
    const pagination = document.getElementById('upcoming-deadlines-pagination');
    const prevBtn = document.getElementById('upcoming-deadlines-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('upcoming-deadlines-next') as HTMLButtonElement;
    const pageInfo = document.getElementById('upcoming-deadlines-page-info');
    
    if (!container) return;

    const now = new Date();
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = deliverablesData.filter(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      const isGraded = deliverable['Grade %'] && deliverable['Grade %'] !== '' && 
                      deliverable['Grade %'] !== 'Not specified' && deliverable['Grade %'] !== 'Not graded';
      const isSubmitted = deliverable['Status'] === 'submitted';
      return dueDate >= now && dueDate <= nextMonth && !isGraded && !isSubmitted && deliverable['Close Date'];
    }).sort((a, b) => new Date(a['Close Date']).getTime() - new Date(b['Close Date']).getTime());

    if (upcomingDeadlines.length === 0) {
      container.innerHTML = '<div class="empty-state">No upcoming deadlines</div>';
      if (pagination) pagination.style.display = 'none';
      return;
    }

    const totalPages = Math.ceil(upcomingDeadlines.length / itemsPerPage);
    setUpcomingDeadlinesTotalPages(totalPages);
    const startIndex = upcomingDeadlinesPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = upcomingDeadlines.slice(startIndex, endIndex);

    container.innerHTML = currentItems.map(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return `
        <div class="deadline-item clickable-deadline" data-deliverable='${JSON.stringify(deliverable)}'>
          <div class="deadline-date">${dueDate.toLocaleDateString()}</div>
          <div class="deadline-content">
            <div class="deadline-title">${deliverable['Deliverable']}</div>
            <div class="deadline-course">${deliverable['Course ID']}</div>
          </div>
          <div class="deadline-countdown">${daysUntilDue} days</div>
        </div>
      `;
    }).join('');

    // Add click handlers to deadline items
    container.querySelectorAll('.clickable-deadline').forEach(item => {
      item.addEventListener('click', () => {
        const deliverableData = JSON.parse(item.getAttribute('data-deliverable') || '{}');
        handleDeliverableClick(deliverableData);
      });
    });

    // Update pagination
    if (pagination && prevBtn && nextBtn && pageInfo) {
      if (totalPages > 1) {
        pagination.style.display = 'flex';
        // Don't set disabled directly on DOM - let React handle it
        pageInfo.textContent = `${upcomingDeadlinesPage + 1} of ${totalPages}`;
      } else {
        pagination.style.display = 'none';
      }
    }
  };

  const updateCoursePerformance = (coursesData: Course[], deliverablesData: Deliverable[]) => {
    const container = document.getElementById('course-performance-chart');
    if (!container) return;

    const courseAverages: { [key: string]: { average: number; courseName: string; gradedCount: number; totalCount: number } } = {};
    
    coursesData.forEach(course => {
      const courseId = course['Course ID'];
      const courseDeliverables = deliverablesData.filter(d => d['Course ID'] === courseId);
      const gradedDeliverables = courseDeliverables.filter(d => 
        d['Grade %'] && d['Grade %'] !== '' && 
        d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded'
      );
      
      if (gradedDeliverables.length > 0) {
        const totalGrade = gradedDeliverables.reduce((sum, deliverable) => {
          return sum + parseFloat(deliverable['Grade %']);
        }, 0);
        const averageGrade = Math.round(totalGrade / gradedDeliverables.length);
        courseAverages[courseId] = {
          average: parseFloat(averageGrade),
          courseName: course['Course Name'],
          gradedCount: gradedDeliverables.length,
          totalCount: courseDeliverables.length
        };
      }
    });
    
    if (Object.keys(courseAverages).length === 0) {
      container.innerHTML = '<div class="empty-state">No graded assignments yet</div>';
      return;
    }
    
    container.innerHTML = Object.entries(courseAverages).map(([courseId, data]) => `
      <div class="course-performance-item">
        <div class="course-performance-header">
          <div class="course-performance-id">${courseId}</div>
          <div class="course-performance-average ${getGradeClass(data.average)}">${data.average}%</div>
        </div>
        <div class="course-performance-name">${data.courseName}</div>
        <div class="course-performance-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${data.average}%"></div>
          </div>
          <div class="course-performance-stats">${data.gradedCount}/${data.totalCount} assignments graded</div>
        </div>
      </div>
    `).join('');
  };

  const updateProgressOverview = (coursesData: Course[], deliverablesData: Deliverable[]) => {
    const container = document.getElementById('progress-overview');
    if (!container) return;

    const now = new Date();
    const semesterEnd = new Date('2025-12-20'); // Approximate semester end
    const semesterStart = new Date('2025-09-01'); // Approximate semester start
    const totalDays = semesterEnd.getTime() - semesterStart.getTime();
    const daysPassed = now.getTime() - semesterStart.getTime();
    const semesterProgress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
    
    const totalDeliverables = deliverablesData.length;
    const completedDeliverables = deliverablesData.filter(d => 
      d['Grade %'] && d['Grade %'] !== '' && 
      d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded'
    ).length;
    const completionProgress = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;
    
    container.innerHTML = `
      <div class="progress-item">
        <div class="progress-header">
          <div class="progress-title">Semester Progress</div>
          <div class="progress-percentage">${semesterProgress.toFixed(1)}%</div>
        </div>
        <div class="progress-bar-large">
          <div class="progress-fill-large" style="width: ${semesterProgress}%"></div>
        </div>
      </div>
      
      <div class="progress-item">
        <div class="progress-header">
          <div class="progress-title">Assignment Completion</div>
          <div class="progress-percentage">${completionProgress.toFixed(1)}%</div>
        </div>
        <div class="progress-bar-large">
          <div class="progress-fill-large completion" style="width: ${completionProgress}%"></div>
        </div>
        <div class="progress-stats">${completedDeliverables} of ${totalDeliverables} assignments completed</div>
      </div>
      
      <div class="progress-item">
        <div class="progress-header">
          <div class="progress-title">Days Remaining</div>
          <div class="progress-percentage">${Math.max(0, Math.ceil((semesterEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))}</div>
        </div>
        <div class="progress-info">
          <div class="progress-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="progress-text">Days until semester end</div>
        </div>
      </div>
    `;
  };


  const getGradeClass = (percentage: number) => {
    if (percentage >= 95) return 'grade-excellent';
    if (percentage >= 85) return 'grade-good';
    if (percentage >= 75) return 'grade-average';
    if (percentage >= 65) return 'grade-below-average';
    return 'grade-poor';
  };

  // Pagination handlers
  const handleRecentActivityPrev = () => {
    if (recentActivityPage > 0) {
      setRecentActivityPage(recentActivityPage - 1);
    }
  };

  const handleRecentActivityNext = () => {
    setRecentActivityPage(recentActivityPage + 1);
  };

  const handleUpcomingDeadlinesPrev = () => {
    if (upcomingDeadlinesPage > 0) {
      setUpcomingDeadlinesPage(upcomingDeadlinesPage - 1);
    }
  };

  const handleUpcomingDeadlinesNext = () => {
    setUpcomingDeadlinesPage(upcomingDeadlinesPage + 1);
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
      prev.map(deliverable => 
        deliverable['Course ID'] === updatedDeliverable['Course ID'] &&
        deliverable['Deliverable'] === updatedDeliverable['Deliverable'] &&
        deliverable['Close Date'] === updatedDeliverable['Close Date']
          ? updatedDeliverable
          : deliverable
      )
    );
    
    // Recalculate stats after update
    calculateStats(courses, deliverables.map(d => 
      d['Course ID'] === updatedDeliverable['Course ID'] &&
      d['Deliverable'] === updatedDeliverable['Deliverable'] &&
      d['Close Date'] === updatedDeliverable['Close Date']
        ? updatedDeliverable
        : d
    ));
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="welcome-section">
            <h1 className="hero-title">
              Welcome back, Brodie!
            </h1>
            <p className="hero-subtitle">Here&apos;s what&apos;s happening in your academic journey today</p>
          </div>
          <div className="countdown-section">
            <div className="countdown-card">
              <div className="countdown-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
        <div className="stat-card success">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedDeliverables}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.upcomingDeadlines}</div>
            <div className="stat-label">Due This Week</div>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 20V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 20v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.averageGrade}</div>
            <div className="stat-label">Average Grade</div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.gpa}</div>
            <div className="stat-label">GPA</div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link href="/courses" className="quick-action-card courses">
            <div className="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="action-content">
              <div className="action-title">View Courses</div>
              <div className="action-subtitle">Manage your classes</div>
            </div>
            <div className="action-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </Link>
          
          <Link href="/deliverables" className="quick-action-card assignments">
            <div className="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="action-content">
              <div className="action-title">Assignments</div>
              <div className="action-subtitle">Track your work</div>
            </div>
            <div className="action-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </Link>
          
          <Link href="/schedule" className="quick-action-card schedule">
            <div className="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="action-content">
              <div className="action-title">Schedule</div>
              <div className="action-subtitle">View your classes</div>
            </div>
            <div className="action-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </Link>
          
          <Link href="/quick-links" className="quick-action-card links">
            <div className="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="action-content">
              <div className="action-title">Quick Links</div>
              <div className="action-subtitle">Access tools</div>
            </div>
            <div className="action-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>

    {/* Dashboard Sections */}
    <div className="dashboard-sections">
      <div className="dashboard-section">
        <h2 className="section-title">Recent Activity</h2>
        <div id="recent-activity" className="activity-list">
          <div className="empty-state">Loading recent activity...</div>
        </div>
        <div id="recent-activity-pagination" className="pagination" style={{ display: 'none' }}>
          <button id="recent-activity-prev" className="pagination-btn" disabled={recentActivityPage === 0} onClick={handleRecentActivityPrev}>Previous</button>
          <span id="recent-activity-page-info" className="pagination-info"></span>
          <button id="recent-activity-next" className="pagination-btn" disabled={recentActivityPage >= recentActivityTotalPages - 1} onClick={handleRecentActivityNext}>Next</button>
        </div>
      </div>
      
      <div className="dashboard-section">
        <h2 className="section-title">Upcoming Deadlines</h2>
        <div id="upcoming-deadlines-list" className="deadlines-list">
          <div className="empty-state">Loading upcoming deadlines...</div>
        </div>
        <div id="upcoming-deadlines-pagination" className="pagination" style={{ display: 'none' }}>
          <button id="upcoming-deadlines-prev" className="pagination-btn" disabled={upcomingDeadlinesPage === 0} onClick={handleUpcomingDeadlinesPrev}>Previous</button>
          <span id="upcoming-deadlines-page-info" className="pagination-info"></span>
          <button id="upcoming-deadlines-next" className="pagination-btn" disabled={upcomingDeadlinesPage >= upcomingDeadlinesTotalPages - 1} onClick={handleUpcomingDeadlinesNext}>Next</button>
        </div>
      </div>
    </div>

    <div className="dashboard-sections">
      <div className="dashboard-section course-performance">
        <h2 className="section-title">Course Performance</h2>
        <div id="course-performance-chart" className="performance-chart">
          <div className="empty-state">Loading course performance...</div>
        </div>
      </div>
      
      <div className="dashboard-section progress-overview">
        <h2 className="section-title">Progress Overview</h2>
        <div id="progress-overview" className="progress-overview">
          <div className="empty-state">Loading progress overview...</div>
        </div>
      </div>
    </div>

    
    <DeliverableEditModal
      deliverable={selectedDeliverable}
      isOpen={isModalOpen}
      onClose={handleModalClose}
      onSave={handleDeliverableUpdate}
    />
    </div>  );
}
