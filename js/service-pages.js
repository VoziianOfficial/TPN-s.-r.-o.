"use strict";

(function () {
    const config = window.SITE_CONFIG || {};
    const helpers = window.TPN || {};

    document.addEventListener("DOMContentLoaded", () => {
        const service = getCurrentService();

        if (!service) return;

        renderServiceHero(service);
        renderServiceOverview(service);
        renderServiceImpact(service);
        renderIncluded(service);
        renderWhyItMatters(service);
        renderMethod(service);
        renderDeliverables(service);
        renderOutcome(service);
        renderRelatedServices(service);
        renderServiceContactDetails(service);

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

    function getCurrentService() {
        if (typeof helpers.getCurrentService === "function") {
            return helpers.getCurrentService();
        }

        const page = window.location.pathname.split("/").pop() || "index.html";
        const services = Array.isArray(config.services) ? config.services : [];

        return services.find((service) => {
            const href = String(service.href || "").split("/").pop();
            return href === page;
        }) || null;
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

    function getServices() {
        return Array.isArray(config.services) ? config.services : [];
    }

    function getImage(key) {
        return config.assets?.images?.[key] || "";
    }

    function getServiceImageKey(service) {
        const map = {
            "google-ads": "googleAdsHero",
            "seo-optimization": "seoHero",
            "social-media-marketing": "socialHero",
            "web-design": "webDesignHero",
            "conversion-boost": "conversionHero",
            "local-seo": "localSeoHero"
        };

        return map[service.id] || "";
    }

    function getMatterImage(service) {
        const imageMap = {
            "google-ads": getImage("framework") || service.image,
            "seo-optimization": getImage("strategy") || service.image,
            "social-media-marketing": getImage("process") || service.image,
            "web-design": getImage("about") || service.image,
            "conversion-boost": getImage("framework") || service.image,
            "local-seo": getImage("strategy") || service.image
        };

        return imageMap[service.id] || service.image || "";
    }

    /* =========================
       HERO
    ========================= */

    function renderServiceHero(service) {
        const imageKey = getServiceImageKey(service);
        const image = getImage(imageKey) || service.image || "";

        const heroBg = document.querySelector("[data-service-hero-bg]");
        const breadcrumbCurrent = document.querySelector("[data-service-breadcrumb-current]");
        const title = document.querySelector("[data-service-hero-title]");
        const text = document.querySelector("[data-service-hero-text]");
        const panelIcon = document.querySelector("[data-service-hero-icon]");
        const panelTitle = document.querySelector("[data-service-hero-panel-title]");
        const panelText = document.querySelector("[data-service-hero-panel-text]");

        if (heroBg && image) {
            heroBg.setAttribute("src", image);
            heroBg.setAttribute("alt", `${service.title} strategy background`);
        }

        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = service.title;
        }

        if (title) {
            title.innerHTML = formatServiceTitle(service.heroTitle || service.title);
        }

        if (text) {
            text.textContent = service.heroText || "";
        }

        if (panelIcon) {
            panelIcon.innerHTML = createIcon(service.icon || "sparkles");
        }

        if (panelTitle) {
            panelTitle.textContent = service.title;
        }

        if (panelText) {
            panelText.textContent = service.bestFor || service.cardText || "";
        }
    }

    function formatServiceTitle(title) {
        const value = String(title || "").trim();
        const words = value.split(" ");

        if (words.length < 3) {
            return escapeHtml(value);
        }

        const lastWord = words.pop();

        return `${escapeHtml(words.join(" "))} <span>${escapeHtml(lastWord)}</span>`;
    }

    /* =========================
       OVERVIEW
    ========================= */

    function renderServiceOverview(service) {
        const eyebrow = document.querySelector("[data-service-overview-eyebrow]");
        const title = document.querySelector("[data-service-overview-title]");
        const text = document.querySelector("[data-service-overview-text]");
        const best = document.querySelector("[data-service-overview-best]");
        const metrics = document.querySelector("[data-service-metrics]");

        if (eyebrow) {
            eyebrow.textContent = `${service.title} overview`;
        }

        if (title) {
            title.textContent = service.overviewTitle || `${service.title} with clearer direction`;
        }

        if (text) {
            text.textContent = service.overviewText || "";
        }

        if (best) {
            best.innerHTML = `
            <span class="service-overview__best-label">Best for</span>
            <strong class="service-overview__best-text">${escapeHtml(service.bestFor || "")}</strong>
        `;
        }

        if (metrics) {
            const metricItems = getOverviewMetrics(service);

            metrics.classList.add("overview-rail");

            metrics.innerHTML = `
            <div class="overview-rail__shine" aria-hidden="true"></div>

            ${metricItems.map((item, index) => `
                <article class="overview-rail__item" data-aos="fade-left" data-aos-delay="${index * 60}">
                    <span class="overview-rail__number">${String(index + 1).padStart(2, "0")}</span>

                    <span class="overview-rail__icon">
                        ${createIcon(item.icon)}
                    </span>

                    <span class="overview-rail__content">
                        <h3>${escapeHtml(item.title)}</h3>
                        <p>${escapeHtml(item.text)}</p>
                    </span>
                </article>
            `).join("")}
        `;
        }
    }

    function getOverviewMetrics(service) {
        const map = {
            "google-ads": [
                {
                    icon: "target",
                    title: "Intent-focused traffic",
                    text: "Campaigns are shaped around search behavior, offer fit, and meaningful user action."
                },
                {
                    icon: "gauge",
                    title: "Budget clarity",
                    text: "Spend direction becomes easier to review when campaign structure and goals are clear."
                },
                {
                    icon: "mouse-pointer-click",
                    title: "Conversion paths",
                    text: "Traffic is connected to landing pages, forms, tracking, and practical next steps."
                }
            ],

            "seo-optimization": [
                {
                    icon: "scan-search",
                    title: "Technical foundation",
                    text: "Search visibility starts with a site that can be crawled, understood, and organized."
                },
                {
                    icon: "file-text",
                    title: "Content relevance",
                    text: "Pages need useful structure, clear intent, and content that supports real search demand."
                },
                {
                    icon: "bar-chart-3",
                    title: "Visibility signals",
                    text: "Reporting helps track movement, gaps, and opportunities without promising rankings."
                }
            ],

            "social-media-marketing": [
                {
                    icon: "messages-square",
                    title: "Audience connection",
                    text: "Social content works better when it is planned around audience needs and brand voice."
                },
                {
                    icon: "sparkles",
                    title: "Creative direction",
                    text: "Campaign ideas, visuals, and messages are shaped to feel more memorable and consistent."
                },
                {
                    icon: "radio",
                    title: "Channel rhythm",
                    text: "A clearer posting and campaign structure helps reduce scattered communication."
                }
            ],

            "web-design": [
                {
                    icon: "layout-template",
                    title: "Page structure",
                    text: "A strong website guides users through content, trust points, and next actions."
                },
                {
                    icon: "smartphone",
                    title: "Responsive clarity",
                    text: "Layouts are considered across desktop, tablet, mobile, and intermediate screen sizes."
                },
                {
                    icon: "pen-tool",
                    title: "Brand presentation",
                    text: "Typography, spacing, visuals, and interaction details support a more professional impression."
                }
            ],

            "conversion-boost": [
                {
                    icon: "route",
                    title: "User flow",
                    text: "Conversion work begins by reducing confusion between arrival, understanding, and action."
                },
                {
                    icon: "square-mouse-pointer",
                    title: "CTA clarity",
                    text: "Calls to action become more effective when placement, copy, and context work together."
                },
                {
                    icon: "shield-check",
                    title: "Trust signals",
                    text: "Proof points, page structure, and form experience can help reduce hesitation."
                }
            ],

            "local-seo": [
                {
                    icon: "map-pin-check",
                    title: "Local relevance",
                    text: "Location signals help users and search platforms understand where the business is relevant."
                },
                {
                    icon: "store",
                    title: "Profile quality",
                    text: "Clear business information and profile completeness can support local discovery."
                },
                {
                    icon: "navigation",
                    title: "Service-area clarity",
                    text: "Local pages and keywords should explain where services are offered without thin content."
                }
            ]
        };

        return map[service.id] || [
            {
                icon: "compass",
                title: "Clear direction",
                text: "The service is planned around business goals, user needs, and practical next steps."
            },
            {
                icon: "sparkles",
                title: "Creative execution",
                text: "The work is shaped with polished messaging, structure, and design thinking."
            },
            {
                icon: "bar-chart-3",
                title: "Ongoing review",
                text: "Performance signals guide improvements over time without unrealistic guarantees."
            }
        ];
    }

    /* =========================
       INCLUDED
    ========================= */

    function renderIncluded(service) {
        const mount = document.querySelector("[data-service-included]");
        if (!mount || !Array.isArray(service.included)) return;

        const icons = [
            "check-check",
            "settings-2",
            "target",
            "line-chart",
            "file-check-2",
            "clipboard-check"
        ];

        mount.classList.add("service-included__map");

        mount.innerHTML = `
      <div class="included-system">
        <div class="included-system__panel" data-aos="fade-right">
          <span class="included-system__eyebrow">Included scope</span>

          <h3 class="included-system__title">
            ${escapeHtml(service.title)} work shaped as one connected system.
          </h3>

          <p class="included-system__text">
            Each part is planned to support clearer direction, better structure, and more practical marketing decisions.
          </p>

          <div class="included-system__mini">
            <span>${String(service.included.length).padStart(2, "0")}</span>
            <strong>Core components</strong>
          </div>
        </div>

        <div class="included-system__list">
          ${service.included.map((item, index) => `
            <article class="included-row" data-aos="fade-up" data-aos-delay="${index * 45}">
              <span class="included-row__number">${String(index + 1).padStart(2, "0")}</span>

              <span class="included-row__icon">
                ${createIcon(icons[index] || "check")}
              </span>

              <span class="included-row__content">
                <h3 class="included-row__title">${escapeHtml(item)}</h3>
                <p class="included-row__text">
                  ${escapeHtml(getIncludedDescription(service, item, index))}
                </p>
              </span>
            </article>
          `).join("")}
        </div>
      </div>
    `;
    }
    function renderServiceImpact(service) {
        const bg = document.querySelector("[data-service-impact-bg]");
        const kicker = document.querySelector("[data-service-impact-kicker]");
        const title = document.querySelector("[data-service-impact-title]");
        const signals = document.querySelector("[data-service-impact-signals]");

        const data = getServiceImpactData(service);
        const image = service.impactImage || service.image || "";

        if (bg && image) {
            bg.setAttribute("src", image);
            bg.setAttribute("alt", `${service.title} marketing direction`);
        }

        if (kicker) {
            kicker.textContent = data.kicker;
        }

        if (title) {
            title.innerHTML = data.title;
        }

        if (signals) {
            signals.innerHTML = data.signals.map((item, index) => `
            <span class="service-impact__signal" data-aos="fade-up" data-aos-delay="${index * 55}">
                <span class="service-impact__number">${String(index + 1).padStart(2, "0")}</span>
                <strong>${escapeHtml(item.title)}</strong>
                <em>${escapeHtml(item.text)}</em>
            </span>
        `).join("");
        }
    }

    function getServiceImpactData(service) {
        const map = {
            "google-ads": {
                kicker: "Paid traffic direction",
                title: `Intent, landing flow, tracking, and budget clarity should move as <span>one paid growth system.</span>`,
                signals: [
                    { title: "Intent", text: "Search demand" },
                    { title: "Flow", text: "Landing clarity" },
                    { title: "Tracking", text: "Smarter signals" }
                ]
            },

            "seo-optimization": {
                kicker: "Organic growth direction",
                title: `Technical structure, content relevance, and search visibility should build <span>one stronger organic path.</span>`,
                signals: [
                    { title: "Structure", text: "Technical clarity" },
                    { title: "Content", text: "Search relevance" },
                    { title: "Visibility", text: "Long-term signals" }
                ]
            },

            "social-media-marketing": {
                kicker: "Social communication direction",
                title: `Audience voice, creative rhythm, and campaign ideas should create <span>one recognizable brand presence.</span>`,
                signals: [
                    { title: "Voice", text: "Brand tone" },
                    { title: "Creative", text: "Sharper ideas" },
                    { title: "Rhythm", text: "Consistent presence" }
                ]
            },

            "web-design": {
                kicker: "Digital experience direction",
                title: `Structure, visual hierarchy, responsive flow, and trust signals should shape <span>one polished web experience.</span>`,
                signals: [
                    { title: "Layout", text: "Clear hierarchy" },
                    { title: "Responsive", text: "Every device" },
                    { title: "Action", text: "Better flow" }
                ]
            },

            "conversion-boost": {
                kicker: "Conversion direction",
                title: `CTA logic, form clarity, trust points, and page flow should reduce friction <span>from attention to action.</span>`,
                signals: [
                    { title: "CTA", text: "Clear next step" },
                    { title: "Trust", text: "Less hesitation" },
                    { title: "Forms", text: "Lower friction" }
                ]
            },

            "local-seo": {
                kicker: "Local visibility direction",
                title: `Location signals, local content, profile quality, and discovery should support <span>one clearer local presence.</span>`,
                signals: [
                    { title: "Location", text: "Service area" },
                    { title: "Profile", text: "Local trust" },
                    { title: "Discovery", text: "Search presence" }
                ]
            }
        };

        return map[service.id] || {
            kicker: "Growth direction",
            title: `${service.title} should create <span>one clearer path from attention to action.</span>`,
            signals: [
                { title: "Clarity", text: "Better structure" },
                { title: "Trust", text: "Stronger proof" },
                { title: "Action", text: "Clear next step" }
            ]
        };
    }

    function getIncludedDescription(service, item, index) {
        const descriptions = {
            "google-ads": [
                "Campaign groups are organized around intent, service fit, and clear next actions.",
                "Remarketing and display direction can support visibility beyond one search moment.",
                "Keyword and audience thinking helps reduce scattered traffic and unclear spend.",
                "Tracking guidance helps connect campaign activity with meaningful user behavior.",
                "Budget review supports smarter allocation without promising fixed results.",
                "Reporting turns campaign data into practical improvement signals."
            ],
            "seo-optimization": [
                "Technical review helps identify barriers that may limit search understanding.",
                "On-page improvements clarify titles, headings, metadata, and page structure.",
                "Keyword direction connects search demand with realistic content opportunities.",
                "Content guidance helps pages become more useful, specific, and better organized.",
                "Internal linking supports discovery, hierarchy, and topic relationships.",
                "Reporting helps monitor visibility movement and future SEO priorities."
            ],
            "social-media-marketing": [
                "Content planning gives the brand a clearer rhythm and communication direction.",
                "Paid social direction supports audience targeting, campaign goals, and creative testing.",
                "Audience thinking helps shape more relevant messages and campaign angles.",
                "Creative concepts help posts and ads feel more distinctive and polished.",
                "Engagement direction helps turn social activity into a more intentional presence.",
                "Reporting separates useful campaign signals from vanity metrics."
            ],
            "web-design": [
                "Page planning creates a stronger hierarchy before visual details are added.",
                "UX direction helps users understand pages faster and move with less friction.",
                "Responsive layouts keep the experience balanced across key screen sizes.",
                "Landing page design supports campaign clarity and conversion paths.",
                "Conversion-focused sections place CTAs, proof, and content in stronger sequence.",
                "Brand refinement improves the way the business looks, reads, and feels online."
            ],
            "conversion-boost": [
                "Landing page review identifies friction, missing trust points, and unclear actions.",
                "CTA improvements help users understand what to do and why it matters.",
                "UX flow guidance supports a smoother path from attention to action.",
                "Form optimization makes inquiry steps feel simpler and more trustworthy.",
                "Trust elements reduce uncertainty when users compare options.",
                "Reporting direction helps measure meaningful actions instead of vague activity."
            ],
            "local-seo": [
                "Profile guidance supports a more complete and trustworthy local presence.",
                "Local keyword direction connects search demand with service-area relevance.",
                "Citation review helps identify consistency issues across business information.",
                "Location page recommendations support clearer local context and service coverage.",
                "Local content planning helps pages feel useful instead of generic.",
                "Visibility reporting helps monitor local search signals and improvement areas."
            ]
        };

        return descriptions[service.id]?.[index] || `${item} is planned with clear structure, practical execution, and ongoing improvement in mind.`;
    }

    /* =========================
       WHY IT MATTERS
    ========================= */

    function renderWhyItMatters(service) {
        const image = document.querySelector("[data-service-matters-image]");
        const title = document.querySelector("[data-service-matters-title]");
        const text = document.querySelector("[data-service-matters-text]");
        const points = document.querySelector("[data-service-matters-points]");

        const matterImage = getMatterImage(service);

        if (image && matterImage) {
            image.setAttribute("src", matterImage);
            image.setAttribute("alt", `${service.title} planning and marketing work`);
        }

        if (title) {
            title.textContent = `Why ${service.title} matters`;
        }

        if (text) {
            text.textContent = getMatterIntro(service);
        }

        if (points && Array.isArray(service.matters)) {
            points.innerHTML = service.matters.map((item, index) => `
        <article class="matter-point" data-aos="fade-up" data-aos-delay="${index * 60}">
          <span class="matter-point__number">${String(index + 1).padStart(2, "0")}</span>
          <p class="matter-point__text">${escapeHtml(item)}</p>
        </article>
      `).join("");
        }
    }

    function getMatterIntro(service) {
        const map = {
            "google-ads":
                "Paid campaigns can bring attention quickly, but they need discipline. Stronger structure helps reduce waste, clarify traffic quality, and connect ad spend to more useful actions.",
            "seo-optimization":
                "SEO supports long-term discovery when technical health, content relevance, and search intent work together. It is a foundation, not a shortcut.",
            "social-media-marketing":
                "Social channels shape how people experience a brand before they ever visit a website. Planning helps communication feel more consistent and less random.",
            "web-design":
                "A website often creates the first serious brand impression. Better structure, visual polish, and responsive behavior help visitors understand and trust the business faster.",
            "conversion-boost":
                "When a page already receives traffic, conversion improvements can make the path clearer. The goal is to remove friction and make the next step easier to understand.",
            "local-seo":
                "Local search visibility depends on consistency, relevance, proximity, profile quality, and useful local context. Clear signals help people find and compare a business more confidently."
        };

        return map[service.id] || "This service matters because it helps connect marketing activity with clearer user understanding, stronger trust, and more practical next steps.";
    }

    /* =========================
       METHOD
    ========================= */

    function renderMethod(service) {
        const mount = document.querySelector("[data-service-method]");
        if (!mount || !Array.isArray(service.method)) return;

        mount.classList.add("method-runway");

        mount.innerHTML = `
      <div class="method-runway__track" aria-label="${escapeHtml(service.title)} method steps">
        <div class="method-runway__line" aria-hidden="true"></div>

        ${service.method.map((item, index) => `
          <article class="method-step method-step--${index + 1}" data-aos="fade-up" data-aos-delay="${index * 70}">
            <span class="method-step__point" aria-hidden="true"></span>

            <span class="method-step__number">
              ${String(index + 1).padStart(2, "0")}
            </span>

            <div class="method-step__content">
              <h3 class="method-step__title">${escapeHtml(item.title)}</h3>
              <p class="method-step__text">${escapeHtml(item.text)}</p>
            </div>
          </article>
        `).join("")}

        <span class="method-runway__finish" aria-hidden="true">
          ${createIcon("arrow-up-right")}
        </span>
      </div>
    `;
    }
    /* =========================
       DELIVERABLES
    ========================= */

    function renderDeliverables(service) {
        const mount = document.querySelector("[data-service-deliverables]");
        const title = document.querySelector("[data-service-deliverables-title]");
        const text = document.querySelector("[data-service-deliverables-text]");

        if (title) {
            title.textContent = `${service.title} outputs you can actually use`;
        }

        if (text) {
            text.textContent =
                "The work is organized into clear practical outputs — so every recommendation, page decision, campaign note, or visibility improvement has a defined role.";
        }

        if (!mount || !Array.isArray(service.deliverables)) return;

        mount.classList.add("deliverables-ledger");

        mount.innerHTML = `
        <div class="deliverables-ledger__shine" aria-hidden="true"></div>

        ${service.deliverables.map((item, index) => `
            <article class="deliverable-row" data-aos="fade-up" data-aos-delay="${index * 40}">
                <span class="deliverable-row__number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="deliverable-row__line" aria-hidden="true"></span>

                <h3 class="deliverable-row__title">
                    ${escapeHtml(item)}
                </h3>

                <span class="deliverable-row__arrow" aria-hidden="true">
                    ${createIcon("arrow-up-right")}
                </span>
            </article>
        `).join("")}
    `;
    }

    /* =========================
       OUTCOME
    ========================= */

    function renderOutcome(service) {
        const title = document.querySelector("[data-service-outcome-title]");
        const text = document.querySelector("[data-service-outcome-text]");
        const visual = document.querySelector("[data-service-outcome-visual]");

        if (title) {
            title.textContent = `Expected direction, not empty promises`;
        }

        if (text) {
            text.textContent = service.outcome || "";
        }

        if (visual) {
            const outcomes = getOutcomeCards(service);

            visual.innerHTML = outcomes.map((item, index) => `
        <article class="outcome-mini-card" data-aos="fade-left" data-aos-delay="${index * 60}">
          ${createIcon(item.icon)}
          <span>${escapeHtml(item.text)}</span>
        </article>
      `).join("");
        }
    }

    function getOutcomeCards(service) {
        const map = {
            "google-ads": [
                {
                    icon: "target",
                    text: "More disciplined paid traffic structure"
                },
                {
                    icon: "mouse-pointer-click",
                    text: "Clearer conversion tracking direction"
                },
                {
                    icon: "bar-chart-3",
                    text: "More useful campaign reporting"
                }
            ],
            "seo-optimization": [
                {
                    icon: "search-check",
                    text: "Stronger organic visibility foundation"
                },
                {
                    icon: "file-text",
                    text: "Clearer page and content relevance"
                },
                {
                    icon: "bar-chart-3",
                    text: "Ongoing search performance signals"
                }
            ],
            "social-media-marketing": [
                {
                    icon: "messages-square",
                    text: "More consistent brand communication"
                },
                {
                    icon: "sparkles",
                    text: "Sharper creative campaign direction"
                },
                {
                    icon: "radio",
                    text: "Clearer social content rhythm"
                }
            ],
            "web-design": [
                {
                    icon: "layout-template",
                    text: "More polished website presentation"
                },
                {
                    icon: "smartphone",
                    text: "Balanced responsive page experience"
                },
                {
                    icon: "mouse-pointer-click",
                    text: "Clearer user journey and CTAs"
                }
            ],
            "conversion-boost": [
                {
                    icon: "route",
                    text: "Smoother path from traffic to action"
                },
                {
                    icon: "shield-check",
                    text: "Stronger trust and clarity signals"
                },
                {
                    icon: "clipboard-check",
                    text: "Better measurement direction"
                }
            ],
            "local-seo": [
                {
                    icon: "map-pin-check",
                    text: "Clearer location-based relevance"
                },
                {
                    icon: "store",
                    text: "More complete local presence"
                },
                {
                    icon: "navigation",
                    text: "Stronger service-area clarity"
                }
            ]
        };

        return map[service.id] || [
            {
                icon: "compass",
                text: "Clearer strategic direction"
            },
            {
                icon: "sparkles",
                text: "More polished execution"
            },
            {
                icon: "bar-chart-3",
                text: "More useful reporting signals"
            }
        ];
    }

    /* =========================
       RELATED SERVICES
    ========================= */

    function renderRelatedServices(service) {
        const mount = document.querySelector("[data-related-services]");
        if (!mount) return;

        const related = getServices()
            .filter((item) => item.id !== service.id)
            .slice(0, 3);

        mount.innerHTML = related.map((item, index) => `
      <a class="related-card premium-card" href="${escapeHtml(item.href)}" data-aos="fade-up" data-aos-delay="${index * 65}">
        <span class="related-card__top">
          <span class="related-card__icon">${createIcon(item.icon || "sparkles")}</span>
          <span class="related-card__arrow">${createIcon("arrow-up-right")}</span>
        </span>

        <span>
          <span class="related-card__title">${escapeHtml(item.title)}</span>
          <span class="related-card__text">${escapeHtml(item.cardText || "")}</span>
        </span>
      </a>
    `).join("");
    }

    /* =========================
       CONTACT DETAILS
    ========================= */

    function renderServiceContactDetails(service) {
        const mount = document.querySelector("[data-service-contact-details]");
        if (!mount) return;

        const emailValue = getEmailValue();
        const addressText = getAddressText();

        mount.innerHTML = `
      ${emailValue ? `
        <a class="service-contact__direct-link" href="${escapeHtml(getEmailHref())}">
          ${createIcon("mail")}
          <span>
            <span class="service-contact__direct-label">Email</span>
            <span class="service-contact__direct-value">${escapeHtml(emailValue)}</span>
          </span>
        </a>
      ` : ""}

      ${addressText ? `
        <a
          class="service-contact__direct-link"
          href="${escapeHtml(getMapsUrl())}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${createIcon("map-pin")}
          <span>
            <span class="service-contact__direct-label">Address</span>
            <span class="service-contact__direct-value">${escapeHtml(addressText)}</span>
          </span>
        </a>
      ` : ""}

      <a class="service-contact__direct-link" href="./index.html#services">
        ${createIcon(service.icon || "sparkles")}
        <span>
          <span class="service-contact__direct-label">Current service</span>
          <span class="service-contact__direct-value">${escapeHtml(service.title)}</span>
        </span>
      </a>
    `;
    }
})();