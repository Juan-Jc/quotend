import db from "../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, content } = req.body;

    // Crear una nueva publicación
    const query = "INSERT INTO posts (user_id, content) VALUES (?,?)";
    db.query(query, [userId, content], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al crear la publicación" });
      }
      return res.status(201).json({ message: "Publicación creada" });
    });
  } else if (req.method === "GET") {
    // Obtener publicaciones
    db.query("SELECT * FROM posts", (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al obtener publicaciones" });
      }
      return res.status(200).json(result);
    });
  } else {
    return res.statu(405).json({ error: "Methodo no permitido" });
  }
}
