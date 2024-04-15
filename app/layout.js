import "./globals.css";
import Navbar from "@/components/Navbar";
import WebFooter from "@/components/webFooter";


export const metadata = {
  title: "218 Tattoo",
  description: "Tattoo Website",
};


export default function RootLayout({ children }) {

  return (
    <>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet" />
        </head>
        <body>
          <Navbar />
          {children}
          <WebFooter />
        </body>
      </html>
    </>
  );
}
