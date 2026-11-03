# Tài Chính 4.0 – Website tin tức Crypto

Website Next.js + Supabase, giao diện trắng/xanh dương, trang tin tức công khai và khu vực quản trị viết bài.

## 1. Chuẩn bị
- Node.js 20.9 trở lên
- Tài khoản Supabase (gói miễn phí đủ để chạy thử)
- Terminal trên macOS

## 2. Cài đặt dự án
Giải nén thư mục, mở Terminal tại thư mục `scex-vietnam`, chạy:

```bash
npm install
cp .env.example .env.local
```

## 3. Tạo Supabase
1. Vào https://supabase.com và tạo project mới.
2. Mở **Project Settings → API** (hoặc Connect) để lấy Project URL và anon/publishable key.
3. Điền vào `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_OR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Trong Supabase, mở **SQL Editor → New query**, dán toàn bộ nội dung `supabase/schema.sql`, nhấn Run.

## 4. Tạo tài khoản quản trị
1. Supabase → **Authentication → Users → Add user**.
2. Tạo email và mật khẩu quản trị. Nếu có lựa chọn xác nhận email, bật xác nhận email hoặc tạo user đã xác nhận.
3. Mở user vừa tạo, sao chép **User UID**.
4. Trong Supabase SQL Editor chạy (thay UUID bằng UID thật):

```sql
insert into public.admin_users (user_id)
values ('PASTE-USER-UID-HERE');
```

Chỉ những UID được thêm vào `admin_users` mới có quyền quản trị. Không đưa service-role key vào website hoặc `.env.local`.

## 5. Chạy website

```bash
npm run dev
```

Mở http://localhost:3000. Trang quản trị: http://localhost:3000/admin/login.

## 6. Viết bài
- Đăng nhập bằng tài khoản quản trị.
- Chọn **Viết bài mới**.
- Nhập tiêu đề, mô tả, chuyên mục, tác giả và nội dung.
- Có thể dùng thanh công cụ Markdown: in đậm, in nghiêng, tiêu đề, liên kết, danh sách, trích dẫn.
- Chọn ảnh đại diện để tải lên Supabase Storage.
- Chọn **Xuất bản ngay** hoặc **Bản nháp** rồi lưu.

Markdown cơ bản trong nội dung:
- `## Tiêu đề phụ`
- `**chữ đậm**`, `*chữ nghiêng*`
- `- mục danh sách`
- `[tên liên kết](https://example.com)`
- `![mô tả ảnh](https://đường-dẫn-ảnh)`

## 7. Đưa website lên Netlify
Dự án có cấu hình `netlify.toml` cho Netlify Next.js Runtime.

1. Đẩy toàn bộ nội dung thư mục dự án này lên một GitHub repository.
2. Vào https://app.netlify.com/ → **Add new site → Import an existing project**.
3. Chọn GitHub repository vừa tạo.
4. Nếu `package.json` nằm ở thư mục gốc repository, để **Base directory** trống. Nếu dự án nằm trong thư mục con `scex-netlify-ready/`, đặt Base directory là `scex-netlify-ready`.
5. Build command: `npm run build`. Publish directory: `.next` (đã khai báo trong `netlify.toml`).
6. Trong **Site configuration → Environment variables**, thêm:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL của Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/publishable key của Supabase
   - `NEXT_PUBLIC_SITE_URL` = URL Netlify hoặc tên miền chính thức, ví dụ `https://ten-site.netlify.app`
7. Nhấn **Deploy**. Các lần push code tiếp theo lên nhánh Git đã kết nối sẽ tự kích hoạt deploy mới.

Cần chạy SQL trong `supabase/schema.sql` và tạo user quản trị trong Supabase trước khi kiểm thử đăng nhập/đăng bài. Không đưa Supabase `service_role` key vào biến `NEXT_PUBLIC_*` hoặc mã frontend.

## Lưu ý bảo mật và nội dung
- Không chia sẻ mật khẩu quản trị.
- Không bao giờ đưa Supabase `service_role` key vào biến `NEXT_PUBLIC_*` hoặc mã frontend.
- Chỉ cấp UID quản trị cho người đáng tin cậy.
- Bài viết về tài sản số nên có nguồn, thời điểm cập nhật và lưu ý rủi ro; không trình bày nội dung tham khảo như cam kết lợi nhuận hay lời khuyên đầu tư.
