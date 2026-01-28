import { getMovies } from "@/app/(home)/page";
import MovieInfo from "@/components/movie-info";
import MovieVideos from "@/components/movie-videos";
import Link from "next/link";
import { Suspense } from "react";
import styles from "../../../styles/movie-detail.module.css";

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
      <div className={styles.wrapper}>
        <h3 className={styles.title}>추가 정보</h3>
        <div className={styles.linkContainer}>
          <Link className={styles.linkButton} href={`/movies/${id}/credits`}>
            🎬️ 출연진 보러가기
          </Link>
          <Link
            className={styles.linkButton}
            href={`/movies/${id}/ott-service`}
          >
            📺️ OTT정보 확인
          </Link>
        </div>
      </div>
    </div>
  );
}
