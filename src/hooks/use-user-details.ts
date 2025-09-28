'use client'

import { useQuery } from '@tanstack/react-query'
import type { UserDetails } from '@/types/users'

async function fetchUserDetails(): Promise<UserDetails> {
  const response = await fetch('/api/users/me')
  if (!response.ok) {
    throw new Error('Failed to fetch user details')
  }
  return response.json()
}

export function useUserDetails() {
  return useQuery<UserDetails>({
    queryKey: ['user_details'],
    queryFn: fetchUserDetails,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}