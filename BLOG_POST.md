# How I stopped writing API chaining scripts and just used Postman Flows

**Tags:** `flows` `postbot` `automation` `no-code` `testing` `collections`

---

So I was working on a project last week where I needed to hit three APIs in sequence — get a user, then fetch their posts, then pull the detail of the first post. Pretty standard stuff.

My first instinct was to write a pre-request script that stores the userId in an environment variable, then another script to grab the postId, and so on. I've done this a hundred times. It works, but honestly it's annoying to maintain and even more annoying to explain to teammates who aren't deep into Postman scripting.

Then I actually sat down and tried **Postman Flows** properly for the first time. I'd opened it before and closed it because it looked complicated. Turns out it's the opposite — it took me maybe 15 minutes to wire up the whole thing visually with zero scripts.

Here's exactly what I did, in case it helps anyone else.

---

## What I built

A 3-step pipeline using [JSONPlaceholder](https://jsonplaceholder.typicode.com) (free mock API, great for testing):

1. `GET /users/1` — fetch a user
2. `GET /posts?userId=1` — get their posts (userId comes from step 1 automatically)
3. `GET /posts/1` — get the first post's full detail (postId comes from step 2)

Each step passes data into the next one. No scripts anywhere.

---

## Step 1 — Set up the collection

Create a new collection called **User Posts Pipeline** and add these three requests:

| Request | Method | URL |
|---------|--------|-----|
| Fetch User | GET | `https://jsonplaceholder.typicode.com/users/{{userId}}` |
| Get User Posts | GET | `https://jsonplaceholder.typicode.com/posts?userId={{userId}}` |
| Get Post Detail | GET | `https://jsonplaceholder.typicode.com/posts/{{postId}}` |

In the **Variables** tab, set `userId = 1` and `postId = 1` as defaults. This way if you run the requests individually they still work.

---

## Step 2 — Build the Flow

Click **Flows** in the left sidebar → **New Flow**.

You get a blank canvas. Drag blocks onto it and connect them:

```
[Start] → [Send Request: Fetch User] → [Select: body.id]
        → [Send Request: Get User Posts] → [Select: body[0].id]
        → [Send Request: Get Post Detail] → [Output]
```

The **Select** blocks are the key part — they let you pick a value out of the response and pipe it into the next request. So `body.id` from the user response becomes the `userId` for the posts request. No variables, no scripts.

One thing I didn't realize at first: you can click any block *while the flow is running* and see exactly what data is flowing through it. Really useful when something isn't connecting right.

---

## Step 3 — Run it

Hit **▶ Run** top right. The blocks light up one by one:

- Fetch User fires → gets back `{ id: 1, name: "Leanne Graham", ... }`
- Select pulls out `id: 1`
- Get User Posts fires with `userId=1` → returns 10 posts
- Select pulls out `body[0].id` → `1`
- Get Post Detail fires with `postId=1` → full post object
- Output shows the final result

Whole thing runs in under 400ms. And I didn't write a single line of JavaScript.

---

## Step 4 — Environments for switching between dev and prod

I set up two environments so I can test against the mock API locally and swap to a real API with one click:

**Dev:**
```
baseUrl = https://jsonplaceholder.typicode.com
userId  = 1
```

**Prod:**
```
baseUrl = https://your-real-api.com
userId  = 42
```

Update the request URLs to use `{{baseUrl}}/users/{{userId}}` etc. Now the Flow works in both environments without touching anything else.

---

## Step 5 — Tests with Postbot

This part genuinely surprised me. I opened the **Tests** tab on the Fetch User request, clicked the **Ask Postbot** sparkle icon, and selected *"Add tests for this request"*.

It looked at the request and response schema and generated this:

```javascript
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
});
```

Did the same for the other two requests. Full test coverage in about 2 minutes. You can also ask Postbot to tweak the tests — I asked it to add a check that the userId in the posts response matches the query param and it just did it.

---

## Try it yourself

I published the workspace publicly so you can fork the collection and run it directly:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/28548443-e9932830-e8d3-4cf2-9c77-7f307a7dd514)

Full workspace: [postman.com/supply-geoscientist-53692381/workspace/user-posts-pipeline](https://www.postman.com/supply-geoscientist-53692381/workspace/user-posts-pipeline)

I also put together an interactive demo page where you can simulate the Flow running and see the Postbot test generation in action: [sai6522.github.io/Postman-Contribution](https://sai6522.github.io/Postman-Contribution/)

---

## Honest thoughts

Flows is genuinely useful for this kind of sequential API work. I wouldn't use it for everything — if I need complex logic or loops I'd still write scripts. But for straightforward chaining like this it's way cleaner and easier to share with people who don't know Postman deeply.

Postbot is also better than I expected. The tests it generates aren't just boilerplate status code checks — it actually looks at the response structure.

Anyway, hope this saves someone the time I spent figuring it out. Drop a comment if you have questions or if you build something cool with Flows.

— Sai

---

*#postmancontributor*
