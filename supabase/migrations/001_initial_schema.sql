-- NEXUS CORE IT CONSULTING — Initial Supabase PostgreSQL Migration
-- Run in Supabase SQL Editor or via Supabase CLI migrations

create extension if not exists "pgcrypto";

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 160),
  phone text not null check (char_length(phone) between 7 and 30),
  subject text not null check (char_length(subject) between 3 and 160),
  service_interest text not null check (char_length(service_interest) between 2 and 100),
  message text not null check (char_length(message) between 15 and 3000),
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 160),
  phone text not null check (char_length(phone) between 7 and 30),
  company_name text not null check (char_length(company_name) between 2 and 140),
  preferred_contact_method text not null default 'Email',
  selected_services text[] not null check (cardinality(selected_services) >= 1),
  project_title text not null check (char_length(project_title) between 3 and 150),
  business_name text not null check (char_length(business_name) between 2 and 140),
  project_description text not null check (char_length(project_description) between 20 and 4000),
  objectives text not null check (char_length(objectives) between 10 and 2000),
  timeline text not null,
  budget_range text not null,
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'quoted', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists idx_contacts_created_at on public.contacts (created_at desc);
create index if not exists idx_quote_requests_reference on public.quote_requests (reference_number);
create index if not exists idx_quote_requests_created_at on public.quote_requests (created_at desc);

-- Enable Row Level Security (RLS)
alter table public.contacts enable row level security;
alter table public.quote_requests enable row level security;

-- Deny all anonymous/public read & write access by default.
-- All inserts occur strictly through server-side API routes using SUPABASE_SERVICE_ROLE_KEY.
revoke all on table public.contacts from anon, authenticated;
revoke all on table public.quote_requests from anon, authenticated;
