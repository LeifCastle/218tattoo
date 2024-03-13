import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "../components/footer"

export const metadata = {
  title: "218 Tattoo",
  description: "Tattoo Website",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
        </head>
        <body className="bg-white">
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
