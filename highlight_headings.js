const buttons_and_headings = [
    {
        buttons: document.querySelectorAll('#community_button'),
        headings: document.querySelectorAll('#community_heading')
    },
    {
        buttons: document.querySelectorAll('#download_button'),
        headings: document.querySelectorAll('#download_heading')
    }
];

for (let { buttons, headings } of buttons_and_headings) {
    for (let button of buttons) {
        button.addEventListener('click', () => {
            headings.forEach(element => {
                element.classList.remove('animate_highlight');

                // Force the browser to recalculate the layout
                void element.offsetWidth;

                element.classList.add('animate_highlight');
            });
        });
    }
}