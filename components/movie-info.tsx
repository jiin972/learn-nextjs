import { API_URL } from "@/app/(home)/page";

async function getMovie(id: string) {
  console.log(`fetching movies: ${Date.now()}`);
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(`${API_URL}/${id}`, { cache: "force-cache" });
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return <h6>{JSON.stringify(movie)}</h6>;
}
