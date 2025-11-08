#!/bin/bash

# Quick Push - Just paste your token when ready
clear
echo "╔══════════════════════════════════════════════════════════╗"
echo "║     🚀 Quick Push to GitHub - AI Recommendation System   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Open browser
echo "🌐 Opening GitHub token page..."
open "https://github.com/settings/tokens/new" 2>/dev/null || echo "   Please visit: https://github.com/settings/tokens/new"

echo ""
echo "📋 QUICK STEPS:"
echo "   1. Login to GitHub (if not already)"
echo "   2. Note name: 'AI Recommendation System'"
echo "   3. Select 'repo' scope ✅"
echo "   4. Click 'Generate token'"
echo "   5. Copy the token (ghp_...)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Wait a moment for user to see instructions
sleep 2

echo "🔐 Paste your token here (it will be hidden):"
read -s TOKEN

if [ -z "$TOKEN" ]; then
    echo ""
    echo "❌ No token provided. Exiting."
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub..."
echo ""

# Push with token
git remote set-url origin https://${TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                    ✅ SUCCESS!                            ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 Your code is live at:"
    echo "   https://github.com/tanjiroakainu/AI-Recommendation-system"
    echo ""
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    echo "🔒 Token removed from git config"
else
    echo ""
    echo "❌ Push failed. Check your token and try again."
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    exit 1
fi

