"use client";

import { useState } from "react";
import { User, Lock, Mail, Briefcase, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage("");
    setIsError(false);

    try {
      if (!isLogin) {
        // Petición para registrar administrador en Strapi
        const res = await fetch("http://localhost:1337/api/admins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              Nombre: name,
              Cargo: position,
              Email: email,
              Cel: "3000000000",
              Password: password,
            },
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setFeedbackMessage("¡Administrador creado con éxito! 🎉 Ya puedes iniciar sesión.");
          setName("");
          setPosition("");
          setEmail("");
          setPassword("");
          setIsLogin(true); // Cambiar automáticamente al login tras registrarse
        } else {
          setIsError(true);
          setFeedbackMessage(data.error?.message || "Hubo un error al registrar el administrador.");
        }
      } else {
        // Petición para iniciar sesión (vía endpoint seguro en el servidor)
        const res = await fetch("http://localhost:1337/api/admins/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          setFeedbackMessage(`¡Bienvenido de nuevo, ${data.admin.Nombre}! 🚀`);
          setEmail("");
          setPassword("");
        } else {
          setIsError(true);
          setFeedbackMessage(data.error?.message || "Credenciales incorrectas.");
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setIsError(true);
      setFeedbackMessage("No se pudo conectar con el servidor de Strapi.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        
        {feedbackMessage && (
          <div
            className={`mb-6 p-4 border rounded-lg text-sm text-center font-medium ${
              isError
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-green-50 border-green-200 text-green-800"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldCheck className="h-8 w-8 text-black" />
          <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2.5 py-1 rounded">
            Panel Administrador
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {isLogin ? "Acceso Administrador" : "Registrar Administrador"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Gestión exclusiva de bases de datos e inventarios de Velora.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Nombre</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Cargo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Ej. Administrador General"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@velora.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
          >
            {isLogin ? "Ingresar al Sistema" : "Crear Administrador"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFeedbackMessage("");
              }}
              className="text-xs text-gray-600 hover:underline"
            >
              {isLogin ? "¿Nuevo admin? Registrarse" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}