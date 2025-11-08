#!/bin/bash
# Auto-push script - Just paste your token when prompted

echo "🔐 Paste your GitHub token (starts with ghp_):"
read -s TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token required!"
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub..."

git remote set-url origin https://${TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Pushed to GitHub!"
    echo "🌐 https://github.com/tanjiroakainu/AI-Recommendation-system"
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
else
    echo "❌ Push failed. Check your token."
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    exit 1
fi

