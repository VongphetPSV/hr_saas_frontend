import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MoreVertical, AlertCircle, Loader2 } from 'lucide-react'
import { useEmployers, type Employer } from '@/hooks/api/useEmployers'
import { useAuth } from '@/hooks/useAuth'

function SkeletonList() {
  return (
    <div className="px-2 py-2 space-y-2" role="status" aria-label="Loading employers">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="px-4 py-8 text-center text-gray-600">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-gray-100 grid place-items-center">
        <Search className="h-5 w-5" />
      </div>
      <p className="text-sm">No employers found</p>
      <p className="text-xs text-gray-500 mt-1">Try adjusting your search terms</p>
    </div>
  )
}

function NoAccessState() {
  return (
    <div className="px-4 py-8 text-center">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-red-100 grid place-items-center">
        <AlertCircle className="h-5 w-5 text-red-600" />
      </div>
      <p className="text-sm text-red-600">No access to employers</p>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: any; onRetry: () => void }) {
  if (error?.status === 403) {
    return <NoAccessState />
  }

  return (
    <div className="px-4 py-8 text-center">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-red-100 grid place-items-center">
        <AlertCircle className="h-5 w-5 text-red-600" />
      </div>
      <p className="text-sm text-red-600">Failed to load employers</p>
      <button
        onClick={onRetry}
        className="mt-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}

function EmployerItem({ employer, onClick }: { employer: Employer; onClick: () => void }) {
  const initials = employer.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
      aria-label={`Open ${employer.name}`}
    >
      <div className="flex items-center gap-3">
        {employer.logo_url ? (
          <img
            src={employer.logo_url}
            alt={employer.name}
            className="h-8 w-8 rounded-md object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-md bg-gray-100 grid place-items-center text-xs text-gray-500">
            {initials}
          </div>
        )}
        <div>
          <div className="text-sm font-medium text-gray-900">{employer.name}</div>
          {employer.type && (
            <div className="text-xs text-gray-500">{employer.type}</div>
          )}
        </div>
      </div>
      <MoreVertical className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
    </button>
  )
}

export default function SelectEmployerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: employers, isLoading, isError, error, refetch } = useEmployers()
  const { setActiveTenant } = useAuth()
  const navigate = useNavigate()

  // Auto-select if exactly one employer
  useEffect(() => {
    if (employers?.length === 1) {
      handleSelectEmployer(employers[0])
    }
  }, [employers])

  const handleSelectEmployer = async (employer: Employer) => {
    await setActiveTenant(employer.id)
    navigate('/dashboard')
  }

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start md:items-center justify-center px-4 py-8">
      <div className="w-full max-w-[520px] bg-white border border-gray-200 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="mx-auto mb-5 h-8 w-24 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
          <h1 className="text-xl font-semibold text-gray-900">Choose your employer</h1>
          <p className="mt-1 text-sm text-gray-500">
            Select the company you want to continue with.
          </p>

          {/* Search */}
          <div className="relative mt-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employers..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              aria-label="Search employers"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* List Section */}
        {isLoading ? (
          <SkeletonList />
        ) : isError ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : employers?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="px-2 py-2">
            <ul className="space-y-2">
              {employers?.map((employer) => (
                <li key={employer.id}>
                  <EmployerItem
                    employer={employer}
                    onClick={() => handleSelectEmployer(employer)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 pt-3 pb-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <button
              className="text-gray-500 hover:text-gray-700 hover:underline"
              onClick={() => setSearchQuery('inactive')}
            >
              Canceled employers
            </button>
            <button
              className="text-blue-600 hover:text-blue-700 hover:underline"
              onClick={handleSignOut}
            >
              Sign in with a different account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}