#!/bin/bash

# Push to GitHub
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set"
    exit 1
fi

git remote set-url origin https://${GITHUB_TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git
git push -u origin main

if [ $? -eq 0 ]; then
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    echo "✅ Pushed successfully"
else
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    exit 1
fi
