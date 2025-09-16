const MAX_HEIGHT_RELATIVE_TO_VIEWPORT = 0.12;
const MIN_FONT_PX = 12;
const MAX_FONT_PX_BACKUP = 48;

/** Fit a single element's font-size between min_font and max_font so it doesn't overflow parent width. */
function fit_text_to_width(textEl, { max_font = MAX_FONT_PX_BACKUP, min_font = MIN_FONT_PX } = {}) {
    textEl.style.whiteSpace = 'nowrap';
    textEl.style.display = 'inline-block';

    const container_width = textEl.clientWidth;

    let low = min_font, high = max_font, best = min_font;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        textEl.style.fontSize = mid + 'px';

        if (textEl.scrollWidth <= container_width) {
            best = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    textEl.style.fontSize = best + 'px';
}

const textEl = document.getElementById('main_title');
const max_font_px = MAX_HEIGHT_RELATIVE_TO_VIEWPORT * window.innerHeight;
fit_text_to_width(textEl, { max_font: max_font_px, min_font: MIN_FONT_PX });

if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => fit_text_to_width(textEl, { max_font: max_font_px, min_font: MIN_FONT_PX }));
    ro.observe(document.getElementById('main_title'));
} else {
    window.addEventListener('resize', () => fit_text_to_width(textEl, { max_font: max_font_px, min_font: MIN_FONT_PX }));
}