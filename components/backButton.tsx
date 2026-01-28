"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "../app/styles/backButton.module.css";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => router.back()}
    >
      <ChevronLeft size={20} />
      <p>뒤로가기</p>
    </button>
  );
}
