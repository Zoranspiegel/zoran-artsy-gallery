import type { Metadata } from 'next';
import { MedievalSharp } from 'next/font/google';
import './global.css';

const medievalSharp = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-medievalSharp'
});

export const metadata: Metadata = {
  title: 'Sueños de Óleo',
  description: 'Galería de arte'
};

export default function rootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="es">
      <body className={`${medievalSharp.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
