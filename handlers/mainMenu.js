// handlers/mainMenu.js
const { Markup } = require('telegraf');
const en = require('../locales/en');
const ru = require('../locales/ru');
const uz = require('../locales/uz');

const languageMaps = {
    uz, en, ru
};

const mainMenuKeyboard = (languageCode) => {
    const locale = languageMaps[languageCode] || uz;
    return Markup.keyboard([
        [locale.aboutUs, locale.events],
        [locale.contactUs, locale.socialMedia],
        [locale.newsAnnouncements, locale.surveysFeedback],
        [locale.youthPrograms, locale.visaSupport],
        [locale.globalOpportunities, locale.scholarships],
        [locale.resourcesForYouth, locale.settings],
        [locale.back]
    ]).resize();
};

const settingsKeyboard = (languageCode) => {
    const locale = languageMaps[languageCode] || uz;
    return Markup.inlineKeyboard([
        Markup.button.callback('🇬🇧 English', 'set_language_en'),
        Markup.button.callback('🇷🇺 Русский', 'set_language_ru'),
        Markup.button.callback('🇺🇿 O\'zbek', 'set_language_uz'),
        Markup.button.callback(locale.back, 'back_to_main_menu')
    ]);
};

module.exports = { mainMenuKeyboard, settingsKeyboard };
