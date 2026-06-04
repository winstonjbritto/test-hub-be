'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

const fetcher = async (url: string, token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('API error');
  return response.json();
};

export function useChurches(token?: string) {
  const { data, error, isLoading } = useSWR(
    ['/api/churches', token],
    ([url, t]) => fetcher(url, t),
    { revalidateOnFocus: false }
  );

  return {
    churches: data?.churches,
    isLoading,
    error,
  };
}

export function useChurch(id: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    id ? [`/api/churches?id=${id}`, token] : null,
    ([url, t]) => fetcher(url, t),
    { revalidateOnFocus: false }
  );

  return {
    church: data,
    isLoading,
    error,
  };
}

export function useEvents(churchId?: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    [`/api/events${churchId ? `?churchId=${churchId}` : ''}`, token],
    ([url, t]) => fetcher(url, t),
    { revalidateOnFocus: false }
  );

  return {
    events: data?.events,
    isLoading,
    error,
  };
}

export function useMassSchedules(churchId: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    churchId ? [`/api/mass-schedules?churchId=${churchId}`, token] : null,
    ([url, t]) => fetcher(url, t),
    { revalidateOnFocus: false }
  );

  return {
    schedules: data,
    isLoading,
    error,
  };
}

export function useSaints(token?: string) {
  const { data, error, isLoading } = useSWR(
    ['/api/saints', token],
    ([url, t]) => fetcher(url, t),
    { revalidateOnFocus: false }
  );

  return {
    saints: data?.saints,
    isLoading,
    error,
  };
}

export function useFetch(
  url: string | null,
  token?: string,
  shouldFetch = true
) {
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch && url ? [url, token] : null,
    ([u, t]) => fetcher(u, t),
    { revalidateOnFocus: false }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
