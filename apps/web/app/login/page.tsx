import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Mail, Search } from "lucide-react";

async function signInWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email");

  if (typeof email === "string") {
    await signIn("resend", {
      email,
      redirectTo: "/dashboard",
    });
  }
}

async function signInWithGoogle() {
  "use server";

  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-semibold">Entrar</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Usa un enlace mágico por email o tu cuenta de Google.
      </p>

      <form action={signInWithEmail} className="mt-8 grid gap-3">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          id="email"
          name="email"
          placeholder="tu@email.com"
          type="email"
          required
        />
        <Button type="submit">
          <Mail size={18} aria-hidden="true" />
          Enviar enlace
        </Button>
      </form>

      <form action={signInWithGoogle} className="mt-3">
        <Button className="w-full" type="submit" variant="outline">
          <Search size={18} aria-hidden="true" />
          Continuar con Google
        </Button>
      </form>
    </main>
  );
}
