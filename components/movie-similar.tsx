import { API_URL } from "@/app/(home)/page";
import Link from "next/link";
import styles from "../app/styles/movie-similar.module.css";

async function getMovie(id) {
  const response = await fetch(`${API_URL}/${id}/similar`);
  return response.json();
}

export default async function MovieSimilar({ id }: { id: string }) {
  const data = await getMovie(id);
  //배열로전환
  //1. Array.isArray로 data가 배열인지 확인
  //2. 배열이면 그대로 사용하고, 아니면 data.results를 사용
  //3. 그것도 없으면 빈 배열을 사용.
  const movies = Array.isArray(data) ? data : data?.results || [];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>연관 영화</h3>
      <div className={styles.container}>
        {movies.slice(0, 10).map((movie) => (
          <div key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? movie.poster_path.startsWith("http")
                      ? movie.poster_path
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-poster.png"
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
