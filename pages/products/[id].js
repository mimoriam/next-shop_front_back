import Head from "next/head";
import { getProductBy, getProducts } from "../../lib/fetching";

export async function getStaticPaths() {
  const products = await getProducts();

  return {
    paths: products.data.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProductBy(id);

    return {
      props: { product },
      revalidate: 5,
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

export default function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <main>
        <h1>{product.data.attributes.description}</h1>
        <h2>{product.data.attributes.price}</h2>
      </main>
    </>
  );
}
