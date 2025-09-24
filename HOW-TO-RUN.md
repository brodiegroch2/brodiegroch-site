# How to Run UniHUB - Next.js Version

## 🔒 Authentication

**Password**: `$408621geidorB`
**IP Bypass**: Automatic access from IP `161.184.170.120`

## 🚀 Running the Application

### Option 1: Development Server (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Enter the password or access from authorized IP

### Option 2: Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

### Option 3: Live Production Site

**Direct Access**: [brodiegroch-site.vercel.app](https://brodiegroch-site.vercel.app)

## 📱 Features Available

### Dashboard (`/`)
- Real-time countdown to next assignment
- Live statistics (courses, assignments, grades)
- Quick action buttons for navigation

### Courses (`/courses`)
- Complete course information
- Instructor contact details
- Course descriptions and credit hours

### Deliverables (`/deliverables`)
- Assignment tracking with filtering
- Due date management
- Grade display and status indicators

### Schedule (`/schedule`)
- Class schedule with day filtering
- Time and location details
- Recurring event management

### Quick Links (`/quick-links`)
- Access to external resources
- SAIT portal, Brightspace, Pearson MyLab
- Direct links with icons

### To Do (`/todo`)
- Undated deliverables
- Items requiring attention
- Action buttons for management

## 🔧 Technical Requirements

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Package manager
- **Modern Browser**: Chrome, Firefox, Safari, Edge

### Development Tools
- **VS Code**: Recommended editor
- **Live Server Extension**: For development
- **Git**: Version control

## 📊 Data Management

### Data Sources
- **Courses**: `/src/data/courses.json`
- **Deliverables**: `/src/data/deliverables.json`
- **Schedule**: `/src/data/schedule.json`
- **Quick Links**: `/src/data/quick-links.json`

### API Endpoints
- `/api/data/courses` - Course information
- `/api/data/deliverables` - Assignment data
- `/api/data/schedule` - Class schedule
- `/api/data/quick-links` - Resource links

## 🎨 Customization

### Styling
- **Global Styles**: `/src/app/globals.css`
- **Dark Theme**: Professional dark interface
- **Responsive Design**: Mobile-first approach

### Configuration
- **Metadata**: `/src/data/meta.ts`
- **Settings**: Configurable in meta data
- **Academic Info**: Institution and program details

## 🚨 Troubleshooting

### Common Issues

**"Cannot access site"**
- Ensure you're using the correct password
- Check if you're accessing from the authorized IP
- Clear browser cache and try again

**"Data not loading"**
- Check internet connection
- Verify API endpoints are accessible
- Check browser console for errors

**"Styling issues"**
- Hard refresh the page (Ctrl+F5)
- Clear browser cache
- Check if CSS files are loading

### Development Issues

**"Build errors"**
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors in console
- Verify all imports are correct

**"API errors"**
- Check if data files exist in `/src/data/`
- Verify API route implementations
- Check network tab in browser dev tools

## 📈 Performance

### Optimization Features
- **Static Generation**: Pre-built pages for speed
- **Image Optimization**: Automatic image processing
- **Code Splitting**: Efficient bundle loading
- **Caching**: Browser and server-side caching

### Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Core Web Vitals**: Performance metrics
- **Error Tracking**: Automatic error reporting

## 🔄 Updates

### Automatic Deployment
- **GitHub Integration**: Push to main branch triggers deployment
- **Vercel**: Automatic builds and deployments
- **Zero Downtime**: Seamless updates

### Manual Updates
- **Data Changes**: Update JSON files in `/src/data/`
- **Code Changes**: Modify React components
- **Styling Changes**: Update CSS files

## 📞 Support

### Getting Help
- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check this file and README
- **Code Comments**: Inline documentation in code

### Academic Support
- **SAIT Resources**: Use Quick Links for institutional resources
- **Course Information**: Check individual course pages
- **Assignment Tracking**: Use Deliverables page for due dates

---

**Built with Next.js 14, React, and TypeScript for optimal performance and developer experience.**
