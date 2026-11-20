# BeanScore — Coffee Rating Application

A responsive coffee voting app built for the Workora task.

## Features
- Coffee grid populated from the supplied 60-record seed JSON.
- Search by coffee name/origin and filter by roast.
- Sort by rating, vote count or name.
- Submit a 1–5 star rating without refreshing the page.
- Live average rating, vote totals and top-five leaderboard.
- Express REST API with Supabase PostgreSQL persistence.
- Atomic database voting function to avoid lost vote updates.

## Requirements
- Node.js 18 or newer
- A Supabase project

## 1. Create the database
1. Open https://supabase.com and create/open a project.
2. In Supabase, open **SQL Editor** -> **New query**.
3. Open `supabase-setup.sql` from this project, copy all its contents and paste into the SQL editor.
4. Click **Run**. It creates the table, imports the 60 supplied coffee records and creates the voting function.
5. In **Table Editor**, confirm that `coffee_items` contains 60 rows.

If you re-run the SQL script, it will not reset existing vote counts for matching IDs.

## 2. Configure the app
1. Open this project folder in VS Code.
2. Open the terminal: **Terminal -> New Terminal**.
3. Run:

   ```bash
   npm install
   ```

4. Copy `.env.example` and rename the copy to `.env`.
5. In Supabase, open **Project Settings -> API** (or **API Keys**):
   - `SUPABASE_URL`: your Project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: your `service_role` secret key.
6. Paste those values into `.env`. Keep the service-role key private. Never put it in `public/app.js`, GitHub, screenshots or a public repository.

Your `.env` should look like this (with your real values):

   ```env
   PORT=3000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-secret-service-role-key
   ```

## 3. Run locally
In the VS Code terminal:

```bash
npm start
```

Open **http://localhost:3000** in your browser.

To check the backend, open **http://localhost:3000/api/health**.
To check the database API, open **http://localhost:3000/api/coffees**.

## 4. Test the task requirements
1. Confirm the page displays the coffee cards.
2. Choose a score from 1 to 5 on any card and click **Vote**.
3. Confirm the card's average rating and vote count update without a full-page refresh.
4. Refresh the browser. The vote must still be present.
5. Check the Top-rated coffees leaderboard.
6. Try search, roast filter and sort controls.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Server health check |
| GET | `/api/coffees` | Read coffee records |
| POST | `/api/coffees/:id/vote` | Save a 1–5 rating |

Example request body for `POST /api/coffees/1/vote`:

```json
{ "score": 5 }
```

## 5. Push to GitHub
Create a new empty GitHub repository, then run these commands in the project folder:

```bash
git init
git add .
git commit -m "Build coffee rating application"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Do not commit `.env`. The `.gitignore` file excludes it.

## 6. Deploy the live app (Render)
1. Push the project to GitHub first.
2. Sign in at https://render.com and choose **New -> Web Service**.
3. Connect the GitHub repository.
4. Use:
   - **Runtime:** Node
   - **Build command:** `npm install`
   - **Start command:** `npm start`
5. In Render -> **Environment**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Deploy. Render will provide a public URL. Open it and test a vote, then refresh to confirm persistence.

The database is Supabase-hosted, so votes persist independently of the Render web service filesystem.

## Common problems
- **Missing environment variables:** ensure `.env` exists locally and contains both values; restart `npm start`.
- **Invalid API key / 401:** use the Supabase `service_role` secret on the server, not the anon key. Do not share it.
- **Table does not exist:** run `supabase-setup.sql` in the correct Supabase project.
- **Function not found:** run the complete SQL script again and check that `vote_for_coffee` exists.
- **Port already in use:** stop the other server with `Ctrl+C`, or change `PORT=3001` in `.env`.
- **Cannot save a vote:** inspect the VS Code terminal for the Supabase error and verify the environment values.

## Project structure
```text
coffee-rating-app/
├── data/
│   └── coffee_seed.json
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
├── supabase-setup.sql
└── README.md
```
