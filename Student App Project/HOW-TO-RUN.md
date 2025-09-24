# How to Run UniHUB

## Option 1: Using VS Code Live Server (Recommended)

1. Open the project folder in VS Code
2. Right-click on `index.html` in the file explorer
3. Select "Open with Live Server"
4. The application will open in your browser automatically

## Option 2: Using Python HTTP Server

1. Double-click `start-server.bat` in the project folder
2. Open your browser and go to `http://localhost:3000`

## Option 3: Manual Python Server

1. Open Command Prompt or PowerShell in the project folder
2. Run: `python -m http.server 3000`
3. Open your browser and go to `http://localhost:3000`

## Important Notes

- **Do NOT** double-click `index.html` directly - this will not work due to browser security restrictions
- The application requires a web server to load the JSON data files
- All data is loaded from the `assets/data/` folder

## Troubleshooting

If you see a "Live Server Required" message:
- Make sure you're using one of the methods above
- Check that all JSON files exist in `assets/data/`
- Ensure your browser allows local file access

## Features

- **Dashboard**: Overview of courses, grades, and upcoming deadlines
- **Courses**: Detailed course information and progress
- **Deliverables**: Assignment tracking and management
- **Schedule**: Class schedule and timetable
- **Quick Links**: Access to frequently used resources
- **To Do**: Undated deliverables that need attention
