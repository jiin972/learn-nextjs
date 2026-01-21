import { API_URL } from "@/app/(home)/page";

async function getVideo(id: string) {
  console.log(`fetching vidoes: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  throw new Error("sometingBroken...");
  //   const response = await fetch(`${API_URL}/${id}/videos`, {
  //     cache: "force-cache",
  //   });
  //   return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideo(id);
  return <h6>{JSON.stringify(videos)}</h6>;
}
