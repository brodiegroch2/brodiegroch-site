#!/bin/bash

# Auto-sync script to pull changes from GitHub automatically
# This script monitors for changes and pulls them to your local directory

echo "🔄 Starting auto-sync monitor for brodiegroch-site..."

# Function to pull latest changes
pull_changes() {
    echo "📥 Pulling latest changes from GitHub..."
    
    # Fetch latest changes
    git fetch origin main
    
    # Check if there are new commits
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/main)
    
    if [ "$LOCAL" != "$REMOTE" ]; then
        echo "🆕 New changes detected! Pulling..."
        git pull origin main
        echo "✅ Local directory updated with latest changes"
        
        # Optional: Show what changed
        echo "📋 Recent changes:"
        git log --oneline -3
        
        # Optional: Restart development server if running
        if pgrep -f "next dev" > /dev/null; then
            echo "🔄 Development server detected - changes will be reflected automatically"
        fi
    else
        echo "✅ Local directory is up to date"
    fi
}

# Function to check for changes every 30 seconds
monitor_changes() {
    while true; do
        pull_changes
        echo "⏰ Waiting 30 seconds before next check..."
        sleep 30
    done
}

# Function to check once and exit
check_once() {
    pull_changes
    echo "✅ One-time sync complete"
}

# Parse command line arguments
case "${1:-monitor}" in
    "monitor")
        echo "🔄 Starting continuous monitoring..."
        monitor_changes
        ;;
    "once")
        echo "🔄 Running one-time sync..."
        check_once
        ;;
    "help")
        echo "Usage: $0 [monitor|once|help]"
        echo "  monitor - Continuously monitor for changes (default)"
        echo "  once    - Check for changes once and exit"
        echo "  help    - Show this help message"
        ;;
    *)
        echo "Unknown option: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
