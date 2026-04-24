import { createSeries, updateSeries, getSeriesByID, createRating } from "./api.js";
import { renderControls, renderSeries, renderPagination } from "./ui.js";
import { exportCSV } from "./export.js";

let currentPage = 1;
const limit = 10;

function getParams() {
  const q = document.getElementById("search")?.value || "";
  const sort = document.getElementById("sort")?.value || "id";
  const order = document.getElementById("order")?.value || "asc";
  return { q, sort, order, page: currentPage, limit };
}

let isLoading = false;

window.loadSeries = async function () {
  if (isLoading) return;
  isLoading = true;
  const params = getParams();
  await renderSeries(params);
  renderPagination(currentPage, limit);
  bindPagination();
  isLoading = false;
};

function bindPagination() {
  document.getElementById("btn-prev")?.addEventListener("click", () => {
    if (currentPage > 1) { currentPage--; window.loadSeries(); }
  });
  document.getElementById("btn-next")?.addEventListener("click", () => {
    currentPage++;
    window.loadSeries();
  });
}

export function openModal(id = null) {
  const modal = document.getElementById("modal");
  const form = document.getElementById("series-form");
  const title = document.getElementById("modal-title");

  form.reset();
  document.getElementById("series-id").value = "";

  if (id) {
    title.textContent = "Editar serie";
    getSeriesByID(id).then((s) => {
      document.getElementById("series-id").value = s.id;
      document.getElementById("f-name").value = s.name;
      document.getElementById("f-genre").value = s.genre;
      document.getElementById("f-status").value = s.status;
      document.getElementById("f-episodes").value = s.episodes;
      document.getElementById("f-image").value = s.image_url;
      document.getElementById("rating-section").style.display = "block";
      document.getElementById("current-id").value = s.id;
    });
  } else {
    title.textContent = "Nueva serie";
    document.getElementById("rating-section").style.display = "none";
  }

  modal.style.display = "flex";
}

async function handleSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("series-id").value;
  const body = {
    name: document.getElementById("f-name").value,
    genre: document.getElementById("f-genre").value,
    status: document.getElementById("f-status").value,
    episodes: parseInt(document.getElementById("f-episodes").value) || 0,
    image_url: document.getElementById("f-image").value,
  };

  try {
    if (id) {
      await updateSeries(parseInt(id), body);
    } else {
      await createSeries(body);
    }
    document.getElementById("modal").style.display = "none";
    window.loadSeries();
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function handleRating() {
  const id = parseInt(document.getElementById("current-id").value);
  const score = parseInt(document.getElementById("f-score").value);
  if (!score || score < 1 || score > 10) {
    alert("Score debe ser entre 1 y 10");
    return;
  }
  try {
    await createRating(id, score);
    alert("Rating guardado");
    window.loadSeries();
  } catch (err) {
    alert("Error: " + err.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderControls();
  window.loadSeries();

  let debounceTimer;
  document.getElementById("search").addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentPage = 1;
      window.loadSeries();
    }, 400);
  });

  document.getElementById("sort").addEventListener("change", () => {
    currentPage = 1;
    window.loadSeries();
  });

  document.getElementById("order").addEventListener("change", () => {
    currentPage = 1;
    window.loadSeries();
  });

  document.getElementById("btn-new").addEventListener("click", () => openModal());
  document.getElementById("btn-export").addEventListener("click", exportCSV);
  document.getElementById("series-form").addEventListener("submit", handleSubmit);
  document.getElementById("btn-rate").addEventListener("click", handleRating);

  document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });

  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) {
      document.getElementById("modal").style.display = "none";
    }
  });
});