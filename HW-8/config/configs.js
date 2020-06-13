module.exports = {
    PORT: process.env.PORT || 5000,

    JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET_KEY',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET_KEY',
    JWT_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '15m',
    JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '1h',

    DB_NAME: process.env.DB_NAME || 'name',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'root',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'email',
    ROOT_EMAIL_PASS: process.env.ROOT_EMAIL_PASS || 'pass',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',

    CRON_PERIOD: process.env.CRON_PERIOD || '0 10 * * *'
}