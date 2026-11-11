"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

// Inicio de sesión y registro de clientes de la tienda
function AccountContent() {
  const { user, isReady, login, register, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Página a la que se vuelve después de entrar (por ejemplo ?next=/checkout)
  const next = searchParams.get("next");
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isReady && user && safeNext) router.push(safeNext);
  }, [isReady, user, safeNext, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo completar la operación.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold">Hola, {user.username}</h1>
        <p className="text-gray-500">{user.email}</p>
        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Seguir comprando</Link>
          </Button>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold text-center mb-2">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h1>
      {safeNext === "/checkout" && (
        <p className="text-center text-sm text-gray-500 mb-6">
          Inicia sesión o crea una cuenta para terminar tu compra.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6 mt-6">
        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
        )}

        {mode === "register" && (
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </Button>

        <button
          type="button"
          className="w-full text-sm text-gray-600 hover:underline"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </form>
    </div>
  );
}

export default function AccountPage() {
  return (
    <main className="container px-4 md:px-6">
      <Suspense fallback={null}>
        <AccountContent />
      </Suspense>
    </main>
  );
}
