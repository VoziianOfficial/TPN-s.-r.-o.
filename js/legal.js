"use strict";

(function () {
    const config = window.SITE_CONFIG || {};
    const helpers = window.TPN || {};

    const LEGAL_PAGES = {
        "privacy-policy.html": {
            title: "Privacy Policy",
            accent: "Policy",
            eyebrow: "Privacy & data",
            icon: "shield-check",
            panelTitle: "Your privacy matters",
            heroText:
                "This Privacy Policy explains how TPN s. r. o. may collect, use, protect, and manage information submitted through this website.",
            panelText:
                "TPN s. r. o. uses submitted information only to understand inquiries, respond to messages, improve website experience, and support legitimate business communication.",
            sidebarTitle: "Privacy overview",
            sidebarText:
                "Review how information is collected, used, protected, and managed when you interact with this website.",
            contactTitle: "Questions about privacy?",
            contactText:
                "For questions about this Privacy Policy or how submitted information is handled, contact TPN s. r. o. by email."
        },

        "terms-of-service.html": {
            title: "Terms of Service",
            accent: "Service",
            eyebrow: "Website terms",
            icon: "file-check-2",
            panelTitle: "Clear website terms",
            heroText:
                "These Terms of Service explain the rules and limitations that apply when visitors use this website or contact TPN s. r. o. about marketing services.",
            panelText:
                "Marketing information on this website is provided for general communication purposes and does not guarantee specific campaign, ranking, traffic, lead, or revenue outcomes.",
            sidebarTitle: "Terms overview",
            sidebarText:
                "Review website use, service information, intellectual property, limitations, third-party links, and contact details.",
            contactTitle: "Questions about these terms?",
            contactText:
                "For questions about these Terms of Service or website use, contact TPN s. r. o. by email."
        },

        "cookie-policy.html": {
            title: "Cookie Policy",
            accent: "Policy",
            eyebrow: "Cookie preferences",
            icon: "cookie",
            panelTitle: "Cookie transparency",
            heroText:
                "This Cookie Policy explains how cookies and similar technologies may be used on the TPN s. r. o. website.",
            panelText:
                "Cookies may support necessary website functionality, analytics, preferences, and limited marketing-related measurement where applicable.",
            sidebarTitle: "Cookie overview",
            sidebarText:
                "Review what cookies are, which types may be used, and how visitors can manage cookie preferences.",
            contactTitle: "Questions about cookies?",
            contactText:
                "For questions about this Cookie Policy or cookie preferences, contact TPN s. r. o. by email."
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        renderLegalPage();
        renderLegalNavigation();
        renderLegalContact();

        if (typeof helpers.initLibraries === "function") {
            helpers.initLibraries();
        }
    });

    function getCurrentPageName() {
        if (typeof helpers.getCurrentPageName === "function") {
            return helpers.getCurrentPageName();
        }

        const page = window.location.pathname.split("/").pop();
        return page || "index.html";
    }

    function getCurrentLegalData() {
        const page = getCurrentPageName();
        return LEGAL_PAGES[page] || LEGAL_PAGES["privacy-policy.html"];
    }

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

    function getLegalLinks() {
        return Array.isArray(config.legalLinks) ? config.legalLinks : [];
    }

    function getLegalHeroImage() {
        return config.assets?.images?.legalHero || "./assets/images/legal-texture.jpg";
    }

    

    function renderLegalPage() {
        const data = getCurrentLegalData();

        const bg = document.querySelector("[data-legal-hero-bg]");
        const breadcrumb = document.querySelector("[data-legal-breadcrumb-current]");
        const eyebrow = document.querySelector("[data-legal-eyebrow]");
        const title = document.querySelector("[data-legal-title]");
        const text = document.querySelector("[data-legal-text]");
        const panelIcon = document.querySelector("[data-legal-panel-icon]");
        const panelTitle = document.querySelector("[data-legal-panel-title]");
        const panelText = document.querySelector("[data-legal-panel-text]");
        const sidebarTitle = document.querySelector("[data-legal-sidebar-title]");
        const sidebarText = document.querySelector("[data-legal-sidebar-text]");
        const contactTitle = document.querySelector("[data-legal-contact-title]");
        const contactText = document.querySelector("[data-legal-contact-text]");

        if (bg) {
            bg.setAttribute("src", getLegalHeroImage());
            bg.setAttribute("alt", "Abstract legal and policy texture");
        }

        if (breadcrumb) {
            breadcrumb.textContent = data.title;
        }

        if (eyebrow) {
            eyebrow.textContent = data.eyebrow;
        }

        if (title) {
            title.innerHTML = `${escapeHtml(data.title.replace(data.accent, "").trim())} <span>${escapeHtml(data.accent)}</span>`;
        }

        if (text) {
            text.textContent = data.heroText;
        }

        if (panelIcon) {
            panelIcon.innerHTML = createIcon(data.icon);
        }

        if (panelTitle) {
            panelTitle.textContent = data.panelTitle;
        }

        if (panelText) {
            panelText.textContent = data.panelText;
        }

        if (sidebarTitle) {
            sidebarTitle.textContent = data.sidebarTitle;
        }

        if (sidebarText) {
            sidebarText.textContent = data.sidebarText;
        }

        if (contactTitle) {
            contactTitle.textContent = data.contactTitle;
        }

        if (contactText) {
            contactText.textContent = data.contactText;
        }
    }

    

    function renderLegalNavigation() {
        const mount = document.querySelector("[data-legal-nav]");
        if (!mount) return;

        const currentPage = getCurrentPageName();
        const legalLinks = getLegalLinks();

        mount.innerHTML = legalLinks.map((link) => {
            const page = String(link.href || "").split("/").pop();
            const isActive = page === currentPage;

            return `
        <a class="${isActive ? "is-active" : ""}" href="${escapeHtml(link.href)}">
          <span>${escapeHtml(link.label)}</span>
          ${createIcon(isActive ? "check" : "arrow-up-right")}
        </a>
      `;
        }).join("");
    }

    

    function renderLegalContact() {
        const mount = document.querySelector("[data-legal-contact-links]");
        if (!mount) return;

        const emailValue = getEmailValue();
        const addressText = getAddressText();

        mount.innerHTML = `
      ${emailValue ? `
        <a class="legal-contact__link" href="${escapeHtml(getEmailHref())}">
          ${createIcon("mail")}
          <span>
            <span class="legal-contact__label">Email</span>
            <span class="legal-contact__value">${escapeHtml(emailValue)}</span>
          </span>
        </a>
      ` : ""}

      ${addressText ? `
        <a
          class="legal-contact__link"
          href="${escapeHtml(getMapsUrl())}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${createIcon("map-pin")}
          <span>
            <span class="legal-contact__label">Address</span>
            <span class="legal-contact__value">${escapeHtml(addressText)}</span>
          </span>
        </a>
      ` : ""}
    `;
    }
})();