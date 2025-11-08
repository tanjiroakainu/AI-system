#!/bin/bash

# Script to push AI Recommendation System to GitHub
# Repository: https://github.com/tanjiroakainu/AI-Recommendation-system

echo "🚀 Pushing AI Recommendation System to GitHub..."
echo ""

# Check if token is provided
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GitHub token not found!"
    echo ""
    echo "📝 To create a GitHub Personal Access Token:"
    echo "   1. Go to: https://github.com/settings/tokens"
    echo "   2. Click 'Generate new token' → 'Generate new token (classic)'"
    echo "   3. Give it a name: 'AI Recommendation System Push'"
    echo "   4. Select scopes: ✅ repo (all)"
    echo "   5. Click 'Generate token'"
    echo "   6. Copy the token (you won't see it again!)"
    echo ""
    echo "💡 Then run this command:"
    echo "   export GITHUB_TOKEN=your_token_here"
    echo "   ./push-to-github.sh"
    echo ""
    echo "   OR run directly:"
    echo "   GITHUB_TOKEN=your_token_here ./push-to-github.sh"
    exit 1
fi

# Configure git to use token
git remote set-url origin https://${GITHUB_TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Repository: https://github.com/tanjiroakainu/AI-Recommendation-system"
    echo ""
    # Reset remote URL to remove token from config
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    echo "🔒 Token removed from git config for security"
else
    echo ""
    echo "❌ Push failed. Please check your token and try again."
    # Reset remote URL
    git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
    exit 1
fi
