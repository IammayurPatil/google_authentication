import { useState, useEffect } from "react";
import { auth, provider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {user ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Welcome, {user.displayName || user.email}</h2>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full mx-auto mt-3"
              />
            )}
            <p className="text-red-500 mt-2">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center">Login / Sign Up</h2>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="w-full mt-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Sign Up
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full mt-4 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 flex items-center justify-center"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                Sign in with Google
              </button>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
