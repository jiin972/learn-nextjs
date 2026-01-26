import { getMovies } from "@/app/(home)/page";
import MovieCredits from "@/components/movie-credits";
import MovieInfo from "@/components/movie-info";
import MovieVideos from "@/components/movie-videos";
import Link from "next/link";
import { Suspense } from "react";

export interface IParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IParams) {
  const { id } = await params;
  const movie = await getMovies(id);
  return {
    title: movie.title,
  };
}

export default async function MovieDetailPage({ params }: IParams) {
  const { id } = await params;
  // const { id } = await params; //await후 id를 구조분해 할당으로 안전하게 꺼낼 수 있음
  return (
    <div>
      <Suspense fallback={<h1>Loading MovieInfo</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading Movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading Movie credis</h1>}>
        <Link href={`/movies/${id}/credits`}>크래딧 보러가기</Link>
      </Suspense>
      {}
      <Suspense fallback={<h1>Loading Movie Providers</h1>}>
        <Link href={`/movies/${id}/ott-service`}>어디서 볼 수 있나요?</Link>
      </Suspense>
    </div>
  );
}
