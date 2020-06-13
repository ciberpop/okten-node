const cron = require('node-cron');

const sendMailAboutProduct = require('./sendMailAboutProduct');

const {configs: {CRON_PERIOD}} = require('../config');
module.exports = () => {
    cron.schedule(CRON_PERIOD, async () => {
       await sendMailAboutProduct();
    })
}