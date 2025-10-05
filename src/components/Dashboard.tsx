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
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [nextAssignment, setNextAssignment] = useState('Loading...');
  const [testExamCountdown, setTestExamCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [nextTestExam, setNextTestExam] = useState('Loading...');
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
  const [courseAverages, setCourseAverages] = useState<{[key: string]: {average: number, courseName: string, gradedCount: number, totalCount: number, creditHours: number}}>({});
  const [showCourseAverages, setShowCourseAverages] = useState(false);
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
        calculateTestExamCountdown(deliverablesData);
        updateRecentActivity(deliverablesData);
        updateUpcomingDeadlines(deliverablesData);
        updateCoursePerformance(coursesData, deliverablesData);
        updateProgressOverview(coursesData, deliverablesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
    
    // Listen for deliverable updates
    const handleDeliverableUpdate = () => {
      console.log('Dashboard: Refreshing data due to deliverable update');
      loadData();
    };
    
    // Add event listener for deliverable updates
    window.addEventListener('deliverableUpdated', handleDeliverableUpdate);
    
    return () => {
      window.removeEventListener('deliverableUpdated', handleDeliverableUpdate);
    };
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

    // Count upcoming deadlines (next 7 days) - exclude already graded items and submitted items, but include completed items
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = deliverablesData.filter(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      const gradeValue = deliverable['Grade %'];
      const isGraded = gradeValue && 
                      gradeValue !== '' && 
                      gradeValue !== 'Not specified' && 
                      gradeValue !== 'Not graded' &&
                      !isNaN(Number(gradeValue)) &&
                      Number(gradeValue) > 0;
      const isSubmitted = deliverable['Status'] === 'submitted';
      return dueDate >= now && dueDate <= nextWeek && !isGraded && !isSubmitted;
    }).length;

    // Calculate weighted average grade based on course averages and credit hours
    const courseAverages: { [key: string]: { average: number; courseName: string; gradedCount: number; totalCount: number; creditHours: number } } = {};
    
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
          courseName: course['Course Name'],
          gradedCount: gradedDeliverables.length,
          totalCount: courseDeliverables.length,
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

    const averageGrade = totalCreditHours > 0 ? (weightedSum / totalCreditHours).toFixed(1) : '0.0';

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

    // Store course averages for modal display
    setCourseAverages(courseAverages);
  };

  const calculateCountdown = (deliverablesData: Deliverable[]) => {
    const now = new Date();
    
    // Filter for deliverables that:
    // 1. Haven't passed their due date yet
    // 2. Don't have a grade (not graded yet)
    // 3. Aren't submitted (if status exists)
    // 4. Aren't completed (exclude completed items)
    // 5. Aren't tests or exams (exclude tests/exams)
    const upcomingDeliverables = deliverablesData
      .filter(d => {
        const closeDate = new Date(d["Close Date"]);
        const isNotPastDue = closeDate > now;
        
        // Check if it has a grade (exclude graded assignments)
        const gradeValue = d['Grade %'];
        const hasGrade = gradeValue && 
                        gradeValue !== '' && 
                        gradeValue !== 'Not specified' && 
                        gradeValue !== 'Not graded' &&
                        !isNaN(Number(gradeValue)) &&
                        Number(gradeValue) > 0;
        
        // Check if it's submitted (exclude submitted assignments)
        const isSubmitted = d['Status'] === 'submitted';
        
        // Check if it's completed (exclude completed assignments)
        const isCompleted = d['Status'] === 'completed';
        
        // Check if it's a test or exam (exclude tests/exams)
        const category = d['Category']?.toLowerCase() || '';
        const deliverableName = d['Deliverable']?.toLowerCase() || '';
        const isTestOrExam = category.includes('test') || category.includes('exam') || 
                           deliverableName.includes('test') || deliverableName.includes('exam');
        
        // Include if it's not past due AND doesn't have a grade AND isn't submitted AND isn't completed AND isn't a test/exam
        // This only includes pending assignments (not tests/exams)
        return isNotPastDue && !hasGrade && !isSubmitted && !isCompleted && !isTestOrExam;
      })
      .sort((a, b) => new Date(a["Close Date"]).getTime() - new Date(b["Close Date"]).getTime());

    if (upcomingDeliverables.length > 0) {
      const nextDeliverable = upcomingDeliverables[0];
      setNextAssignment(`${nextDeliverable["Course ID"]} - ${nextDeliverable["Deliverable"]}`);
      
      const updateCountdown = () => {
        const now = new Date();
        const targetDate = new Date(nextDeliverable["Close Date"]);
        const timeDiff = targetDate.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          
          setCountdown({
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
          });
        } else {
          // If time has passed, set to 00:00:00
          setCountdown({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
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
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      });
    }
  };

  const calculateTestExamCountdown = (deliverablesData: Deliverable[]) => {
    const now = new Date();
    
    // Filter for tests and exams that:
    // 1. Haven't passed their due date yet
    // 2. Don't have a grade (not graded yet)
    // 3. Aren't submitted (if status exists)
    // 4. Aren't completed (exclude completed items)
    const upcomingTestsExams = deliverablesData
      .filter(d => {
        const closeDate = new Date(d["Close Date"]);
        const isNotPastDue = closeDate > now;
        
        // Check if it has a grade (exclude graded tests/exams)
        const gradeValue = d['Grade %'];
        const hasGrade = gradeValue && 
                        gradeValue !== '' && 
                        gradeValue !== 'Not specified' && 
                        gradeValue !== 'Not graded' &&
                        !isNaN(Number(gradeValue)) &&
                        Number(gradeValue) > 0;
        
        // Check if it's submitted (exclude submitted tests/exams)
        const isSubmitted = d['Status'] === 'submitted';
        
        // Check if it's completed (exclude completed tests/exams)
        const isCompleted = d['Status'] === 'completed';
        
        // Check if it's a test or exam (only include tests/exams)
        const category = d['Category']?.toLowerCase() || '';
        const deliverableName = d['Deliverable']?.toLowerCase() || '';
        const isTestOrExam = category.includes('test') || category.includes('exam') || 
                           deliverableName.includes('test') || deliverableName.includes('exam');
        
        // Include if it's not past due AND doesn't have a grade AND isn't submitted AND isn't completed AND is a test/exam
        // This only includes pending tests/exams
        return isNotPastDue && !hasGrade && !isSubmitted && !isCompleted && isTestOrExam;
      })
      .sort((a, b) => new Date(a["Close Date"]).getTime() - new Date(b["Close Date"]).getTime());

    if (upcomingTestsExams.length > 0) {
      const nextTestExam = upcomingTestsExams[0];
      setNextTestExam(`${nextTestExam["Course ID"]} - ${nextTestExam["Deliverable"]}`);
      
      const updateCountdown = () => {
        const now = new Date();
        const dueDate = new Date(nextTestExam["Close Date"]);
        const timeDiff = dueDate.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          
          setTestExamCountdown({
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
          });
        } else {
          setTestExamCountdown({ 
            days: '00', 
            hours: '00', 
            minutes: '00', 
            seconds: '00' 
          });
        }
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000); // Update every second for real-time countdown
      
      return () => clearInterval(interval);
    } else {
      setNextTestExam('No upcoming tests/exams');
      setTestExamCountdown({ 
        days: '00', 
        hours: '00', 
        minutes: '00', 
        seconds: '00' 
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
          <div class="activity-course">${deliverable['Course ID']}</div>
          <div class="activity-date">${new Date(deliverable['Close Date']).toLocaleDateString()}</div>
        </div>
        <div class="activity-grade">
          <div class="grade-percentage">${deliverable['Grade %']}%</div>
          <div class="grade-letter">${deliverable['Letter Grade'] || 'A'}</div>
        </div>
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
    const regularContainer = document.getElementById('upcoming-deadlines-list');
    const examsContainer = document.getElementById('upcoming-exams-list');
    const needsGradesContainer = document.getElementById('needs-grades-list');
    const pagination = document.getElementById('upcoming-deadlines-pagination');
    const prevBtn = document.getElementById('upcoming-deadlines-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('upcoming-deadlines-next') as HTMLButtonElement;
    const pageInfo = document.getElementById('upcoming-deadlines-page-info');
    
    if (!regularContainer || !examsContainer || !needsGradesContainer) return;

    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextTwoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    // Filter for upcoming deadlines - exclude already graded items, submitted items, and completed items
    const upcomingDeadlines = deliverablesData.filter(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      const gradeValue = deliverable['Grade %'];
      const isGraded = gradeValue && 
                      gradeValue !== '' && 
                      gradeValue !== 'Not specified' && 
                      gradeValue !== 'Not graded' &&
                      !isNaN(Number(gradeValue)) &&
                      Number(gradeValue) > 0;
      const isSubmitted = deliverable['Status'] === 'submitted';
      const isCompleted = deliverable['Status'] === 'completed';
      return dueDate >= now && !isGraded && !isSubmitted && !isCompleted && deliverable['Close Date'];
    }).sort((a, b) => new Date(a['Close Date']).getTime() - new Date(b['Close Date']).getTime());

    // Filter for submitted items that need grades
    const needsGrades = deliverablesData.filter(deliverable => {
      const isSubmitted = deliverable['Status'] === 'submitted';
      const gradeValue = deliverable['Grade %'];
      const isGraded = gradeValue && 
                      gradeValue !== '' && 
                      gradeValue !== 'Not specified' && 
                      gradeValue !== 'Not graded' &&
                      !isNaN(Number(gradeValue)) &&
                      Number(gradeValue) > 0;
      return isSubmitted && !isGraded && deliverable['Close Date'];
    }).sort((a, b) => new Date(a['Close Date']).getTime() - new Date(b['Close Date']).getTime());

    // Separate regular deliverables from exams/tests (only pending items now)
    const regularDeliverables = upcomingDeadlines.filter(deliverable => {
      const category = deliverable['Category']?.toLowerCase() || '';
      const deliverableName = deliverable['Deliverable']?.toLowerCase() || '';
      return !category.includes('exam') && !category.includes('test') && 
             !deliverableName.includes('exam') && !deliverableName.includes('test');
    });

    const examsAndTests = upcomingDeadlines.filter(deliverable => {
      const category = deliverable['Category']?.toLowerCase() || '';
      const deliverableName = deliverable['Deliverable']?.toLowerCase() || '';
      return category.includes('exam') || category.includes('test') || 
             deliverableName.includes('exam') || deliverableName.includes('test');
    });

    // Filter exams/tests for next 2 weeks
    const upcomingExams = examsAndTests.filter(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      return dueDate <= nextTwoWeeks;
    });

    // Filter assignments for next week, but if less than 3, get next 3
    let upcomingAssignments = regularDeliverables.filter(deliverable => {
      const dueDate = new Date(deliverable['Close Date']);
      return dueDate <= nextWeek;
    });

    // If less than 3 assignments in next week, get next 3 assignments
    if (upcomingAssignments.length < 3) {
      upcomingAssignments = regularDeliverables.slice(0, 3);
    }

    // Render regular deliverables
    if (upcomingAssignments.length === 0) {
      regularContainer.innerHTML = '<div class="empty-state">No upcoming assignments</div>';
    } else {
      regularContainer.innerHTML = upcomingAssignments.map(deliverable => {
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
    }

    // Render exams and tests
    if (upcomingExams.length === 0) {
      examsContainer.innerHTML = '<div class="empty-state">No upcoming exams or tests</div>';
    } else {
      examsContainer.innerHTML = upcomingExams.map(deliverable => {
        const dueDate = new Date(deliverable['Close Date']);
        const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        return `
          <div class="deadline-item clickable-deadline exam-item" data-deliverable='${JSON.stringify(deliverable)}'>
            <div class="deadline-date">${dueDate.toLocaleDateString()}</div>
            <div class="deadline-content">
              <div class="deadline-title">${deliverable['Deliverable']}</div>
              <div class="deadline-course">${deliverable['Course ID']}</div>
            </div>
            <div class="deadline-countdown">${daysUntilDue} days</div>
          </div>
        `;
      }).join('');
    }

    // Render needs grades
    if (needsGrades.length === 0) {
      needsGradesContainer.innerHTML = '<div class="empty-state">No submitted assignments waiting for grades</div>';
    } else {
      needsGradesContainer.innerHTML = needsGrades.map(deliverable => {
        const dueDate = new Date(deliverable['Close Date']);
        const daysSinceSubmitted = Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        
        return `
          <div class="deadline-item clickable-deadline submitted-item" data-deliverable='${JSON.stringify(deliverable)}'>
            <div class="deadline-date">${dueDate.toLocaleDateString()}</div>
            <div class="deadline-content">
              <div class="deadline-title">${deliverable['Deliverable']}</div>
              <div class="deadline-course">${deliverable['Course ID']}</div>
            </div>
            <div class="deadline-countdown">Submitted ${daysSinceSubmitted} days ago</div>
          </div>
        `;
      }).join('');
    }

    // Add click handlers to all deadline items
    const regularItems = Array.from(regularContainer.querySelectorAll('.clickable-deadline'));
    const examItems = Array.from(examsContainer.querySelectorAll('.clickable-deadline'));
    const needsGradesItems = Array.from(needsGradesContainer.querySelectorAll('.clickable-deadline'));
    [...regularItems, ...examItems, ...needsGradesItems].forEach(item => {
      item.addEventListener('click', () => {
        const deliverableData = JSON.parse(item.getAttribute('data-deliverable') || '{}');
        handleDeliverableClick(deliverableData);
      });
    });

    // Hide pagination since we're showing all items for the next week
    if (pagination) pagination.style.display = 'none';
  };

  const updateCoursePerformance = (coursesData: Course[], deliverablesData: Deliverable[]) => {
    const container = document.getElementById('course-performance-chart');
    if (!container) return;

    const courseAverages: { [key: string]: { average: number; courseName: string; gradedCount: number; totalCount: number; creditHours: number } } = {};
    
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
          average: averageGrade,
          courseName: course['Course Name'],
          gradedCount: gradedDeliverables.length,
          totalCount: courseDeliverables.length,
          creditHours: Number(course['Credit Hours']) || 0
        };
      }
    });
    
    if (Object.keys(courseAverages).length === 0) {
      container.innerHTML = '<div class="empty-state">No graded assignments yet</div>';
      return;
    }
    
    // Sort courses by average grade (highest first)
    const sortedCourses = Object.entries(courseAverages).sort(([,a], [,b]) => b.average - a.average);
    
    // Get course icons based on course type
    const getCourseIcon = (courseId: string) => {
      if (courseId.includes('COMP')) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
        </svg>`;
      } else if (courseId.includes('MECH')) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>`;
      } else if (courseId.includes('MATH')) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
        </svg>`;
      } else if (courseId.includes('THRM')) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="2"/>
          <path d="M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
      } else {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>`;
      }
    };
    
    container.innerHTML = `
      <div class="course-performance-grid">
        ${sortedCourses.map(([courseId, data], index) => `
          <div class="course-card" style="animation-delay: ${index * 0.1}s">
            <div class="course-card-header">
              <div class="course-icon">
                ${getCourseIcon(courseId)}
              </div>
              <div class="course-info">
                <div class="course-id">${courseId}</div>
                <div class="course-credits">${data.creditHours} Credits</div>
              </div>
              <div class="course-grade ${getGradeClass(data.average)}">
                <div class="grade-percentage">${data.average}%</div>
                <div class="grade-letter">${getLetterGrade(data.average)}</div>
              </div>
            </div>
            
            <div class="course-name">${data.courseName}</div>
            
            <div class="course-progress-section">
              <div class="progress-header">
                <span class="progress-label">Assignment Progress</span>
                <span class="progress-percentage">${Math.round((data.gradedCount / data.totalCount) * 100)}%</span>
              </div>
              <div class="modern-progress-bar">
                <div class="progress-fill-modern" style="width: ${(data.gradedCount / data.totalCount) * 100}%"></div>
              </div>
              <div class="progress-stats">
                <span class="graded-count">${data.gradedCount}</span>
                <span class="total-count">/${data.totalCount}</span>
                <span class="assignments-text">assignments graded</span>
              </div>
            </div>
            
            <div class="course-performance-chart">
              <div class="mini-chart">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="4"/>
                  <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" stroke-width="4" 
                          stroke-dasharray="${2 * Math.PI * 25}" 
                          stroke-dashoffset="${2 * Math.PI * 25 * (1 - data.average / 100)}"
                          stroke-linecap="round" class="grade-circle"/>
                </svg>
                <div class="chart-percentage">${data.average}%</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  const updateProgressOverview = (coursesData: Course[], deliverablesData: Deliverable[]) => {
    const container = document.getElementById('progress-overview');
    if (!container) return;

    const now = new Date();
    const semesterEnd = new Date('2025-12-20'); // Approximate semester end
    const semesterStart = new Date('2025-09-01'); // Approximate semester start
    const totalDays = Math.ceil((semesterEnd.getTime() - semesterStart.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((now.getTime() - semesterStart.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, Math.ceil((semesterEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const semesterProgress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
    
    // Calculate assignment completion more comprehensively
    const totalDeliverables = deliverablesData.filter(d => d['Course ID'] && d['Course ID'] !== '').length;
    const completedDeliverables = deliverablesData.filter(d => {
      const isGraded = d['Grade %'] && d['Grade %'] !== '' && 
                      d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded';
      const isSubmitted = d['Status'] === 'submitted';
      const isCompleted = d['Status'] === 'completed';
      return isGraded || isSubmitted || isCompleted;
    }).length;
    const completionProgress = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;
    
    // Calculate weighted progress based on course credits
    const totalCredits = coursesData.reduce((sum, course) => sum + (Number(course['Credit Hours']) || 0), 0);
    const completedCredits = coursesData.reduce((sum, course) => {
      const courseDeliverables = deliverablesData.filter(d => d['Course ID'] === course['Course ID']);
      const courseCompleted = courseDeliverables.filter(d => {
        const isGraded = d['Grade %'] && d['Grade %'] !== '' && 
                        d['Grade %'] !== 'Not specified' && d['Grade %'] !== 'Not graded';
        const isSubmitted = d['Status'] === 'submitted';
        const isCompleted = d['Status'] === 'completed';
        return isGraded || isSubmitted || isCompleted;
      }).length;
      const courseProgress = courseDeliverables.length > 0 ? (courseCompleted / courseDeliverables.length) : 0;
      return sum + (courseProgress * (Number(course['Credit Hours']) || 0));
    }, 0);
    const weightedProgress = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;
    
    container.innerHTML = `
      <div class="progress-overview-grid">
        <!-- Semester Progress Card -->
        <div class="progress-card semester-progress">
          <div class="progress-card-header">
            <div class="progress-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="progress-card-title">Semester Progress</div>
          </div>
          <div class="progress-card-content">
            <div class="progress-percentage-large">${semesterProgress.toFixed(1)}%</div>
            <div class="progress-bar-modern">
              <div class="progress-fill-modern" style="width: ${semesterProgress}%"></div>
            </div>
            <div class="progress-details">
              <div class="progress-detail-item">
                <span class="progress-detail-value">${daysRemaining}</span>
                <span class="progress-detail-label">Days Left</span>
              </div>
              <div class="progress-detail-item">
                <span class="progress-detail-value">${daysPassed}</span>
                <span class="progress-detail-label">Days Passed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Assignment Completion Card -->
        <div class="progress-card assignment-progress">
          <div class="progress-card-header">
            <div class="progress-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="progress-card-title">Assignment Progress</div>
          </div>
          <div class="progress-card-content">
            <div class="progress-percentage-large">${completionProgress.toFixed(1)}%</div>
            <div class="progress-bar-modern">
              <div class="progress-fill-modern completion" style="width: ${completionProgress}%"></div>
            </div>
            <div class="progress-details">
              <div class="progress-detail-item">
                <span class="progress-detail-value">${completedDeliverables}</span>
                <span class="progress-detail-label">Completed</span>
              </div>
              <div class="progress-detail-item">
                <span class="progress-detail-value">${totalDeliverables}</span>
                <span class="progress-detail-label">Total</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Progress Card -->
        <div class="progress-card course-progress">
          <div class="progress-card-header">
            <div class="progress-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="progress-card-title">Course Progress</div>
          </div>
          <div class="progress-card-content">
            <div class="progress-percentage-large">${weightedProgress.toFixed(1)}%</div>
            <div class="progress-bar-modern">
              <div class="progress-fill-modern course" style="width: ${weightedProgress}%"></div>
            </div>
            <div class="progress-details">
              <div class="progress-detail-item">
                <span class="progress-detail-value">${coursesData.length}</span>
                <span class="progress-detail-label">Courses</span>
              </div>
              <div class="progress-detail-item">
                <span class="progress-detail-value">${totalCredits}</span>
                <span class="progress-detail-label">Credits</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pie Chart for Visual Appeal -->
        <div class="progress-card pie-chart-card">
          <div class="progress-card-header">
            <div class="progress-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 12A10 10 0 0 0 12 2V12H22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="progress-card-title">Overall Progress</div>
          </div>
          <div class="progress-card-content">
            <div class="pie-chart-container-modern">
              <div class="pie-chart-modern">
                <svg width="100" height="100" viewBox="0 0 100 100" class="pie-svg-modern">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" stroke-width="6" class="pie-background-modern"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="6" 
                          stroke-dasharray="${(weightedProgress / 100) * 251.2} 251.2" 
                          stroke-dashoffset="62.8" 
                          class="pie-progress-modern" 
                          style="transform: rotate(-90deg); transform-origin: 50px 50px;"/>
                  <text x="50" y="55" text-anchor="middle" class="pie-text-modern">${Math.round(weightedProgress)}%</text>
                </svg>
              </div>
              <div class="pie-info-modern">
                <div class="pie-stats-modern">
                  <div class="pie-stat-modern">
                    <div class="pie-stat-value-modern">${Math.round(semesterProgress)}%</div>
                    <div class="pie-stat-label-modern">Semester</div>
                  </div>
                  <div class="pie-stat-modern">
                    <div class="pie-stat-value-modern">${Math.round(completionProgress)}%</div>
                    <div class="pie-stat-label-modern">Assignments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

  const getLetterGrade = (grade: number) => {
    if (grade >= 97) return 'A+';
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 63) return 'D';
    if (grade >= 60) return 'D-';
    return 'F';
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
            <div className={`countdown-card ${parseInt(countdown.days) <= 1 ? 'urgent' : ''} ${parseInt(countdown.hours) <= 2 && parseInt(countdown.days) === 0 ? 'critical' : ''}`}>
              <div className="countdown-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="countdown-content">
                <div className="countdown-label">Next Due Date</div>
                <div className="countdown-timer">
                  <div className="time-display">
                    <span className="time-value">{countdown.days}:{countdown.hours}:{countdown.minutes}:{countdown.seconds}</span>
                    <span className="time-label">D:H:M:S</span>
                  </div>
                </div>
                <div className="countdown-assignment">{nextAssignment}</div>
              </div>
            </div>
            
            <div className={`countdown-card ${parseInt(testExamCountdown.days) <= 1 ? 'urgent' : ''} ${parseInt(testExamCountdown.hours) <= 2 && parseInt(testExamCountdown.days) === 0 ? 'critical' : ''}`}>
              <div className="countdown-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div className="countdown-content">
                <div className="countdown-label">Next TEST/EXAM Date</div>
                <div className="countdown-timer">
                  <div className="time-display">
                    <span className="time-value">{testExamCountdown.days}:{testExamCountdown.hours}:{testExamCountdown.minutes}:{testExamCountdown.seconds}</span>
                    <span className="time-label">D:H:M:S</span>
                  </div>
                </div>
                <div className="countdown-assignment">{nextTestExam}</div>
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
        
        <div className="stat-card info clickable" onClick={() => setShowCourseAverages(true)}>
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

    {/* Dashboard Sections - 2-wide grid */}
    <div className="dashboard-sections-grid">
      <div className="dashboard-section">
        <h2 className="section-title">Upcoming Exams & Tests</h2>
        <div id="upcoming-exams-list" className="deadlines-list">
          <div className="empty-state">Loading upcoming exams...</div>
        </div>
      </div>
      
      <div className="dashboard-section">
        <h2 className="section-title">Upcoming Assignments</h2>
        <div id="upcoming-deadlines-list" className="deadlines-list">
          <div className="empty-state">Loading upcoming assignments...</div>
        </div>
      </div>
      
      <div className="dashboard-section">
        <h2 className="section-title">Needs Grades</h2>
        <div id="needs-grades-list" className="deadlines-list">
          <div className="empty-state">Loading submitted assignments...</div>
        </div>
      </div>
      
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

    {/* Course Averages Modal */}
    {showCourseAverages && (
      <div className="modal-overlay" onClick={() => setShowCourseAverages(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Course Averages</h2>
            <button 
              className="modal-close"
              onClick={() => setShowCourseAverages(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <div className="course-averages-list">
              {Object.entries(courseAverages).map(([courseId, data]) => (
                <div key={courseId} className="course-average-item">
                  <div className="course-average-header">
                    <div className="course-id">{courseId}</div>
                    <div className="course-average-grade">{data.average}%</div>
                  </div>
                  <div className="course-name">{data.courseName}</div>
                  <div className="course-stats">
                    {data.gradedCount} of {data.totalCount} assignments graded
                  </div>
                </div>
              ))}
              {Object.keys(courseAverages).length === 0 && (
                <div className="no-data">No graded assignments yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </div>  );
}
