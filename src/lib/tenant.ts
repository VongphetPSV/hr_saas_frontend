export function getActiveTenantId(): string | null {
  return localStorage.getItem('activeTenantId')
}

export function setActiveTenantId(id: string) {
  localStorage.setItem('activeTenantId', id)
}

export function clearActiveTenantId() {
  localStorage.removeItem('activeTenantId')
}
