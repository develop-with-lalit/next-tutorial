import Link from "next/link";
import React from "react";

const ClientsPage = () => {
  const clientsLiist = [
    {
      id: "1",
      name: "client 1",
    },
    {
      id: "2",
      name: "client 2",
    },
  ];
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clientsLiist.map((client) => {
          return (
            <li key={client.id}>
              {" "}
              <Link href={`/clients/${client.id}`}> {client.name} </Link>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientsPage;
