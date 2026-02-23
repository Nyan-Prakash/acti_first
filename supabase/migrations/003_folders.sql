-- ============================================================
-- Migration 003: Binder Folders
-- ============================================================

-- 1. Folders table
-- ============================================================
create table public.folders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  color text default 'teal' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.folders enable row level security;

create policy "Users can view own folders"
  on public.folders for select
  using (auth.uid() = user_id);

create policy "Users can insert own folders"
  on public.folders for insert
  with check (auth.uid() = user_id);

create policy "Users can update own folders"
  on public.folders for update
  using (auth.uid() = user_id);

create policy "Users can delete own folders"
  on public.folders for delete
  using (auth.uid() = user_id);

-- Keep updated_at fresh
drop trigger if exists folders_set_updated_at on public.folders;
create trigger folders_set_updated_at
  before update on public.folders
  for each row execute function public.set_updated_at();

-- 2. Folder <-> Activity junction
-- ============================================================
create table public.folder_activities (
  id uuid default gen_random_uuid() primary key,
  folder_id uuid references public.folders(id) on delete cascade not null,
  activity_id uuid references public.activities(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique (folder_id, activity_id)
);

alter table public.folder_activities enable row level security;

create policy "Users can view own folder_activities"
  on public.folder_activities for select
  using (auth.uid() = user_id);

create policy "Users can insert own folder_activities"
  on public.folder_activities for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own folder_activities"
  on public.folder_activities for delete
  using (auth.uid() = user_id);
