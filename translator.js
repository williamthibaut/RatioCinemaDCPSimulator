let translations = {};

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('translations.json');
    translations = await response.json();
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
        // Set initial language from browser or default to 'fr'
        const initialLang = localStorage.getItem('lang') || 'fr';
        selector.value = initialLang;
        setLanguage(initialLang);
    }
});

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
}

