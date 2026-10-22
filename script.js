/* ==========================================================================
   Portfolio — Sohan Alibert
   Petites interactions. Le contenu reste accessible même sans JavaScript.
   ========================================================================== */
(function () {
  "use strict";

  /* 1. Année du copyright ------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* 2. Menu mobile ------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  function setMenu(open) {
    if (!toggle || !links) return;
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setMenu(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-header")) setMenu(false);
    });
  }

  /* 3. Liens « à compléter » -------------------------------------------- *
   * Tant qu'un lien a aria-disabled="true", il ne mène nulle part.
   * Pour l'activer : remplace href="#" par la vraie URL ET supprime
   * l'attribut aria-disabled="true" dans le HTML.                         */
  document.querySelectorAll('a[aria-disabled="true"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  /* 4. Galerie : boutons précédent / suivant ---------------------------- */
  document.querySelectorAll("[data-gallery]").forEach(function (wrap) {
    var track = wrap.querySelector(".gallery");
    if (!track) return;
    wrap.querySelectorAll("[data-dir]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = Number(btn.getAttribute("data-dir"));
        track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
      });
    });
  });

  /* 5. Section active dans la navigation (page d'accueil) --------------- */
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navAnchors.length && "IntersectionObserver" in window) {
    var map = {};
    navAnchors.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = map[entry.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* 6. Barre de navigation : ombre renforcée quand la page défile -------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
