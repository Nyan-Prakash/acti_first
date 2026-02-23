-- ============================================================
-- Migration 002: Add onboarding fields to profiles
-- ============================================================

-- Add subject, grade_level, updated_at to profiles (if not already present)
alter table public.profiles
  add column if not exists subject text,
  add column if not exists grade_level text,
  add column if not exists updated_at timestamptz default now();

-- Update existing rows to have updated_at set
update public.profiles set updated_at = now() where updated_at is null;

-- Function to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger on profiles
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- RLS: ensure insert policy exists for the trigger-created profile row
-- (the handle_new_user trigger uses security definer, so this is belt-and-suspenders)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'profiles'
      and policyname = 'Users can insert own profile'
  ) then
    execute $policy$
      create policy "Users can insert own profile"
        on public.profiles for insert
        with check (auth.uid() = id)
    $policy$;
  end if;
end;
$$;
