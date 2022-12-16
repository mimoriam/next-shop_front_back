// npm install cookie
// npm i @tanstack/react-query

import Link from "next/link";
import { fetchJson, getProducts } from "../lib/fetching";
import { useSignOut, useUser } from "../query_hooks/custom_hooks";

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const user = useUser();

  const signOut = useSignOut();

  return (
    <>
      {user ? (
        <>
          <ul>
            <li>{user.name}</li>
          </ul>
          {/*IN THE PREVIOUS COMMIT, CHANGE onSubmit to onClick to fix a major logout bug!!*/}
          <button onClick={signOut}>Logout</button>
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
