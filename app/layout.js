import "./globals.css";
import Navbar from "@/components/Navbar";
import WebFooter from "@/components/webFooter";
import { GlobalStateProvider } from './utils/context.js';


export const metadata = {
  title: "218 Tattoo",
  description: "Tattoo Website",
};


export default function RootLayout({ children }) {

  return (
    <>
      <GlobalStateProvider>
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
      </GlobalStateProvider>
    </>
  );
}
