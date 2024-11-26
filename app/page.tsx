import { LoginForm } from './components/login-form'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-blue-200 via-pink-100 to-blue-100">
      <div className="z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}

