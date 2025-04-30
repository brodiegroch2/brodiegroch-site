# Brodie Groch Personal Website

A modern, responsive personal website built with Next.js 14, React, and Tailwind CSS.

## Features

- Modern and responsive design
- Dark mode support
- Project showcase
- Contact form
- SEO optimized

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- ESLint
- Vercel (deployment)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/brodiegroch2/brodiegroch-site.git
cd brodiegroch-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
brodiegroch-site/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Home page
│   │   ├── projects/
│   │   │   └── page.tsx        # Projects page
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact page
│   │   └── layout.tsx          # Root layout
│   └── components/
│       └── Navigation.tsx      # Navigation component
├── public/                     # Static files
├── package.json
└── README.md
```

## Deployment

This site is configured for deployment on Vercel. To deploy:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your site

## License

MIT 