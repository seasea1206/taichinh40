export type Article = {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  cover_image: string | null; category: string; author: string; status: 'draft' | 'published';
  created_at: string; published_at: string | null;
};
