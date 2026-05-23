# Postman Community Contribution — User Posts Pipeline

An interactive tutorial demonstrating a no-code API automation pipeline using **Postman Flows** + **Postbot AI**. Built for the [Postman Community Contribution Program](https://community.postman.com).

---

## 🔗 Live Resources

| Resource | Link |
|----------|------|
| Public Workspace | [postman.com/supply-geoscientist-53692381/workspace/user-posts-pipeline](https://www.postman.com/supply-geoscientist-53692381/workspace/user-posts-pipeline) |
| Run in Postman | [Fork the collection](https://app.getpostman.com/run-collection/28548443-e9932830-e8d3-4cf2-9c77-7f307a7dd514) |

---

## 📁 Project Files

```
postman-contribution/
├── index.html                        ← Interactive demo/tutorial page
├── style.css                         ← Page styles
├── script.js                         ← Flow runner simulation + Postbot demo
├── BLOG_POST.md                      ← Forum post (copy-paste to community.postman.com)
├── GET_WORKSPACE_AND_COLLECTION_ID.md ← How to find your Postman IDs
└── README.md                         ← This file
```

---

## 🚀 How to Run the Demo Page Locally

Just open `index.html` in your browser — no server needed:

```bash
cd postman-contribution
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

The page includes:
- Step-by-step accordion tutorial
- **Flow Runner** — click "Run Demo" to simulate the 3-request pipeline executing
- **Postbot simulator** — click "Ask Postbot" to see AI-generated tests typed out live
- Copy button to grab test code

---

## 🌐 How to Host the Demo Page (for submission)

### Option A — GitHub Pages (free, recommended)

```bash
# From inside postman-contribution/
git init
git add .
git commit -m "Postman Flows + Postbot tutorial"
git remote add origin https://github.com/YOUR_USERNAME/postman-flows-demo.git
git push -u origin main
```

Then: GitHub repo → **Settings** → **Pages** → Source: `main` → Save.

Your URL: `https://YOUR_USERNAME.github.io/postman-flows-demo`

### Option B — Vercel (instant)

```bash
npm i -g vercel
vercel --cwd postman-contribution
```

Once hosted, update the demo URL in `BLOG_POST.md`:
```
[Interactive Demo Page](https://YOUR_HOSTED_URL)
```

---

## 🧪 How to Use the Postman Collection

### Fork & Run

1. Click **[Run in Postman](https://app.getpostman.com/run-collection/28548443-e9932830-e8d3-4cf2-9c77-7f307a7dd514)**
2. Fork the collection into your workspace
3. Select the **Dev** environment
4. Hit **Run** on any request — all tests pass against JSONPlaceholder

### Collection Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `baseUrl` | `https://jsonplaceholder.typicode.com` | API base URL |
| `userId` | `1` | User ID to fetch |
| `postId` | `1` | Post ID to fetch |

### Environments

| Environment | `baseUrl` | `userId` |
|-------------|-----------|----------|
| Dev | `https://jsonplaceholder.typicode.com` | `1` |
| Prod | `https://your-real-api.com` | `42` |

Switch environments in Postman's top-right dropdown to test against different APIs.

---

## 🔁 How to Build the Flow in Postman

1. Open the **User Posts Pipeline** workspace
2. Click **Flows** in the left sidebar → **New Flow**
3. Connect blocks in this order:

```
[Start] → [Send: Fetch User] → [Select: body.id]
        → [Send: Get User Posts] → [Select: body[0].id]
        → [Send: Get Post Detail] → [Output]
```

4. Click **▶ Run** — watch each block execute and pass data to the next

---

## 📝 How to Submit the Contribution

### Step 1 — Post on the Community Forum

1. Go to [community.postman.com](https://community.postman.com) → **New Topic**
2. Category: **Postman Flows** or **Tutorials & Guides**
3. Copy the content from `BLOG_POST.md` into the editor
4. Replace `https://your-demo-url.com` with your hosted page URL
5. Add tags: `flows postbot automation no-code tutorial`
6. Post it

### Step 2 — Share on Social Media

```
Just published a tutorial on building a no-code API automation pipeline 
using @getpostman Flows + Postbot AI! 🚀

✅ Chain 3 API calls visually — zero code
✅ Auto-generate tests with Postbot in seconds
✅ Switch Dev/Prod with Environments

Full tutorial + live demo 👇
[your forum post link]

#postmancontributor #postman #APITesting #NoCode #Automation
```

### Step 3 — Submit the Form

Fill in the [official contribution form](https://community.postman.com/t/postman-community-contribution-program/) with:
- Forum post link
- Workspace link: `https://www.postman.com/supply-geoscientist-53692381/workspace/user-posts-pipeline`
- Social media post link (optional)

---

## ✅ Submission Checklist

- [ ] `index.html` hosted and accessible via public URL
- [ ] Demo URL updated in `BLOG_POST.md`
- [ ] Forum post published on community.postman.com
- [ ] Social media post shared with `#postmancontributor`
- [ ] Contribution form submitted

---

## 🛠 Tech Stack

- HTML5 / CSS3 / Vanilla JS — demo page
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) — free mock API used in the tutorial
- Postman Flows — visual no-code API chaining
- Postbot — AI test generation
