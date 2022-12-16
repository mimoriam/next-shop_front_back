// npm install cookie

import Link from "next/link";
import { fetchJson, getProducts } from "../lib/fetching";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson("/api/getMe");
        setUser(user);
      } catch (err) {
        // not signed in
      }
    })();
  }, []);

  const handleSignOut = async () => {
    // await fetchJson("/api/logout", {});
    await fetch("/api/logout");
    setUser(undefined);
    // document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api;`;
  };

  return (
    <>
      {user ? (
        <>
          <ul>
            <li>{user.name}</li>
          </ul>
          <button onSubmit={handleSignOut}>Logout</button>
        </>
      ) : (
        <ul>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
        </ul>
      )}
      <ul>
        {products.data.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>{p.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
