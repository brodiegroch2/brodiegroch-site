#!/bin/bash

# Setup script for auto-sync functionality
# This script helps you configure automatic synchronization

echo "🔧 Setting up auto-sync for brodiegroch-site..."

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Auto-sync configuration
LOCAL_SYNC=true
WEBHOOK_SECRET=your-secret-key-$(date +%s)
LOCAL_WEBHOOK_URL=http://localhost:3000/api/webhook/sync

# GitHub configuration
GITHUB_TOKEN=your-github-token-here
GITHUB_REPO_PATH=$(pwd)
GITHUB_USERNAME=brodiegroch2
GITHUB_EMAIL=your-email@example.com
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

# Make auto-sync script executable
chmod +x auto-sync.sh
echo "✅ Made auto-sync.sh executable"

# Test git configuration
echo "🔍 Checking git configuration..."
if git remote -v | grep -q "origin"; then
    echo "✅ Git remote 'origin' is configured"
else
    echo "❌ Git remote 'origin' not found. Please configure it:"
    echo "   git remote add origin https://github.com/brodiegroch2/brodiegroch-site.git"
fi

# Check if we can push to GitHub
echo "🔍 Testing GitHub access..."
if git push origin main --dry-run > /dev/null 2>&1; then
    echo "✅ GitHub push access is working"
else
    echo "❌ GitHub push access failed. Please check your authentication:"
    echo "   - Make sure you're logged in: git config --global user.name"
    echo "   - Check your GitHub token or SSH key"
fi

echo ""
echo "🚀 Setup complete! Here's how to use auto-sync:"
echo ""
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. In another terminal, start auto-sync monitoring:"
echo "   ./auto-sync.sh monitor"
echo ""
echo "3. Or run a one-time sync:"
echo "   ./auto-sync.sh once"
echo ""
echo "4. Any changes made through the website will now:"
echo "   ✅ Be saved to GitHub automatically"
echo "   ✅ Be pulled to your local directory"
echo "   ✅ Update your local files in real-time"
echo ""
echo "📋 Manual sync commands:"
echo "   git pull origin main    # Pull latest changes"
echo "   git status              # Check for local changes"
echo "   git log --oneline -5    # See recent commits"
