# UniHUB Project - Next.js Version

A comprehensive student management application built with Next.js 14, React, and TypeScript. This application helps students track their courses, assignments, schedule, and academic progress in one centralized platform.

## 🔒 Security Features

- **Password Protection**: Access controlled by password (`$408621geidorB`)
- **IP Bypass**: Automatic access from authorized IP address (`161.184.170.120`)
- **Session Management**: Authentication persists during browser session

## 📁 Project Structure

```
brodiegroch-site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Dashboard (homepage)
│   │   ├── courses/           # Course management pages
│   │   ├── deliverables/       # Assignment tracking pages
│   │   ├── schedule/           # Class schedule pages
│   │   ├── quick-links/        # Resource access pages
│   │   ├── todo/               # To-do list pages
│   │   ├── api/data/           # API routes for data access
│   │   ├── globals.css         # Main stylesheet
│   │   └── layout.tsx          # Root layout with navigation
│   ├── components/             # React components
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── Navigation.tsx      # Navigation component
│   │   └── PasswordProtection.tsx # Authentication component
│   └── data/                   # TypeScript data files
│       ├── courses.json        # Course information
│       ├── deliverables.json   # Assignment data
│       ├── schedule.json       # Class schedule
│       ├── quick-links.json    # Resource links
│       └── meta.ts             # Project metadata
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   ├── favicon.svg             # Site icon
│   └── meta.json               # Project metadata (JSON)
└── Student App Project/        # Original HTML/CSS/JS version
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/brodiegroch2/brodiegroch-site.git
   cd brodiegroch-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Enter password: `$408621geidorB` (or access from authorized IP)

### Deployment

The application is automatically deployed to Vercel:
- **Production URL**: [brodiegroch-site.vercel.app](https://brodiegroch-site.vercel.app)
- **GitHub Repository**: [brodiegroch2/brodiegroch-site](https://github.com/brodiegroch2/brodiegroch-site)

## 📊 Data Structure

### Course Information (`courses.json`)
- Course ID, Name, Description
- Credit Hours, Instructor Details
- Current Grade (if available)

### Assignment Tracking (`deliverables.json`)
- Assignment Categories (Quiz, Lab, Exam, etc.)
- Due Dates, Open Dates
- Weight Percentage, Grades Received

### Class Schedule (`schedule.json`)
- Day of Week, Start/End Times
- Location, Recurring Status
- Course References

### Quick Links (`quick-links.json`)
- Resource Names, URLs
- Associated Images/Icons
- External Resource Access

## 🎨 Features

### Dashboard
- **Real-time Countdown**: Time until next assignment due
- **Live Statistics**: Active courses, completed assignments, upcoming deadlines
- **Quick Actions**: Direct navigation to all sections
- **Progress Monitoring**: Visual progress indicators

### Course Management
- **Course Overview**: Detailed course information
- **Instructor Contact**: Direct email links
- **Grade Tracking**: Current progress monitoring

### Assignment Tracking
- **Category Filtering**: Filter by assignment type
- **Status Indicators**: Completed, overdue, urgent, normal
- **Due Date Management**: Visual deadline tracking
- **Grade Display**: Percentage and letter grades

### Schedule Management
- **Day Filtering**: View by specific days
- **Time Formatting**: 12-hour format display
- **Location Details**: Room and building information
- **Recurring Events**: Weekly class schedules

### Quick Links
- **Resource Access**: Direct links to external tools
- **Icon Display**: Visual identification
- **External Opening**: New tab/window access

### To-Do Management
- **Undated Items**: Assignments without due dates
- **Action Buttons**: Set due date functionality
- **Priority Indicators**: Visual attention markers

## 🔧 Technical Implementation

### Frontend
- **Next.js 14**: App Router, Server Components
- **React 18**: Hooks, State Management
- **TypeScript**: Type Safety, Interfaces
- **CSS Modules**: Scoped Styling

### Backend
- **API Routes**: Next.js API endpoints
- **JSON Data**: Static data files
- **Type Safety**: TypeScript interfaces

### Security
- **Client-side Protection**: React component-based
- **Session Storage**: Browser session persistence
- **IP Verification**: External service integration

## 📱 Responsive Design

- **Mobile First**: Optimized for all screen sizes
- **Dark Theme**: Professional dark interface
- **Touch Friendly**: Mobile-optimized interactions
- **Accessibility**: Screen reader compatible

## 🎯 Academic Information

- **Institution**: SAIT (Southern Alberta Institute of Technology)
- **Program**: Engineering Technology
- **Academic Year**: 2025-2026
- **Semester**: Fall 2025
- **Total Courses**: 6
- **Total Credits**: 15

## 📈 Performance

- **Static Generation**: Pre-built pages for speed
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic bundle optimization
- **Caching**: Vercel edge caching

## 🔄 Data Management

### Guidelines
1. **No Placeholder Data**: Only real, meaningful data
2. **Consistent Formats**: Standardized date/time formats
3. **Empty Fields**: Use empty strings, not null values
4. **Data Validation**: Consistent Course IDs across files
5. **Array Structure**: Maintain JSON array format

### Updates
- **Real-time Loading**: API-based data fetching
- **Error Handling**: Graceful failure management
- **Loading States**: User feedback during data loads

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### File Organization
- **Components**: Reusable UI components
- **Pages**: Route-based page components
- **API**: Server-side data endpoints
- **Data**: TypeScript interfaces and JSON files
- **Styles**: Global CSS with component-specific styles

## 📝 License

This project is part of Brodie Groch's personal website and academic portfolio.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome through GitHub issues.

---

**Built with systems thinking and attention to detail.**
