import { API_URL } from "@/app/(home)/page";
import styles from "../app/styles/movie-info.module.css";

async function getMovie(id: string) {
  console.log(`fetching movies: ${Date.now()}`);
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(`${API_URL}/${id}`, { cache: "force-cache" });
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <div className={styles.container}>
      <img
        src={movie.poster_path}
        alt="movie poster"
        className={styles.poster}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3>⭐️{movie.vote_average.toFixed(1)}</h3>
        <p className="">{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          HomePage &rarr;
        </a>
      </div>
    </div>
  );
}
