import { getMovies } from "@/app/(home)/page";
import MovieCredits from "@/components/movie-credits";
import { IParams } from "../page";

export async function generateMetadata({ params }: IParams) {
  const { id } = await params;
  const movie = await getMovies(id);
  return {
    title: movie.title,
  };
}

export default async function MovieCreditsPage({ params }: IParams) {
  const { id } = await params;
  return (
    <div>
      <MovieCredits id={id} />
    </div>
  );
}
