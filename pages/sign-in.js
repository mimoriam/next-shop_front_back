import { useRouter } from "next/router";
import { useState } from "react";
import { fetchJson } from "../lib/fetching";

const CMS_URL = process.env.CMS_URL;

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: false });
    try {
      const response = await fetchJson(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setStatus({ loading: false, error: false });
      console.log("sign in:", response);
      await router.push("/");
    } catch (err) {
      setStatus({ loading: false, error: true });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span> Email: </span>
        <input
          className="inline-block text-sm text-gray-600 border-2 border-black"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <span> Password: </span>
        <input
          className="inline-block text-sm text-gray-600 border-2 border-black"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        {status.error && <p>Invalid credentials</p>}

        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <button type="submit">Sign In</button>
          </div>
        )}
      </form>
    </>
  );
}
