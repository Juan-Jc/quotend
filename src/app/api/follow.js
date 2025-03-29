import db from "../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { followerId, followedId } = req.body;

    // Para seguir a un usuario

    const query =
      "INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)";
    db.query(query, [followerId, followedId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al seguir al usuario" });
      }
      return res.status(201).json({ message: "Usuario seguido" });
    });
  } else {
    return res.status(405).json({ error: "Metodo no permitido" });
  }
}
