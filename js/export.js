import { getSeries } from "./api.js";

export async function exportCSV() {
  try {
    const series = await getSeries({ limit: 100 });

    const headers = ["ID", "Nombre", "Género", "Estado", "Episodios", "Imagen", "Creado"];
    const rows = series.map((s) => [
      s.id,
      s.name,
      s.genre,
      s.status,
      s.episodes,
      s.image_url,
      s.created_at,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "series.csv";
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error exportando CSV: " + err.message);
  }
}