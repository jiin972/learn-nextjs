import { API_URL } from "@/app/(home)/page";
import styles from "../app/styles/movide-credits.module.css";

async function getMovies(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "force-cache",
  });
  return response.json();
}

async function getCredits(id: string) {
  const API_CREDITS_URL = `https://nomad-movies.nomadcoders.workers.dev/movies/${id}/credits`;
  const response = await fetch(API_CREDITS_URL);
  return response.json();
}
export default async function MovieCredits({ id }: { id: string }) {
  const movie = await getMovies(id);
  const movieCredit = await getCredits(id);
  return (
    <div className={styles.container}>
      <img
        src={movie.poster_path}
        alt="movie poster"
        className={styles.poster}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>
          {movieCredit.slice(0, 10).map((person) => (
            <div key={person.id}>
              <img src={person.profile_path} alt="" />
            </div>
          ))}
        </h1>
        <a href={movie.homepage} target={"_blank"}>
          HomePage &rarr;
        </a>
      </div>
    </div>
  );
}
