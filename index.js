// index.js
const { Telegraf, session } = require('telegraf');
require('dotenv').config();
const  botToken  = process.env.BOT_TOKEN;




const en = require('./locales/en');
const ru = require('./locales/ru');
const uz = require('./locales/uz');

const languageMaps = {
    uz, en, ru
};




const { mainMenuKeyboard, settingsKeyboard } = require('./handlers/mainMenu');
const {
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
    socialMedia,
    aboutUsTextHandel
} = require('./handlers/actions');

const bot = new Telegraf(botToken);

bot.use(session());

bot.use((ctx, next) => {
    if (!ctx.session) ctx.session = {};
    if (!ctx.session.language) ctx.session.language = 'en';
    return next();
});

bot.start((ctx) => {
    
    ctx.reply('Main menu:', mainMenuKeyboard(ctx.session.language));
});

bot.hears('⚙️ Settings', (ctx) => {
    ctx.reply('Select your language:', settingsKeyboard(ctx.session.language));
});

bot.action(/set_language_(\w+)/, (ctx) => {
    const languageCode = ctx.match[1];
    ctx.session.language = languageCode;
    ctx.reply(`Language changed to ${languageCode}.`, mainMenuKeyboard(languageCode));
});

bot.action('back_to_main_menu', (ctx) => {
    ctx.reply('Returning to the main menu...', mainMenuKeyboard(ctx.session.language));
});


bot.hears('Mission & Vision', (ctx)=>{
    const languageCode = ctx.match[1];
    const locale = languageMaps[languageCode] || uz;
    ctx.session.language = languageCode;
    
    const caption = locale.aboutUsText;
    ctx.replyWithPhoto(
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
        {
            caption: caption ,
            parse_mode: 'HTML' 
        }
    );
});


bot.hears('History', (ctx)=>{
    const languageCode = ctx.match[1];
    const locale = languageMaps[languageCode] || uz;
    ctx.session.language = languageCode;
    
    const caption = locale.aboutUsHistory;
    ctx.replyWithPhoto(
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
        {
            caption: caption ,
             parse_mode: 'HTML' 
        }
    );
});

bot.hears('Team', (ctx)=>{
    const languageCode = ctx.match[1];
    const locale = languageMaps[languageCode] || uz;
    ctx.session.language = languageCode;
    const caption = locale.aboutUsTeam;
    ctx.replyWithPhoto(
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
        {
            caption: caption ,
             parse_mode: 'HTML' 
        }
    );

});

bot.hears('🔙 Back', (ctx) => {
    ctx.reply('Returning to the main menu...', mainMenuKeyboard(ctx.session.language));
});

// bot.hears('🎯 Biz haqimizda|🎯 О нас|🎯 About Us/', handleAboutUs);
bot.hears('🎯 About Us', handleAboutUs);
bot.hears('📅 Events', handleRegisterForEvent);
bot.hears('💬 Contact Us', contactUs);
bot.hears('👥 Youth Programs', handleApplyForProgram);
bot.hears('🌍 Global Opportunities', handleApplyForOpportunity);
bot.hears('🎓 Scholarships', handleApplyForScholarship);
bot.hears('🛂 Visa Support', handleApplyForVisa);
bot.hears('📨 Submit a Query', handleSubmitQuery);
bot.hears('📝 Surveys & Feedback', handleSubmitFeedback);

bot.hears('🌐 Social Media', socialMedia);
bot.hears('📊 Resources for Youth', ResourcesForYouth);



bot.launch();