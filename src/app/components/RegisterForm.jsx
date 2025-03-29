import { useState } from "react";
import { useRouter } from "next/navigation";


const RegisterForm = ()=>{

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Manejar el envio del formulario

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);

        // Enviamos la solicitud al backend
        const response = await fetch('./api/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });

        const data = await response.json();
        if(response.ok){
            // Redirigir al usuario al login
            router.push('/login');
        }else{
            setError(data.error || 'Hubo un problema al registrarse');
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">Contraseña</label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
    );
};

export default RegisterForm;