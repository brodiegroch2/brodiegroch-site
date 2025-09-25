'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [filter, setFilter] = useState('');

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

  // Set filter to current day after data loads
  useEffect(() => {
    if (!loading && schedule.length > 0) {
      const currentDay = getCurrentDay();
      const availableDays = Array.from(new Set(schedule.map(item => item["Day of Week"])));
      
      // Only set to current day if it exists in the schedule data
      if (availableDays.includes(currentDay)) {
        setFilter(currentDay);
      } else {
        // Fallback to first available day if current day not found
        setFilter(availableDays[0] || 'all');
      }
    }
  }, [loading, schedule]);

  const filteredSchedule = (filter === 'all' 
    ? schedule 
    : schedule.filter(item => item["Day of Week"] === filter))
    .sort((a, b) => {
      const timeA = new Date(a['Start Time'] || '');
      const timeB = new Date(b['Start Time'] || '');
      return timeA.getTime() - timeB.getTime();
    });

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

        <div className={filter === 'all' ? 'data-grid' : 'data-grid list-view'}>
          {filteredSchedule.length === 0 ? (
            <div className="empty-state">
              {filter === 'all' 
                ? 'No schedule data available. Load data from Schedule.json to display schedule information.'
                : `No classes scheduled for ${filter}. Try selecting a different day or view all days.`
              }
            </div>
          ) : (
            filteredSchedule.map((item, index) => (
              <Link key={index} href={`/courses/${item["Course ID"]}`} className="data-item">
                <div className="schedule-tile">
                  <div className="schedule-tile-header">
                    <div className="schedule-course-id">{item["Course ID"]}</div>
                    <div className="schedule-course-name">{getCourseName(item["Course ID"])}</div>
                    <span className="schedule-day-badge">{item["Day of Week"]}</span>
                  </div>
                  
                  <div className="schedule-tile-body">
                    <div className="schedule-time-info">
                      <div className="schedule-time-display">
                        {formatTime(item["Start Time"])} - {formatTime(item["End Time"])}
                      </div>
                    </div>
                    
                    <div className="schedule-location-info">
                      <div className="schedule-location-text">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}}>
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                        {item["Location"] || 'Location Not Specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
