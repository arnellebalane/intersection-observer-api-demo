(() => {

    function logEntries(label) {
        return (entries) => {
            entries.forEach(entry => {
                console.log(label, entry.intersectionRatio, entry.isIntersecting);
            });
        };
    }

    const observableOne = document.querySelector('.demo-wrapper:nth-child(1) .observed-box');
    const observerOne = new IntersectionObserver(logEntries('one'));
    observerOne.observe(observableOne);

    const rootTwo = document.querySelector('.demo-wrapper:nth-child(2)');
    const observableTwo = rootTwo.querySelector('.observed-box');
    const observerTwo = new IntersectionObserver(logEntries('two'), {
        root: rootTwo,
        threshold: 0.5
    });
    observerTwo.observe(observableTwo);

    const rootThree = document.querySelector('.demo-wrapper:nth-child(3)');
    const observableThree = rootThree.querySelector('.observed-box');
    const observerThree = new IntersectionObserver(logEntries('three'), {
        root: rootThree,
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    observerThree.observe(observableThree);

    const rootFour = document.querySelector('.demo-wrapper:nth-child(4)');
    const observableFour = rootFour.querySelector('.observed-box');
    const observerFour = new IntersectionObserver(logEntries('four'), {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    observerFour.observe(observableFour);



    let isDragging = false;
    let dragTarget = null;
    let dragOrigin = null;

    document.addEventListener('pointerdown', e => {
        if (e.target.classList.contains('draggable')) {
            isDragging = true;
            dragTarget = e.target;
            dragOrigin = { x: e.pageX, y: e.pageY };
        }
    });

    document.addEventListener('pointermove', e => {
        if (!isDragging) return;

        const transform = [
            `translateX(${ e.pageX - dragOrigin.x }px)`,
            `translateY(${ e.pageY - dragOrigin.y }px)`
        ];
        dragTarget.style.transform = transform.join(' ');
    });

    document.addEventListener('pointerup', e => {
        if (!isDragging) return;

        dragTarget.style.transition = 'transform 100ms ease-out';
        dragTarget.style.transform = '';
        dragTarget.addEventListener('transitionend', e => {
            e.target.style.transition = '';
        }, { once: true });

        isDragging = false;
        dragTarget = null;
        dragOrigin = null;
    });

})();
