const npmEvent = process.env.npm_lifecycle_event;

module.exports = require(`./conf/webpack.${ npmEvent }.config.js`);