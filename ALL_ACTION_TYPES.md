# All Available Action Types - SAIT MET Console API

## Overview

This document lists all available actions (API operations) for the SAIT MET Console, organized by category and HTTP method.

**Total Actions:** 27 operations across 10 categories

---

## Action Categories

### 1. 📚 Simple Courses (4 actions) - /api/data/courses
### 2. 📖 Detailed Courses (4 actions) - /api/courses
### 3. 🔗 Quick Links (4 actions)
### 4. 📅 Schedule (4 actions)
### 5. 📊 Grading Scale (4 actions)
### 6. 📝 Deliverables (2 actions)
### 7. 📰 News & Announcements (1 action)
### 8. 📆 Calendar (1 action)
### 9. 🕐 Time (1 action)
### 10. 📖 Documentation (2 actions)

---

## 1. Course Management (4 Actions)

### listCourses
- **Method:** GET
- **Path:** /api/data/courses
- **Approval Required:** ❌ No (Read-only)
- **Parameters:** `id` (optional, filter by course ID)
- **Returns:** Array of course objects
- **Use Case:** View all courses or get specific course details

### createCourse
- **Method:** POST
- **Path:** /api/data/courses
- **Approval Required:** ✅ Yes
- **Required Fields:** Course ID, Course Name
- **Optional Fields:** Credit Hours, Course Description, Professor/Teacher Name, Professor/Teacher Email, Course Average Weighted Grade
- **Returns:** Created course object (201)
- **Use Case:** Add new course to system

### updateCourse
- **Method:** PUT
- **Path:** /api/data/courses
- **Approval Required:** ✅ Yes
- **Required Fields:** Course ID (to identify which course)
- **Optional Fields:** Any course field to update
- **Returns:** Updated course object (200)
- **Use Case:** Update course information (name, professor, description, etc.)

### deleteCourse
- **Method:** DELETE
- **Path:** /api/data/courses
- **Approval Required:** ✅ Yes
- **Required Parameters:** `id` (query param - Course ID to delete)
- **Returns:** Success object (200)
- **Use Case:** Remove course from system

---

## 2. Detailed Course Management (4 Actions)

**Note:** These operations work with detailed individual course JSON files containing modules, learning outcomes, assessments, and complete course structure.

### getDetailedCourses
- **Method:** GET
- **Path:** /api/courses
- **Approval Required:** ❌ No (Read-only)
- **Parameters:** `id` (optional, filter by course ID like "COMP-213")
- **Returns:** Array of course objects or single course
- **Use Case:** Retrieve detailed course information including modules, assessments, and learning outcomes

### createDetailedCourse
- **Method:** POST
- **Path:** /api/courses
- **Approval Required:** ✅ Yes
- **Required Fields:** Course JSON file with id/code, name, description
- **Optional Fields:** Modules, learning outcomes, assessment, schedule, instructor details
- **Returns:** Created course object (201)
- **Use Case:** Create a new detailed course JSON file with complete course structure

### updateDetailedCourse
- **Method:** PUT
- **Path:** /api/courses
- **Approval Required:** ✅ Yes
- **Required Fields:** Course JSON with id/code to identify course
- **Optional Fields:** Any course field including modules, assessments, learning outcomes
- **Returns:** Updated course object (200)
- **Use Case:** Update course modules, assessments, or any detailed course information

### deleteDetailedCourse
- **Method:** DELETE
- **Path:** /api/courses
- **Approval Required:** ✅ Yes
- **Required Parameters:** `id` (query param - Course ID to delete)
- **Returns:** Success object (200)
- **Use Case:** Remove a detailed course JSON file from the system

---

## 3. Quick Links Management (4 Actions)

### listQuickLinks
- **Method:** GET
- **Path:** /api/data/quick-links
- **Approval Required:** ❌ No (Read-only)
- **Parameters:** `name` (optional, filter by Site Name)
- **Returns:** Array of quick link objects
- **Use Case:** View all quick links or find specific link

### createQuickLink
- **Method:** POST
- **Path:** /api/data/quick-links
- **Approval Required:** ✅ Yes
- **Required Fields:** Site Name, Address
- **Optional Fields:** Link_image_id, Category
- **Returns:** Created quick link object (201)
- **Use Case:** Add new bookmark/resource link

### updateQuickLink
- **Method:** PUT
- **Path:** /api/data/quick-links
- **Approval Required:** ✅ Yes
- **Required Fields:** Site Name (to identify which link)
- **Optional Fields:** Address, Link_image_id, Category
- **Returns:** Updated quick link object (200)
- **Use Case:** Update link URL, category, or image

### deleteQuickLink
- **Method:** DELETE
- **Path:** /api/data/quick-links
- **Approval Required:** ✅ Yes
- **Required Parameters:** `name` (query param - Site Name to delete)
- **Returns:** Success object (200)
- **Use Case:** Remove quick link from system

---

## 5. Schedule Management (4 Actions)

### listSchedule
- **Method:** GET
- **Path:** /api/data/schedule
- **Approval Required:** ❌ No (Read-only)
- **Parameters:** 
  - `courseId` (optional, filter by course)
  - `dayOfWeek` (optional, filter by day)
- **Returns:** Array of schedule items
- **Use Case:** View class schedule, filter by course or day

### createScheduleItem
- **Method:** POST
- **Path:** /api/data/schedule
- **Approval Required:** ✅ Yes
- **Required Fields:** Course ID, Day of Week, Start Time, End Time
- **Optional Fields:** Location, Recurring, Period
- **Returns:** Created schedule item (201)
- **Use Case:** Add new class time to schedule

### updateScheduleItem
- **Method:** PUT
- **Path:** /api/data/schedule
- **Approval Required:** ✅ Yes
- **Required Fields:** Course ID, Day of Week, Start Time (to identify item)
- **Optional Fields:** End Time, Location, Recurring, Period
- **Returns:** Updated schedule item (200)
- **Use Case:** Change class time or location

### deleteScheduleItem
- **Method:** DELETE
- **Path:** /api/data/schedule
- **Approval Required:** ✅ Yes
- **Required Parameters:**
  - `courseId` (Course ID)
  - `dayOfWeek` (Day of week)
  - `startTime` (Start time)
- **Returns:** Success object (200)
- **Use Case:** Remove class from schedule

---

## 6. Grading Scale Management (4 Actions)

### listGradingScale
- **Method:** GET
- **Path:** /api/data/grading-scale
- **Approval Required:** ❌ No (Read-only)
- **Parameters:** `letterGrade` (optional, filter by grade)
- **Returns:** Array of grading scale objects
- **Use Case:** View grading scale or find specific grade definition

### createGradeScale
- **Method:** POST
- **Path:** /api/data/grading-scale
- **Approval Required:** ✅ Yes
- **Required Fields:** minPercentage, maxPercentage, letterGrade
- **Optional Fields:** gradePoints
- **Returns:** Created grade scale object (201)
- **Use Case:** Add new grade definition to scale

### updateGradeScale
- **Method:** PUT
- **Path:** /api/data/grading-scale
- **Approval Required:** ✅ Yes
- **Required Fields:** letterGrade (to identify which grade)
- **Optional Fields:** minPercentage, maxPercentage, gradePoints
- **Returns:** Updated grade scale object (200)
- **Use Case:** Modify grade boundaries or points

### deleteGradeScale
- **Method:** DELETE
- **Path:** /api/data/grading-scale
- **Approval Required:** ✅ Yes
- **Required Parameters:** `letterGrade` (query param)
- **Returns:** Success object (200)
- **Use Case:** Remove grade definition from scale

---

## 7. Deliverables Management (2 Actions)

### listDeliverables
- **Method:** GET
- **Path:** /api/data/deliverables
- **Approval Required:** ❌ No (Read-only)
- **Returns:** Array of all deliverables (assignments, labs, quizzes, exams)
- **Use Case:** View all coursework, filter by course or status

### updateDeliverable
- **Method:** PUT
- **Path:** /api/data/deliverables
- **Approval Required:** ✅ Yes
- **Required Fields:** Course ID, Deliverable name, Open Date
- **Optional Fields:** Close Date, Weight %, Grade %, Letter Grade, Status, Category
- **Returns:** Updated deliverable object (200)
- **Use Case:** Update assignment status, grades, or due dates

**Note:** Deliverables don't have POST or DELETE operations - they're managed through the web interface and synced via GitHub.

---

## 8. News & Announcements (1 Action)

### getNewsFeed
- **Method:** GET
- **Path:** /api/news
- **Approval Required:** ❌ No (Read-only)
- **Parameters:** `courseId` (optional, filter by specific course)
- **Returns:** Object containing news grouped by course
- **Features:**
  - Fetches from Brightspace/D2L RSS feeds
  - Auto-strips HTML tags
  - 5-minute caching
- **Use Case:** Get latest course announcements from Brightspace

---

## 9. Calendar Feed (1 Action)

### getCalendarFeed
- **Method:** GET
- **Path:** /api/calendar
- **Approval Required:** ❌ No (Read-only)
- **Returns:** ICS (iCalendar) format file
- **Features:**
  - Includes all recurring weekly classes
  - Ready to import into calendar apps
  - Includes location and time information
- **Use Case:** Generate calendar file for Google Calendar, Apple Calendar, Outlook

---

## 10. Time Information (1 Action)

### getCurrentTime
- **Method:** GET
- **Path:** /api/time
- **Approval Required:** ❌ No (Read-only)
- **Returns:** Current date and time information
- **Features:**
  - ISO 8601 timestamp
  - Human-readable date and time
  - Timezone information (America/Edmonton)
  - Unix timestamp
  - Individual date components (year, month, day, weekday)
- **Use Case:** Get current server time for scheduling, deadlines, or time-sensitive operations

---

## 11. Documentation (1 Action)

### getActionDocs
- **Method:** GET
- **Path:** /api/actions
- **Approval Required:** ❌ No (Read-only)
- **Parameters:**
  - `action` (optional, filter by specific action name)
  - `category` (optional, filter by category like "Course Management")
- **Returns:** Documentation from actions.txt file
- **Use Case:** GPT self-reference to understand available API endpoints

---

## Action Summary by HTTP Method

### GET Methods (Read-Only) - 13 actions
- listCourses
- getDetailedCourses
- listQuickLinks
- listSchedule
- listGradingScale
- listDeliverables
- getNewsFeed
- getCalendarFeed
- getCurrentTime
- getActionDocs

### POST Methods (Create) - 5 actions
- createCourse
- createDetailedCourse
- createQuickLink
- createScheduleItem
- createGradeScale

### PUT Methods (Update) - 6 actions
- updateCourse
- updateDetailedCourse
- updateQuickLink
- updateScheduleItem
- updateGradeScale
- updateDeliverable

### DELETE Methods (Remove) - 5 actions
- deleteCourse
- deleteDetailedCourse
- deleteQuickLink
- deleteScheduleItem
- deleteGradeScale

---

## Approval Requirements

### ✅ Requires User Approval (16 actions)
All POST, PUT, and DELETE operations require approval before execution.

### ❌ No Approval Required (13 actions)
All GET operations can be called freely without approval.

---

## Field Name Formats

All actions support both formats for field names:

**Underscore Format (GPT native):**
```json
{
  "Course___ID": "MET250",
  "Site___Name": "Brightspace"
}
```

**Space Format (API native):**
```json
{
  "Course ID": "MET250",
  "Site Name": "Brightspace"
}
```

The API automatically converts between formats using normalization.

---

## Common Use Cases

### Student Workflow
1. Check schedule: `listSchedule`
2. View upcoming assignments: `listDeliverables`
3. Get course info: `listCourses`
4. Update grade: `updateDeliverable` (requires approval)
5. Add link: `createQuickLink` (requires approval)

### Academic Management
1. Add new course: `createCourse` (requires approval)
2. Update professor info: `updateCourse` (requires approval)
3. Add schedule times: `createScheduleItem` (requires approval)
4. Generate calendar: `getCalendarFeed`

---

## Error Responses

All actions return appropriate error responses:

- **400 Bad Request** - Invalid input or missing required fields
- **404 Not Found** - Resource doesn't exist
- **500 Server Error** - Internal server error

Error objects follow this structure:
```json
{
  "error": "Error message",
  "message": "Additional details"
}
```

---

## Best Practices

1. **Use GET freely** - No approval needed for reading data
2. **Batch updates** - Update multiple fields in one request when possible
3. **Provide complete objects** - When updating, include all fields
4. **Warn about approval** - Inform users when actions require approval
5. **Use filters** - Query parameters help narrow results
6. **Handle errors** - Check status codes and error messages

---

## Total Summary

- **Total Actions:** 27
- **GET:** 13 (read-only)
- **POST:** 5 (create)
- **PUT:** 6 (update)
- **DELETE:** 5 (remove)
- **Categories:** 10
- **All Actions Documented:** ✅
- **All Actions Tested:** ✅
- **All Actions Production Ready:** ✅

