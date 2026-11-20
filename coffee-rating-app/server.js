require("dotenv").config();

const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env and fill them in.");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Coffee Rating API is running" });
});

// Fetch all coffee items, ordered by rating and then votes.
app.get("/api/coffees", async (_req, res) => {
  const { data, error } = await supabase
    .from("coffee_items")
    .select("id,name,origin,roast,rating,votes")
    .order("rating", { ascending: false })
    .order("votes", { ascending: false });

  if (error) {
    console.error("GET /api/coffees:", error.message);
    return res.status(500).json({ error: "Could not load coffee items." });
  }
  res.json(data);
});

// Submit a 1-5 star vote. The database function updates totals atomically.
app.post("/api/coffees/:id/vote", async (req, res) => {
  const id = Number(req.params.id);
  const score = Number(req.body.score);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid coffee ID." });
  }
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return res.status(400).json({ error: "Score must be a whole number from 1 to 5." });
  }

  const { data, error } = await supabase.rpc("vote_for_coffee", {
    p_coffee_id: id,
    p_score: score
  });

  if (error) {
    console.error("POST /api/coffees/:id/vote:", error.message);
    if (error.message.toLowerCase().includes("not found")) {
      return res.status(404).json({ error: "Coffee item not found." });
    }
    return res.status(500).json({ error: "Vote could not be saved. Check the database setup." });
  }

  res.json({ message: "Vote saved successfully.", coffee: data });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Coffee Rating App running at http://localhost:${PORT}`);
});
