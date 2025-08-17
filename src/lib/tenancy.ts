export type TenancyMode = 'single' | 'multi';

export function getTenancyMode(): TenancyMode {
  const raw = import.meta.env.VITE_TENANCY_MODE?.toString().toLowerCase();
  return raw === 'multi' ? 'multi' : 'single';
}
