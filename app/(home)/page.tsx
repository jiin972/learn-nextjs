//server sied fetch

import Movie from "@/components/movie";
import styles from "../styles/home.module.css";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

export async function getMovies(id?: string) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const URL = id ? `${API_URL}/${id}` : API_URL;
  const response = await fetch(URL, {
    cache: "force-cache",
  });
  const json = await response.json();
  return json;
}
export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          id={movie.id}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  );
}

// client side fetch
// import { useEffect, useState } from "react";

// export default function Page() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [movie, setMovie] = useState([]);

//   useEffect(() => {
//     const getMovies = async () => {
//       const response = await fetch(
//         "https://nomad-movies.nomadcoders.workers.dev/movies"
//       );
//       const json = await response.json();
//       setMovie(json);
//       setIsLoading(false);
//     };
//     getMovies();
//   }, []);

//   return <div>{isLoading ? "Now Loading..." : JSON.stringify(movie)}</div>;
// }
