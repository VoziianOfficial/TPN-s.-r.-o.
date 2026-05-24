"use strict";

(function () {
    const config = window.SITE_CONFIG || {};
    const helpers = window.TPN || {};

    document.addEventListener("DOMContentLoaded", () => {
      renderHomeHero();
      renderTrustStrip();
      renderHomeServices();
      initHomeServicesSwiper();
      renderHomeAbout();
      renderHomeProcess();
      renderHomeBenefits();
      renderHomeStrategy();
      renderHomeFramework();
      renderHomeContactDetails();
      initHeroStatCounter();

        if (typeof helpers.initFaqAccordions === "function") {
            helpers.initFaqAccordions();
        }

        if (typeof helpers.initForms === "function") {
            helpers.initForms();
        }

        if (typeof helpers.initLibraries === "function") {
            helpers.initLibraries();
        }
    });

    function escapeHtml(value) {
        if (typeof helpers.escapeHtml === "function") {
            return helpers.escapeHtml(value);
        }

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function createIcon(name, extraClass = "") {
        if (typeof helpers.createIcon === "function") {
            return helpers.createIcon(name, extraClass);
        }

        return `<i data-lucide="${escapeHtml(name)}" class="${escapeHtml(extraClass)}" aria-hidden="true"></i>`;
    }

    function getHomeData() {
        return config.home || {};
    }

    function getServices() {
        return Array.isArray(config.services) ? config.services : [];
    }

    function getImage(key) {
        return config.assets?.images?.[key] || "";
    }

    function getEmailValue() {
        return config.email?.value || "";
    }

    function getEmailHref() {
        return config.email?.href || (getEmailValue() ? `mailto:${getEmailValue()}` : "#");
    }

    function getAddressText() {
        return config.address?.full || "";
    }

    function getMapsUrl() {
        return config.address?.mapsUrl || "#";
    }

    /* =========================
       HERO
    ========================= */

    function renderHomeHero() {
        const hero = getHomeData().hero || {};
        const image = getImage("homeHero");

        const bgImage = document.querySelector("[data-home-hero-bg]");
        const eyebrow = document.querySelector("[data-home-hero-eyebrow]");
        const title = document.querySelector("[data-home-hero-title]");
        const text = document.querySelector("[data-home-hero-text]");
        const primary = document.querySelector("[data-home-hero-primary]");
        const secondary = document.querySelector("[data-home-hero-secondary]");
        const statValue = document.querySelector("[data-home-hero-stat-value]");
        const statText = document.querySelector("[data-home-hero-stat-text]");
        const visualImage = document.querySelector("[data-home-hero-visual]");

        if (bgImage && image) {
            bgImage.setAttribute("src", image);
            bgImage.setAttribute("alt", "Creative marketing strategy workspace");
        }

      if (visualImage && getImage("heroVisual")) {
        visualImage.setAttribute("src", getImage("heroVisual"));
        visualImage.setAttribute("alt", "Marketing team planning digital growth strategy");
      }

        if (eyebrow) {
            eyebrow.textContent = hero.eyebrow || "Growth marketing agency";
        }

        if (title) {
            title.innerHTML = formatHeroTitle(hero.title || "We Craft Growth-Driven Digital Experiences");
        }

        if (text) {
            text.textContent = hero.text || "";
        }

        if (primary) {
            primary.innerHTML = `
        <span>${escapeHtml(hero.primaryCta || "Let’s Grow Together")}</span>
        ${createIcon("arrow-up-right")}
      `;
        }

        if (secondary) {
            secondary.innerHTML = `
        <span>${escapeHtml(hero.secondaryCta || "Explore Services")}</span>
        ${createIcon("arrow-down")}
      `;
        }

        if (statValue) {
            statValue.textContent = hero.statValue || "150+";
        }

        if (statText) {
            statText.textContent = hero.statLabel || "";
        }
    }

    function formatHeroTitle(title) {
        const words = String(title || "").trim().split(" ");

        if (words.length < 2) {
            return escapeHtml(title);
        }

        const lastWords = words.splice(-2).join(" ");
        return `${escapeHtml(words.join(" "))} <span>${escapeHtml(lastWords)}</span>`;
    }

    /* =========================
       TRUST STRIP
    ========================= */

  function renderTrustStrip() {
    const mount = document.querySelector("[data-trust-strip]");
    const proof = getHomeData().proof;

    if (!mount || !Array.isArray(proof)) return;

    const repeatedProof = [...proof, ...proof, ...proof];

    mount.innerHTML = repeatedProof.map((item, index) => `
      <span class="trust-strip__item" ${index >= proof.length ? 'aria-hidden="true"' : ""}>
        ${escapeHtml(item)}
      </span>
    `).join("");
  }

    /* =========================
       SERVICES
    ========================= */
    function renderHomeServices() {
        const mount = document.querySelector("[data-home-services]");
        const services = getServices();

        if (!mount || !services.length) return;

    mount.classList.add("swiper", "home-services__slider");

    mount.innerHTML = `
      <div class="swiper-wrapper home-services__wrapper">
        ${services.map((service, index) => {
      const serviceBg = service.homeImage || service.image || "";
      const resolvedServiceBg = serviceBg ? resolveAssetUrl(serviceBg) : "";

      return `
              <a
                class="service-card premium-card swiper-slide"
                href="${escapeHtml(service.href)}"
                style="--service-bg: ${resolvedServiceBg ? `url('${escapeHtml(resolvedServiceBg)}')` : "none"};"
                data-aos="fade-up"
                data-aos-delay="${index * 55}"
                aria-label="Explore ${escapeHtml(service.title)} service"
              >
                <span class="service-card__bg" aria-hidden="true"></span>

                <span class="service-card__top">
                  <span class="card-icon">${createIcon(service.icon || "sparkles")}</span>
                  <span class="service-card__number">${String(index + 1).padStart(2, "0")}</span>
                </span>

                <span class="service-card__body">
                  <span class="service-card__title">${escapeHtml(service.title)}</span>
                  <span class="service-card__text">${escapeHtml(service.cardText || "")}</span>
                </span>

                <span class="text-link service-card__link">
                  <span>Explore service</span>
                  ${createIcon("arrow-up-right")}
                </span>
              </a>
            `;
    }).join("")}
      </div>

      <div class="home-services__pagination swiper-pagination" aria-label="Services slider pagination"></div>
    `;
  }

    function resolveAssetUrl(path) {
        try {
            return new URL(path, document.baseURI).href;
        } catch (error) {
            return path;
        }
    }

    /* =========================
       ABOUT
    ========================= */

    function renderHomeAbout() {
        const about = getHomeData().about || {};
        const image = document.querySelector("[data-home-about-image]");
        const eyebrow = document.querySelector("[data-home-about-eyebrow]");
        const title = document.querySelector("[data-home-about-title]");
        const text = document.querySelector("[data-home-about-text]");
        const pointsMount = document.querySelector("[data-home-about-points]");

        if (image && getImage("about")) {
            image.setAttribute("src", getImage("about"));
            image.setAttribute("alt", "Creative agency team reviewing marketing ideas");
        }

        if (eyebrow) {
            eyebrow.textContent = about.eyebrow || "About TPN";
        }

        if (title) {
            title.textContent = about.title || "";
        }

        if (text) {
            text.textContent = about.text || "";
        }

        if (pointsMount && Array.isArray(about.points)) {
            pointsMount.innerHTML = about.points.map((point, index) => `
        <article class="about-point" data-aos="fade-up" data-aos-delay="${index * 60}">
          <div class="about-point__icon">${createIcon(point.icon || "check")}</div>
          <h3 class="about-point__title">${escapeHtml(point.title)}</h3>
          <p class="about-point__text">${escapeHtml(point.text)}</p>
        </article>
      `).join("");
        }
    }

    /* =========================
       PROCESS
    ========================= */

  function renderHomeProcess() {
    const mount = document.querySelector("[data-home-process]");
    const steps = getHomeData().process;

    if (!mount || !Array.isArray(steps)) return;

    const visibleSteps = steps.slice(0, 4);

    const cards = visibleSteps.map((step, index) => `
      <article class="process-card process-card--${index + 1}" data-aos="fade-up" data-aos-delay="${index * 70}">
        <span class="process-card__number">${String(index + 1).padStart(2, "0")}</span>
        <h3 class="process-card__title">${escapeHtml(step.title)}</h3>
        <p class="process-card__text">${escapeHtml(step.text)}</p>
      </article>
    `).join("");

    mount.innerHTML = `
      <svg class="process-path" viewBox="0 0 980 760" fill="none" aria-hidden="true">
        <path
          d="M595 82 C480 106 414 158 351 226 C294 288 255 348 328 406 C394 458 517 439 581 502 C647 568 548 647 424 704"
          stroke="rgba(31, 35, 40, 0.26)"
          stroke-width="2"
          stroke-dasharray="7 9"
          stroke-linecap="round"
        />
      </svg>

      <span class="process-dot process-dot--1" aria-hidden="true"></span>
      <span class="process-dot process-dot--2" aria-hidden="true"></span>
      <span class="process-dot process-dot--3" aria-hidden="true"></span>
      <span class="process-dot process-dot--4" aria-hidden="true"></span>

      ${cards}

      <div class="process-note" aria-hidden="true">Ready to be delivered!</div>
    `;
  }
    /* =========================
       BENEFITS
    ========================= */

    function renderHomeBenefits() {
        const mount = document.querySelector("[data-home-benefits]");
        const benefits = getHomeData().benefits;

        if (!mount || !Array.isArray(benefits)) return;

        mount.innerHTML = benefits.map((benefit, index) => `
      <article class="benefit-card premium-card" data-aos="fade-up" data-aos-delay="${index * 55}">
        <div class="benefit-card__top">
          <span class="benefit-card__number">${String(index + 1).padStart(2, "0")}</span>
          <span class="benefit-card__icon">${createIcon(benefit.icon || "sparkles")}</span>
        </div>

        <h3 class="benefit-card__title">${escapeHtml(benefit.title)}</h3>
        <p class="benefit-card__text">${escapeHtml(benefit.text)}</p>
      </article>
    `).join("");
    }

    /* =========================
       STRATEGY
    ========================= */

    function renderHomeStrategy() {
        const mount = document.querySelector("[data-home-strategy]");
        const items = getHomeData().strategy;

        if (!mount || !Array.isArray(items)) return;

        const iconNames = [
            "badge-dollar-sign",
            "search-check",
            "layout-template",
            "map-pin-check",
            "bar-chart-3"
        ];

        mount.innerHTML = items.map((item, index) => `
      <article class="strategy-item" data-aos="fade-left" data-aos-delay="${index * 65}">
        <span class="strategy-item__icon">
          ${createIcon(iconNames[index] || "sparkles")}
        </span>

        <h3 class="strategy-item__title">${escapeHtml(item)}</h3>

        <span class="strategy-item__arrow">
          ${createIcon("arrow-right")}
        </span>
      </article>
    `).join("");
    }

    /* =========================
       FRAMEWORK
    ========================= */

    function renderHomeFramework() {
        const mount = document.querySelector("[data-home-framework]");
        const items = getHomeData().framework;

        if (!mount || !Array.isArray(items)) return;

        mount.innerHTML = items.map((item, index) => `
      <article class="framework-node" data-aos="fade-up" data-aos-delay="${index * 70}">
        <span class="framework-node__dot" aria-hidden="true"></span>
        <h3 class="framework-node__title">${escapeHtml(item.title)}</h3>
        <p class="framework-node__text">${escapeHtml(item.text)}</p>
      </article>
    `).join("");
    }

  /* =========================
 CONTACT DETAILS
========================= */

  function renderHomeContactDetails() {
    const mount = document.querySelector("[data-home-contact-details]");
    if (!mount) return;

    const emailValue = getEmailValue();
    const addressText = getAddressText();

    mount.innerHTML = `
      ${emailValue ? `
        <a class="home-contact__direct-link" href="${escapeHtml(getEmailHref())}">
          ${createIcon("mail")}
          <span>
            <span class="home-contact__direct-label">Email</span>
            <span class="home-contact__direct-value">${escapeHtml(emailValue)}</span>
          </span>
        </a>
      ` : ""}

      ${addressText ? `
        <a
          class="home-contact__direct-link"
          href="${escapeHtml(getMapsUrl())}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${createIcon("map-pin")}
          <span>
            <span class="home-contact__direct-label">Address</span>
            <span class="home-contact__direct-value">${escapeHtml(addressText)}</span>
          </span>
        </a>
      ` : ""}
    `;
  }

  /* =========================
     HERO STAT COUNTER
  ========================= */

  function initHeroStatCounter() {
    const counters = document.querySelectorAll(".home-hero__stat-value");

    if (!counters.length) return;

    const animateCounter = (counter) => {
      if (counter.dataset.counted === "true") return;

      const originalText = counter.textContent.trim();
      const target = parseInt(originalText.replace(/[^\d]/g, ""), 10);
      const suffix = originalText.replace(/[\d]/g, "");

      if (!target || Number.isNaN(target)) return;

      counter.dataset.counted = "true";

      const duration = 2300;
      const startTime = performance.now();

      const easeOutCubic = (progress) => {
        return 1 - Math.pow(1 - progress, 3);
      };

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = Math.floor(easedProgress * target);

        counter.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.45
      }
    );

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  /* =========================
   SERVICES SWIPER
========================= */

  let homeServicesSwiper = null;

  function initHomeServicesSwiper() {
    const slider = document.querySelector(".home-services__slider");
    if (!slider) return;

    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const enableSwiper = () => {
      if (!mediaQuery.matches) {
        if (homeServicesSwiper) {
          homeServicesSwiper.destroy(true, true);
          homeServicesSwiper = null;
        }

        return;
      }

      if (homeServicesSwiper || typeof Swiper === "undefined") return;

      homeServicesSwiper = new Swiper(slider, {
        loop: true,
        speed: 720,
        spaceBetween: 14,
        grabCursor: true,
        slidesPerView: 1,
        centeredSlides: false,
        pagination: {
          el: ".home-services__pagination",
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 16
          }
        }
      });
    };

    enableSwiper();

    mediaQuery.addEventListener("change", enableSwiper);
  }
})();
