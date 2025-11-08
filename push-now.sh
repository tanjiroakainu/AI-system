#!/bin/bash

# Quick push script - Enter your token when prompted
# Repository: https://github.com/tanjiroakainu/AI-Recommendation-system

echo "🔐 Enter your GitHub Personal Access Token:"
echo "   (Get it from: https://github.com/settings/tokens)"
read -s TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token is required!"
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub..."

# Set remote with token
git remote set-url origin https://${TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git

# Push
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repo: https://github.com/tanjiroakainu/AI-Recommendation-system"
    # Clean up - remove token from URL
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    echo "🔒 Token removed from git config"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. Your token is valid"
    echo "   2. Token has 'repo' permissions"
    echo "   3. Repository exists and you have access"
    # Clean up
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    exit 1
fi

