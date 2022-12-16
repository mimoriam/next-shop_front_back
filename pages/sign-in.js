import { useRouter } from "next/router";
import { useState } from "react";
import { fetchJson } from "../lib/fetching";
import { useSignIn } from "../query_hooks/custom_hooks";

const CMS_URL = process.env.CMS_URL;

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      await router.push("/");
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

        {signInError && <p>Invalid credentials</p>}

        {signInLoading ? (
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
