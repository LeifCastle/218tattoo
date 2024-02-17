import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "218 Tattoo",
  description: "Tattoo Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
