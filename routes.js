const config = require("./src/config.json");
const routes = [];
const siteArray = Object.getOwnPropertyNames(config.siteConfig);
//const base = process.env.NODE_ENV === 'production' ? `/${config.base}` : ``
const base = "";

siteArray.forEach(section => {
  try {
    let json = require(`./public/api/meta/${section}.json`);
    let sectionPaths = json.map(section => {
      return `${section.path}`;
    });
    routes.push(...sectionPaths);
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
});

module.exports = routes;
