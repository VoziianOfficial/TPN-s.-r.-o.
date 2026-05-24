"use strict";

window.SITE_CONFIG = {
    companyName: "TPN s. r. o.",
    brandName: "TPN",

    email: {
        value: "support@tpngroupads.com",
        href: "mailto:support@tpngroupads.com",
        label: "Email us"
    },

    address: {
        full: "Popolná 9772/3, Bratislava - mestská časť Rača, 831 06, Slovenská republika",
        mapsUrl:
            "https://www.google.com/maps/search/?api=1&query=Popoln%C3%A1%209772%2F3%2C%20Bratislava%20-%20mestsk%C3%A1%20%C4%8Das%C5%A5%20Ra%C4%8Da%2C%20831%2006%2C%20Slovensk%C3%A1%20republika"
    },

    assets: {
        logoIcon: "./assets/icons/tpn-logo.png",
        logoIconDark: "./assets/icons/tpn-logo-footer.png",

        faviconSvg: "./favicon.svg",
        faviconIco: "./favicon.ico",

        images: {
            homeHero: "./assets/images/home-hero.jpg",
            about: "./assets/images/about-agency.jpg",
            process: "./assets/images/process-planning.jpg",
            strategy: "./assets/images/strategy-workspace.jpg",
            framework: "./assets/images/growth-framework.jpg",

            googleAdsHero: "./assets/images/hero-google-ads.jpg",
            seoHero: "./assets/images/hero-seo-optimization.jpg",
            socialHero: "./assets/images/hero-social-media.jpg",
            webDesignHero: "./assets/images/hero-web-design.jpg",
            conversionHero: "./assets/images/hero-conversion-boost.jpg",
            localSeoHero: "./assets/images/hero-local-seo.jpg",

            legalHero: "./assets/images/legal-texture.jpg"
        }
    },

    navigation: [
        {
            label: "Home",
            href: "./index.html",
            id: "home"
        },
        {
            label: "Services",
            href: "./index.html#services",
            id: "services",
            hasDropdown: true
        },
        {
            label: "About Us",
            href: "./index.html#about",
            id: "about"
        },
        {
            label: "Process",
            href: "./index.html#process",
            id: "process"
        },
        {
            label: "Contact",
            href: "./index.html#contact",
            id: "contact"
        }
    ],

    services: [
        {
            id: "google-ads",
            title: "Google Ads",
            shortTitle: "Google Ads",
            href: "./google-ads.html",
            icon: "badge-dollar-sign",
            image: "./assets/images/hero-google-ads.jpg",
            cardText:
                "Build focused paid search and remarketing campaigns designed around qualified traffic, clearer tracking, and smarter budget direction.",
            dropdownText: "Paid search, remarketing, tracking, and budget direction.",
            heroTitle: "Google Ads Strategy for Qualified Traffic",
            heroText:
                "TPN s. r. o. plans and refines Google Ads campaigns that help businesses reach people who are actively searching, comparing, and ready to take the next step.",
            overviewTitle: "Focused advertising built around intent",
            overviewText:
                "Google Ads can create fast visibility, but strong performance depends on structure, targeting, landing pages, tracking, and continuous refinement. TPN helps organize campaigns so budgets are easier to understand and performance decisions are based on real signals.",
            bestFor:
                "This service is ideal for companies that want clearer paid search direction, stronger campaign organization, and more useful reporting without relying on guesswork.",
            included: [
                "Search campaign planning",
                "Display and remarketing structure",
                "Keyword and audience direction",
                "Conversion tracking guidance",
                "Budget and bid review",
                "Performance reporting"
            ],
            matters: [
                "Paid traffic needs clear intent matching, not just more clicks.",
                "Better campaign structure can make reporting easier to understand.",
                "Strong landing page alignment helps reduce wasted attention."
            ],
            method: [
                {
                    title: "Audit",
                    text: "Review existing campaign structure, tracking setup, landing pages, and budget distribution."
                },
                {
                    title: "Map",
                    text: "Define keyword groups, audience logic, conversion goals, and campaign priorities."
                },
                {
                    title: "Build",
                    text: "Create or refine campaigns with clearer naming, ads, extensions, and conversion paths."
                },
                {
                    title: "Refine",
                    text: "Use performance data to guide adjustments without promising fixed outcomes."
                }
            ],
            deliverables: [
                "Campaign structure recommendations",
                "Keyword and negative keyword direction",
                "Ad copy direction",
                "Conversion tracking checklist",
                "Budget allocation notes",
                "Monthly performance summary"
            ],
            outcome:
                "The goal is stronger visibility in high-intent search moments, clearer campaign reporting, and a more disciplined approach to paid traffic growth.",
            faq: [
                {
                    question: "Can Google Ads guarantee leads?",
                    answer:
                        "No. Google Ads can increase visibility and traffic opportunities, but specific lead volume or revenue results cannot be guaranteed."
                },
                {
                    question: "Do you work with existing accounts?",
                    answer:
                        "Yes. TPN can review existing campaign structure and suggest improvements before building anything new."
                },
                {
                    question: "Is tracking required?",
                    answer:
                        "Reliable tracking is strongly recommended because it helps connect spend with meaningful user actions."
                }
            ],
            metaTitle: "Google Ads Services | TPN s. r. o.",
            metaDescription:
                "Google Ads planning, campaign structure, remarketing, conversion tracking, and performance direction from TPN s. r. o."
        },

        {
            id: "seo-optimization",
            title: "SEO Optimization",
            shortTitle: "SEO",
            href: "./seo-optimization.html",
            icon: "search-check",
            image: "./assets/images/hero-seo-optimization.jpg",
            cardText:
                "Improve organic visibility with technical SEO, on-page refinement, keyword direction, content structure, and practical reporting.",
            dropdownText: "Technical SEO, content direction, visibility, and reporting.",
            heroTitle: "SEO Optimization for Clearer Search Visibility",
            heroText:
                "TPN s. r. o. helps businesses strengthen search foundations through technical improvements, content clarity, keyword strategy, and ongoing optimization.",
            overviewTitle: "Organic growth starts with structure",
            overviewText:
                "SEO is not only about keywords. It includes technical health, page clarity, internal structure, content quality, trust signals, and consistent measurement. TPN helps make websites easier for both users and search engines to understand.",
            bestFor:
                "This service is ideal for businesses that want more sustainable visibility, stronger content direction, and a clearer plan for organic growth.",
            included: [
                "Technical SEO review",
                "On-page optimization",
                "Keyword strategy",
                "Content direction",
                "Internal linking guidance",
                "SEO reporting"
            ],
            matters: [
                "Search visibility depends on both technical quality and useful content.",
                "Clear page structure helps users and search engines understand relevance.",
                "SEO requires ongoing refinement rather than one-time edits."
            ],
            method: [
                {
                    title: "Inspect",
                    text: "Review technical signals, indexability, page structure, metadata, and content gaps."
                },
                {
                    title: "Prioritize",
                    text: "Identify the SEO improvements that can create the clearest strategic direction."
                },
                {
                    title: "Optimize",
                    text: "Refine titles, descriptions, headings, content structure, and internal linking."
                },
                {
                    title: "Monitor",
                    text: "Track visibility, ranking movement, and content opportunities over time."
                }
            ],
            deliverables: [
                "SEO audit notes",
                "Keyword direction map",
                "Metadata recommendations",
                "On-page content guidance",
                "Technical issue checklist",
                "Search visibility report"
            ],
            outcome:
                "The goal is a stronger organic foundation, clearer page relevance, and more useful search visibility over time.",
            faq: [
                {
                    question: "How long does SEO take?",
                    answer:
                        "SEO timelines vary by website condition, competition, content quality, and search demand. It is usually a gradual process."
                },
                {
                    question: "Do you guarantee rankings?",
                    answer:
                        "No. Search rankings are influenced by many factors outside any agency’s control."
                },
                {
                    question: "Can SEO support paid campaigns?",
                    answer:
                        "Yes. SEO insights can help improve landing page clarity, content direction, and keyword understanding."
                }
            ],
            metaTitle: "SEO Optimization Services | TPN s. r. o.",
            metaDescription:
                "Technical SEO, on-page optimization, keyword strategy, content direction, and search visibility support from TPN s. r. o."
        },

        {
            id: "social-media-marketing",
            title: "Social Media Marketing",
            shortTitle: "Social Media",
            href: "./social-media-marketing.html",
            icon: "messages-square",
            image: "./assets/images/hero-social-media.jpg",
            cardText:
                "Shape stronger brand presence with content planning, campaign creative, paid social direction, audience targeting, and reporting.",
            dropdownText: "Content planning, paid social, audiences, and creative.",
            heroTitle: "Social Media Marketing with Strategy and Style",
            heroText:
                "TPN s. r. o. helps brands communicate with more clarity across social channels through planning, creative direction, audience thinking, and campaign refinement.",
            overviewTitle: "Social presence with a clearer purpose",
            overviewText:
                "Social media works best when content, audience, timing, creative format, and campaign goals are connected. TPN helps turn scattered posting into a more intentional communication system.",
            bestFor:
                "This service is ideal for brands that want a more consistent social presence, stronger campaign ideas, and clearer engagement direction.",
            included: [
                "Content planning",
                "Paid social campaign direction",
                "Audience targeting support",
                "Creative concept development",
                "Engagement direction",
                "Performance reporting"
            ],
            matters: [
                "Consistent messaging helps audiences recognize and remember a brand.",
                "Creative quality affects how people stop, read, click, and respond.",
                "Reporting helps separate useful signals from vanity metrics."
            ],
            method: [
                {
                    title: "Position",
                    text: "Clarify brand voice, audience groups, content themes, and channel priorities."
                },
                {
                    title: "Plan",
                    text: "Build a practical content and campaign direction around goals and available resources."
                },
                {
                    title: "Create",
                    text: "Develop campaign ideas, post structures, messaging angles, and creative guidance."
                },
                {
                    title: "Improve",
                    text: "Review engagement and campaign signals to guide future content decisions."
                }
            ],
            deliverables: [
                "Content direction plan",
                "Campaign concept notes",
                "Audience targeting suggestions",
                "Creative format ideas",
                "Messaging pillars",
                "Social performance summary"
            ],
            outcome:
                "The goal is a more consistent social presence, stronger brand recognition, and clearer communication with relevant audiences.",
            faq: [
                {
                    question: "Can you manage both organic and paid social?",
                    answer:
                        "TPN can support planning and direction for both organic content and paid social campaigns."
                },
                {
                    question: "Which platforms should we use?",
                    answer:
                        "Platform choice depends on your audience, offer, content style, and business goals."
                },
                {
                    question: "Do social campaigns guarantee sales?",
                    answer:
                        "No. Social media can support awareness, engagement, and traffic, but specific sales outcomes cannot be guaranteed."
                }
            ],
            metaTitle: "Social Media Marketing Services | TPN s. r. o.",
            metaDescription:
                "Social media marketing, content planning, paid social direction, audience targeting, creative campaigns, and reporting from TPN s. r. o."
        },

        {
            id: "web-design",
            title: "Web Design",
            shortTitle: "Web Design",
            href: "./web-design.html",
            icon: "layout-template",
            image: "./assets/images/hero-web-design.jpg",
            cardText:
                "Create modern responsive websites and landing pages with clear structure, polished UI, strong messaging, and conversion-aware layouts.",
            dropdownText: "Modern websites, landing pages, UX, and presentation.",
            heroTitle: "Web Design for Brands That Need Clarity",
            heroText:
                "TPN s. r. o. designs polished, responsive web experiences that support brand trust, user flow, service clarity, and stronger digital presentation.",
            overviewTitle: "Design that supports communication",
            overviewText:
                "A website should not only look attractive. It should explain the business, guide visitors, reduce confusion, and support measurable actions. TPN combines visual direction with practical structure.",
            bestFor:
                "This service is ideal for companies that need a more professional website, clearer landing pages, or stronger brand presentation online.",
            included: [
                "Website structure planning",
                "UI and UX direction",
                "Responsive page layouts",
                "Landing page design",
                "Conversion-focused sections",
                "Brand presentation refinement"
            ],
            matters: [
                "First impressions influence trust before users read every detail.",
                "Clear structure helps people understand offers faster.",
                "Responsive design is essential for mobile, tablet, and desktop visitors."
            ],
            method: [
                {
                    title: "Frame",
                    text: "Define page goals, content hierarchy, audience needs, and user journey priorities."
                },
                {
                    title: "Design",
                    text: "Create visual layouts with clear typography, spacing, sections, and interaction states."
                },
                {
                    title: "Adapt",
                    text: "Refine responsive behavior so pages feel balanced across screen sizes."
                },
                {
                    title: "Polish",
                    text: "Improve details, micro-interactions, visual rhythm, and conversion cues."
                }
            ],
            deliverables: [
                "Page structure plan",
                "Responsive design direction",
                "Landing page layout",
                "UI section system",
                "Conversion-focused CTA placement",
                "Design polish checklist"
            ],
            outcome:
                "The goal is a website that feels credible, communicates clearly, and helps visitors move through the brand experience with less friction.",
            faq: [
                {
                    question: "Do you design landing pages?",
                    answer:
                        "Yes. TPN can support campaign landing pages, service pages, and broader website structures."
                },
                {
                    question: "Is mobile design included?",
                    answer:
                        "Responsive planning is part of the service because users visit from many screen sizes."
                },
                {
                    question: "Can design improve conversions?",
                    answer:
                        "Better structure and clarity can support conversion paths, although specific results cannot be guaranteed."
                }
            ],
            metaTitle: "Web Design Services | TPN s. r. o.",
            metaDescription:
                "Modern responsive web design, landing pages, UI/UX direction, conversion-focused layouts, and brand presentation from TPN s. r. o."
        },

        {
            id: "conversion-boost",
            title: "Conversion Boost",
            shortTitle: "Conversion",
            href: "./conversion-boost.html",
            icon: "mouse-pointer-click",
            image: "./assets/images/hero-conversion-boost.jpg",
            cardText:
                "Improve landing pages, CTA structure, form clarity, trust signals, and user flows so visitors have a clearer path to act.",
            dropdownText: "Landing page flow, CTA clarity, forms, and trust signals.",
            heroTitle: "Conversion Boost for Clearer User Action",
            heroText:
                "TPN s. r. o. helps refine digital experiences so visitors can understand offers faster, trust the next step, and move through conversion paths with less friction.",
            overviewTitle: "Small decisions shape user action",
            overviewText:
                "Conversion improvement is often about clarity. Stronger CTAs, better page flow, cleaner forms, trust elements, and more focused messaging can help users decide what to do next.",
            bestFor:
                "This service is ideal for businesses that already have traffic but want to improve landing page clarity, lead paths, and user confidence.",
            included: [
                "Landing page review",
                "CTA structure improvement",
                "UX flow guidance",
                "Form optimization",
                "Trust element placement",
                "Conversion reporting direction"
            ],
            matters: [
                "Traffic without a clear next step can waste marketing spend.",
                "Forms should feel simple, trustworthy, and easy to complete.",
                "Trust signals can reduce hesitation when users compare options."
            ],
            method: [
                {
                    title: "Review",
                    text: "Analyze page flow, CTAs, forms, content clarity, friction points, and trust elements."
                },
                {
                    title: "Simplify",
                    text: "Reduce confusion by clarifying hierarchy, messaging, and action paths."
                },
                {
                    title: "Strengthen",
                    text: "Improve CTAs, sections, proof points, and form experience."
                },
                {
                    title: "Measure",
                    text: "Track meaningful actions and use observations to guide future refinements."
                }
            ],
            deliverables: [
                "Conversion review notes",
                "CTA improvement plan",
                "Form UX recommendations",
                "Landing page structure edits",
                "Trust signal checklist",
                "Measurement recommendations"
            ],
            outcome:
                "The goal is a smoother user journey, clearer action paths, and a stronger connection between traffic and meaningful business inquiries.",
            faq: [
                {
                    question: "Is this only for landing pages?",
                    answer:
                        "No. Conversion improvements can apply to service pages, contact pages, forms, campaign pages, and full websites."
                },
                {
                    question: "Do you guarantee higher conversion rates?",
                    answer:
                        "No. TPN can improve structure and clarity, but user behavior and market conditions vary."
                },
                {
                    question: "What if we do not have analytics?",
                    answer:
                        "TPN can help identify what should be measured before deeper conversion work begins."
                }
            ],
            metaTitle: "Conversion Boost Services | TPN s. r. o.",
            metaDescription:
                "Landing page improvement, CTA structure, UX flow, form optimization, trust elements, and conversion-focused design from TPN s. r. o."
        },

        {
            id: "local-seo",
            title: "Local SEO",
            shortTitle: "Local SEO",
            href: "./local-seo.html",
            icon: "map-pin-check",
            image: "./assets/images/hero-local-seo.jpg",
            cardText:
                "Strengthen location-based visibility with local search direction, Google Business Profile guidance, citations, and local content signals.",
            dropdownText: "Google Business Profile, local keywords, citations, and visibility.",
            heroTitle: "Local SEO for Location-Based Visibility",
            heroText:
                "TPN s. r. o. helps businesses improve local search presence through clearer location signals, profile guidance, citation consistency, and locally relevant content direction.",
            overviewTitle: "Local visibility needs consistent signals",
            overviewText:
                "Local SEO helps businesses appear more clearly for location-based searches. It includes profile quality, local keywords, business information consistency, reviews, local content, and search presence signals.",
            bestFor:
                "This service is ideal for businesses that serve specific cities, regions, or service areas and want stronger local discovery.",
            included: [
                "Google Business Profile guidance",
                "Local keyword direction",
                "Citation consistency review",
                "Location page recommendations",
                "Local content planning",
                "Visibility reporting"
            ],
            matters: [
                "Consistent business information supports trust and discoverability.",
                "Local pages need useful context, not thin location text.",
                "Profile quality can influence how people compare local options."
            ],
            method: [
                {
                    title: "Check",
                    text: "Review current local search presence, profile details, citations, and location signals."
                },
                {
                    title: "Align",
                    text: "Clarify local keywords, service areas, business information, and content priorities."
                },
                {
                    title: "Improve",
                    text: "Recommend profile, citation, page, and content improvements."
                },
                {
                    title: "Track",
                    text: "Monitor visibility signals and refine local direction over time."
                }
            ],
            deliverables: [
                "Local SEO review",
                "Google Business Profile checklist",
                "Citation consistency notes",
                "Local keyword direction",
                "Location content recommendations",
                "Local visibility summary"
            ],
            outcome:
                "The goal is clearer local relevance, stronger location-based visibility, and a more complete local search presence.",
            faq: [
                {
                    question: "Is Local SEO only for physical locations?",
                    answer:
                        "No. It can also support service-area businesses, depending on how services and locations are presented."
                },
                {
                    question: "Can you guarantee map rankings?",
                    answer:
                        "No. Local rankings depend on relevance, distance, prominence, competition, and platform factors."
                },
                {
                    question: "Does Google Business Profile matter?",
                    answer:
                        "Yes. A clear and accurate profile can support local trust and discovery."
                }
            ],
            metaTitle: "Local SEO Services | TPN s. r. o.",
            metaDescription:
                "Local SEO, Google Business Profile guidance, local keywords, citations, map presence, and location-based optimization from TPN s. r. o."
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "./privacy-policy.html"
        },
        {
            label: "Terms of Service",
            href: "./terms-of-service.html"
        },
        {
            label: "Cookie Policy",
            href: "./cookie-policy.html"
        }
    ],

    footerText:
        "TPN s. r. o. is a growth-focused marketing agency helping brands improve visibility, attract qualified traffic, and strengthen digital performance through thoughtful strategy and creative execution.",

    home: {
        hero: {
            eyebrow: "Growth marketing agency",
            title: "We Craft Growth-Driven Digital Experiences",
            text:
                "TPN s. r. o. helps businesses improve visibility, attract qualified traffic, and build stronger conversion paths through thoughtful marketing strategy, creative execution, and continuous optimization.",
            primaryCta: "Let’s Grow Together",
            secondaryCta: "Explore Services",
            statValue: "150+",
            statLabel: "Campaign concepts shaped with strategy, clarity, and performance direction."
        },

        proof: [
            "150+ Campaign Concepts",
            "98% Strategy Focus",
            "Continuous Optimization",
            "Creative Direction"
        ],

        about: {
            eyebrow: "About TPN",
            title: "A marketing agency shaped around clarity, visibility, and measurable digital growth.",
            text:
                "TPN s. r. o. works with businesses that want more than scattered marketing activity. The agency connects strategy, creative direction, search visibility, paid traffic, conversion thinking, and reporting into a clearer growth system.",
            points: [
                {
                    icon: "message-square-text",
                    title: "Strategic communication",
                    text: "Clear messaging that helps audiences understand offers faster."
                },
                {
                    icon: "bar-chart-3",
                    title: "Data-informed decisions",
                    text: "Practical reporting signals that guide next steps without empty promises."
                },
                {
                    icon: "sparkles",
                    title: "Creative campaign thinking",
                    text: "Campaign concepts shaped for attention, trust, and action."
                },
                {
                    icon: "refresh-cw",
                    title: "Long-term optimization",
                    text: "Continuous refinement across channels, pages, and conversion paths."
                }
            ]
        },

        process: [
            {
                number: "01",
                title: "Discover",
                text: "We review your business, audience, channels, website, and current marketing direction."
            },
            {
                number: "02",
                title: "Define",
                text: "We shape priorities, campaign goals, positioning, and the clearest path forward."
            },
            {
                number: "03",
                title: "Build",
                text: "We create the marketing structure, assets, pages, or campaign system needed for execution."
            },
            {
                number: "04",
                title: "Launch",
                text: "We prepare the experience for real users with clean tracking, strong messaging, and clear actions."
            },
            {
                number: "05",
                title: "Optimize",
                text: "We review performance signals and refine the work over time for stronger direction."
            }
        ],

        benefits: [
            {
                icon: "compass",
                title: "Clear Strategy",
                text: "Every activity needs a reason, a role, and a measurable direction."
            },
            {
                icon: "line-chart",
                title: "Measurable Direction",
                text: "Reporting focuses on useful signals, not noise or empty dashboards."
            },
            {
                icon: "pen-tool",
                title: "Creative Execution",
                text: "Design, copy, and campaign ideas are shaped to feel polished and purposeful."
            },
            {
                icon: "trending-up",
                title: "Continuous Growth",
                text: "Marketing improves through consistent review, not one-time guesswork."
            },
            {
                icon: "handshake",
                title: "Responsive Support",
                text: "Communication stays practical, clear, and focused on next steps."
            }
        ],

        strategy: [
            "Paid traffic systems",
            "Search visibility",
            "Conversion-focused pages",
            "Local growth presence",
            "Performance analysis"
        ],

        framework: [
            {
                title: "Traffic",
                text: "Bring relevant users from paid, organic, social, and local discovery channels."
            },
            {
                title: "Content",
                text: "Use clearer messaging and useful content to explain value."
            },
            {
                title: "Design",
                text: "Create layouts that guide attention and support trust."
            },
            {
                title: "Conversion",
                text: "Shape CTAs, forms, and page flow around meaningful actions."
            },
            {
                title: "Reporting",
                text: "Review performance signals and refine decisions over time."
            }
        ],

        faq: [
            {
                question: "What services does TPN s. r. o. provide?",
                answer:
                    "TPN provides growth marketing services including Google Ads, SEO optimization, social media marketing, web design, conversion improvement, and local SEO."
            },
            {
                question: "Do you work with small businesses?",
                answer:
                    "Yes. TPN can support small and growing businesses that need clearer marketing direction, stronger visibility, and more polished digital presentation."
            },
            {
                question: "How long does it take to see marketing results?",
                answer:
                    "Timelines vary by channel, competition, website quality, budget, tracking, and offer strength. TPN focuses on building a clearer process and improving based on signals over time."
            },
            {
                question: "Can you guarantee specific results?",
                answer:
                    "No. Marketing outcomes cannot be guaranteed because user behavior, competition, platforms, and market conditions change."
            },
            {
                question: "How do we start a project?",
                answer:
                    "You can send a message through the contact form or email TPN directly. The first step is usually understanding your business, goals, and current marketing setup."
            }
        ]
    },

    pageMeta: {
        "index.html": {
            title: "TPN s. r. o. | Growth Marketing & Advertising Agency",
            description:
                "TPN s. r. o. is a growth-focused marketing agency helping businesses improve visibility, qualified traffic, web design, SEO, paid campaigns, and conversion paths."
        },
        "google-ads.html": {
            title: "Google Ads Services | TPN s. r. o.",
            description:
                "Google Ads planning, campaign structure, remarketing, conversion tracking, and performance direction from TPN s. r. o."
        },
        "seo-optimization.html": {
            title: "SEO Optimization Services | TPN s. r. o.",
            description:
                "Technical SEO, on-page optimization, keyword strategy, content direction, and search visibility support from TPN s. r. o."
        },
        "social-media-marketing.html": {
            title: "Social Media Marketing Services | TPN s. r. o.",
            description:
                "Social media marketing, content planning, paid social direction, audience targeting, creative campaigns, and reporting from TPN s. r. o."
        },
        "web-design.html": {
            title: "Web Design Services | TPN s. r. o.",
            description:
                "Modern responsive web design, landing pages, UI/UX direction, conversion-focused layouts, and brand presentation from TPN s. r. o."
        },
        "conversion-boost.html": {
            title: "Conversion Boost Services | TPN s. r. o.",
            description:
                "Landing page improvement, CTA structure, UX flow, form optimization, trust elements, and conversion-focused design from TPN s. r. o."
        },
        "local-seo.html": {
            title: "Local SEO Services | TPN s. r. o.",
            description:
                "Local SEO, Google Business Profile guidance, local keywords, citations, map presence, and location-based optimization from TPN s. r. o."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | TPN s. r. o.",
            description:
                "Read the Privacy Policy for TPN s. r. o., including information collection, cookies, analytics, contact forms, user rights, and contact details."
        },
        "terms-of-service.html": {
            title: "Terms of Service | TPN s. r. o.",
            description:
                "Read the Terms of Service for TPN s. r. o., including website use, service information, no guarantee of results, intellectual property, and liability terms."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | TPN s. r. o.",
            description:
                "Read the Cookie Policy for TPN s. r. o., including necessary cookies, analytics cookies, marketing cookies, third-party cookies, and cookie management."
        }
    },

    forms: {
        serviceOptions: [
            "Google Ads",
            "SEO Optimization",
            "Social Media Marketing",
            "Web Design",
            "Conversion Boost",
            "Local SEO"
        ],
        labels: {
            fullName: "Full Name",
            email: "Email",
            service: "Service Interested In",
            message: "Message",
            agreement:
                "I agree that TPN s. r. o. may use my submitted information to respond to this inquiry."
        },
        placeholders: {
            fullName: "Your name",
            email: "you@example.com",
            service: "Select a service",
            message: "Tell us what you want to improve..."
        },
        errors: {
            fullName: "Please enter your full name.",
            email: "Please enter a valid email address.",
            service: "Please select a service.",
            message: "Please write a short message.",
            agreement: "Please confirm the policy agreement."
        },
        success:
            "Thank you. Your message has been prepared successfully. TPN s. r. o. will review your inquiry and respond by email.",
        submitLabel: "Send Inquiry"
    },

    cookieBanner: {
        storageKey: "tpn_cookie_consent",
        title: "Cookie preferences",
        text:
            "We use necessary cookies to keep this website working and may use analytics cookies to understand how visitors interact with the site. You can accept or decline non-essential cookies.",
        acceptLabel: "Accept",
        declineLabel: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "./privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "./cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "./terms-of-service.html"
            }
        ]
    }
};
