import { API_URL } from "@/app/(home)/page";
import styles from "../app/styles/movie-ottservice.module.css";
import BackButton from "./backButton";

async function getMovies(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "force-cache",
  });
  return response.json();
}

async function getOttSevice(id: string) {
  const API_PROVIDERS_URL = `https://nomad-movies.nomadcoders.workers.dev/movies/${id}/providers`;
  const response = await fetch(API_PROVIDERS_URL);
  return response.json();
}

export default async function MovieOttService({ id }: { id: string }) {
  const movie = await getMovies(id);
  const providerData = await getOttSevice(id);
  //data의 위치파악
  const krData = providerData.KR;
  //data의 기본값(배열)설정 <- 안전하게 꺼내기
  const krProviders = krData?.flatrate || [];
  return (
    <div className={styles.bigWrapper}>
      <div className={styles.btnContainer}>
        <BackButton />
      </div>
      <div className={styles.wrapper}>
        <div>
          <h1 className={styles.title}>{movie.title}</h1>
          <img
            className={styles.poster}
            src={movie.poster_path}
            alt={movie.title}
          />
        </div>
        <div>
          <h3 className={styles.subtitle}>시청 가능한 플랫폼</h3>
          {krProviders.length > 0 ? (
            krProviders.map((provider) => (
              <div
                className={styles.providerContainer}
                key={provider.provider_id}
              >
                <img
                  className={styles.iconImg}
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                />
                <div className={styles.providerName}>
                  {provider.provider_name}
                </div>
              </div>
            ))
          ) : (
            <p>현재 한국 OTT에서 제공되지 않는 영화입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
