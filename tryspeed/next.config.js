const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
module.exports = /*withPWA*/({
  reactStrictMode: true,
  i18n,
  /*pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
  },*/
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      '127.0.0.1',
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
});
