export const taka = (n: number) => `${Math.abs(n).toLocaleString('en-BD', { maximumFractionDigits: 0 })}`;
export const signedTaka = (n: number) => `${n < 0 ? '-' : '+'}${Math.abs(n).toLocaleString('en-BD', { maximumFractionDigits: 0 })}`;
export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
export const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
export const fmtDateTime = (iso: string) => `${fmtDate(iso)} • ${fmtTime(iso)}`;
