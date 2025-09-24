'use client'

import { useState, useEffect } from 'react';

interface ScheduleItem {
  "Course ID": string;
  "Day of Week": string;
  "Start Time": string;
  "End Time": string;
  "Location": string;
  "Recurring": string;
  "Period": string;
}

interface Course {
  "Course ID": string;
  "Course Name": string;
  "Course Average Weighted Grade": string;
  "Credit Hours": string;
  "Course Description": string;
  "Professor/Teacher Name": string;
  "Professor/Teacher Email": string;
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [scheduleRes, coursesRes] = await Promise.all([
          fetch('/api/data/schedule'),
          fetch('/api/data/courses')
        ]);
        
        const scheduleData = await scheduleRes.json();
        const coursesData = await coursesRes.json();
        
        setSchedule(scheduleData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredSchedule = filter === 'all' 
    ? schedule 
    : schedule.filter(item => item["Day of Week"] === filter);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const availableDays = Array.from(new Set(schedule.map(item => item["Day of Week"])));

  const formatTime = (dateTimeString: string) => {
    if (!dateTimeString) return 'Not specified';
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return dateTimeString;
    }
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c["Course ID"] === courseId);
    return course ? course["Course Name"] : courseId;
  };

  const getCurrentDay = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()];
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Schedule</h1>
        <p className="page-subtitle">View your class schedule and recurring events</p>
        <div className="data-section">
          <div className="empty-state">Loading schedule...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Schedule</h1>
      <p className="page-subtitle">View your class schedule and recurring events</p>
      
      <div className="data-section">
        <h2 className="section-title">Schedule Information</h2>
        
        {/* Day Filter Buttons */}
        <div className="schedule-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Days
          </button>
          {availableDays.map(day => (
            <button
              key={day}
              className={`filter-btn ${filter === day ? 'active' : ''}`}
              onClick={() => setFilter(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="data-grid">
          {filteredSchedule.length === 0 ? (
            <div className="empty-state">
              No schedule data available. Load data from Schedule.json to display schedule information.
            </div>
          ) : (
            filteredSchedule.map((item, index) => (
              <div key={index} className="schedule-card">
                <div className="schedule-header">
                  <h3 className="schedule-course">{item["Course ID"]}</h3>
                  <div className="schedule-day">{item["Day of Week"]}</div>
                </div>
                
                <div className="schedule-course-name">
                  {getCourseName(item["Course ID"])}
                </div>
                
                <div className="schedule-time">
                  <div className="time-item">
                    <strong>Start:</strong> {formatTime(item["Start Time"])}
                  </div>
                  <div className="time-item">
                    <strong>End:</strong> {formatTime(item["End Time"])}
                  </div>
                </div>
                
                <div className="schedule-location">
                  <strong>Location:</strong> {item["Location"]}
                </div>
                
                <div className="schedule-recurring">
                  <span className={`recurring-badge ${item["Recurring"] === 'Yes' ? 'recurring' : 'one-time'}`}>
                    {item["Recurring"] === 'Yes' ? `Recurring (${item["Period"]})` : 'One-time'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
