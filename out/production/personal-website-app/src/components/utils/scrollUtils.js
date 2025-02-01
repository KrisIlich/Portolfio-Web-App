// scrollUtils.js

/**
 * Smoothly scroll to a specific Y position in the document,
 * using the same custom easing and duration logic.
 */
export function smoothScrollToPosition(targetY, duration = 500) {
  const startPosition = window.pageYOffset;
  const distance = targetY - startPosition;
  let startTime = null;

  // Easing function (easeInOutQuad)
  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Scroll smoothly to an element by ID,
 * with offset logic for smaller screens.
 */
export function smoothScrollTo(elementId) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const targetPosition =
    targetElement.getBoundingClientRect().top + window.pageYOffset;

  // Adjust offset for smaller media sizes
  const viewportWidth = window.innerWidth;
  let offset = -160;

  if (viewportWidth <= 820) {
    offset = -110; // Adjust as needed for smaller screens
  }

  const finalY = targetPosition + offset;
  smoothScrollToPosition(finalY, 500);
}
