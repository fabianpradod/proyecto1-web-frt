import { getSeries, deleteSeries, getRating } from "./api.js";
import { openModal } from "./main.js";

export function renderControls() {
  const controls = document.getElementById("controls");
  controls.innerHTML = `
    <input type="text" id="search" placeholder="Buscar serie..." />
    <select id="sort">
      <option value="id">ID</option>
      <option value="name">Nombre</option>
      <option value="genre">Género</option>
      <option value="episodes">Episodios</option>
    </select>
    <select id="order">
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
    <button id="btn-new">+ Nueva serie</button>
    <button id="btn-export">Exportar CSV</button>
  `;
}

export function renderPagination(page, limit) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = `
    <button id="btn-prev" ${page <= 1 ? "disabled" : ""}>← Anterior</button>
    <span>Página ${page}</span>
    <button id="btn-next">Siguiente →</button>
  `;
}

export async function renderSeries(params) {
  const container = document.getElementById("series-list");
  container.innerHTML = "<p>Cargando...</p>";

  try {
    const series = await getSeries(params);

    if (series.length === 0) {
      container.innerHTML = "<p>No hay series.</p>";
      return;
    }

    container.innerHTML = "";
    for (const s of series) {
      const rating = await getRating(s.id);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${s.image_url || "https://placehold.co/200x300?text=Sin+imagen"}" alt="${s.name}" />
        <div class="card-body">
          <h3>${s.name}</h3>
          <p>${s.genre || "—"} · ${s.status || "—"} · ${s.episodes || 0} eps</p>
          <p>⭐ ${rating.average.toFixed(1)} (${rating.count} votos)</p>
          <div class="card-actions">
            <button class="btn-edit" data-id="${s.id}">Editar</button>
            <button class="btn-delete" data-id="${s.id}">Eliminar</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    }

    // edit/delete listeners
    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => openModal(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("¿Eliminar esta serie?")) return;
        await deleteSeries(parseInt(btn.dataset.id));
        window.loadSeries();
      });
    });

  } catch (err) {
    container.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}