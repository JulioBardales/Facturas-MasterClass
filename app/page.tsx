'use client';

import { useState } from 'react';
import { Download, Trash2, Plus } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function InvoiceGenerator() {
  const [language, setLanguage] = useState('Español');
  const [currency, setCurrency] = useState('USD');
  const [issueDate, setIssueDate] = useState('14/08/2026');
  const [dueDate, setDueDate] = useState('');
  const [emitter, setEmitter] = useState('RELLENAR: razón social (Emiratos Árabes Unidos)');
  const [invoiceNumber, setInvoiceNumber] = useState('NX-202608-0001');
  
  // Cliente
  const [clientName, setClientName] = useState('');
  
  // Ítems
  const [items, setItems] = useState<LineItem[]>([]);

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const total = subtotal;

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="min-h-screen bg-[#090514] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-purple-900/40 px-6 py-4 flex justify-between items-center bg-[#0d071a]">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">NEXUM.AI™</span>
          <span className="text-purple-400 font-medium text-sm">| Generador de facturas</span>
        </div>
        <button className="bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/50 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-purple-200 transition">
          <Trash2 size={13} />
          <span>Vaciar</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-6 space-y-6 overflow-y-auto pr-2">
          
          {/* Ajustes section */}
          <div className="bg-[#120a22]/70 border border-purple-900/30 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold tracking-wider text-purple-400 uppercase">Ajustes</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">IDIOMA</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none focus:border-purple-500"
                >
                  <option>Español</option>
                  <option>English</option>
                </select>
                <span className="text-[10px] text-gray-500 mt-1 block">Idioma en el que se emite la factura</span>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">MONEDA</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none focus:border-purple-500"
                >
                  <option>USD · Dólar estadounidense</option>
                  <option>PEN · Sol peruano</option>
                  <option>EUR · Euro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">FECHA DE EMISIÓN</label>
                <input 
                  type="text" 
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">VENCIMIENTO</label>
                <input 
                  type="text" 
                  placeholder="dd/mm/aaaa"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none placeholder:text-gray-600"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Opcional</span>
              </div>
            </div>

            {/* Emisor */}
            <div className="space-y-2 pt-2">
              <label className="text-xs text-gray-400 block">EMISOR</label>
              <select 
                value={emitter}
                onChange={(e) => setEmitter(e.target.value)}
                className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none"
              >
                <option>RELLENAR: razón social (Emiratos Árabes Unidos)</option>
              </select>
              <p className="text-[11px] text-gray-400">RELLENAR: dirección fiscal · Dubái · Emiratos Árabes Unidos</p>
            </div>

            {/* N° de factura */}
            <div className="space-y-2 pt-2">
              <label className="text-xs text-gray-400 block">Nº DE FACTURA</label>
              <input 
                type="text" 
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Cliente section */}
          <div className="bg-[#120a22]/70 border border-purple-900/30 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold tracking-wider text-purple-400 uppercase">CLIENTE</h2>
            <div>
              <label className="text-xs text-gray-400 block mb-1">NOMBRE O RAZÓN SOCIAL</label>
              <input 
                type="text" 
                placeholder="Nombre del cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#1b1032] border border-purple-900/50 rounded-lg p-2 text-sm focus:outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Artículos section */}
          <div className="bg-[#120a22]/70 border border-purple-900/30 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold tracking-wider text-purple-400 uppercase">ARTÍCULOS</h2>
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-center bg-[#1b1032] p-3 rounded-lg border border-purple-900/30">
                <input 
                  type="text" 
                  placeholder="Descripción del artículo"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  className="w-16 bg-[#120a22] p-1.5 rounded text-center text-sm"
                />
                <input 
                  type="number" 
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                  className="w-24 bg-[#120a22] p-1.5 rounded text-center text-sm"
                />
                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button 
              onClick={addItem}
              className="w-full py-2.5 border border-dashed border-purple-700/50 hover:border-purple-500 rounded-lg text-xs text-purple-300 flex items-center justify-center space-x-1 transition"
            >
              <Plus size={14} />
              <span>Agregar artículo</span>
            </button>
          </div>

        </div>

        {/* Right Preview Panel */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between bg-[#120a22]/40 border border-purple-900/20 rounded-xl p-6">
          
          {/* Invoice Mockup Card */}
          <div className="w-full max-w-[500px] bg-white text-gray-900 rounded-md shadow-2xl p-8 space-y-6 text-xs scale-[0.95] origin-top">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <div className="font-bold text-purple-900 text-sm flex items-center space-x-1">
                  <span>NEXUM.AI™</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">EMISOR: {emitter}</p>
                <p className="text-[10px] text-gray-500">Dubái · Emiratos Árabes Unidos</p>
                <p className="text-[10px] text-gray-500">admin@nexum.online</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg text-purple-900 tracking-wider">FACTURA</h3>
                <p className="text-[10px] text-gray-500 mt-1">Nº DE FACTURA: <span className="font-mono">{invoiceNumber}</span></p>
                <p className="text-[10px] text-gray-500">FECHA DE EMISIÓN: {issueDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div>
                <span className="text-gray-400 font-semibold block mb-0.5">EMISOR</span>
                <p className="font-medium">{emitter}</p>
                <p className="text-gray-500 text-[10px]">Dubái · Emiratos Árabes Unidos</p>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block mb-0.5">FACTURAR A</span>
                <p className="font-medium text-gray-800">{clientName || <span className="text-gray-400 italic">Nombre del cliente</span>}</p>
              </div>
            </div>

            {/* Table preview */}
            <div className="border-t border-b py-2">
              <div className="grid grid-cols-12 text-[10px] font-bold text-gray-400 pb-1 border-b">
                <span className="col-span-6">DESCRIPCIÓN</span>
                <span className="col-span-2 text-right">CANTIDAD</span>
                <span className="col-span-2 text-right">PRECIO UNITARIO</span>
                <span className="col-span-2 text-right">IMPORTE</span>
              </div>
              {items.length === 0 ? (
                <div className="py-4 text-center text-gray-400 italic text-[11px]">
                  Sin artículos agregados
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="grid grid-cols-12 py-1.5 text-[11px] items-center border-b border-gray-100">
                    <span className="col-span-6">{item.description || 'Artículo sin descripción'}</span>
                    <span className="col-span-2 text-right">{item.quantity}</span>
                    <span className="col-span-2 text-right">{currency.split(' ')[0]} {item.unitPrice.toFixed(2)}</span>
                    <span className="col-span-2 text-right font-medium">{currency.split(' ')[0]} {(item.quantity * item.unitPrice).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-1">
              <div className="w-48 space-y-1 text-[11px]">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal:</span>
                  <span>{currency.split(' ')[0]} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-purple-900 border-t pt-1">
                  <span>Total:</span>
                  <span>{currency.split(' ')[0]} {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions & Warnings */}
          <div className="w-full max-w-[500px] space-y-3 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold tracking-tight">
                TOTAL <span className="text-purple-400">{currency.split(' ')[0]} {total.toFixed(2)}</span>
              </div>
              {!clientName && <p className="text-xs text-red-400 mt-1">Falta el nombre del cliente.</p>}
              {items.length === 0 && <p className="text-xs text-red-400">Agregá al menos un artículo con descripción y precio.</p>}
            </div>

            <button className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-medium py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-purple-900/30 transition">
              <Download size={16} />
              <span>Descargar PDF</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}