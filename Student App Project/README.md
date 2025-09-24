# UniHUB Project

A comprehensive student management application built with HTML, CSS, and JavaScript. This application helps students track their courses, assignments, schedule, and academic progress in one centralized platform.

## 📁 Project Structure

```
UniHUB/
├── index.html                 # Main dashboard (entry point)
├── assets/                    # Static assets
│   ├── css/
│   │   └── styles.css        # Main stylesheet
│   ├── js/
│   │   └── navigation.js     # Shared navigation component
│   ├── images/               # Image assets
│   └── data/                 # JSON data files
│       ├── courses.json
│       ├── deliverables.json
│       ├── schedule.json
│       └── quick-links.json
├── pages/                     # Page modules
│   ├── courses/
│   │   ├── index.html        # Courses listing
│   │   └── course-detail.html # Individual course details
│   ├── schedule/
│   │   └── index.html        # Class schedule
│   ├── deliverables/
│   │   └── index.html        # Assignments & projects
│   ├── todo/
│   │   └── index.html        # To-do list
│   └── quick-links/
│       └── index.html        # Quick access links
├── favicon.svg               # Site icon
├── meta.json                 # Project metadata
└── README.md                 # This file
```

## 📊 JSON Data Structure

This document describes the structure and format of the JSON data files used in the UniHUB Project.

## Important Note
**NEVER add placeholder information to these JSON files.** All fields should contain actual, meaningful data or remain empty until real data is available.

## File Structure

### 1. assets/data/courses.json
Contains information about academic courses.

**Fields:**
- `Course ID` (string): Unique identifier for the course
- `Course Name` (string): Full name of the course
- `Course Average Weighted Grade` (string): Current weighted average grade for the course
- `Credit Hours` (string): Number of credit hours the course is worth
- `Course Description` (string): Detailed description of the course content
- `Professor/Teacher Name` (string): Full name of the instructor
- `Professor/Teacher Email` (string): Email address of the instructor

**Example Structure:**
```json
[
  {
    "Course ID": "CS101",
    "Course Name": "Introduction to Computer Science",
    "Course Average Weighted Grade": "85.5",
    "Credit Hours": "3",
    "Course Description": "Fundamental concepts of computer science and programming",
    "Professor/Teacher Name": "Dr. Jane Smith",
    "Professor/Teacher Email": "jane.smith@university.edu"
  }
]
```

### 2. assets/data/deliverables.json
Contains information about assignments, projects, and other course deliverables.

**Fields:**
- `Course ID` (string): Reference to the course this deliverable belongs to
- `Category` (string): Type of deliverable (e.g., "Assignment", "Project", "Exam", "Quiz", "Lab")
- `Deliverable` (string): Name or title of the specific deliverable
- `Open Date` (string): Date when the deliverable becomes available
- `Close Date` (string): Due date for the deliverable
- `Weight %` (string): Percentage weight of this deliverable in the course grade
- `Grade %` (string): Percentage grade received (if graded)
- `Letter Grade` (string): Letter grade received (if graded)

**Example Structure:**
```json
[
  {
    "Course ID": "CS101",
    "Category": "Assignment",
    "Deliverable": "Programming Project 1",
    "Open Date": "2024-01-15",
    "Close Date": "2024-01-22",
    "Weight %": "15",
    "Grade %": "92",
    "Letter Grade": "A-"
  }
]
```

### 3. assets/data/schedule.json
Contains scheduling information for courses and events.

**Fields:**
- `Course ID` (string): Reference to the course
- `Day of Week` (string): Day of the week when the class occurs (e.g., "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
- `Start Time` (string): Start date and time of the event
- `End Time` (string): End date and time of the event
- `Location` (string): Physical location or room where the event takes place
- `Recurring` (string): Whether the event repeats ("Yes" or "No")
- `Period` (string): Recurrence period if applicable (e.g., "Weekly", "One-time")

**Example Structure:**
```json
[
  {
    "Course ID": "CS101",
    "Day of Week": "Monday",
    "Start Time": "2024-01-15 09:00",
    "End Time": "2024-01-15 10:30",
    "Location": "Room 205, Engineering Building",
    "Recurring": "Yes",
    "Period": "Weekly"
  }
]
```

### 4. assets/data/quick-links.json
Contains quick access links and resources.

**Fields:**
- `Site Name` (string): Display name for the link
- `Address` (string): URL or address of the resource
- `Link_image_id` (string): Identifier for associated image/icon

**Example Structure:**
```json
[
  {
    "Site Name": "University Portal",
    "Address": "https://portal.university.edu",
    "Link_image_id": "university_logo"
  }
]
```

## Data Guidelines

1. **No Placeholder Data**: Never use placeholder text like "Sample Data", "TBD", "N/A", or similar. Leave fields empty if data is not available.

2. **Date Format**: Use consistent date formats (recommended: YYYY-MM-DD for dates, YYYY-MM-DD HH:MM for date/time)

3. **Empty Fields**: Use empty strings ("") for fields without data rather than null values

4. **Data Validation**: Ensure Course IDs are consistent across all files when referencing the same course

5. **File Updates**: When adding new entries, maintain the array structure and add new objects to the existing array

## Usage
These JSON files serve as the data layer for the UniHUB Project. They can be loaded and manipulated by the frontend application to display course information, schedules, assignments, and quick links to students.
