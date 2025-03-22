export default function AuthPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
          <h1 className="text-3xl font-bold mb-6">Auth Page</h1>
          <div className="space-y-4">
            <a 
              href="/auth/login" 
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
            >
              Login
            </a>
            <a 
              href="/auth/signup" 
              className="block w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }