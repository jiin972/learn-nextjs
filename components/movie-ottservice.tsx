import { API_URL } from "@/app/(home)/page";

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
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.poster_path} alt={movie.title} width={100} />
      <h3>시청 가능한 플랫폼</h3>
      <ul>
        {krProviders.length > 0 ? (
          krProviders.map((provider) => (
            <li key={provider.provider_id}>
              <img
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                width={40}
              />
              <p>{provider.provider_name}</p>
            </li>
          ))
        ) : (
          <p>현재 한국 OTT에서 제공되지 않는 영화입니다.</p>
        )}
      </ul>
    </div>
  );
}
