"use strict";

(function () {
    const config = window.SITE_CONFIG || {};

    const SELECTORS = {
        headerMount: "[data-site-header]",
        footerMount: "[data-site-footer]",
        cookieMount: "[data-cookie-banner]",
        faqList: "[data-faq-list]",
        contactForm: "[data-contact-form]"
    };

    let dropdownCloseTimer = null;

    document.addEventListener("DOMContentLoaded", () => {
        applyPageMeta();
        renderHeader();
        renderFooter();
        injectGlobalCompanyData();
        renderCookieBanner();
        renderMountedFaqs();
        renderMountedForms();
        initStickyHeader();
        initDesktopDropdown();
        initMobileMenu();
        initFaqAccordions();
        initForms();
        initAnchorCloseBehavior();
        initExternalLinksSafety();
        initLibraries();
        preventHorizontalOverflowWarnings();
    });

    function getCurrentPageName() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf("/") + 1);
        return page || "index.html";
    }

    function getCurrentService() {
        const page = getCurrentPageName();

        if (!Array.isArray(config.services)) {
            return null;
        }

        return config.services.find((service) => {
            if (!service || !service.href) return false;
            return normalizeHrefToPage(service.href) === page;
        }) || null;
    }

    function normalizeHrefToPage(href) {
        if (!href || typeof href !== "string") return "";
        const clean = href.split("#")[0].split("?")[0];
        const part = clean.substring(clean.lastIndexOf("/") + 1);
        return part || "index.html";
    }

    function createIcon(name, extraClass = "") {
        if (!name) return "";
        return `<i data-lucide="${escapeHtml(name)}" class="${escapeHtml(extraClass)}" aria-hidden="true"></i>`;
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function getCompanyName() {
        return config.companyName || "TPN s. r. o.";
    }

    function getBrandName() {
        return config.brandName || "TPN";
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

    function getServices() {
        return Array.isArray(config.services) ? config.services : [];
    }

    function getNavigation() {
        return Array.isArray(config.navigation) ? config.navigation : [];
    }

    function getLegalLinks() {
        return Array.isArray(config.legalLinks) ? config.legalLinks : [];
    }

    /* =========================
       META
    ========================= */

    function applyPageMeta() {
        const page = getCurrentPageName();
        const meta = config.pageMeta?.[page];

        if (!meta) return;

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let descriptionTag = document.querySelector('meta[name="description"]');

            if (!descriptionTag) {
                descriptionTag = document.createElement("meta");
                descriptionTag.setAttribute("name", "description");
                document.head.appendChild(descriptionTag);
            }

            descriptionTag.setAttribute("content", meta.description);
        }
    }

    /* =========================
       HEADER
    ========================= */

    function renderHeader() {
        const mount = document.querySelector(SELECTORS.headerMount);
        if (!mount) return;

        const currentPage = getCurrentPageName();
        const currentService = getCurrentService();
        const services = getServices();
        const navigation = getNavigation();

        const navHtml = navigation.map((item) => {
            if (!item) return "";

            const isServicesActive = item.id === "services" && !!currentService;
            const isHomeActive = item.id === "home" && currentPage === "index.html";
            const isActive = isServicesActive || isHomeActive || normalizeHrefToPage(item.href) === currentPage;

            if (item.hasDropdown) {
                return `
          <div class="header-nav__item" data-services-dropdown>
            <button
              class="header-nav__trigger ${isActive ? "is-active" : ""}"
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              data-services-trigger
            >
              <span>${escapeHtml(item.label)}</span>
              ${createIcon("chevron-down")}
            </button>

            <div class="services-dropdown" data-services-menu>
              <div class="services-dropdown__grid">
                ${services.map((service) => renderDropdownService(service, currentPage)).join("")}
              </div>
            </div>
          </div>
        `;
            }

            return `
        <a
          class="header-nav__link ${isActive ? "is-active" : ""}"
          href="${escapeHtml(item.href)}"
          data-nav-link="${escapeHtml(item.id || "")}"
        >
          ${escapeHtml(item.label)}
        </a>
      `;
        }).join("");

        mount.innerHTML = `
      <header class="site-header" data-header>
        <div class="header-inner">
        ${renderLogo("./index.html")}

          <nav class="header-nav" aria-label="Primary navigation">
            ${navHtml}
          </nav>

          <div class="header-actions">
            <a class="btn btn-primary header-cta" href="./index.html#contact">
              <span>Start a Project</span>
              ${createIcon("arrow-up-right")}
            </a>

            <button
              class="mobile-toggle"
              type="button"
              aria-label="Open menu"
              aria-controls="mobileMenu"
              aria-expanded="false"
              data-mobile-open
            >
              ${createIcon("menu")}
            </button>
          </div>
        </div>
      </header>

      ${renderMobileMenu(currentPage)}
    `;
    }

  function renderLogo(href = "./index.html", variant = "default") {
    const defaultLogo = config.assets?.logoIcon || "./assets/icons/tpn-logo.png";
    const darkLogo = config.assets?.logoIconDark || defaultLogo;
    const logoSrc = variant === "dark" ? darkLogo : defaultLogo;

    return `
        <a class="site-logo" href="${escapeHtml(href)}" aria-label="${escapeHtml(getCompanyName())} home">
            <img
                class="site-logo__mark"
                src="${escapeHtml(logoSrc)}"
                alt=""
                width="78"
                height="62"
                aria-hidden="true"
            >
            <span class="site-logo__text">
                <span class="site-logo__name">${escapeHtml(getCompanyName())}</span>
                <span class="site-logo__tagline">Growth agency</span>
            </span>
        </a>
    `;
  }

    function renderDropdownService(service, currentPage) {
        if (!service) return "";

        const servicePage = normalizeHrefToPage(service.href);
        const isActive = servicePage === currentPage;

        return `
      <a class="services-dropdown__item ${isActive ? "is-active" : ""}" href="${escapeHtml(service.href)}">
        <span class="services-dropdown__icon">
          ${createIcon(service.icon || "sparkles")}
        </span>
        <span>
          <span class="services-dropdown__title">${escapeHtml(service.title)}</span>
          <span class="services-dropdown__text">${escapeHtml(service.dropdownText || service.cardText || "")}</span>
        </span>
        <span class="services-dropdown__arrow">
          ${createIcon("arrow-up-right")}
        </span>
      </a>
    `;
    }

    function renderMobileMenu(currentPage) {
        const navigation = getNavigation();
        const services = getServices();
        const currentService = getCurrentService();

        const navHtml = navigation.map((item) => {
            if (!item) return "";

            const isServicesActive = item.id === "services" && !!currentService;
            const isHomeActive = item.id === "home" && currentPage === "index.html";
            const isActive = isServicesActive || isHomeActive || normalizeHrefToPage(item.href) === currentPage;

            return `
        <a class="mobile-menu__link ${isActive ? "is-active" : ""}" href="${escapeHtml(item.href)}" data-mobile-link>
          <span>${escapeHtml(item.label)}</span>
          ${createIcon("arrow-up-right")}
        </a>
      `;
        }).join("");

        const servicesHtml = services.map((service) => `
      <a class="mobile-menu__service-link" href="${escapeHtml(service.href)}" data-mobile-link>
        <span>${escapeHtml(service.title)}</span>
        ${createIcon("arrow-right")}
      </a>
    `).join("");

        return `
      <aside class="mobile-menu" id="mobileMenu" data-mobile-menu>
        <div class="mobile-menu__top">
         ${renderLogo("./index.html", "dark")}

          <button class="mobile-menu__close" type="button" aria-label="Close menu" data-mobile-close>
            ${createIcon("x")}
          </button>
        </div>

        <div class="mobile-menu__content">
          <nav class="mobile-menu__nav" aria-label="Mobile navigation">
            ${navHtml}
          </nav>

          <div class="mobile-menu__services" aria-label="Service links">
            <div class="mobile-menu__services-title">Services</div>
            ${servicesHtml}
          </div>
        </div>

        <div class="mobile-menu__bottom">
          <div class="mobile-menu__contact">
            ${getEmailValue() ? `
              <a href="${escapeHtml(getEmailHref())}">
                ${escapeHtml(getEmailValue())}
              </a>
            ` : ""}

            ${getAddressText() ? `
              <a href="${escapeHtml(getMapsUrl())}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(getAddressText())}
              </a>
            ` : ""}
          </div>

          <a class="btn btn-accent" href="./index.html#contact" data-mobile-link>
            <span>Start a Project</span>
            ${createIcon("arrow-up-right")}
          </a>

          <p class="mobile-menu__note">
            Thoughtful strategy, creative execution, and continuous optimization for brands that want stronger digital direction.
          </p>
        </div>
      </aside>
    `;
    }

    function initStickyHeader() {
        const header = document.querySelector("[data-header]");
        if (!header) return;

        const updateHeaderState = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };

        updateHeaderState();

        window.addEventListener("scroll", updateHeaderState, { passive: true });
    }

    function initDesktopDropdown() {
        const dropdown = document.querySelector("[data-services-dropdown]");
        if (!dropdown) return;

        const trigger = dropdown.querySelector("[data-services-trigger]");

        const openDropdown = () => {
            clearTimeout(dropdownCloseTimer);
            dropdown.classList.add("is-open");

            if (trigger) {
                trigger.setAttribute("aria-expanded", "true");
            }
        };

        const closeDropdown = () => {
            clearTimeout(dropdownCloseTimer);

            dropdownCloseTimer = window.setTimeout(() => {
                dropdown.classList.remove("is-open");

                if (trigger) {
                    trigger.setAttribute("aria-expanded", "false");
                }
            }, 240);
        };

        dropdown.addEventListener("mouseenter", openDropdown);
        dropdown.addEventListener("mouseleave", closeDropdown);

        dropdown.addEventListener("focusin", openDropdown);
        dropdown.addEventListener("focusout", (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                closeDropdown();
            }
        });

        if (trigger) {
            trigger.addEventListener("click", () => {
                const isOpen = dropdown.classList.contains("is-open");

                if (isOpen) {
                    dropdown.classList.remove("is-open");
                    trigger.setAttribute("aria-expanded", "false");
                } else {
                    openDropdown();
                }
            });
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && dropdown.classList.contains("is-open")) {
                dropdown.classList.remove("is-open");

                if (trigger) {
                    trigger.setAttribute("aria-expanded", "false");
                    trigger.focus();
                }
            }
        });

        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("is-open");

                if (trigger) {
                    trigger.setAttribute("aria-expanded", "false");
                }
            }
        });
    }

    /* =========================
       MOBILE MENU
    ========================= */

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-mobile-open]");
        const closeButton = document.querySelector("[data-mobile-close]");

        if (!menu || !openButton || !closeButton) return;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            '[tabindex]:not([tabindex="-1"])'
        ].join(",");

        const setMenuState = (isOpen) => {
            menu.classList.toggle("is-open", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
            openButton.setAttribute("aria-expanded", String(isOpen));

            if (isOpen) {
                menu.removeAttribute("inert");

                window.setTimeout(() => {
                    closeButton.focus();
                }, 80);
            } else {
                menu.setAttribute("inert", "");
                openButton.focus();
            }
        };

        menu.setAttribute("inert", "");

        openButton.addEventListener("click", () => setMenuState(true));
        closeButton.addEventListener("click", () => setMenuState(false));

        menu.querySelectorAll("[data-mobile-link]").forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });

        document.addEventListener("keydown", (event) => {
            if (!menu.classList.contains("is-open")) return;

            if (event.key === "Escape") {
                setMenuState(false);
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = Array.from(menu.querySelectorAll(focusableSelector))
                .filter((element) => element.offsetParent !== null);

            if (!focusableElements.length) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024 && menu.classList.contains("is-open")) {
                setMenuState(false);
            }
        });
    }

    function initAnchorCloseBehavior() {
        document.addEventListener("click", (event) => {
            const link = event.target.closest('a[href^="#"], a[href*="index.html#"]');
            if (!link) return;

            const href = link.getAttribute("href");
            if (!href) return;

            const hashIndex = href.indexOf("#");
            if (hashIndex === -1) return;

            const hash = href.slice(hashIndex);
            if (!hash || hash === "#") return;

            const currentPage = getCurrentPageName();
            const linkPage = normalizeHrefToPage(href);

            if (linkPage && linkPage !== currentPage && href.includes(".html")) return;

            const target = document.querySelector(hash);
            if (!target) return;

            event.preventDefault();

            const headerHeight = document.querySelector("[data-header]")?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;

            window.scrollTo({
                top,
                behavior: "smooth"
            });

            history.pushState(null, "", hash);
        });
    }

    /* =========================
       FOOTER
    ========================= */

    function renderFooter() {
        const mount = document.querySelector(SELECTORS.footerMount);
        if (!mount) return;

        const services = getServices();
        const navigation = getNavigation().filter((item) => !item.hasDropdown);
        const legalLinks = getLegalLinks();

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-cta">
            <div>
              <div class="footer-cta__label">Ready when you are</div>
              <h2 class="footer-cta__title">
                Let’s shape a sharper <span>growth path</span> for your brand.
              </h2>
            </div>

            <div class="footer-cta__actions">
              <a class="btn btn-accent" href="./index.html#contact">
                <span>Start a Project</span>
                ${createIcon("arrow-up-right")}
              </a>
              <a class="btn btn-light" href="${escapeHtml(getEmailHref())}">
                <span>Email TPN</span>
                ${createIcon("mail")}
              </a>
            </div>
          </div>

          <div class="footer-grid">
            <div class="footer-brand">
              ${renderLogo("./index.html", "dark")}
              <p class="footer-brand__text">
                ${escapeHtml(config.footerText || "")}
              </p>

              <div class="footer-social-proof" aria-label="Agency focus points">
                <span class="footer-proof-pill">
                  ${createIcon("sparkles")}
                  Strategy
                </span>
                <span class="footer-proof-pill">
                  ${createIcon("bar-chart-3")}
                  Performance
                </span>
                <span class="footer-proof-pill">
                  ${createIcon("mouse-pointer-click")}
                  Conversion
                </span>
              </div>
            </div>

            <div class="footer-column">
              <h3 class="footer-column__title">Services</h3>
              <ul class="footer-links">
                ${services.map((service) => `
                  <li>
                    <a class="footer-link" href="${escapeHtml(service.href)}">
                      ${escapeHtml(service.shortTitle || service.title)}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </div>

            <div class="footer-column">
              <h3 class="footer-column__title">Navigation</h3>
              <ul class="footer-links">
                ${navigation.map((item) => `
                  <li>
                    <a class="footer-link" href="${escapeHtml(item.href)}">
                      ${escapeHtml(item.label)}
                    </a>
                  </li>
                `).join("")}
                <li>
                  <a class="footer-link" href="./index.html#services">Services</a>
                </li>
              </ul>
            </div>

            <div class="footer-column">
              <h3 class="footer-column__title">Legal</h3>
              <ul class="footer-links">
                ${legalLinks.map((item) => `
                  <li>
                    <a class="footer-link" href="${escapeHtml(item.href)}">
                      ${escapeHtml(item.label)}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </div>

            <div class="footer-column footer-column--contact">
              <h3 class="footer-column__title">Contact</h3>
              <div class="footer-contact">
                ${getEmailValue() ? `
                  <div class="footer-contact__item">
                    ${createIcon("mail")}
                    <div>
                      <span class="footer-contact__label">Email</span>
                      <a class="footer-contact__link" href="${escapeHtml(getEmailHref())}">
                        ${escapeHtml(getEmailValue())}
                      </a>
                    </div>
                  </div>
                ` : ""}

                ${getAddressText() ? `
                  <div class="footer-contact__item">
                    ${createIcon("map-pin")}
                    <div>
                      <span class="footer-contact__label">Address</span>
                      <a
                        class="footer-contact__link"
                        href="${escapeHtml(getMapsUrl())}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${escapeHtml(getAddressText())}
                      </a>
                    </div>
                  </div>
                ` : ""}
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="footer-copy">
              © <span data-current-year></span> ${escapeHtml(getCompanyName())}. All rights reserved.
            </p>

            <div class="footer-bottom__links">
              ${legalLinks.map((item) => `
                <a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
              `).join("")}
            </div>
          </div>

          <div class="footer-mini-line" aria-hidden="true"></div>
        </div>
      </footer>
    `;

        injectCurrentYear();
    }

    function injectCurrentYear() {
        document.querySelectorAll("[data-current-year]").forEach((element) => {
            element.textContent = String(new Date().getFullYear());
        });
    }

    /* =========================
       GLOBAL DATA INJECTION
    ========================= */

    function injectGlobalCompanyData() {
        document.querySelectorAll("[data-company-name]").forEach((element) => {
            element.textContent = getCompanyName();
        });

        document.querySelectorAll("[data-brand-name]").forEach((element) => {
            element.textContent = getBrandName();
        });

        document.querySelectorAll("[data-email-text]").forEach((element) => {
            element.textContent = getEmailValue();
        });

        document.querySelectorAll("[data-email-link]").forEach((element) => {
            element.setAttribute("href", getEmailHref());

            if (!element.textContent.trim()) {
                element.textContent = getEmailValue();
            }
        });

        document.querySelectorAll("[data-address-text]").forEach((element) => {
            element.textContent = getAddressText();
        });

        document.querySelectorAll("[data-address-link]").forEach((element) => {
            element.setAttribute("href", getMapsUrl());
            element.setAttribute("target", "_blank");
            element.setAttribute("rel", "noopener noreferrer");

            if (!element.textContent.trim()) {
                element.textContent = getAddressText();
            }
        });

        injectCurrentYear();
    }

    /* =========================
       FAQ
    ========================= */

    function renderMountedFaqs() {
        document.querySelectorAll(SELECTORS.faqList).forEach((mount) => {
            if (mount.dataset.rendered === "true") return;

            const source = mount.getAttribute("data-faq-source");
            let items = [];

            if (source === "home") {
                items = config.home?.faq || [];
            } else if (source === "service") {
                items = getCurrentService()?.faq || [];
            }

            if (!items.length) return;

            mount.innerHTML = renderFaqItems(items);
            mount.dataset.rendered = "true";
        });
    }

    function renderFaqItems(items) {
        return items.map((item, index) => `
      <article class="faq-item ${index === 0 ? "is-open" : ""}">
        <button
          class="faq-question"
          type="button"
          aria-expanded="${index === 0 ? "true" : "false"}"
        >
          <span>${escapeHtml(item.question)}</span>
          ${createIcon("plus")}
        </button>
        <div class="faq-answer">
          <div class="faq-answer__inner">
            <p>${escapeHtml(item.answer)}</p>
          </div>
        </div>
      </article>
    `).join("");
    }

    function initFaqAccordions() {
        document.querySelectorAll(".faq-item").forEach((item) => {
            const button = item.querySelector(".faq-question");
            if (!button || button.dataset.bound === "true") return;

            button.dataset.bound = "true";

            button.addEventListener("click", () => {
                const list = item.closest(".faq-list");
                const isOpen = item.classList.contains("is-open");

                if (list) {
                    list.querySelectorAll(".faq-item").forEach((otherItem) => {
                        const otherButton = otherItem.querySelector(".faq-question");
                        otherItem.classList.remove("is-open");

                        if (otherButton) {
                            otherButton.setAttribute("aria-expanded", "false");
                        }
                    });
                }

                if (!isOpen) {
                    item.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                }
            });
        });
    }

    /* =========================
       FORMS
    ========================= */

    function renderMountedForms() {
        document.querySelectorAll(SELECTORS.contactForm).forEach((mount) => {
            if (mount.dataset.rendered === "true") return;

            const title = mount.getAttribute("data-form-title") || "Tell us what you want to improve";
            const text = mount.getAttribute("data-form-text") || "Share a few details and TPN s. r. o. will respond by email.";
            const serviceName = mount.getAttribute("data-selected-service") || getCurrentService()?.title || "";

            mount.innerHTML = renderContactForm({
                title,
                text,
                selectedService: serviceName
            });

            mount.dataset.rendered = "true";
        });
    }

    function renderContactForm(options = {}) {
        const forms = config.forms || {};
        const labels = forms.labels || {};
        const placeholders = forms.placeholders || {};
        const serviceOptions = Array.isArray(forms.serviceOptions) ? forms.serviceOptions : [];

        return `
      <form class="contact-form" novalidate data-form>
        <div class="form-heading">
          <div class="section-kicker">${escapeHtml(options.title || "Start a project")}</div>
          <h3>${escapeHtml(options.text || "Send a focused inquiry to TPN s. r. o.")}</h3>
        </div>

        <div class="form-row" data-field="fullName">
          <label class="form-label" for="${getUniqueId("fullName")}">${escapeHtml(labels.fullName || "Full Name")}</label>
          <input
            class="form-control"
            id="${getUniqueId("fullName")}"
            name="fullName"
            type="text"
            autocomplete="name"
            placeholder="${escapeHtml(placeholders.fullName || "Your name")}"
            required
          >
          <div class="form-error" data-error-for="fullName"></div>
        </div>

        <div class="form-row" data-field="email">
          <label class="form-label" for="${getUniqueId("email")}">${escapeHtml(labels.email || "Email")}</label>
          <input
            class="form-control"
            id="${getUniqueId("email")}"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="${escapeHtml(placeholders.email || "you@example.com")}"
            required
          >
          <div class="form-error" data-error-for="email"></div>
        </div>

        <div class="form-row" data-field="service">
          <label class="form-label" for="${getUniqueId("service")}">${escapeHtml(labels.service || "Service Interested In")}</label>
          <div class="form-select-wrap">
            <select class="form-select" id="${getUniqueId("service")}" name="service" required>
              <option value="">${escapeHtml(placeholders.service || "Select a service")}</option>
              ${serviceOptions.map((service) => `
                <option value="${escapeHtml(service)}" ${service === options.selectedService ? "selected" : ""}>
                  ${escapeHtml(service)}
                </option>
              `).join("")}
            </select>
          </div>
          <div class="form-error" data-error-for="service"></div>
        </div>

        <div class="form-row" data-field="message">
          <label class="form-label" for="${getUniqueId("message")}">${escapeHtml(labels.message || "Message")}</label>
          <textarea
            class="form-textarea"
            id="${getUniqueId("message")}"
            name="message"
            placeholder="${escapeHtml(placeholders.message || "Tell us what you want to improve...")}"
            required
          ></textarea>
          <div class="form-error" data-error-for="message"></div>
        </div>

        <label class="checkbox-row form-row" data-field="agreement">
          <input type="checkbox" name="agreement" required>
          <span class="checkbox-custom" aria-hidden="true"></span>
          <span class="checkbox-text">
            ${escapeHtml(labels.agreement || "I agree that my submitted information may be used to respond to this inquiry.")}
          </span>
        </label>
        <div class="form-error" data-error-for="agreement"></div>

        <button class="btn btn-primary form-submit" type="submit">
          <span>${escapeHtml(forms.submitLabel || "Send Inquiry")}</span>
          ${createIcon("send")}
        </button>

        <div class="form-success" data-form-success>
          ${escapeHtml(forms.success || "Thank you. Your message has been prepared successfully.")}
        </div>
      </form>
    `;
    }

    function getUniqueId(prefix) {
        const safePrefix = String(prefix || "field").replace(/[^a-zA-Z0-9_-]/g, "");
        const count = document.querySelectorAll(`[id^="tpn-${safePrefix}-"]`).length + 1;
        return `tpn-${safePrefix}-${count}`;
    }

    function initForms() {
        document.querySelectorAll("[data-form]").forEach((form) => {
            if (form.dataset.bound === "true") return;

            form.dataset.bound = "true";

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const isValid = validateForm(form);

                if (!isValid) {
                    const firstError = form.querySelector(".form-row.has-error input, .form-row.has-error select, .form-row.has-error textarea");
                    if (firstError) firstError.focus();
                    return;
                }

                const success = form.querySelector("[data-form-success]");
                if (success) {
                    success.classList.add("is-visible");
                }

                form.reset();

                window.setTimeout(() => {
                    if (success) {
                        success.classList.remove("is-visible");
                    }
                }, 7000);
            });

            form.querySelectorAll("input, select, textarea").forEach((field) => {
                field.addEventListener("input", () => clearFieldError(form, field.name));
                field.addEventListener("change", () => clearFieldError(form, field.name));
            });
        });
    }

    function validateForm(form) {
        const forms = config.forms || {};
        const errors = forms.errors || {};

        const fullName = form.elements.fullName;
        const email = form.elements.email;
        const service = form.elements.service;
        const message = form.elements.message;
        const agreement = form.elements.agreement;

        let isValid = true;

        if (!fullName || fullName.value.trim().length < 2) {
            setFieldError(form, "fullName", errors.fullName || "Please enter your full name.");
            isValid = false;
        }

        if (!email || !isValidEmail(email.value)) {
            setFieldError(form, "email", errors.email || "Please enter a valid email address.");
            isValid = false;
        }

        if (!service || !service.value.trim()) {
            setFieldError(form, "service", errors.service || "Please select a service.");
            isValid = false;
        }

        if (!message || message.value.trim().length < 8) {
            setFieldError(form, "message", errors.message || "Please write a short message.");
            isValid = false;
        }

        if (!agreement || !agreement.checked) {
            setFieldError(form, "agreement", errors.agreement || "Please confirm the policy agreement.");
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
    }

    function setFieldError(form, fieldName, message) {
        const row = form.querySelector(`[data-field="${fieldName}"]`);
        const error = form.querySelector(`[data-error-for="${fieldName}"]`);

        if (row) {
            row.classList.add("has-error");
        }

        if (error) {
            error.textContent = message;
        }
    }

    function clearFieldError(form, fieldName) {
        if (!fieldName) return;

        const row = form.querySelector(`[data-field="${fieldName}"]`);
        const error = form.querySelector(`[data-error-for="${fieldName}"]`);

        if (row) {
            row.classList.remove("has-error");
        }

        if (error) {
            error.textContent = "";
        }
    }

    /* =========================
       COOKIE BANNER
    ========================= */

    function renderCookieBanner() {
        let mount = document.querySelector(SELECTORS.cookieMount);

        if (!mount) {
            mount = document.createElement("div");
            mount.setAttribute("data-cookie-banner", "");
            document.body.appendChild(mount);
        }

        const cookie = config.cookieBanner || {};
        const storageKey = cookie.storageKey || "tpn_cookie_consent";

        if (localStorage.getItem(storageKey)) {
            mount.innerHTML = "";
            return;
        }

        const links = Array.isArray(cookie.links) ? cookie.links : [];

        mount.innerHTML = `
      <div class="cookie-banner" data-cookie-box role="dialog" aria-live="polite" aria-label="${escapeHtml(cookie.title || "Cookie preferences")}">
        <div class="cookie-banner__title">${escapeHtml(cookie.title || "Cookie preferences")}</div>
        <p class="cookie-banner__text">${escapeHtml(cookie.text || "")}</p>

        <div class="cookie-banner__links">
          ${links.map((link) => `
            <a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>
          `).join("")}
        </div>

        <div class="cookie-banner__actions">
          <button class="btn btn-primary" type="button" data-cookie-accept>
            ${escapeHtml(cookie.acceptLabel || "Accept")}
          </button>
          <button class="btn btn-outline" type="button" data-cookie-decline>
            ${escapeHtml(cookie.declineLabel || "Decline")}
          </button>
        </div>
      </div>
    `;

        const banner = mount.querySelector("[data-cookie-box]");
        const acceptButton = mount.querySelector("[data-cookie-accept]");
        const declineButton = mount.querySelector("[data-cookie-decline]");

        window.setTimeout(() => {
            if (banner) banner.classList.add("is-visible");
        }, 350);

        const saveChoice = (choice) => {
            localStorage.setItem(storageKey, choice);

            if (banner) {
                banner.classList.remove("is-visible");
            }

            window.setTimeout(() => {
                mount.innerHTML = "";
            }, 280);
        };

        if (acceptButton) {
            acceptButton.addEventListener("click", () => saveChoice("accepted"));
        }

        if (declineButton) {
            declineButton.addEventListener("click", () => saveChoice("declined"));
        }
    }

    /* =========================
       EXTERNAL LINKS / LIBRARIES
    ========================= */

    function initExternalLinksSafety() {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            const rel = link.getAttribute("rel") || "";
            const required = ["noopener", "noreferrer"];

            required.forEach((value) => {
                if (!rel.includes(value)) {
                    link.setAttribute("rel", `${rel} ${value}`.trim());
                }
            });
        });
    }

    function initLibraries() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }

        if (window.AOS && typeof window.AOS.init === "function") {
            window.AOS.init({
                once: true,
                duration: 720,
                easing: "ease-out-cubic",
                offset: 80
            });
        }
    }

    function preventHorizontalOverflowWarnings() {
        if (!window.matchMedia("(max-width: 768px)").matches) return;

        window.setTimeout(() => {
            const overflowElements = Array.from(document.body.querySelectorAll("*")).filter((element) => {
                const rect = element.getBoundingClientRect();
                return rect.width > window.innerWidth + 2;
            });

            if (overflowElements.length) {
                overflowElements.forEach((element) => {
                    element.style.maxWidth = "100%";
                });
            }
        }, 800);
    }

    /* =========================
       PUBLIC HELPERS FOR PAGE JS
    ========================= */

    window.TPN = {
        getCurrentPageName,
        getCurrentService,
        renderFaqItems,
        renderContactForm,
        initFaqAccordions,
        initForms,
        initLibraries,
        escapeHtml,
        createIcon
    };
})();