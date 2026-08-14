import './globals.css';
import type { Metadata } from 'metadata';

export const metadata: Metadata = {
  title: 'Facturas MasterClass',
  description: 'Sistema de Facturación y Gestión',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}