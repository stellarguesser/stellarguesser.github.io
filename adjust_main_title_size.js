const MAX_HEIGHT_RELATIVE_TO_VIEWPORT = 0.12;
const MIN_FONT_PX = 16;
const MAX_FONT_PX_BACKUP = 48;

/** Fit a single element's font-size between min_font and max_font so it doesn't overflow parent width. */
function fit_text_to_width(text_element, { max_font = MAX_FONT_PX_BACKUP, min_font = MIN_FONT_PX } = {}) {
    const parent_element = text_element.parentNode;

    text_element.style.whiteSpace = 'nowrap';
    text_element.style.display = 'inline-block';

    const container_width = text_element.clientWidth;

    let low = min_font, high = max_font, best = min_font;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        parent_element.style.fontSize = mid + 'px';

        if (text_element.scrollWidth <= container_width) {
            best = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    parent_element.style.fontSize = best + 'px';
    text_element.style.fontSize = "inherit";
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