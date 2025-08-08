document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.categories ul');
  if (!slider) {
    console.error('Gagal: .categories ul tidak ditemukan.');
    return;
  }

  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let lastX = 0;
  let velocity = 0;
  let rafId = null;

  slider.addEventListener('pointerdown', (e) => {
    slider.setPointerCapture(e.pointerId);
    isDown = true;
    slider.classList.add('dragging');
    startX = e.clientX;
    startScroll = slider.scrollLeft;
    lastX = e.clientX;
    velocity = 0;
  });

  slider.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 2) return;
    slider.scrollLeft = startScroll - dx;
    velocity = e.clientX - lastX;
    lastX = e.clientX;
  });

  const endDrag = (e) => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('dragging');

    // momentum / inertia
    const friction = 0.95;
    const step = () => {
      if (Math.abs(velocity) < 0.5) {
        cancelAnimationFrame(rafId);
        return;
      }
      slider.scrollLeft -= velocity;
      velocity *= friction;
      rafId = requestAnimationFrame(step);
    };
    if (Math.abs(velocity) > 1) {
      rafId = requestAnimationFrame(step);
    }
  };

  slider.addEventListener('pointerup', endDrag);
  slider.addEventListener('pointercancel', endDrag);
  slider.addEventListener('lostpointercapture', endDrag);

  // Prevent click on items when user was dragging
  let maybeDragging = false;
  slider.addEventListener('pointerdown', () => maybeDragging = false);
  slider.addEventListener('pointermove', () => { if (isDown) maybeDragging = true; });
  slider.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', (ev) => {
      if (maybeDragging) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, { capture: true });
  });
});
