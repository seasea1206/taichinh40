-- Tài Chính 4.0: chạy toàn bộ file này trong Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  category text not null default 'Tin tức',
  author text not null default 'Ban biên tập  TÀI CHÍNH 4.0',
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.admin_users enable row level security;
alter table public.articles enable row level security;

-- Admin có thể đọc danh sách admin để xác minh quyền của chính mình.
create policy "admin can read own admin record" on public.admin_users
for select to authenticated using (auth.uid() = user_id);

-- Công chúng chỉ đọc bài đã xuất bản.
create policy "public can read published articles" on public.articles
for select to anon, authenticated using (status = 'published');

-- Quản trị viên được xem tất cả bài viết, kể cả bản nháp.
create policy "admins can read all articles" on public.articles
for select to authenticated using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
create policy "admins can insert articles" on public.articles
for insert to authenticated with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
create policy "admins can update articles" on public.articles
for update to authenticated using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
create policy "admins can delete articles" on public.articles
for delete to authenticated using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

-- Bucket ảnh công khai để ảnh bài viết hiển thị trên website.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('article-images', 'article-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "public can view article images" on storage.objects
for select to public using (bucket_id = 'article-images');
create policy "admins can upload article images" on storage.objects
for insert to authenticated with check (bucket_id = 'article-images' and exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
create policy "admins can update article images" on storage.objects
for update to authenticated using (bucket_id = 'article-images' and exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
create policy "admins can delete article images" on storage.objects
for delete to authenticated using (bucket_id = 'article-images' and exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
