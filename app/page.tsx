TypeScript
'use client';

import { useState } from 'react';
import { BRAND } from '@/lib/brand';
import { calculateInvoice, LineItem } from '@/lib/calculations';

export default function Home() {
  const [items, setItems] = useState<LineItem[]>([
    { description: 'Servicio de Consultoría Logística', details: 'Optimización de rutas y almacén', quantity: 1, unitPrice: 1500 }
  ]);
  
  const calculation = calculateInvoice(items);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: BRAND.colors.primary }}>{BRAND.companyName}</h1>
            <p className="text-sm text-gray-500">País: {BRAND.country}</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">Sistema de Facturación</span>
            <p className="text-sm text-gray-600 mt-2">Moneda por defecto: PEN</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-gray-700">Resumen de Facturación Actual</h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">S/ {calculation.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IGV (18%):</span>
            <span className="font-medium">S/ {calculation.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold" style={{ color: BRAND.colors.primary }}>
            <span>Total a Pagar:</span>
            <span>S/ {calculation.total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400">Desplegado exitosamente mediante Vercel y GitHub.</p>
      </div>
    </main>
  );
}