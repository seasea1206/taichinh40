import { notFound } from 'next/navigation';
import Header from '@/components/Header'; import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server'; import { Article } from '@/lib/types'; import { formatDate } from '@/lib/utils'; import ReactMarkdown from 'react-markdown';
export const revalidate=60;
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const supabase=await createClient(); const {data}=await supabase.from('articles').select('*').eq('slug',slug).eq('status','published').maybeSingle(); if(!data)notFound(); const a=data as Article;
 return <><Header/><main className="article-page"><div className="container article-container"><div className="breadcrumb"><a href="/">Trang chủ</a> / {a.category}</div><span className="category-tag static-tag">{a.category}</span><h1>{a.title}</h1>{a.excerpt&&<p className="article-excerpt">{a.excerpt}</p>}<div className="article-byline">Tài Chính 4.0 <span>•</span> {a.author} <span>•</span> {formatDate(a.published_at||a.created_at)}</div>{a.cover_image&&<img className="article-cover" src={a.cover_image} alt={a.title}/>}<div className="prose"><ReactMarkdown>{a.content}</ReactMarkdown></div><div className="disclaimer">Thông tin trong bài viết chỉ nhằm mục đích tham khảo và giáo dục, không phải lời khuyên đầu tư.</div><a href="/" className="back-link">← Quay lại trang chủ</a></div></main><Footer/></>;
}
