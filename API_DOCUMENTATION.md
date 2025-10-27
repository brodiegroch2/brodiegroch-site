# API Documentation

This document describes all available API endpoints for managing data files on brodiegroch.ca.

## Table of Contents

- [Courses API](#courses-api)
- [Deliverables API](#deliverables-api)
- [Quick Links API](#quick-links-api)
- [Schedule API](#schedule-api)
- [Grading Scale API](#grading-scale-api)

---

## Courses API

**Base URL:** `/api/data/courses`

### GET - List All Courses
```
GET /api/data/courses
```
Returns all courses.

**Response:**
```json
[
  {
    "Course ID": "COMP 213",
    "Course Name": "Computing for Engineering Technology",
    "Credit Hours": "3",
    ...
  }
]
```

### GET - Get Single Course
```
GET /api/data/courses?id={courseId}
```

**Parameters:**
- `id` (string, required): Course ID (e.g., "COMP 213")

**Response:**
```json
{
  "Course ID": "COMP 213",
  "Course Name": "Computing for Engineering Technology",
  "Credit Hours": "3",
  ...
}
```

### POST - Create Course
```
POST /api/data/courses
Content-Type: application/json

{
  "Course ID": "NEW 101",
  "Course Name": "New Course",
  "Credit Hours": "3",
  ...
}
```

### PUT - Update Course
```
PUT /api/data/courses
Content-Type: application/json

{
  "Course ID": "COMP 213",
  "Course Name": "Updated Name",
  ...
}
```

### DELETE - Delete Course
```
DELETE /api/data/courses?id={courseId}
```

**Parameters:**
- `id` (string, required): Course ID

---

## Deliverables API

**Base URL:** `/api/data/deliverables`

### GET - List All Deliverables
```
GET /api/data/deliverables
```

Returns all deliverables.

### PUT - Update Deliverable
```
PUT /api/data/deliverables
Content-Type: application/json

{
  "Course ID": "MECH 205",
  "Category": "Quiz",
  "Deliverable": "Quiz 2a",
  "Grade %": "100",
  ...
}
```

**Note:** Deliverables use Course ID + Deliverable + Open Date as unique identifier.

---

## Quick Links API

**Base URL:** `/api/data/quick-links`

### GET - List All Links
```
GET /api/data/quick-links
```

### GET - Get Single Link
```
GET /api/data/quick-links?name={siteName}
```

### POST - Create Link
```
POST /api/data/quick-links
Content-Type: application/json

{
  "Site Name": "New Site",
  "Address": "https://example.com",
  "Link_image_id": "image.png",
  "Category": "Tools"
}
```

### PUT - Update Link
```
PUT /api/data/quick-links
Content-Type: application/json

{
  "Site Name": "Updated Site",
  ...
}
```

### DELETE - Delete Link
```
DELETE /api/data/quick-links?name={siteName}
```

---

## Schedule API

**Base URL:** `/api/data/schedule`

### GET - List All Schedule Items
```
GET /api/data/schedule
```

### GET - Filter by Course
```
GET /api/data/schedule?courseId={courseId}
```

### GET - Filter by Course and Day
```
GET /api/data/schedule?courseId={courseId}&dayOfWeek={day}
```

**Example:**
```
GET /api/data/schedule?courseId=MECH 205&dayOfWeek=Monday
```

### POST - Create Schedule Item
```
POST /api/data/schedule
Content-Type: application/json

{
  "Course ID": "MECH 205",
  "Day of Week": "Monday",
  "Start Time": "2025-09-01 08:00",
  "End Time": "2025-09-01 10:50",
  "Location": "Room 101",
  ...
}
```

### PUT - Update Schedule Item
```
PUT /api/data/schedule
Content-Type: application/json

{
  "Course ID": "MECH 205",
  "Day of Week": "Monday",
  "Start Time": "2025-09-01 08:00",
  ...
}
```

### DELETE - Delete Schedule Item
```
DELETE /api/data/schedule?courseId={id}&dayOfWeek={day}&startTime={time}
```

---

## Grading Scale API

**Base URL:** `/api/data/grading-scale`

### GET - List All Grade Scales
```
GET /api/data/grading-scale
```

### GET - Get Single Grade
```
GET /api/data/grading-scale?letterGrade={grade}
```

**Example:**
```
GET /api/data/grading-scale?letterGrade=A+
```

### POST - Create Grade Scale
```
POST /api/data/grading-scale
Content-Type: application/json

{
  "minPercentage": 95,
  "maxPercentage": 100,
  "letterGrade": "A+",
  "gradePoints": 4.0
}
```

### PUT - Update Grade Scale
```
PUT /api/data/grading-scale
Content-Type: application/json

{
  "letterGrade": "A+",
  "minPercentage": 95,
  "maxPercentage": 100,
  "gradePoints": 4.0
}
```

### DELETE - Delete Grade Scale
```
DELETE /api/data/grading-scale?letterGrade={grade}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Error message"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to process request"
}
```

---

## Examples

### Python Example

```python
import requests

# Get all courses
response = requests.get('https://brodiegroch.ca/api/data/courses')
courses = response.json()

# Create a new course
new_course = {
    "Course ID": "NEW 101",
    "Course Name": "New Course",
    "Credit Hours": "3"
}
response = requests.post('https://brodiegroch.ca/api/data/courses', json=new_course)

# Update a course
updated_course = {
    "Course ID": "COMP 213",
    "Course Name": "Updated Name",
    "Credit Hours": "3"
}
response = requests.put('https://brodiegroch.ca/api/data/courses', json=updated_course)

# Delete a course
response = requests.delete('https://brodiegroch.ca/api/data/courses?id=NEW 101')
```

### JavaScript/TypeScript Example

```typescript
// Get all courses
const courses = await fetch('/api/data/courses').then(r => r.json());

// Create a new course
await fetch('/api/data/courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    'Course ID': 'NEW 101',
    'Course Name': 'New Course',
    'Credit Hours': '3'
  })
});

// Delete a course
await fetch('/api/data/courses?id=NEW 101', {
  method: 'DELETE'
});
```

### cURL Examples

```bash
# Get all courses
curl https://brodiegroch.ca/api/data/courses

# Get specific course
curl https://brodiegroch.ca/api/data/courses?id=COMP%20213

# Create new course
curl -X POST https://brodiegroch.ca/api/data/courses \
  -H "Content-Type: application/json" \
  -d '{"Course ID":"NEW 101","Course Name":"New Course"}'

# Update course
curl -X PUT https://brodiegroch.ca/api/data/courses \
  -H "Content-Type: application/json" \
  -d '{"Course ID":"COMP 213","Course Name":"Updated"}'

# Delete course
curl -X DELETE 'https://brodiegroch.ca/api/data/courses?id=NEW 101'
```

---

## Notes

- All timestamps should be in ISO format or the format used in the existing data
- Course IDs are case-sensitive
- File writes happen synchronously and are immediately available
- These APIs only work in development mode or when deployed with write access

