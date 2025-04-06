// app/page.js

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#2e3440]">
      
      {/* Header Section */}
      <header className="bg-white shadow-md p-6">
        <div className="flex justify-between items-center mx-auto">
          <h1 className="text-3xl font-bold text-blue-600">Taskify</h1>
          <nav className="flex gap-4">
            <a
              className="rounded text-lg font-semibold bg-green-300 px-3 py-1 hover:bg-green-400 transition"
              href="/auth/login"
            >
              Login
            </a>
            <a
              className="rounded text-lg font-semibold bg-blue-400 px-3 py-1 hover:bg-blue-500 transition"
              href="/auth/signup"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center py-32 px-6 bg-[#2e3440
]">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Organize Your Tasks with <span className="text-indigo-600">Ease</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-10">
          Taskify helps you stay focused and productive by managing your daily tasks and goals.
          Sign up now and start planning your day like a pro.
        </p>
        <a
          href="/auth/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded text-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </main>


    </div>
  );
}
