import { get_viewport_heigh_ignoring_keyboard } from "./get_viewport_height.js";

(function () {
    const card = document.querySelector('main > .main_card');
    if (!card) {
        console.log("No main card found :(");
        return;
    }

    function debounce(fn, wait_ms = 120) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait_ms); };
    }

    function update_card_min_height() {
        // The card bounding rectangle relative to the viewport
        const rect = card.getBoundingClientRect();
        // rect.top ... distance from the top of the card to the top of the viewport (positive in the up direction -> if the page is scrolled down and the top of the card is higher, this becomes smaller)
        // window.scrollY ... how much was the page scrolled
        // -> rect.top + window.scrollY is invariant under scrolling
        const card_doc_top = rect.top + window.scrollY;

        // Should take into account the browser UI on mobile
        const viewport_height = get_viewport_heigh_ignoring_keyboard(window);

        const remaining = Math.max(0, Math.floor(viewport_height - card_doc_top));
        card.style.minHeight = remaining + 'px';

        document.documentElement.style.setProperty('--main-card-top-offset', card_doc_top + 'px');
    }

    const update_debounced = debounce(update_card_min_height, 80);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        update_card_min_height();
    } else {
        document.addEventListener('DOMContentLoaded', update_card_min_height);
    }

    window.addEventListener('resize', update_debounced);

    // Re-run the calculation if the layout changes later (image loads, font changes, ...)
    const resize_observer = new ResizeObserver(update_debounced);
    resize_observer.observe(document.body);
    resize_observer.observe(card);
})();