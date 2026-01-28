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
  const directors = movieCredit.filter(
    (person) =>
      person.known_for_department === "Directing" ||
      person.job === "Director" ||
      person.department === "Directing",
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{movie.title}</h1>
        {directors.length > 0 && (
          <div className={styles.directorContainer}>
            <h3 className={styles.profileJobName}>감독</h3>
            <h3 className={styles.profileDireName}>{directors[0].name}</h3>
          </div>
        )}

        <div className={styles.genresContainer}>
          {movie.genres?.map((genres) => (
            <li key={genres.id}>#{genres.name}</li>
          ))}
        </div>
      </div>
      <h3 className={styles.subtitle}>출연진</h3>
      <div className={styles.personContainer}>
        {movieCredit.slice(0, 10).map((person) => (
          <div key={person.id}>
            <img
              className={styles.profile}
              src={person.profile_path}
              alt={person.name}
            />
            <div className={styles.profileName}>{person.name}</div>
            <div className={styles.profileSubName}>{person.character}</div>
          </div>
        ))}
        {/* {directors.length > 0 &&
          directors.map((dir) => (
            <div key={dir.id}>
              {dir.profile_path ? (
                <img
                  className={styles.profile}
                  src={dir.profile_path}
                  alt={dir.name}
                />
              ) : (
                <div className={styles.noImage}>{dir.name[0]}</div>
              )}
              <div className={styles.profileName}>{dir.name}</div>
              <div className={styles.profileSubName}>감독</div>
            </div>
          ))} */}
      </div>
    </div>
  );
}
