/* eslint-disable no-undef */
const app = require("./index");
const config = require("./config/config.json");
const env = process.env.NODE_ENV;
const configuration = config[env];

app.listen(configuration.port, () => {
console.log(`Server running at port ${configuration.port}`);
});