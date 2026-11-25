import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseConfigStatus() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const missing: string[] = [];

  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!serviceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');

  return {
    configured: missing.length === 0,
    missing,
    url,
    serviceRoleKey,
  };
}

export function createSupabaseAdminClient(): SupabaseClient | null {
  const status = getSupabaseConfigStatus();
  if (!status.configured) {
    return null;
  }

  return createClient(status.url, status.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
