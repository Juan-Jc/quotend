import bcrypt from "bcryptjs";
import db from "../../utils/db";

export default async function handler(req,res) {
    if(req.method === 'POST'){
        const {username,email,password}=req.body;
        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            // guardamos el nuevo usuario en la base de datos
            const query = 'INSERT INTO users (username, email,password) VALUES (?,?,?)';
            db.query(query, [username, email, hashedPassword], (err, result)=>{
                if(err) return res.status(500).json({error: 'Error en la base de datos'});
                return res.status(201).json({message: 'Usuario registrado correctamente'});

            });
        } catch (error){
            return res.status(500).json({error: 'Error al registrar el usuario'});
        }
    }else{
        return res.status(405).json({ error: 'Metodo no permitido'});
    }
}