#!/bin/bash

# Auto push script - Opens GitHub token page and pushes automatically
echo "🚀 Auto Push Script for AI Recommendation System"
echo "================================================"
echo ""

# Open GitHub token creation page in default browser
echo "🌐 Opening GitHub token creation page..."
echo "   URL: https://github.com/settings/tokens/new"
echo ""

# Try to open in browser (works on macOS, Linux, Windows)
if command -v open &> /dev/null; then
    # macOS
    open "https://github.com/settings/tokens/new"
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open "https://github.com/settings/tokens/new"
elif command -v start &> /dev/null; then
    # Windows
    start "https://github.com/settings/tokens/new"
else
    echo "⚠️  Could not auto-open browser. Please visit:"
    echo "   https://github.com/settings/tokens/new"
fi

echo ""
echo "📝 Follow these steps:"
echo "   1. Note name: 'AI Recommendation System Push'"
echo "   2. Select expiration: '90 days' (or your preference)"
echo "   3. Check the 'repo' scope (all repo permissions)"
echo "   4. Scroll down and click 'Generate token'"
echo "   5. Copy the token (starts with ghp_)"
echo ""
echo "⏳ Waiting for you to create the token..."
echo "   (Press Enter when ready to paste the token)"
read -p "   Press Enter to continue... " dummy

echo ""
echo "🔐 Paste your GitHub token here:"
read -s TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token is required!"
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub with your token..."

# Set remote with token
git remote set-url origin https://${TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git

# Push
echo "   Pushing commits..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo "🌐 Repository: https://github.com/tanjiroakainu/AI-Recommendation-system"
    echo ""
    # Clean up - remove token from URL
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    echo "🔒 Token removed from git config for security"
    echo ""
    echo "✨ All done! Your code is now on GitHub."
else
    echo ""
    echo "❌ Push failed. Possible reasons:"
    echo "   - Token is invalid or expired"
    echo "   - Token doesn't have 'repo' permissions"
    echo "   - Repository doesn't exist or you don't have access"
    echo ""
    echo "💡 Try creating a new token and run this script again."
    # Clean up
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    exit 1
fi
