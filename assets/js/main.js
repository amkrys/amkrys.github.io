/* Portfolio interactions: theme toggle, mobile nav, header state,
   active-section highlighting, scroll reveal, copy email. No dependencies. */
(function () {
    'use strict';

    var root = document.documentElement;
    var header = document.getElementById('site-header');

    /* ---------- theme ---------- */
    var themeBtn = document.getElementById('theme-toggle');

    function applyTheme(theme, persist) {
        root.setAttribute('data-theme', theme);
        var next = theme === 'dark' ? 'light' : 'dark';
        themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
        if (persist) {
            try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
        }
    }

    applyTheme(root.getAttribute('data-theme') || 'dark', false);
    themeBtn.addEventListener('click', function () {
        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });

    // Follow OS changes unless the visitor picked a theme explicitly
    if (window.matchMedia) {
        var mq = matchMedia('(prefers-color-scheme: light)');
        var onChange = function (e) {
            var saved = null;
            try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
            if (!saved) applyTheme(e.matches ? 'light' : 'dark', false);
        };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
    }

    /* ---------- mobile nav ---------- */
    var nav = document.getElementById('site-nav');
    var navBtn = document.getElementById('nav-toggle');

    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        header.classList.toggle('menu-open', open);
        navBtn.setAttribute('aria-expanded', String(open));
        navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    navBtn.addEventListener('click', function () {
        setMenu(navBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navBtn.getAttribute('aria-expanded') === 'true') {
            setMenu(false);
            navBtn.focus();
        }
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 960) setMenu(false);
    });

    /* ---------- header background after scrolling past the top ---------- */
    function onScroll() {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!('IntersectionObserver' in window)) return;

    /* ---------- highlight the nav link for the section in view ---------- */
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    // Sections without their own nav item map to the closest one
    var navFor = { about: 'about', experience: 'experience', work: 'work', apps: 'work', stack: 'stack', ai: 'stack', accessibility: 'stack', roms: 'stack', education: 'stack', contact: 'contact' };

    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var target = byId[navFor[entry.target.id]];
            links.forEach(function (a) { a.removeAttribute('aria-current'); });
            if (target) target.setAttribute('aria-current', 'true');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main > section[id]').forEach(function (s) {
        if (s.id === 'top') return;
        sectionObserver.observe(s);
    });
    // Clear the highlight when back at the hero
    new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) links.forEach(function (a) { a.removeAttribute('aria-current'); });
    }, { rootMargin: '-45% 0px -50% 0px' }).observe(document.getElementById('top'));

    /* ---------- scroll reveal ---------- */
    if (root.classList.contains('js-reveal')) {
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        document.querySelectorAll('.reveal').forEach(function (el) {
            // Stagger siblings slightly so grids cascade in
            var siblings = el.parentElement.querySelectorAll(':scope > .reveal');
            var idx = Array.prototype.indexOf.call(siblings, el);
            if (idx > 0) el.style.transitionDelay = Math.min(idx, 5) * 70 + 'ms';
            revealObserver.observe(el);
        });
    }
})();

/* ---------- copy email + footer year (independent of observer support) ---------- */
(function () {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    var status = document.getElementById('copy-status');
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        var label = btn.querySelector('.copy-btn__label');
        btn.addEventListener('click', function () {
            var text = btn.getAttribute('data-copy');
            var done = function () {
                label.textContent = 'Copied!';
                if (status) status.textContent = 'Email address copied to clipboard';
                setTimeout(function () { label.textContent = 'Copy email'; }, 2000);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
            } else {
                window.location.href = 'mailto:' + text;
            }
        });
    });
})();
