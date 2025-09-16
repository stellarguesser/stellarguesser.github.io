export function get_viewport_heigh_ignoring_keyboard(window) {
    // baseline: layout viewport, which may or may not take into account the browser UI on mobile (top address bar, bottom group bar)
    const baseline = window.innerHeight || 0;

    if (!window.visualViewport) {
        return baseline; // no visualViewport API -> only the baseline can be used (it may not take into account some of the UI though)
    }

    const visual_viewport = window.visualViewport.height;

    // If visualViewport is significantly smaller than baseline, assume keyboard is open
    const threshold = Math.max(100, Math.floor(baseline * 0.10));

    if (baseline - visual_viewport > threshold) {
        // When the keyboard is open, it does not matter if the bottom of the page is outside the render viewport since it is covered by the keyboard anyway
        return baseline;
    }

    return visual_viewport;
}