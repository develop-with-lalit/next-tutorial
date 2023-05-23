import { useRouter } from "next/router";
import React from "react";

const ClientProjectsPage = () => {
  const router = useRouter();
  function visitProjectHandler() {
    router.push(`/clients/1/p-1`);
  }
  return (
    <div>
      <h1>Client Projects Page</h1>
      <button onClick={visitProjectHandler}> Visit project </button>
    </div>
  );
};

export default ClientProjectsPage;
