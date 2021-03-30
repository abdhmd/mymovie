import styles from "../../styles/Movies.module.css";
import Link from "next/link";

const Movies = ({ movies, search }) => {
  return (
    <div>
      <Link href="/">
        <a className={styles.back}> back to home</a>
      </Link>

      <section className={styles.movies} id="movies">
        <h2>{search}</h2>
        <div className={styles.moviesContent}>
          {movies.map((movie, i) => {
            return (
              <Link
                href={{
                  pathname: "/movies/[id]",
                  query: { name: search, id: movie.imdbID },
                }}
                key={i}
              >
                <div className={styles.movie}>
                  <div className={styles.image}>
                    <img src={movie.Poster} alt={movie.Title} />
                  </div>
                  <div className={styles.head}>
                    <span>{movie.Title}</span>
                    <p>{movie.Year}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Movies;

export async function getServerSideProps({ query }) {
  const search = query.data;
  const res = await fetch(
    `http://www.omdbapi.com/?s=${search}&apikey=675b9166`
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      movies: data.Search,
      search: search,
    },
  };
}
