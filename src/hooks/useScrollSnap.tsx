import { useEffect, useRef } from "react";

export const useAutoSnapScroll = (sectionIds: string[]) => {
  const snappedSet = useRef<Set<string>>(new Set());
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);
  const currentSectionIndex = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Kiểm tra thời điểm cuối cùng người dùng cuộn
        const now = Date.now();
        // Tăng thời gian chờ lên 1500ms để tránh kích hoạt nhiều lần
        if (isScrolling.current || now - lastScrollTime.current < 1500) return;

        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const id = el.id;

          // Giảm threshold xuống để phát hiện sớm hơn
          const isVisible =
            entry.isIntersecting && entry.intersectionRatio > 0.2;

          if (isVisible && !snappedSet.current.has(id)) {
            snappedSet.current.add(id);

            // Tìm index của section hiện tại
            const sectionIndex = sectionIds.indexOf(id);
            if (sectionIndex !== -1) {
              // Gọi hàm disappear để ẩn tất cả nội dung
              disappearContent();

              // Lưu section index hiện tại để sử dụng sau
              currentSectionIndex.current = sectionIndex;
            }

            // Tăng độ trễ trước khi cuộn
            if (scrollTimeout.current)
              window.clearTimeout(scrollTimeout.current);

            // Tăng thời gian chờ trước khi bắt đầu cuộn
            scrollTimeout.current = window.setTimeout(() => {
              isScrolling.current = true;

              // Tăng thời gian animation lên cao hơn (từ 1800ms lên 2500ms)
              smoothScrollTo(el, 2500, () => {
                isScrolling.current = false;

                // Gọi hàm xuất hiện nội dung của section mới
                appearContent(id);

                // Tăng thời gian chờ reset để tránh kích hoạt lập tức
                setTimeout(() => {
                  snappedSet.current = new Set(); // Reset snapped sections
                }, 1200);
              });
            }, 400); // Tăng thời gian chờ lên 400ms
          }
        });
      },
      {
        threshold: [0.2, 0.4, 0.6], // Thêm nhiều ngưỡng hơn để phát hiện mượt hơn
        rootMargin: "-10% 0px", // Điều chỉnh biên để phát hiện đúng thời điểm hơn
      }
    );

    // Giữ nguyên phần còn lại
    const handleScroll = () => {
      lastScrollTime.current = Date.now();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);
};

// Hàm làm biến mất các phần tử (tương tự logic của animejs plugin)
function disappearContent() {
  // Tìm tất cả các phần tử hiển thị trong tất cả các section
  const headings = document.querySelectorAll(
    ".section h1, .section h2, .section .content-element"
  );
  headings.forEach((heading) => {
    // Tạo animation biến mất
    const element = heading as HTMLElement;
    // Lưu trạng thái hiện tại
    const currentOpacity = window.getComputedStyle(element).opacity;

    // Animation biến mất dần dần
    animate({
      element: element,
      from: parseFloat(currentOpacity),
      to: 0,
      property: "opacity",
      duration: randomRange(200, 400),
      easing: easeInOutQuad,
    });
  });
}

// Hàm làm xuất hiện các phần tử của section mới (tương tự animejs plugin)
function appearContent(sectionId: string) {
  // Tìm tất cả các phần tử hiển thị trong section hiện tại
  const section = document.getElementById(sectionId);
  if (section) {
    const headings = section.querySelectorAll("h1, h2, .content-element");
    headings.forEach((heading, index) => {
      // Tạo animation xuất hiện với độ trễ tăng dần
      const element = heading as HTMLElement;

      // Animation xuất hiện dần dần với độ trễ
      setTimeout(() => {
        animate({
          element: element,
          from: 0,
          to: 1,
          property: "opacity",
          duration: randomRange(300, 600),
          easing: easeInOutQuad,
        });
      }, index * 100); // Độ trễ giữa các phần tử
    });
  }
}

// Trợ giúp animation
function animate({
  element,
  from,
  to,
  property,
  duration,
  easing,
}: {
  element: HTMLElement;
  from: number;
  to: number;
  property: string;
  duration: number;
  easing: (t: number) => number;
}) {
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easing(progress);
    const value = from + (to - from) * easedProgress;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element.style[property as any] = value.toString();

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Hàm trợ giúp tạo số ngẫu nhiên trong khoảng
function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Các hàm easing
function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

// Hàm cuộn mượt mà tùy chỉnh với animation cực kỳ mượt
function smoothScrollTo(
  element: HTMLElement,
  duration: number,
  callback?: () => void
) {
  const targetPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    // Sử dụng hàm easing cải tiến để làm mượt hơn
    const run = easeInOutSextuple(
      timeElapsed,
      startPosition,
      distance,
      duration
    );

    window.scrollTo({
      top: run,
      behavior: "auto", // Sử dụng 'auto' thay vì 'smooth' để tránh xung đột với animation
    });

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      if (callback) callback();
    }
  }

  // Hàm easing mượt hơn với độ phức tạp cao hơn
  function easeInOutSextuple(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t * t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}
