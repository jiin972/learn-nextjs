import { API_URL } from "@/app/(home)/page";
import styles from "../app/styles/movie-video.module.css";
import MovieSimilar from "./movie-similar";

async function getVideo(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`, {
    cache: "force-cache",
  });
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideo(id);
  // const officialTrailer = videos.find(
  //   (video) =>
  //     video.name.includes("Official Trailer") ||
  //     video.type === "Trailer" ||
  //     videos[0],
  // );
  // if (!officialTrailer) return null;
  return (
    <div className={styles.warpper}>
      <h3 className={styles.title}>트레일러</h3>
      <div className={styles.container}>
        {videos.slice(0, 9).map((video) => (
          <iframe
            key={video.id}
            src={`https://youtube.com/embed/${video.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.name}
            width={250}
          />
        ))}
      </div>
      <MovieSimilar id={id} />
    </div>
  );
}
