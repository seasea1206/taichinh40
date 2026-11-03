import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'Tài Chính 4.0 – Tin tức Crypto & Blockchain', template: '%s | Tài Chính 4.0' },
  description: 'Tin tức Bitcoin, Ethereum, Altcoin, Blockchain và tài chính số tại Việt Nam.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
