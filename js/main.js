/* ===================================================================
 * Hola - Main JS
 *
 * ------------------------------------------------------------------- */

const typed = new Typed('.multiple-text', {
    strings: ['Android Developer.', 'SDE2', 'Ex-Samsung Employee.', 'Android (Custom) Rom Developer.', 'Android Geek.'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


function openNav(projectTitle) {
    const overlayDialog = document.getElementById(`${projectTitle}-overlay`)
    const toolbar = document.getElementById("header")
    const gotopbutton = document.getElementById("gotopbutton")
    const behindContentBody = document.body
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    overlayDialog.style.height = "100%";
    overlayDialog.style.overflowY = "scroll"
    overlayDialog.style.zIndex = "1000";

    behindContentBody.style.overflow = "hidden";
    behindContentBody.style.paddingRight = `${scrollBarWidth}px`;
    toolbar.style.paddingRight = `${scrollBarWidth + 15}px`;
    gotopbutton.style.paddingRight = `${scrollBarWidth}px`;
    behindContentBody.classList.add("blur");
    $(`#${projectTitle}-overlay .project-slider`).slick('setPosition');
}

function closeNav(projectTitle) {
    const overlayDialog = document.getElementById(`${projectTitle}-overlay`)
    const toolbar = document.getElementById("header")
    const gotopbutton = document.getElementById("gotopbutton")
    const behindContentBody = document.body

    overlayDialog.style.height = "0%";
    overlayDialog.style.overflowY = "hidden"
    overlayDialog.style.zIndex = "1";

    behindContentBody.style.overflow = "auto";
    behindContentBody.style.paddingRight = '';
    toolbar.style.paddingRight = '';
    gotopbutton.style.paddingRight = '';
    behindContentBody.classList.remove("blur");
}

function redirectUrl(projectUrl) {
    window.location.href = projectUrl;
}


(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: ''   // mailchimp url
    },

        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {

        $("html").addClass('ss-preload');

        $WIN.on('load', function () {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function () {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


    /* pretty print
     * -------------------------------------------------- */
    var ssPrettyPrint = function () {
        $('pre').addClass('prettyprint');
        $(document).ready(function () {
            prettyPrint();
        });
    };


    /* Move header
     * -------------------------------------------------- */
    var ssMoveHeader = function () {

        var hero = $('.page-hero'),
            hdr = $('header'),
            triggerHeight = hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            var loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                hdr.addClass('sticky');
            } else {
                hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.addClass('offset');
            } else {
                hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.addClass('scrolling');
            } else {
                hdr.removeClass('scrolling');
            }

        });

        // $WIN.on('resize', function() {
        //     if ($WIN.width() <= 768) {
        //             hdr.removeClass('sticky offset scrolling');
        //     }
        // });

    };


    /* Mobile Menu
     * ---------------------------------------------------- */
    var ssMobileMenu = function () {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function (event) {
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function () {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function () {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle();
            }
        });

    };


    /* Masonry
     * ---------------------------------------------------- */
    var ssMasonryFolio = function () {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


    /* slick slider
     * ------------------------------------------------------ */
    var ssSlickSlider = function () {

        $('.testimonials__slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: "<div class=\'slick-prev\'><i class=\'im im-arrow-left\' aria-hidden=\'true\'></i></div>",
            nextArrow: "<div class=\'slick-next\'><i class=\'im im-arrow-right\' aria-hidden=\'true\'></i></div>",
            pauseOnFocus: false,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    };


    /* dynamic projects
    * ------------------------------------------------------ */
    const projects = [
        {
            title: "KOSO",
            role: "Lead Developer",
            thumb: { "src": "images/portfolio/koso.png", "alt": "Koso", "size": "500x500" },
            images: [
                { "src": "images/portfolio/g-koso/koso-01.webp", "alt": "KOSO", "size": "1050x700" },
                { "src": "images/portfolio/g-koso/koso-02.webp", "alt": "KOSO", "size": "1050x700" },
                { "src": "images/portfolio/g-koso/koso-03.webp", "alt": "KOSO", "size": "1050x700" },
                { "src": "images/portfolio/g-koso/koso-04.webp", "alt": "KOSO", "size": "1050x700" },
            ],
            projectLink: "https://play.google.com/store/apps/details?id=com.koso&hl=en",
            description: "Spin Wheel Game Application. Led development with a focus on Kotlin, Retrofit, and Dependency Injection.",
            chips: ["GitHub", "Hilt", "Jetpack Data Store", "MVVM", "Kotlin FLow"]
        },
        {
            title: "Offleash'd",
            role: "Lead Developer",
            thumb: { "src": "images/portfolio/offleshd.png", "alt": "Offleashd", "size": "500x500" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "Offleashd", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "Offleashd", "size": "1050x700" }
            ],
            projectLink: "https://play.google.com/store/apps/details?id=com.offleashd&hl=en",
            description: "Social Platform for Pet Enthusiasts",
            chips: ["Social Login", "FCM", "Jetpack Components", "SourceTree", "MVVM"]
        },
        {
            title: "KKM (Kisan Kamdhenoo)",
            role: "App Development",
            thumb: { "src": "images/portfolio/kkm.png", "alt": "KKM", "size": "500x625" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "KKM", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "KKM", "size": "1050x700" }
            ],
            projectLink: "https://play.google.com/store/apps/details?id=com.kipl.kkm&hl=en",
            description: "Kamdhenoo Kisan Mart is an online marketplace for the farming community. KKM mission is to empower the farming community to buy and sell products and services by connecting farmers, traders, FPOs, cooperatives and other farming community members.Our purpose is to make the most of your resources and bring progress for all. At KKM, we call this Unnati.",
            chips: ["Social Login", "FCM", "Swagger", "SourceTree", "MVVM"]
        },
        {
            title: "Taleek - Language Lessons",
            role: "App Enhancement",
            thumb: { "src": "images/portfolio/taleek.png", "alt": "Taleek", "size": "500x500" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "Taleek", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "Taleek", "size": "1050x700" }
            ],
            projectLink: "https://play.google.com/store/apps/details?id=com.taleek.app&hl=en_US",
            description: "Taleek is a language learning app offering courses in English, Spanish, German, French, Turkish, Russian, and Chinese. It features video lessons taught by native speakers, progressing from beginner to advanced levels. With a focus on pronunciation, vocabulary, and grammar, Taleek aims to provide a comprehensive and engaging learning experience.",
            chips: ["Exo Player", "R8", "ProGuard", "Twillio", "MVVM"]
        },
        {
            title: "VJ Education",
            role: "App Development & Maintenance",
            thumb: { "src": "images/portfolio/vj.png", "alt": "VJ", "size": "500x625" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "VJ", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "VJ", "size": "1050x700" }
            ],
            projectLink: "https://play.google.com/store/apps/details?id=com.vj.education&hl=en",
            description: "Education App",
            chips: ["Material Design", "Room Database", "Folio Reader SDK", "TimeSync"]
        },
        {
            title: "Storywise (POP)",
            role: "Lead Developer",
            thumb: { "src": "images/portfolio/pop.jpg", "alt": "POP", "size": "500x625" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "POP", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "POP", "size": "1050x700" }
            ],
            projectLink: "https://pencilsofpromise.org/",
            description: "Offline Book Reading Application",
            chips: ["Material Design", "Room Database", "Folio Reader SDK", "TimeSync"]
        },
        {
            title: "Subsational",
            role: "Lead Developer, UI/Ux Designing",
            thumb: { "src": "images/portfolio/subsational.png", "alt": "Subsational", "size": "500x625" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "Subsational", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "Subsational", "size": "1050x700" }
            ],
            projectLink: "https://play.google.com/store/apps/details?id=com.subseats&hl=en",
            description: "Subsational is a food delivery application.",
            chips: ["Java", "Stripe", "Braintree", "Google Pay", "MVP", "Social Login", "Google Maps API"]
        },
        {
            title: "DealZapp",
            role: "Support Developer, UI Designing",
            thumb: { "src": "images/portfolio/apjpro.png", "alt": "DealZapp", "size": "500x500" },
            images: [
                { "src": "images/portfolio/gallery/g-lighthouse.jpg", "alt": "DealZapp", "size": "1050x700" },
                { "src": "images/portfolio/lighthouse.jpg", "alt": "DealZapp", "size": "1050x700" }
            ],
            projectLink: "https://play.google.com/store/apps/details?id=co.apnaa.apnaajpr&hl=en",
            description: "Social Platform for Pet Enthusiasts",
            chips: ["Social Login", "UI/UX Designing", "Material Design", "GitLab"]
        }
    ];

    function generateProjectHTML(project) {

        const sliderImagesHTML = project.images.map(image => `
            <div>
                <img src="${image.src}" alt="${image.alt}" class="overlay-content-slider-image">
            </div>
        `).join('');

        const chipsHTML = project.chips.map(chip => `<div class="chip">${chip}</div>`).join('');

        //<div class="item-folio" onclick="openNav('${project.title}'); return false;"></div>
        return `
            <div class="masonry__brick">
                <div class="item-folio">
                    <div class="item-folio__thumb" onclick="redirectUrl('${project.projectLink}'); return false;">
                        <a class="thumb-link" title="${project.title}" data-size="${project.thumb.size}">
                        <img src="${project.thumb.src}" alt="${project.thumb.alt}">
                        <span class="shadow-overlay"></span>
                        </a>
                    </div>
                    <div class="item-folio__text">
                        <h3 class="item-folio__title">${project.title}</h3>
                        <p class="item-folio__cat">${project.role}</p>
                    </div>
                    <a href="${project.projectLink}" class="item-folio__project-link" title="Project link">
                        <i class="im im-link"></i>
                    </a>
                    <div class="item-folio__caption">
                        <p>${project.description}</p>
                    </div>
                </div>
                <div id="${project.title}-overlay" class="overlay">
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav('${project.title}')">&times;</a>
                <div class="overlay-left">
                    <div class="overlay-content-slider project-slider">${sliderImagesHTML}</div>
                        </div>
                        <div class="overlay-right">
                        <div class="overlay-content">
                            <a href="#">About</a>
                            <a href="#">Services</a>
                            <a href="#">Clients</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                </div>
                <div class="chip-container">
                    ${chipsHTML}
                </div>
            </div>
        `;
    };

    var ssProjectImagesSlider = function () {
        $('.project-slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: "<div class='slick-prev'><i class='im im-arrow-left' aria-hidden='true'></i></div>",
            nextArrow: "<div class='slick-next'><i class='im im-arrow-right' aria-hidden='true'></i></div>",
            pauseOnFocus: false,
            autoplay: false,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

    var ssExecuteDynamicProjecLayout = function renderProjects() {
        const masonryContainer = document.getElementById('masonryContainer');
        masonryContainer.innerHTML = projects.map(generateProjectHTML).join('');
        ssChipsLayout();
    };

    /* chips layout
     * ------------------------------------------------------ */

    const primaryColors = [
        { r: 33, g: 150, b: 243 },   // Blue
        { r: 76, g: 175, b: 80 },    // Green
        { r: 244, g: 67, b: 54 },    // Red
        { r: 255, g: 235, b: 59 },   // Yellow
        { r: 156, g: 102, b: 255 },  // Purple
        { r: 198, g: 226, b: 255 },  // Light Blue
        { r: 158, g: 188, b: 255 },  // Medium Blue
        { r: 100, g: 149, b: 237 },  // Dark Blue
        { r: 200, g: 231, b: 181 },  // Light Green
        { r: 165, g: 201, b: 133 },  // Medium Green
        { r: 130, g: 170, b: 85 },   // Dark Green
        { r: 255, g: 152, b: 147 },  // Light Red
        { r: 244, g: 111, b: 96 },   // Medium Red
        { r: 211, g: 68, b: 55 },    // Dark Red
        { r: 255, g: 243, b: 158 },  // Light Yellow
        { r: 255, g: 224, b: 81 },   // Medium Yellow
        { r: 211, g: 180, b: 255 },  // Light Purple
        { r: 171, g: 142, b: 255 },  // Medium Purple
        { r: 131, g: 104, b: 255 },  // Dark Purple
        { r: 204, g: 184, b: 0 },    // Dark Yellow
        { r: 183, g: 164, b: 0 },    // Darker Yellow
        { r: 153, g: 138, b: 0 },    // Even Darker Yellow
        { r: 133, g: 121, b: 0 },    // Very Dark Yellow
        { r: 102, g: 92, b: 0 },     // Extremely Dark Yellow
        { r: 34, g: 139, b: 34 },    // Forest Green
        { r: 0, g: 128, b: 0 },      // Green
        { r: 46, g: 139, b: 87 },    // Sea Green
        { r: 60, g: 179, b: 113 },   // Medium Sea Green
        { r: 0, g: 100, b: 0 },      // Dark Green
        { r: 85, g: 107, b: 47 },    // Dark Olive Green
        { r: 107, g: 142, b: 35 },   // Olive Drab
        { r: 255, g: 69, b: 0 },     // Orange Red
        { r: 255, g: 105, b: 180 },  // Hot Pink
        { r: 255, g: 20, b: 147 },   // Deep Pink
        { r: 219, g: 112, b: 147 },  // Pale Violet Red
        { r: 199, g: 21, b: 133 },   // Medium Violet Red
        { r: 220, g: 20, b: 60 },    // Crimson
        { r: 255, g: 140, b: 0 },    // Dark Orange
        { r: 255, g: 165, b: 0 },    // Orange
        { r: 255, g: 0, b: 255 },    // Magenta
        { r: 186, g: 85, b: 211 },   // Medium Orchid
        { r: 148, g: 0, b: 211 },    // Dark Violet
        { r: 138, g: 43, b: 226 },   // Blue Violet
        { r: 75, g: 0, b: 130 },     // Indigo
        { r: 178, g: 34, b: 34 },    // Fire Brick
        { r: 139, g: 0, b: 0 },      // Dark Red
        { r: 255, g: 215, b: 0 },    // Gold
        { r: 184, g: 134, b: 11 },   // Dark Golden Rod
        { r: 218, g: 165, b: 32 },   // Golden Rod
        { r: 189, g: 183, b: 107 },  // Dark Khaki
    ];


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    var ssChipsLayout = function applyRandomMaterialColor() {
        const chips = document.querySelectorAll('.chip');
        const colors = [...primaryColors];
        shuffle(colors);

        chips.forEach((chip, index) => {
            if (index < colors.length) {
                const color = colors[index];
                const rgbColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
                chip.style.backgroundColor = rgbColor;
            } else {
                console.warn('Not enough unique colors to assign to all chips.');
            }
        });
    };


    /* Highlight the current section in the navigation bar
     * ------------------------------------------------------ */
    var ssWaypoints = function () {

        var sections = $(".target-section"),
            navigation_links = $(".header-nav li a");

        sections.waypoint({

            handler: function (direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });

    };


    /* Stat Counter
     * ------------------------------------------------------ */
    var ssStatCount = function () {

        var statSection = $(".s-stats"),
            stats = $(".stats__count");

        function formatNumber(num, hasPlus) {
            if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.?0+$/, '') + "K+";
            } else {
                return num + (hasPlus ? "+" : "");
            }
        }

        statSection.waypoint({

            handler: function (direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);
                        var targetNumber = parseInt($this.text(), 10);
                        //var hasPlus = $this.text().toString().indexOf('+') !== -1;
                        var hasPlus = $this.text().toString().includes("+")
                        $({ Counter: 0 }).animate({ Counter: targetNumber }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            },
                            complete: function () {
                                $this.text(formatNumber(targetNumber, hasPlus));
                            }
                        });
                    });

                }

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };


    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing', function () {
                window.location.hash = target;
            });

        });
    };


    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var ssPlaceholder = function () {
        $('input, textarea, select').placeholder();
    };


    /* Alert Boxes
     * ------------------------------------------------------ */
    var ssAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Contact Form
     * ------------------------------------------------------ */
    var ssContactForm = function () {

        /* local validation */
        $('#contactForm').validate({

            /* submit via ajax */
            submitHandler: function (form) {

                var sLoader = $('.submit-loader');

                $.ajax({

                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function () {

                        sLoader.slideDown("slow");

                    },
                    success: function (msg) {

                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow");
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow");
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }

                    },
                    error: function () {

                        sLoader.slideUp("slow");
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");

                    }

                });
            }

        });
    };


    /* Back to Top
     * ------------------------------------------------------ */
    var ssBackToTop = function () {

        var pxShow = 500,   // height on which the button will show
            fadeInTime = 400,   // how slow/fast you want the button to show
            fadeOutTime = 400,   // how slow/fast you want the button to hide
            scrollSpeed = 300,   // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
            goTopButton = $(".go-top")

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssMasonryFolio();
        ssSlickSlider();
        ssWaypoints();
        ssStatCount();
        ssSmoothScroll();
        ssPlaceholder();
        ssAlertBoxes();
        ssContactForm();
        ssBackToTop();
        ssExecuteDynamicProjecLayout();
        ssProjectImagesSlider();

    })();


})(jQuery);