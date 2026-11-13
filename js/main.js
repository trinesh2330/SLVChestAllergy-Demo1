(function () {
    'use strict';
    if (window.jQuery) {
        var $ = window.jQuery;
        $(window).on('scroll', function () {
            $('.back-to-top').toggle($(this).scrollTop() > 240);
        });
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    }
    // Gallery lightbox: links still open the image normally if Bootstrap JS is unavailable.
    var modalElement = document.getElementById('lightboxModal');
    if (modalElement && window.bootstrap && window.jQuery) {
        var modal = new window.bootstrap.Modal(modalElement);
        window.jQuery(document).on('click', 'a[data-lightbox]', function (event) {
            event.preventDefault();
            var link = this;
            var image = document.getElementById('lightboxImg');
            var caption = document.getElementById('lightboxCap');
            if (image) { image.src = link.href; image.alt = link.getAttribute('data-caption') || 'Clinic photograph'; }
            if (caption) { caption.textContent = link.getAttribute('data-caption') || ''; }
            modal.show();
        });
    }
}());
