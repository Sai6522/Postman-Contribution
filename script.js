// ── Step accordion ──────────────────────────────────────────────
function toggleStep(id) {
  const step = document.getElementById(id);
  step.classList.toggle('open');
}

// Open first step by default
document.getElementById('step-1').classList.add('open');

// ── Flow Demo Runner ─────────────────────────────────────────────
const flowSteps = [
  { type: 'info',    text: '▶  Flow started' },
  { type: 'info',    text: '⬡  Block: Send Request → GET /users/1' },
  { type: 'success', text: '✔  Response 200 OK  { id: 1, name: "Leanne Graham", email: "sincere@april.biz" }' },
  { type: 'info',    text: '⬡  Block: Select → body.id  →  1' },
  { type: 'info',    text: '⬡  Block: Send Request → GET /posts?userId=1' },
  { type: 'success', text: '✔  Response 200 OK  [ 10 posts returned ]' },
  { type: 'info',    text: '⬡  Block: Select → body[0].id  →  1' },
  { type: 'info',    text: '⬡  Block: Send Request → GET /posts/1' },
  { type: 'success', text: '✔  Response 200 OK  { id: 1, title: "sunt aut facere...", body: "..." }' },
  { type: 'success', text: '📤  Output: Post #1 by User "Leanne Graham" retrieved successfully.' },
  { type: 'warn',    text: '⏱  Total execution time: 312ms  |  3 requests  |  0 errors' },
];

function runFlowDemo() {
  const log = document.getElementById('runner-log');
  const btn = document.getElementById('run-demo-btn');
  log.innerHTML = '';
  btn.disabled = true;
  btn.textContent = '⏳ Running...';

  flowSteps.forEach((step, i) => {
    setTimeout(() => {
      const line = document.createElement('span');
      line.className = `log-line ${step.type}`;
      line.textContent = step.text;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;

      if (i === flowSteps.length - 1) {
        btn.disabled = false;
        btn.textContent = '▶ Run Again';
      }
    }, i * 420);
  });
}

// ── Postbot Test Generator ───────────────────────────────────────
const testSnippets = {
  user: `// Postbot-generated tests for GET /users/1
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has user id", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("id");
    pm.expect(json.id).to.be.a("number");
});

pm.test("Response has name and email", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("name");
    pm.expect(json).to.have.property("email");
    pm.expect(json.email).to.include("@");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`,

  posts: `// Postbot-generated tests for GET /posts?userId=1
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");
    pm.expect(json.length).to.be.greaterThan(0);
});

pm.test("Each post belongs to the requested user", function () {
    const json = pm.response.json();
    const userId = parseInt(pm.request.url.query.get("userId"));
    json.forEach(post => {
        pm.expect(post.userId).to.equal(userId);
    });
});

pm.test("Each post has required fields", function () {
    const json = pm.response.json();
    json.forEach(post => {
        pm.expect(post).to.have.all.keys("userId", "id", "title", "body");
    });
});`,

  post: `// Postbot-generated tests for GET /posts/1
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Post id matches request", function () {
    const json = pm.response.json();
    const pathId = parseInt(pm.request.url.path.slice(-1)[0]);
    pm.expect(json.id).to.equal(pathId);
});

pm.test("Post has non-empty title and body", function () {
    const json = pm.response.json();
    pm.expect(json.title).to.be.a("string").and.not.empty;
    pm.expect(json.body).to.be.a("string").and.not.empty;
});

pm.test("Content-Type is JSON", function () {
    pm.response.to.have.header("Content-Type");
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});`,
};

let currentReq = 'user';

function showTests(req) {
  currentReq = req;
  document.querySelectorAll('.req-selector li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');

  const titles = { user: 'GET /users/1', posts: 'GET /posts?userId=1', post: 'GET /posts/1' };
  document.getElementById('code-title').textContent = `Tests — ${titles[req]}`;
  document.getElementById('code-content').textContent = '// Click "Ask Postbot" to generate tests...';
  document.getElementById('postbot-status').textContent = '';
}

function generateTests() {
  const status = document.getElementById('postbot-status');
  const codeEl = document.getElementById('code-content');
  status.textContent = '🤖 Postbot is analyzing your request...';
  codeEl.textContent = '';

  setTimeout(() => {
    status.textContent = '✅ Tests generated! Copy them into the Tests tab.';
    const snippet = testSnippets[currentReq];
    let i = 0;
    const interval = setInterval(() => {
      codeEl.textContent += snippet[i];
      i++;
      if (i >= snippet.length) clearInterval(interval);
    }, 8);
  }, 900);
}

function copyCode() {
  const text = document.getElementById('code-content').textContent;
  if (!text || text.startsWith('//') && text.includes('Click')) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
}
