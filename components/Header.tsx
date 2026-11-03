import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
export default function Header() {
  return <><div className="topline"><div className="container topline-inner"><span>TIN TỨC BLOCKCHAIN & TÀI SẢN SỐ</span><span>Cập nhật kiến thức – Theo dõi thị trường</span></div></div><header className="header"><div className="container header-inner"><Link href="/" className="brand"><span className="brand-mark">S</span><span><b> TÀI CHÍNH 4.0</b><small>VIỆT NAM</small></span></Link><nav className="nav"><Link href="/">Trang chủ</Link><a href="/#bitcoin">Bitcoin</a><a href="/#blockchain">Blockchain</a><a href="/#phan-tich">Phân tích</a><a href="/#thi-truong">Thị trường</a></nav><button className="icon-button" aria-label="Tìm kiếm"><Search size={19}/></button><button className="mobile-menu" aria-label="Menu"><Menu size={22}/></button></div></header></>;
}
