# GitHub Push Instructions

## Quick Setup Guide

Your repository is ready to push! Follow these steps:

### Step 1: Create GitHub Personal Access Token

1. **Go to GitHub Token Settings:**
   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token:**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name: `Real Estate System Push`
   - Expiration: Choose your preference (90 days recommended)
   - **Select scopes:** ✅ Check **`repo`** (this includes all repository permissions)

3. **Generate and Copy:**
   - Click **"Generate token"** at the bottom
   - **⚠️ IMPORTANT:** Copy the token immediately (you won't see it again!)
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Push to GitHub

**Option A: Using the Script (Recommended)**
```bash
# Set your token
export GITHUB_TOKEN=your_token_here

# Run the push script
./push-to-github.sh
```

**Option B: Direct Push**
```bash
# Set your token
export GITHUB_TOKEN=your_token_here

# Configure remote with token
git remote set-url origin https://${GITHUB_TOKEN}@github.com/tanjiroakainu/AI-Recommendation-system.git

# Push
git push -u origin main

# Remove token from config (for security)
git remote set-url origin https://github.com/tanjiroakainu/AI-Recommendation-system.git
```

**Option C: Manual Credential Entry**
```bash
# Just push and enter credentials when prompted
git push -u origin main
# Username: tanjiroakainu
# Password: [paste your token here]
```

### Step 3: Verify

After pushing, visit:
- **Repository:** https://github.com/tanjiroakainu/AI-Recommendation-system
- You should see all your files there!

---

## Repository Information

- **Repository URL:** https://github.com/tanjiroakainu/AI-Recommendation-system
- **Branch:** main
- **Developer:** Raminder Jangao
- **Project:** Real Estate Management System

## Security Note

⚠️ **Never commit your token to git!** The token is only used for authentication and is not stored in the repository.

---

## Troubleshooting

**Error: Permission denied**
- Make sure your token has `repo` scope enabled
- Verify the token hasn't expired

**Error: Remote already exists**
- The remote is already configured, you can proceed with push

**Error: Authentication failed**
- Double-check your token is correct
- Make sure you copied the entire token

---

**Need help?** Check GitHub documentation: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

