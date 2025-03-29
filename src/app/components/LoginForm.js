import { useState } from "react";
import { useRouter } from "next/navigation";
import { formToJSON } from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   Manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Enviamos la solicitud de login al backend

    const response = await fetch("./api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // guardar el token jwt en localStorage.

      localStorage.setItem("token", data.token);

      // redireccion al usuario al feed
      router.push("/feed");
    } else {
      setError(data.error || "Hubo un problema al iniciar sesión");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500">{error}</p>}
      <section className="mb-4">
        <label htmlFor="email" className="block">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </section>
      <section className="mb-4">
        <label htmlFor="password" className="block">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </section>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Cargando. . ." : "Iniciar Sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
