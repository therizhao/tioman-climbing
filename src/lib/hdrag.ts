/**
 * Horizontal drag / swipe for a scroll container, without ever swallowing a
 * vertical gesture. The track keeps `touch-action: pan-y` so the browser always
 * scrolls the page on a vertical swipe; this script takes over only once the
 * pointer has moved clearly more horizontally than vertically.
 *
 * Works for mouse and touch. Native wheel + programmatic scrollTo still work.
 */
export function enableHDrag(track: HTMLElement) {
  let active = false;
  let locked: "x" | "y" | null = null;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startScroll = 0;
  let pointerId = -1;

  track.addEventListener(
    "pointerdown",
    (e) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("button")) return;
      active = true;
      locked = null;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startScroll = track.scrollLeft;
    },
    { passive: true },
  );

  track.addEventListener(
    "pointermove",
    (e) => {
      if (!active || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!locked) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; // wait for intent
        locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (locked === "y") {
          active = false; // vertical — hand the gesture back to the page
          return;
        }
        try {
          track.setPointerCapture(pointerId);
        } catch {}
        track.classList.add("is-dragging");
      }

      if (locked === "x") {
        e.preventDefault();
        moved = true;
        track.scrollLeft = startScroll - dx;
      }
    },
    { passive: false },
  );

  const end = () => {
    if (pointerId !== -1) {
      try {
        track.releasePointerCapture(pointerId);
      } catch {}
    }
    pointerId = -1;
    active = false;
    locked = null;
    track.classList.remove("is-dragging");
  };
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", end);

  // suppress the click that ends a real horizontal drag so links don't fire
  track.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    },
    true,
  );
}
