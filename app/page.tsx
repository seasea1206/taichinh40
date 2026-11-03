import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { createClient } from '@/lib/supabase/server';
import { Article } from '@/lib/types';
import { ArrowUpRight, Newspaper } from 'lucide-react';

export const revalidate = 60;
export default async function Home(){
 let articles:Article[]=[];
 try { const supabase=await createClient(); const {data}=await supabase.from('articles').select('*').eq('status','published').order('published_at',{ascending:false}).limit(10); articles=(data||[]) as Article[]; } catch {}
 const featured=articles[0]; const rest=articles.slice(1);
 return <><Header/><main><section className="hero"><div className="container hero-inner"><div className="hero-copy"><span className="eyebrow"><i/> TRUNG TÂM TIN TỨC TÀI SẢN SỐ</span><h1>Thế giới Crypto<br/><em>trong tầm nhìn</em><br/>của bạn.</h1><p>Cập nhật tin tức, xu hướng và góc nhìn chuyên sâu về Bitcoin, Blockchain và thị trường tài sản số.</p><a href="#tin-moi" className="primary-button">Khám phá tin mới <ArrowUpRight size={17}/></a></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="coin coin-btc">₿</div><div className="coin coin-eth">◆</div><div className="hero-label label-top">DIGITAL ASSETS</div><div className="hero-label label-bottom">NEWS · INSIGHT · KNOWLEDGE</div><div className="hero-grid"/></div></div></section>
 <section className="container ticker"><span className="ticker-label">TÀI CHÍNH 4.0</span><span>Kiến thức vững vàng · Thông tin có chọn lọc · Góc nhìn đa chiều</span><span className="ticker-dot">●</span></section>
 <section className="container news-section" id="tin-moi"><div className="section-heading"><div><span className="eyebrow">ĐỌC & KHÁM PHÁ</span><h2>Tin tức mới nhất</h2></div><span className="section-note">TIN TỨC ĐƯỢC CẬP NHẬT TỪ BAN BIÊN TẬP</span></div>
 {articles.length===0?<div className="empty-state"><div className="empty-icon"><Newspaper size={30}/></div><h3>Chào mừng đến với Tài Chính 4.0</h3><p>Website đã sẵn sàng. Hãy đăng nhập trang quản trị để đăng bài viết đầu tiên.</p><a className="primary-button" href="/admin/login">Đăng nhập quản trị <ArrowUpRight size={16}/></a></div>:<><div className="news-grid">{featured&&<ArticleCard article={featured} featured/>}{rest.map(a=><ArticleCard key={a.id} article={a}/>)}</div></>}
 </section><section className="blue-band" id="phan-tich"><div className="container blue-band-inner"><div><span className="eyebrow light">TÀI CHÍNH 4.0</span><h2>Hiểu thị trường.<br/>Chủ động tương lai.</h2></div><p>Chúng tôi hướng đến việc cung cấp thông tin rõ ràng, dễ hiểu và hữu ích về hệ sinh thái tài sản số.</p></div></section></main><Footer/></>;
}
