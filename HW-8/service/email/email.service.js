const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {configs: {ROOT_EMAIL, ROOT_EMAIL_PASS, ROOT_EMAIL_SERVICE, FRONTEND_URL}} = require('../../config')
const htmlTemplates = require('../../email-templates');

const transporter = nodemailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASS
    },
});

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates', 'templates'),
        options: {
            extension: 'ejs'
        }
    },
    juiceResources: {
        preserveImportant: true,
        webResources: {
            relativeTo: path.join(process.cwd(), 'email-templates', 'css')
        }
    }
});

class emailService {
    async sendMail(userMail, action, context) {
        const templateInfo = htmlTemplates[action];
        const html = await emailTemplates.render(templateInfo.templateFileName, {...context, SITE: FRONTEND_URL})

        const mailOptions = {
            from: 'Okten',
            to: userMail,
            subject: templateInfo.subject,
            html
        }

        return transporter.sendMail(mailOptions);
    }
}

module.exports = new emailService();