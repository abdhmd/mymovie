import Link from "next/link";
import styles from "../../styles/Movie.module.css";

export async function getServerSideProps({ query }) {
  const { id, name } = query;
  const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=675b9166`);
  const data = await res.json();
  return {
    props: {
      movie: data,
      name: name,
    },
  };
}


const Movie = ({ movie, name }) => {
  const {
    Title,
    Year,
    Actors,
    imdbRating,
    Poster,
    Director,
    Country,
    Writer,
    Language,
    Plot,
    Genre,
  } = movie;


  const size = 100;
  const strokeWidth = 4;
  const radius = size / 2 - strokeWidth * 2;
  const percent = imdbRating;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 10) * circumference;

  return (
    <main className={styles.main}>
      <Link href={`/movies?data=${name}`}>
        <a className={styles.back}>back to movies</a>
      </Link>
      <section className={styles.movie}>
        <div className={styles.head}>
          <div className={styles.title}>
            <h3>{Title}</h3>
            <h5>{Year}</h5>
            <p>{Actors}</p>
          </div>
          <div className={styles.progressCircle}>
            <svg width={size} height={size}>
              <circle
                className={styles.progress}
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2 - 6}
                cy={size / 2}
                style={{
                  strokeDasharray: `${circumference} ${circumference}`,
                  strokeDashoffset: offset,
                }}
              />
            </svg>
            <span>{imdbRating}</span>
          </div>
        </div>
        <div className={styles.movieContent}>
          <img src={Poster} alt={Title} />
          <div className={styles.info}>
              <h5>Director</h5>
              <p>{Director}</p>
              <h5>Country</h5>
              <p>{Country}</p>
              <h5>Language</h5>
              <p>{Language}</p>
          </div>
          <div className={styles.desc}>
            <h5>Plot</h5>
            <p>{Plot}</p>
            <h5>Genre</h5>
            <p>{Genre}</p>
            <h5>Writer</h5>
            <p>{Writer}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Movie;
