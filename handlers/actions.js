// handlers/actions.js
const { Markup } = require('telegraf');
const en = require('../locales/en');
const ru = require('../locales/ru');
const uz = require('../locales/uz');

const languageMaps = {
    en, ru, uz
};

const handleRegisterForEvent = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.registerForEvent);
};

const handleApplyForVisa = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.applyForVisa);
};

const handleApplyForProgram = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.applyForProgram);
};

const handleApplyForOpportunity = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.applyForOpportunity);
};

const handleApplyForScholarship = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.applyForScholarship);
};

const handleSubmitQuery = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.submitQuery);
};



///////////////////////////////////

// handlers/registration.js
let userRegistration = {};

const startRegistration = (ctx) => {
    userRegistration[ctx.from.id] = {}; 
    ctx.reply('Please enter your first name:');
};

const processRegistration = (ctx) => {
    if (!userRegistration[ctx.from.id].firstName) {
        userRegistration[ctx.from.id].firstName = ctx.message.text;
        ctx.reply('Please enter your last name:');
    } else if (!userRegistration[ctx.from.id].lastName) {
        userRegistration[ctx.from.id].lastName = ctx.message.text;
        ctx.reply('Please enter your email address:');
    } else if (!userRegistration[ctx.from.id].email) {
        userRegistration[ctx.from.id].email = ctx.message.text;
        ctx.reply(
            `Please review your details:\n\nName: ${userRegistration[ctx.from.id].firstName} ${userRegistration[ctx.from.id].lastName}\nEmail: ${userRegistration[ctx.from.id].email}\n\nDo you want to submit or re-enter the details?`,
            Markup.inlineKeyboard([
                Markup.button.callback('Submit', 'submit_registration'),
                Markup.button.callback('Re-enter', 'reenter_details')
            ])
        );
    }
};

const submitRegistration = (ctx) => {
    // Admin guruhga yuborish
    const registrationInfo = `New event registration:\nName: ${userRegistration[ctx.from.id].firstName} ${userRegistration[ctx.from.id].lastName}\nEmail: ${userRegistration[ctx.from.id].email}`;
    ctx.telegram.sendMessage('-1002326318720', registrationInfo); // Admin guruhiga yuborish
    ctx.reply('You have successfully registered for the event.');
    delete userRegistration[ctx.from.id]; // Ma'lumotlarni tozalash
};

const reenterDetails = (ctx) => {
    // Jarayonni boshidan boshlash
    ctx.reply('Let\'s start again. Please enter your first name:');
    userRegistration[ctx.from.id] = {}; // Foydalanuvchi ma'lumotlarini tozalash
};

module.exports = { startRegistration, processRegistration, submitRegistration, reenterDetails };

///////////////////////////////////////////////




const handleSubmitFeedback = (ctx) => {
    ctx.reply('Please select:', Markup.inlineKeyboard([
        Markup.button.callback(locale.feedback, 'feedback'),
        Markup.button.callback('📋 Surveys', 'surveys'),
        Markup.button.callback('🔙 Back', 'back_to_main_menu')
    ]));
};



// bot.hears('📝 Surveys & Feedback', (ctx) => {
//     ctx.reply('Please select:', Markup.inlineKeyboard([
//         Markup.button.callback('📊 Feedback', 'feedback'),
//         Markup.button.callback('📋 Surveys', 'surveys'),
//         Markup.button.callback('🔙 Back', 'back_to_main_menu')
//     ]));
// });


const ResourcesForYouth = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback(locale.submitFeedback, 'submit_feedback'),
            Markup.button.callback(locale.applyForOpportunity, 'submit_feedback')
        ], [
            Markup.button.callback(locale.applyForOpportunity, 'submit_feedback'),
            Markup.button.callback(locale.back, 'back_to_main_menu')
        ]
    ]).resize();
    ctx.reply(locale.programApplied, keyboard);
};

const contactUs = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    ctx.reply(locale.submitFeedback);
};

const socialMedia = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;

    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback(locale.submitFeedback, 'submit_feedback'),
            Markup.button.callback(locale.applyForOpportunity, 'submit_feedback')
        ], [
            Markup.button.callback(locale.applyForOpportunity, 'submit_feedback'),
            Markup.button.callback(locale.back, 'back_to_main_menu')
        ]]).resize();

    // Foydalanuvchiga javob yuborish
    ctx.reply('Please choose an option:', keyboard);
};

const handleAboutUs = (ctx) => {
    const locale = languageMaps[ctx.session.language] || en;
    const caption = locale.aboutUsText || "Default caption text";

    ctx.replyWithPhoto(
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
        {
            caption: caption
        }
    );
};

module.exports = {
    handleRegisterForEvent,
    handleApplyForVisa,
    handleApplyForProgram,
    handleApplyForOpportunity,
    handleApplyForScholarship,
    handleSubmitQuery,
    handleSubmitFeedback,
    handleAboutUs,


    ResourcesForYouth,
    contactUs,
    socialMedia
};