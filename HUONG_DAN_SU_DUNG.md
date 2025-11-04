# 🎨 Hướng Dẫn Sử Dụng Landing Page & Gallery 3D

## ✨ Tổng Quan Dự Án

Dự án đã được nâng cấp với:
- ✅ **React Icons** thay thế toàn bộ emoji
- ✅ **Header Sticky** với progress bar scroll
- ✅ **AOS Animations** ở mọi sections
- ✅ **Gallery 2D/3D** với CircularGallery và DomeGallery
- ✅ **Routing** đa trang
- ✅ **Hiệu ứng nâng cao** (glow, shimmer, float, pulse)

---

## 🏗️ Cấu Trúc Dự Án

```
src/
├── components/
│   ├── Header/                 # Header với scroll progress
│   │   ├── Header.tsx
│   │   └── Header.scss
│   ├── CircularGallery/        # Gallery 3D vòng tròn
│   │   ├── CircularGallery.tsx
│   │   └── index.scss
│   └── DomeGallery/           # Gallery 3D dome (cầu)
│       ├── DomeGallery.tsx
│       └── DomeGallery.scss
├── pages/
│   ├── landing/               # Trang chủ
│   │   ├── index.tsx
│   │   └── index.scss
│   └── exhibition/            # Trang triển lãm 3D
│       ├── index.tsx
│       └── index.scss
└── App.tsx                    # Routing chính
```

---

## 🎯 Các Trang (Pages)

### 1. **Landing Page** (`/`)

#### Sections:
- **Hero Section** - Video background + Hero text
- **Phần I** - Nền tảng lý luận (Theory)
- **Phần II** - Đặc điểm và chính sách (Characteristics)
- **Phần III** - Tôn giáo (Religion)
- **Phần IV** - Mối quan hệ chiến lược (Strategic)
- **Phần V** - Phòng triển lãm 2D (Gallery)
- **Metaphor Section** - Ẩn dụ khu vườn sinh thái

#### Features:
- Header sticky với scroll progress
- Smooth scroll navigation
- AOS animations
- React Icons thay emoji
- Gallery 2D với masonry layout

### 2. **Exhibition Page** (`/exhibition`)

Trang triển lãm 3D với 2 chế độ xem:

#### **Chế độ Dome** 🌐
- Gallery 3D hình cầu
- Kéo để xoay phòng triển lãm
- Click vào ảnh để phóng to
- Hiệu ứng spark particles

#### **Chế độ Circular** 🎡
- Gallery 3D vòng tròn
- Scroll/drag để di chuyển
- Hiệu ứng wave trên ảnh
- Border radius bo tròn đẹp mắt

---

## 🎨 React Icons Đã Sử Dụng

### Landing Page Icons:

| Section | Icon | Mô tả |
|---------|------|-------|
| Principles | `FaBalanceScale` | Bình đẳng dân tộc |
| | `FaVoteYea` | Quyền tự quyết |
| | `FaHandshake` | Liên hiệp |
| Direction | `FaBriefcase` | Kinh tế |
| | `FaShieldAlt` | An ninh quốc phòng |
| | `FaCogs` | Hệ thống chính trị |
| Religion | `FaDove` | Tôn trọng tự do |
| | `FaSearchPlus` | Phân biệt hai mặt |
| Timeline | `FaExclamationTriangle` | Cảnh báo |
| | `MdSecurity` | Bảo mật |
| | `FaBan` | Cấm |
| Metaphor | `GiTreeGrowth` | Cây cối |
| | `GiWaterDrop` | Nước |
| | `GiFarmer` | Người làm vườn |
| | `GiPoisonGas` | Độc tố |
| | `FaUsers` | Các dân tộc |

### Exhibition Page Icons:

| Icon | Mô tả |
|------|-------|
| `FaArrowLeft` | Nút quay lại |
| `FaCube` | Chế độ Dome |
| `FaImages` | Chế độ Circular |

---

## 🚀 Cách Sử Dụng CircularGallery

### Props của CircularGallery:

```typescript
<CircularGallery
  items={[
    { image: "/path/to/image.jpg", text: "Mô tả" },
    // ...more items
  ]}
  bend={3}                    // Độ cong (0-5)
  textColor="#d4af37"        // Màu text
  borderRadius={0.08}        // Bo góc ảnh
  font="bold 28px serif"     // Font chữ
  scrollSpeed={2.5}          // Tốc độ scroll
  scrollEase={0.08}          // Độ mượt
/>
```

### Tùy Chỉnh CircularGallery:

```typescript
// Ví dụ: Gallery hình ảnh dân tộc
const ethnicImages = [
  {
    image: "/img/ethnic-unity-1.png",
    text: "Đại đoàn kết dân tộc",
  },
  {
    image: "/img/ethnic-tradition.png",
    text: "Truyền thống dân tộc",
  },
  // ... thêm ảnh
];

<CircularGallery
  items={ethnicImages}
  bend={3}                    // Cong nhiều hơn
  textColor="#d4af37"        // Vàng gold
  borderRadius={0.08}        // Bo góc nhẹ
  font="bold 28px 'Playfair Display'"
  scrollSpeed={2.5}          // Nhanh
  scrollEase={0.08}          // Mượt
/>
```

### Điều Khiển:
- **🖱️ Drag/Kéo chuột**: Di chuyển gallery
- **📜 Scroll**: Cuộn xem thêm ảnh
- **⌨️ Wheel**: Zoom in/out (nếu có)

---

## 🌐 Cách Sử Dụng DomeGallery

### Props của DomeGallery:

```typescript
<DomeGallery
  images={[
    { src: "/path/to/image.jpg", alt: "Mô tả" },
    // hoặc chỉ string: "/path/to/image.jpg"
  ]}
  fit={0.6}                          // Kích thước dome
  fitBasis="auto"                    // Cơ sở tính toán
  minRadius={500}                    // Bán kính min
  maxRadius={1200}                   // Bán kính max
  dragSensitivity={15}               // Độ nhạy kéo
  enlargeTransitionMs={400}          // Thời gian phóng to
  segments={35}                      // Số segments
  dragDampening={2}                  // Độ giảm tốc
  openedImageWidth="600px"           // Chiều rộng ảnh phóng to
  openedImageHeight="600px"          // Chiều cao ảnh phóng to
  imageBorderRadius="20px"           // Bo góc ảnh nhỏ
  openedImageBorderRadius="30px"     // Bo góc ảnh lớn
  grayscale={false}                  // Xám ảnh
/>
```

### Tùy Chỉnh DomeGallery:

```typescript
// Ví dụ: Gallery lịch sử cách mạng
const historyImages = [
  {
    src: "/assets/image/tulieu1.jpg",
    alt: "Hình ảnh lưu niệm Nguyễn Ái Quốc 1921",
  },
  // ... thêm ảnh
];

<DomeGallery
  images={historyImages}
  fit={0.6}                    // 60% màn hình
  dragSensitivity={15}         // Nhạy vừa phải
  segments={35}                // Chi tiết cao
  openedImageWidth="600px"     // Ảnh lớn 600px
  grayscale={false}            // Màu gốc
/>
```

### Điều Khiển:
- **🖱️ Drag/Kéo**: Xoay phòng triển lãm 360°
- **👆 Click vào ảnh**: Phóng to full screen
- **⌨️ ESC**: Đóng ảnh phóng to
- **📱 Touch**: Hỗ trợ cảm ứng trên mobile

### Hiệu Ứng Đặc Biệt:
- ✨ **Spark Particles** - Hạt sáng bay lên
- 🌊 **Wave Effect** - Hiệu ứng sóng trên ảnh
- 💫 **Smooth Rotation** - Xoay mượt mà
- 🎯 **Smart Snapping** - Tự động căn ảnh

---

## 🎭 Hiệu Ứng & Animations

### 1. **Particle Background**
```scss
// Floating particles tự động
.landing-page::before {
  animation: particleFloat 20s ease-in-out infinite;
}
```

### 2. **Glow Effects**
- Text glow animation
- Border glow on hover
- Icon pulse animation

### 3. **Shimmer Effect**
- Ánh sáng chạy trên ảnh
- 3s infinite loop

### 4. **Float Animation**
- Gallery items float nhẹ
- Stagger delays cho tự nhiên

### 5. **Icon Animations**
- Pulse effect (phóng to nhỏ)
- Drop shadow glow
- Smooth transitions

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: < 480px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Large**: 1440px+

### Mobile Optimizations:
- Header thu gọn
- Navigation ẩn text, chỉ icons
- Gallery tự động điều chỉnh
- Touch gestures support

---

## 🎯 Navigation & Routing

### Routes:
```typescript
/                  → Landing Page (Trang chủ)
/exhibition        → Exhibition Page (Triển lãm 3D)
```

### Header Navigation:
- **Trang Chủ** → Scroll to hero
- **Lý Luận** → Scroll to theory section
- **Chính Sách** → Scroll to characteristics
- **Tôn Giáo** → Scroll to religion
- **Chiến Lược** → Scroll to strategic
- **Triển Lãm** → Navigate to /exhibition

### Smooth Scroll:
```typescript
window.scrollTo({
  top: offsetPosition,
  behavior: "smooth",
});
```

---

## 🎨 Color Palette

```scss
$color-primary-dark: #2a1810;    // Nâu sẫm
$color-burgundy: #6b1a2c;        // Đỏ đô
$color-bronze: #b8860b;          // Vàng đồng
$color-gold: #d4af37;            // Vàng kim
$color-cream: #f5f0e8;           // Kem nhẹ
```

---

## 🔧 Cách Thêm Ảnh Mới

### 1. Thêm vào CircularGallery:

```typescript
// src/pages/exhibition/index.tsx
const ethnicImages = [
  {
    image: "/public/img/your-new-image.png",
    text: "Mô tả ảnh của bạn",
  },
  // ... existing images
];
```

### 2. Thêm vào DomeGallery:

```typescript
// src/components/DomeGallery/DomeGallery.tsx
const DEFAULT_IMAGES: ImageItem[] = [
  {
    src: "/assets/image/your-image.jpg",
    alt: "Mô tả chi tiết",
  },
  // ... existing images
];
```

### 3. Thêm vào Gallery 2D (Landing):

```typescript
// src/pages/landing/index.tsx
<div className="gallery-item large" data-aos="zoom-in">
  <div className="gallery-image">
    <img src="../public/img/new-image.png" alt="Mô tả" />
    <div className="gallery-overlay">
      <div className="gallery-content">
        <h3>Tiêu Đề</h3>
        <p>Mô tả ngắn</p>
      </div>
    </div>
  </div>
</div>
```

---

## 🚀 Chạy Dự Án

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build

# Preview production
npm run preview
```

### Truy cập:
- **Dev**: http://localhost:5173/
- **Landing**: http://localhost:5173/
- **Exhibition**: http://localhost:5173/exhibition

---

## 📦 Dependencies Đã Thêm

```json
{
  "aos": "^latest",
  "@types/aos": "^latest",
  "react-icons": "^5.5.0",
  "ogl": "^latest" (đã có - cho 3D galleries)
}
```

---

## 🎓 Tips & Tricks

### 1. **Tối Ưu Performance**
```typescript
// Lazy load galleries
const CircularGallery = lazy(() => import('./components/CircularGallery'));
```

### 2. **Custom AOS Animations**
```typescript
AOS.init({
  duration: 1000,      // Thời gian animation
  easing: "ease-out",  // Kiểu easing
  once: true,          // Chỉ chạy 1 lần
  offset: 100,         // Offset từ viewport
});
```

### 3. **Thay Đổi Màu Theme**
```scss
// src/pages/landing/index.scss
$color-gold: #your-color;
$color-bronze: #your-color;
```

### 4. **Điều Chỉnh Gallery Bend**
```typescript
// Cong nhiều hơn
<CircularGallery bend={5} />

// Thẳng hơn
<CircularGallery bend={1} />
```

---

## 🐛 Troubleshooting

### Lỗi: "Module not found: ogl"
```bash
npm install ogl
```

### Lỗi: "AOS is not defined"
```bash
npm install aos @types/aos
```

### Gallery không hiển thị ảnh:
- Kiểm tra đường dẫn ảnh
- Đảm bảo ảnh trong `/public/`
- Check console errors

### Header không sticky:
- Kiểm tra z-index
- Verify CSS position: fixed

---

## 📚 Tài Liệu Tham Khảo

- [React Icons](https://react-icons.github.io/react-icons/)
- [AOS Library](https://michalsnik.github.io/aos/)
- [OGL 3D](https://github.com/oframe/ogl)
- [React Router](https://reactrouter.com/)

---

## 🎉 Kết Quả

### Đã Hoàn Thành:
- ✅ Landing page sang trọng với video hero
- ✅ Header sticky với progress bar
- ✅ 100% React Icons (không emoji)
- ✅ AOS animations mọi section
- ✅ Gallery 2D masonry layout
- ✅ Gallery 3D Circular & Dome
- ✅ Routing 2 pages
- ✅ Responsive mobile/tablet/desktop
- ✅ 10+ loại hiệu ứng đẹp mắt
- ✅ Touch gestures support

### Performance:
- ⚡ Lazy loading ready
- 🎨 CSS animations (GPU accelerated)
- 📦 Code splitting với React Router
- 🖼️ Image optimization ready

---

## 💡 Customization Ideas

1. **Thêm More Pages**
   - `/about` - Giới thiệu
   - `/history` - Lịch sử
   - `/gallery/[id]` - Chi tiết gallery

2. **Thêm Features**
   - Search gallery
   - Filter by category
   - Download images
   - Share social media

3. **Nâng Cao**
   - VR mode cho DomeGallery
   - AI descriptions cho ảnh
   - Real-time collaboration
   - Admin dashboard

---

**🎨 Designed & Developed with ❤️**

**Ready to explore! Chúc bạn thành công! 🚀**

