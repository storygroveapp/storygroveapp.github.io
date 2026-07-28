const translations = {
    ru: {
        skip: "Перейти к содержанию", menu: "Открыть меню", mainNavigation: "Основная навигация", languageSwitcher: "Выбор языка", benefitsLabel: "Преимущества", screensLabel: "Экраны приложения StoryGrove", detailsLabel: "Дополнительные возможности", navFeatures: "Возможности", navDownload: "Скачать", navPrivacy: "Приватность", navSupport: "Поддержать",
        heroEyebrow: "Независимый инструмент для мастеров и игроков настольных RPG", heroTitle: "Ваша кампания всегда под рукой", heroText: "Персонажи, локации, фракции, предметы, квесты и связи между ними — в одном приложении. Без регистрации и подключения к интернету.",
        downloadAndroid: "Скачать для Android", supportProject: "Поддержать проект", releaseLoading: "Проверяем доступную версию…", releasePending: "APK пока недоступен", releaseInfo: "Версия {version} · {size} · {requirements}", trustOffline: "Работает офлайн", trustFree: "Бесплатно", trustLocal: "Данные на устройстве",
        altCampaign: "Экран кампании StoryGrove", altCharacters: "Список персонажей StoryGrove", altCharacter: "Карточка персонажа StoryGrove",
        featuresEyebrow: "Главное в StoryGrove",
        featureOneTitle: "Организуйте мир", featureOneText: "Разделяйте материалы по кампаниям и держите персонажей, места, фракции, предметы и квесты рядом.",
        featureTwoTitle: "Связывайте сущности", featureTwoText: "Сохраняйте отношения персонажей и быстро переходите между связанными элементами вашего мира.",
        featureThreeTitle: "Работайте где угодно", featureThreeText: "Приложение не требует аккаунта или интернета. Подтверждённые изменения сохраняются локально.",
        detailSearch: "Поиск по вашим записям", detailTransfer: "Импорт и экспорт кампаний", detailLanguages: "Русский и английский интерфейс", detailText: "Настройка размера текста", detailCampaigns: "Несколько независимых кампаний", detailAds: "Без рекламы и подписки",
        privacyEyebrow: "Ваши истории остаются вашими", privacyText: " не отправляет содержимое ваших кампаний на сервер. Сайт может собирать только минимальную техническую статистику посещений и загрузок без рекламного профилирования.",
        supportEyebrow: "Независимый проект", supportTitle: "StoryGrove остаётся бесплатным", supportText: "Поддержка помогает развивать приложение и выпускать обновления — без платных функций и ограничений.",
        legendEyebrow: "Рабочая карта прототипа", legendTitle: "Что заменяем изображениями", legendMainTitle: "Бирюзовый", legendMainText: "главный экран для hero", legendSecondaryTitle: "Фиолетовый", legendSecondaryText: "один фоновый экран hero", legendGalleryTitle: "Синие и тёплые блоки", legendGalleryText: "три изображения галереи", footerText: "Все права защищены."
    },
    en: {
        skip: "Skip to content", menu: "Open menu", mainNavigation: "Main navigation", languageSwitcher: "Language selection", benefitsLabel: "Benefits", screensLabel: "StoryGrove app screens", detailsLabel: "Additional features", navFeatures: "Features", navDownload: "Download", navPrivacy: "Privacy", navSupport: "Support",
        heroEyebrow: "An independent tool for tabletop RPG game masters and players", heroTitle: "Your campaign, always close at hand", heroText: "Characters, locations, factions, items, quests, and their connections — in one app. No account or internet connection required.",
        downloadAndroid: "Download for Android", supportProject: "Support the project", releaseLoading: "Checking the available version…", releasePending: "The APK is not available yet", releaseInfo: "Version {version} · {size} · {requirements}", trustOffline: "Works offline", trustFree: "Free to use", trustLocal: "Data stays on device",
        altCampaign: "StoryGrove campaign screen", altCharacters: "StoryGrove character list", altCharacter: "StoryGrove character sheet",
        featuresEyebrow: "The heart of StoryGrove",
        featureOneTitle: "Organize your world", featureOneText: "Separate material by campaign and keep characters, places, factions, items, and quests close at hand.",
        featureTwoTitle: "Connect entities", featureTwoText: "Track relationships between characters and move quickly through the connected parts of your world.",
        featureThreeTitle: "Work anywhere", featureThreeText: "The app needs no account or internet connection. Confirmed changes are stored locally.",
        detailSearch: "Search through your notes", detailTransfer: "Import and export campaigns", detailLanguages: "Russian and English interface", detailText: "Adjustable text size", detailCampaigns: "Multiple independent campaigns", detailAds: "No ads or subscriptions",
        privacyEyebrow: "Your stories remain yours", privacyText: " does not send your campaign contents to a server. The website may collect only minimal technical visit and download statistics without advertising profiles.",
        supportEyebrow: "An independent project", supportTitle: "StoryGrove stays free", supportText: "Your support helps develop the app and ship updates, without paid features or restrictions.",
        legendEyebrow: "Prototype working map", legendTitle: "What will become images", legendMainTitle: "Teal", legendMainText: "main hero screen", legendSecondaryTitle: "Purple", legendSecondaryText: "one background hero screen", legendGalleryTitle: "Blue and warm blocks", legendGalleryText: "three gallery images", footerText: "All rights reserved."
    }
};

const languageButtons = document.querySelectorAll(".language-button");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const downloadButton = document.querySelector("#android-download");
const releaseNote = document.querySelector("#android-release-note");
const apiBaseUrl = "https://storygrove-api.duckdns.org";
let currentLanguage = "ru";
let androidRelease = null;
let releaseLoaded = false;

function formatFileSize(sizeBytes, language) {
    return new Intl.NumberFormat(language === "ru" ? "ru-RU" : "en-US", {
        style: "unit",
        unit: "megabyte",
        unitDisplay: "short",
        maximumFractionDigits: 1
    }).format(sizeBytes / 1_000_000);
}

function renderRelease() {
    if (!releaseLoaded) {
        releaseNote.textContent = translations[currentLanguage].releaseLoading;
        return;
    }
    if (!androidRelease?.available || !androidRelease.downloadUrl) {
        downloadButton.classList.add("is-disabled");
        downloadButton.setAttribute("aria-disabled", "true");
        downloadButton.setAttribute("href", "#get-app");
        releaseNote.textContent = translations[currentLanguage].releasePending;
        return;
    }

    downloadButton.classList.remove("is-disabled");
    downloadButton.removeAttribute("aria-disabled");
    downloadButton.setAttribute("href", androidRelease.downloadUrl);
    releaseNote.textContent = translations[currentLanguage].releaseInfo
        .replace("{version}", androidRelease.version)
        .replace("{size}", formatFileSize(androidRelease.sizeBytes, currentLanguage))
        .replace("{requirements}", androidRelease.requirements);
}

async function sendEvent(type) {
    try {
        await fetch(`${apiBaseUrl}/api/v1/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type,
                locale: currentLanguage,
                path: window.location.pathname
            }),
            keepalive: true
        });
    } catch {
        // Statistics must never interfere with the landing page.
    }
}

async function loadAndroidRelease() {
    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/releases/android/latest`);
        if (!response.ok) throw new Error(`Release API returned ${response.status}`);
        androidRelease = await response.json();
    } catch {
        androidRelease = null;
    }
    releaseLoaded = true;
    renderRelease();
}

function setLanguage(language) {
    const selected = translations[language] ? language : "ru";
    currentLanguage = selected;
    document.documentElement.lang = selected;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = translations[selected][element.dataset.i18n];
        if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const value = translations[selected][element.dataset.i18nAlt];
        if (value) element.setAttribute("alt", value);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const value = translations[selected][element.dataset.i18nAriaLabel];
        if (value) element.setAttribute("aria-label", value);
    });
    languageButtons.forEach((button) => {
        const active = button.dataset.language === selected;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    });
    document.title = selected === "ru"
        ? "StoryGrove — вся ваша кампания в одном месте"
        : "StoryGrove — your entire campaign in one place";
    localStorage.setItem("storygrove-language", selected);
    renderRelease();
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
});

menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
});

navigation.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

document.querySelectorAll("[data-track-event]").forEach((link) => {
    link.addEventListener("click", () => {
        void sendEvent(link.dataset.trackEvent);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

const savedLanguage = localStorage.getItem("storygrove-language");
const initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en");
setLanguage(initialLanguage);
void sendEvent("page_open");
void loadAndroidRelease();
