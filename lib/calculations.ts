TypeScript
export interface LineItem {
  description: string;
  details?: string;
  quantity: number;
  unitPrice: number;
}

export interface CalculationResult {
  subtotal: number;
  taxAmount: number;
  total: number;
  itemsWithTotals: Array<LineItem & { lineTotal: number }>;
}

export function calculateInvoice(items: LineItem[], taxRate: number = 18.0): CalculationResult {
  const itemsWithTotals = items.map((item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    const lineTotal = Math.round(qty * price * 100) / 100;
    return {
      ...item,
      lineTotal,
    };
  });

  const subtotal = itemsWithTotals.reduce((acc, curr) => acc + curr.lineTotal, 0);
  const roundedSubtotal = Math.round(subtotal * 100) / 100;
  const taxAmount = Math.round(roundedSubtotal * (taxRate / 100) * 100) / 100;
  const total = Math.round((roundedSubtotal + taxAmount) * 100) / 100;

  return {
    subtotal: roundedSubtotal,
    taxAmount,
    total,
    itemsWithTotals,
  };
}