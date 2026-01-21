//server sie fetch

import Link from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(API_URL, {
    cache: "force-cache",
  });
  const json = await response.json();
  return json;
}
export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
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
