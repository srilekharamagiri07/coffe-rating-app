const grid = document.getElementById("coffee-grid");
const statusBox = document.getElementById("status");
const searchInput = document.getElementById("search");
const roastFilter = document.getElementById("roast-filter");
const sortSelect = document.getElementById("sort");
const toast = document.getElementById("toast");

let coffees = [];
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function stars(value) {
  const rounded = Math.round(Number(value));
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function updateStats(items) {
  document.getElementById("coffee-count").textContent = items.length;
  document.getElementById("vote-count").textContent =
    items.reduce((sum, item) => sum + Number(item.votes || 0), 0).toLocaleString();
  const best = items.length ? Math.max(...items.map(item => Number(item.rating))) : 0;
  document.getElementById("top-rating").textContent = best.toFixed(1) + " / 5";
}

function renderLeaderboard(items) {
  const top = [...items].sort((a, b) => Number(b.rating) - Number(a.rating) || Number(b.votes) - Number(a.votes)).slice(0, 5);
  document.getElementById("leaderboard-list").innerHTML = top.map((item, index) => `
    <li><span class="rank">0${index + 1}</span><span class="leader-name">${escapeHtml(item.name)}</span>
    <span class="leader-score">★ ${Number(item.rating).toFixed(1)}</span></li>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  })[char]);
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const roast = roastFilter.value;
  const sort = sortSelect.value;

  let visible = coffees.filter(item => {
    const matchesText = `${item.name} ${item.origin} ${item.roast}`.toLowerCase().includes(query);
    return matchesText && (roast === "all" || item.roast === roast);
  });

  if (sort === "votes") visible.sort((a, b) => Number(b.votes) - Number(a.votes));
  else if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
  else visible.sort((a, b) => Number(b.rating) - Number(a.rating) || Number(b.votes) - Number(a.votes));

  if (!visible.length) {
    grid.innerHTML = '<div class="empty">No coffee roasts match your search.</div>';
    return;
  }

  grid.innerHTML = visible.map(item => `
    <article class="coffee-card">
      <div class="card-top">
        <span class="coffee-icon">☕</span>
        <span class="roast-tag ${escapeHtml(item.roast)}">${escapeHtml(item.roast)} roast</span>
      </div>
      <h3>${escapeHtml(item.name)}</h3>
      <p class="origin">Origin · ${escapeHtml(item.origin)}</p>
      <div class="rating-row">
        <span class="rating-number">${Number(item.rating).toFixed(1)}</span>
        <span class="stars" aria-label="${Number(item.rating).toFixed(1)} out of 5 stars">${stars(item.rating)}</span>
      </div>
      <p class="vote-meta">${Number(item.votes).toLocaleString()} community votes</p>
      <div class="vote-area">
        <label for="score-${item.id}">Your rating</label>
        <select id="score-${item.id}" aria-label="Choose rating for ${escapeHtml(item.name)}">
          <option value="5">5 ★</option><option value="4">4 ★</option>
          <option value="3">3 ★</option><option value="2">2 ★</option><option value="1">1 ★</option>
        </select>
        <button class="vote-btn" data-id="${item.id}">Vote ↗</button>
      </div>
    </article>
  `).join("");
}

async function loadCoffees() {
  statusBox.textContent = "Loading coffee collection…";
  try {
    const response = await fetch("/api/coffees");
    if (!response.ok) throw new Error("API returned " + response.status);
    coffees = await response.json();
    updateStats(coffees);
    render();
    renderLeaderboard(coffees);
    statusBox.textContent = `${coffees.length} roasts ready to explore`;
  } catch (error) {
    console.error(error);
    statusBox.textContent = "Could not load coffees. Check your server and Supabase setup.";
    grid.innerHTML = '<div class="empty">The coffee collection is unavailable right now. Please refresh after checking the backend configuration.</div>';
  }
}

grid.addEventListener("click", async event => {
  const button = event.target.closest(".vote-btn");
  if (!button) return;

  const id = Number(button.dataset.id);
  const scoreSelect = document.getElementById(`score-${id}`);
  const score = Number(scoreSelect.value);
  button.disabled = true;
  button.textContent = "Saving…";

  try {
    const response = await fetch(`/api/coffees/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Vote failed");

    // Reload server data so the average and vote count reflect the database.
    await loadCoffees();
    showToast("Your vote has been saved. Thanks for rating!");
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = "Vote ↗";
  }
});

searchInput.addEventListener("input", render);
roastFilter.addEventListener("change", render);
sortSelect.addEventListener("change", render);

loadCoffees();
