import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1> the home page</h1>
      <ul>
        <li>
          <Link
            href={{
              pathname: "/portfolio",
              // query:something
            }}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
