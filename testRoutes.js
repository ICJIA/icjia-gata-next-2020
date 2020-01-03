const routes = require("./routes");
const fs = require("fs");

//console.log(routes)
let contents = "/\t\t/index.html\t\t200\n";
contents = contents + "/home\t\t/index.html\t\t200\n";
contents = contents + "/404\t\t/404.html\t\t200\n";
routes.forEach(route => {
  if (route !== "/") {
    contents = contents + `${route}\t\t${route}/index.html\t\t200\n`;
  }
});

// try {
//     fs.writeFileSync('./static/_redirects', contents)
// } catch (err) {
//     // An error occurred
//     console.error(err)
// }

// console.log('_redirects generated')

console.log(contents);
