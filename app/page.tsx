import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-200 to-pink-200">
      <LoginForm />
    </main>
  )
}

