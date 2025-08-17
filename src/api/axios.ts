// src/api/axios.ts
import axios, { AxiosInstance } from 'axios'
import { joinUrl, ensureNoDoubleSegments } from '@/lib/url'

const base = import.meta.env.VITE_API_BASE_URL || '/api'
const prefix = import.meta.env.VITE_API_PREFIX || '/v1'

// Compose baseURL safely: e.g. "/api" + "/v1" => "/api/v1"
let composed = joinUrl(base, prefix)
composed = ensureNoDoubleSegments(composed)

const api: AxiosInstance = axios.create({
  baseURL: composed, // e.g. "/api/v1" with proxy, or "http://localhost:8000/api/v1" direct
  withCredentials: false,
})

function getAccessToken(): string | null {
  try {
    return localStorage.getItem('access_token')
  } catch {
    return null
  }
}

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // Optional: clear & redirect to login
      try {
        localStorage.removeItem('access_token')
        localStorage.removeItem('current_user')
      } catch {}
      // window.location.href = '/login';
    }
    return Promise.reject(err)
  }
)

export default api