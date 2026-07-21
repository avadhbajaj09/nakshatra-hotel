alter table public.room_categories
  add column if not exists featured_image_url text not null default '',
  add column if not exists gallery_image_urls text[] not null default '{}';

update public.room_categories
set
  featured_image_url = case slug
    when 'executive' then '/images/rooms/rooms5.webp'
    when 'deluxe' then '/images/rooms/nakshatra56.jpeg'
    when 'family' then '/images/rooms/nakshatra65.jpeg'
    when 'suite' then '/images/rooms/nakshatra63.jpeg'
    else featured_image_url
  end,
  gallery_image_urls = case slug
    when 'executive' then array['/images/rooms/rooms5.webp', '/images/rooms/rooms6.jpg', '/images/rooms/rooms7.jpg', '/images/rooms/rooms8.jpg', '/images/rooms/nakshatra54.jpeg']
    when 'deluxe' then array['/images/rooms/nakshatra56.jpeg', '/images/rooms/nakshatra57.jpeg', '/images/rooms/nakshatra58.jpeg', '/images/rooms/nakshatra75.jpeg', '/images/rooms/rooms2.jpg']
    when 'family' then array['/images/rooms/nakshatra65.jpeg', '/images/rooms/nakshatra63.jpeg', '/images/rooms/nakshatra55.jpeg', '/images/rooms/nakshatra36.jpeg', '/images/rooms/nakshatra1.jpeg']
    when 'suite' then array['/images/rooms/nakshatra63.jpeg', '/images/rooms/nakshatra65.jpeg', '/images/rooms/nakshatra55.jpeg', '/images/rooms/rooms1.jpg', '/images/rooms/nakshatra57.jpeg']
    else gallery_image_urls
  end
where featured_image_url = '' or cardinality(gallery_image_urls) = 0;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hotel-images',
  'hotel-images',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
