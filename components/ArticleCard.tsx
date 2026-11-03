import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';
export default function ArticleCard({article, featured=false}:{article:Article;featured?:boolean}) {
 return <article className={featured?'article-card featured':'article-card'}><Link href={`/bai-viet/${article.slug}`} className="card-image">{article.cover_image?<img src={article.cover_image} alt={article.title}/>:<div className="image-placeholder"><span> TÀI CHÍNH 4.0</span><small>VIỆT NAM</small></div>}<span className="category-tag">{article.category}</span></Link><div className="card-body"><div className="meta">{formatDate(article.published_at || article.created_at)} <span>•</span> {article.author}</div><h2><Link href={`/bai-viet/${article.slug}`}>{article.title}</Link></h2>{article.excerpt&&<p>{article.excerpt}</p>}<Link className="read-more" href={`/bai-viet/${article.slug}`}>Đọc tiếp <span>→</span></Link></div></article>
}
