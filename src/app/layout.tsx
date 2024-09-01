import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { Providers } from "./provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events",
  description: "Events",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.wrapper}>
          <Providers>
            <ToastContainer />
            {children}
          </Providers>
        </div>
      </body>
      <script src="https://kit.fontawesome.com/5a0cf9540d.js" async crossOrigin="anonymous"></script>
    </html>
  );
}
