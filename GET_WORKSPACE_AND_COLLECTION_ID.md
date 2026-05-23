# How to Get Your Postman Workspace URL & Collection ID

---

## Part 1 — Get Your Public Workspace URL

### Step 1: Create a Workspace
1. Open Postman desktop app
2. Click the **Workspaces** dropdown (top-left) → **Create Workspace**
3. Name it: `User Posts Pipeline`
4. Set visibility to **Public** → click **Create**

### Step 2: Copy the Workspace URL
1. In the workspace, click the workspace name at the top
2. Click **Workspace Settings** (gear icon)
3. Under **Visibility**, select **Public** → Save
4. Click **View in web** or open your browser and go to:
   ```
   https://www.postman.com/YOUR_POSTMAN_USERNAME/workspace/user-posts-pipeline
   ```
5. That full URL is your **Workspace URL**

> 💡 Your Postman username is shown in the top-right corner of [postman.com](https://www.postman.com) when logged in.

---

## Part 2 — Get Your Collection ID

### Step 1: Build the Collection
1. Inside your workspace, click **New** → **Collection**
2. Name it `User Posts Pipeline`
3. Add the 3 requests from the tutorial (see `BLOG_POST.md`)

### Step 2: Get the Collection ID (Method A — Share Link)
1. Click the **⋯** (three dots) next to your collection name
2. Click **Share**
3. Click **Via Run in Postman**
4. Click **Get the embed code**
5. You'll see a URL like:
   ```
   https://app.getpostman.com/run-collection/XXXXXXXX-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   ```
6. The long string after `/run-collection/` is your **Collection ID**

### Step 3: Get the Collection ID (Method B — Postman API)
1. Go to [postman.com](https://www.postman.com) → log in → click your avatar → **Settings**
2. Go to **API Keys** → **Generate API Key** → copy it
3. Open a terminal and run:
   ```bash
   curl https://api.getpostman.com/collections \
     -H "X-Api-Key: YOUR_API_KEY"
   ```
4. Find your collection in the JSON response — the `uid` field is your Collection ID

---

## Part 3 — Update the Files

### Update `index.html`
Find this line (around line 170):
```html
<a href="https://www.postman.com/postman/workspace/postman-flows-demo" ...>
```
Replace with:
```html
<a href="https://www.postman.com/YOUR_USERNAME/workspace/user-posts-pipeline" ...>
```

Find the Run in Postman button link and replace:
```html
<a href="https://app.getpostman.com/run-collection/YOUR_COLLECTION_ID">
```

### Update `BLOG_POST.md`
At the bottom of the file, replace:
```
[Interactive Demo Page](https://your-demo-url.com)
```
With your actual hosted URL (GitHub Pages / Vercel).

---

## Quick Reference

| What you need | Where to find it |
|---------------|-----------------|
| Postman username | [postman.com](https://www.postman.com) → top-right avatar |
| Workspace URL | `postman.com/YOUR_USERNAME/workspace/WORKSPACE-SLUG` |
| Collection ID | Collection → ⋯ → Share → Run in Postman → embed URL |
| Demo page URL | Your GitHub Pages / Vercel URL after hosting |
