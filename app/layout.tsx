import Navigation from "@/components/navigation";
import { Metadata } from "next";
import "./styles/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movie",
    default: "Next Movie",
  },
  description: "The best movie on the best framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
