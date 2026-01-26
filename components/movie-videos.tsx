import { API_URL } from "@/app/(home)/page";
import styles from "../app/styles/movie-video.module.css";

async function getVideo(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`, {
    cache: "force-cache",
  });
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideo(id);
  const officialTrailer = videos.find(
    (video) =>
      video.name.includes("Official Trailer") ||
      video.type === "Trailer" ||
      videos[0],
  );
  if (!officialTrailer) return null;
  return (
    <div className={styles.container}>
      <iframe
        key={officialTrailer.id}
        src={`https://youtube.com/embed/${officialTrailer.key}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={officialTrailer.name}
      />
    </div>
  );
}
