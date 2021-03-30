import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Link from "next/link";
import { useState, useEffect } from "react";
import Icon from "../components/Icon"


const defaultEndpoint = `http://www.omdbapi.com/?s=ssss&apikey=675b9166`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const { movies: defaultResults = [] } = data.Search;
  const [movies, updateMovies] = useState(defaultResults);
  const [search, setSearch] = useState(null);

  const [page, updatePage] = useState({
    current: defaultEndpoint,
  });
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return data.Search === [];

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
      });

      updateMovies(nextData.Search);
    }

    request();
  }, [current]);

  function handleOnSubmitSearch(e) {
    e.preventDefault();
    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    const endpoint = `https://www.omdbapi.com/?s=${value}&apikey=675b9166`;

    setSearch(value);

    updatePage({
      current: endpoint,
    });
  }

  return (
    <main>
      <Nav />
      <section className={styles.hero}>
        <h1>
          find your <span>movie</span>
        </h1>
        <form className="search" onSubmit={handleOnSubmitSearch}>
          <input
            name="query"
            type="text"
            placeholder="Type something ..."
            autoComplete="off"
          />
          <button>
            <Icon/>
          </button>
        </form>
        {movies == undefined || movies.length == 0 ? (
          <div style={{ display: "none" }}>nothing to show </div>
        ) : (
          <Link
            href={{
              pathname: "movies/",
              query: { data: search },
            }}
          >
            <div className={styles.result}>
              <a>
                {" "}
                show your result of <span>{search}</span>
              </a>
            </div>
          </Link>
        )}

        {movies == undefined && (
          <div className={styles.noResult}>
            <a href="/"> sorry nothing to show</a>
          </div>
        )}
      </section>
    </main>
  );
}
