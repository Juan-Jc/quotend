import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      // buscar al usuario por el email
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {
          if (err || result.length === 0) {
            return res.status(401).json({
              error: "Usuario no encontrado",
            });
          }

          const user = result[0];
          // verificamos la contraseña
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
          }
          // Generar el token JWT
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          res.status(200).json({ token });
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }
  } else {
    return res.status(405).json({ error: "Metodo no permitido" });
  }
}
