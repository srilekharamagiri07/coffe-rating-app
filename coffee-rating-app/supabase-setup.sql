-- Run this entire script in Supabase Dashboard -> SQL Editor -> New query.
create table if not exists public.coffee_items (
  id integer primary key,
  name text not null,
  origin text not null,
  roast text not null check (roast in ('Light', 'Medium', 'Dark')),
  rating numeric(3,2) not null default 0 check (rating >= 0 and rating <= 5),
  votes integer not null default 0 check (votes >= 0),
  rating_sum numeric(10,2) not null default 0
);

insert into public.coffee_items (id, name, origin, roast, rating, votes, rating_sum)
values
(1, 'Sample Roast 1', 'Brazil', 'Medium', 3.5, 23, 80.5),
(2, 'Sample Roast 2', 'Colombia', 'Medium', 4.7, 161, 756.7),
(3, 'Sample Roast 3', 'Brazil', 'Dark', 4.7, 78, 366.6),
(4, 'Sample Roast 4', 'Brazil', 'Light', 3.3, 117, 386.1),
(5, 'Sample Roast 5', 'Colombia', 'Dark', 4.7, 68, 319.6),
(6, 'Sample Roast 6', 'Brazil', 'Medium', 4.3, 82, 352.6),
(7, 'Sample Roast 7', 'Colombia', 'Light', 4.6, 115, 529.0),
(8, 'Sample Roast 8', 'Brazil', 'Light', 4.4, 169, 743.6),
(9, 'Sample Roast 9', 'Colombia', 'Dark', 4.0, 113, 452.0),
(10, 'Sample Roast 10', 'Ethiopia', 'Medium', 4.8, 50, 240.0),
(11, 'Sample Roast 11', 'India', 'Medium', 4.3, 88, 378.4),
(12, 'Sample Roast 12', 'India', 'Dark', 4.7, 128, 601.6),
(13, 'Sample Roast 13', 'Ethiopia', 'Medium', 2.9, 172, 498.8),
(14, 'Sample Roast 14', 'Colombia', 'Light', 4.4, 106, 466.4),
(15, 'Sample Roast 15', 'India', 'Medium', 4.5, 82, 369.0),
(16, 'Sample Roast 16', 'Ethiopia', 'Dark', 4.4, 177, 778.8),
(17, 'Sample Roast 17', 'Colombia', 'Light', 4.7, 152, 714.4),
(18, 'Sample Roast 18', 'India', 'Light', 4.2, 111, 466.2),
(19, 'Sample Roast 19', 'Brazil', 'Medium', 3.0, 147, 441.0),
(20, 'Sample Roast 20', 'India', 'Light', 3.4, 35, 119.0),
(21, 'Sample Roast 21', 'India', 'Light', 4.2, 95, 399.0),
(22, 'Sample Roast 22', 'India', 'Light', 3.6, 178, 640.8),
(23, 'Sample Roast 23', 'India', 'Medium', 3.7, 176, 651.2),
(24, 'Sample Roast 24', 'Brazil', 'Dark', 4.4, 99, 435.6),
(25, 'Sample Roast 25', 'Ethiopia', 'Dark', 3.3, 48, 158.4),
(26, 'Sample Roast 26', 'Colombia', 'Medium', 3.3, 119, 392.7),
(27, 'Sample Roast 27', 'Colombia', 'Dark', 3.1, 163, 505.3),
(28, 'Sample Roast 28', 'Colombia', 'Medium', 3.5, 15, 52.5),
(29, 'Sample Roast 29', 'Colombia', 'Medium', 3.4, 91, 309.4),
(30, 'Sample Roast 30', 'India', 'Medium', 3.4, 72, 244.8),
(31, 'Sample Roast 31', 'Ethiopia', 'Light', 3.4, 168, 571.2),
(32, 'Sample Roast 32', 'Colombia', 'Light', 3.7, 43, 159.1),
(33, 'Sample Roast 33', 'Colombia', 'Light', 3.2, 40, 128.0),
(34, 'Sample Roast 34', 'Ethiopia', 'Medium', 4.7, 180, 846.0),
(35, 'Sample Roast 35', 'Brazil', 'Dark', 3.2, 121, 387.2),
(36, 'Sample Roast 36', 'India', 'Light', 3.8, 60, 228.0),
(37, 'Sample Roast 37', 'Brazil', 'Light', 4.3, 63, 270.9),
(38, 'Sample Roast 38', 'Ethiopia', 'Dark', 4.9, 27, 132.3),
(39, 'Sample Roast 39', 'Brazil', 'Medium', 4.2, 111, 466.2),
(40, 'Sample Roast 40', 'Ethiopia', 'Light', 4.8, 147, 705.6),
(41, 'Sample Roast 41', 'Ethiopia', 'Light', 4.2, 104, 436.8),
(42, 'Sample Roast 42', 'Ethiopia', 'Dark', 4.4, 60, 264.0),
(43, 'Sample Roast 43', 'Ethiopia', 'Dark', 3.9, 123, 479.7),
(44, 'Sample Roast 44', 'India', 'Light', 3.7, 78, 288.6),
(45, 'Sample Roast 45', 'Brazil', 'Dark', 2.9, 3, 8.7),
(46, 'Sample Roast 46', 'India', 'Light', 3.0, 146, 438.0),
(47, 'Sample Roast 47', 'Brazil', 'Dark', 4.5, 33, 148.5),
(48, 'Sample Roast 48', 'Colombia', 'Medium', 2.9, 112, 324.8),
(49, 'Sample Roast 49', 'Ethiopia', 'Dark', 3.5, 4, 14.0),
(50, 'Sample Roast 50', 'India', 'Light', 4.2, 149, 625.8),
(51, 'Sample Roast 51', 'Ethiopia', 'Light', 4.5, 42, 189.0),
(52, 'Sample Roast 52', 'India', 'Light', 3.8, 151, 573.8),
(53, 'Sample Roast 53', 'Ethiopia', 'Medium', 3.0, 86, 258.0),
(54, 'Sample Roast 54', 'Brazil', 'Medium', 3.5, 48, 168.0),
(55, 'Sample Roast 55', 'Brazil', 'Dark', 2.8, 90, 252.0),
(56, 'Sample Roast 56', 'India', 'Light', 4.6, 50, 230.0),
(57, 'Sample Roast 57', 'India', 'Light', 3.1, 118, 365.8),
(58, 'Sample Roast 58', 'Brazil', 'Medium', 3.2, 82, 262.4),
(59, 'Sample Roast 59', 'Colombia', 'Light', 4.7, 114, 535.8),
(60, 'Sample Roast 60', 'India', 'Dark', 4.5, 175, 787.5)
on conflict (id) do update set
  name = excluded.name,
  origin = excluded.origin,
  roast = excluded.roast;

-- Atomic update: concurrent votes are counted safely by PostgreSQL.
create or replace function public.vote_for_coffee(p_coffee_id integer, p_score integer)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_item public.coffee_items;
begin
  if p_score < 1 or p_score > 5 then
    raise exception 'Score must be from 1 to 5';
  end if;

  update public.coffee_items
  set votes = votes + 1,
      rating_sum = rating_sum + p_score,
      rating = round(((rating_sum + p_score) / (votes + 1))::numeric, 2)
  where id = p_coffee_id
  returning * into updated_item;

  if not found then
    raise exception 'Coffee item not found';
  end if;

  return json_build_object(
    'id', updated_item.id,
    'name', updated_item.name,
    'origin', updated_item.origin,
    'roast', updated_item.roast,
    'rating', updated_item.rating,
    'votes', updated_item.votes
  );
end;
$$;

-- The service-role key is used only by the server, never by browser JavaScript.
