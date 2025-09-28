import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import ConditionalLayout from '../components/ConditionalLayout';

const redHatDisplay = Red_Hat_Display({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Loopit - Close the Loop on E-Waste",
  description: "Give us your used laptops, we will wipe them to government-certified nothing, then hand them to schools & NGOs. Zero data, zero doubt, zero cost to do good.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} antialiased animated-gradient-bg min-h-screen`}>
        <div className="glass-overlay min-h-screen">
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </div>
      </body>
    </html>
  );
}
