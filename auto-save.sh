#!/bin/bash

# Auto-save script - commits and pushes all changes to GitHub
echo "🔄 Auto-saving changes to GitHub..."

# Add all changes
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    # Commit with timestamp
    git commit -m "Auto-save: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Push to GitHub
    git push origin main
    
    echo "✅ Changes saved to GitHub successfully!"
    echo "🚀 Deployment will trigger automatically on Vercel"
fi
