import React from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetails = ({ loadedProduct }) => {
  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

export default ProductDetails;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const product = (await getData()).products.find(
    (product) => product.id === productId
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => {
    return { params: { pid: id } };
  });
  return {
    paths: params,
    fallback: false,
    // fallback: true,
    // fallback: "blocking",
  };
}
