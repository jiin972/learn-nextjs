import { getMovies } from "@/app/(home)/page";
import { IParams } from "../page";
import MovieOttService from "@/components/movie-ottservice";

export async function generateMetadata({ params }: IParams) {
  const { id } = await params;
  const movie = await getMovies(id);
  return {
    title: movie.title,
  };
}

export default async function MovieOttSevicePage({ params }: IParams) {
  const { id } = await params;

  return (
    <div>
      <MovieOttService id={id} />
    </div>
  );
}
