const fs = require("fs");
const fm = require("front-matter");
const path = require("path");
const slug = require("slug");
const config = require("./src/config.json");

const markdownSourcePath = config.markdownSourcePath;
// const staticAssetPath = config.staticAssetPath;
const jsonDestinationPath = config.jsonDestinationPath;
const dateFields = config.dateFields;
const md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"))
  .use(require("markdown-it-attrs"));
const siteArray = Object.getOwnPropertyNames(config.siteConfig);

const base = process.env.NODE_ENV === "production" ? `${config.base}/` : ``;
//const base = ''

/**
 * Sort array of objects by property
 *
 * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 */
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function linkifyLegacy(markdown, section, slug) {
  let updatedMd = markdown.replace(
    /\]\((?!https?:\/\/)/gi,
    "](" +
    `https://archive.icjia-api.cloud/files/icjia/gata/materials/${section}/${slug}/`
  );
  return updatedMd;
}

function linkify(html, section, slug) {
  const re = new RegExp("^(http|https|mailto):/?/?", "i");
  const result = html.replace(/href="([^"]+)/g, function ($1) {
    const arr = $1.split('"');
    let match = re.test(arr[1]);
    let isAFile = /^.*\.(pdf|doc|docx|xls|xlsx|zip|csv|json|ppt|pptx)$/i.test(
      arr[1]
    );
    // if (isAFile) {
    //   console.log(arr[1])
    // }

    //console.log(arr[1], match)
    if (!match && isAFile) {
      const href = `${base}materials/${section}/${slug}/${arr[1]}`;
      return `href="/${href}`;
    }
    return $1;
  });
  return result;
}

const readFiles = (dirname) => {
  const readDirPr = new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) =>
      err ? reject(err) : resolve(filenames)
    );
  });

  return readDirPr.then((filenames) =>
    Promise.all(
      filenames.map((filename) => {
        return new Promise((resolve, reject) => {
          fs.readFile(dirname + filename, "utf-8", (err, content) => {
            let obj = {};
            /**
             * Parse frontmatter and markdown ...
             */
            obj = fm(content);
            /**
             * ... slugify filename ...
             */
            const f = filename.split(".");
            obj.slug = slug(f[0]).toLowerCase();

            /**
             * ... flatten obj by moving obj.attributes up one level ...
             */
            for (let attr in obj.attributes) {
              obj[attr] = obj.attributes[attr];
              /**
               * ... convert YAML date string to ISU 8601 ...
               */
              // dateFields.find(df => {
              //   if (df === attr) {
              //     if (obj[attr] != 'never') {
              //       obj[attr] = obj[attr]
              //     }
              //   }
              // })
            }
            /**
             * ... delete obj.attributes ...
             */
            delete obj.attributes;

            /**
             * ... generate url path ...
             */
            //console.log(config.siteConfig[obj.section])
            if (obj.slug != "home") {
              obj.path = `${config.siteConfig[obj.section].parentPath}${obj.slug
                }`;
            } else {
              obj.path = `/`;
            }

            let html = linkify(md.render(obj.body), obj.section, obj.slug);
            obj.html = html.replace(/(\r\n|\n|\r)/gm, "");

            obj.legacyMarkdown = linkifyLegacy(obj.body, obj.section, obj.slug);

            resolve(obj);
          });
        });
      })
    ).catch((error) => Promise.reject(error))
  );
};

// if (!fs.existsSync(`${jsonDestinationPath}`)) {
//   fs.mkdirSync(`${jsonDestinationPath}`)
// }

const routes = [];
const funding = [];
siteArray.forEach((obj) => {
  readFiles(`${markdownSourcePath}${obj}/`).then(
    (allContents) => {
      if (config.siteConfig[obj].type === "page") {
        /**
         * ... sort on 'position' if item is a page ...
         */
        allContents.sort(dynamicSort("position"));
      } else {
        /**
         * ... otherwise on specific date field for everything else ...
         */

        allContents.sort(function compare(a, b) {
          let dateA = new Date(a[config.siteConfig[obj].sortOn]);
          let dateB = new Date(b[config.siteConfig[obj].sortOn]);
          return dateB - dateA;
        });
      }

      metaArray = [];
      allContents.forEach((item) => {
        //console.log(item);
        let meta = {};
        meta.slug = item.slug;
        // meta.body = item.body;
        // meta.legacyMarkdown = item.legacyMarkdown;
        meta.title = item.title;
        meta.section = item.section;
        meta.excerpt = item.excerpt;
        meta.summary = item.excerpt;
        meta.posted = item.posted;
        meta.expires = item.expires;
        meta.path = item.path;
        meta.status = item.status;
        meta.showInNav = item.showInNav || false;
        meta.dividerAfter = item.dividerAfter || false;
        meta.showToc = item.showToc || false;
        meta.searchMeta = item.searchMeta || "";
        meta.menuTitle = item.menuTitle || item.title;
        meta.fundingType = item.fundingType || "Notice of Funding Opportunity";

        meta.displayFooter = item.displayFooter;
        if (item.section === "news") {
          meta.html = item.html;
        }
        metaArray.push(meta);
        /**
         * ... write individual files to api folder...
         */
        fs.writeFileSync(
          `./public/api/${item.section}/${item.slug}.json`,
          JSON.stringify(item)
        );
      });
      /**
       * ... write meta files to api folder...
       */
      fs.writeFileSync(
        `./public/api/meta/${obj}.json`,
        JSON.stringify(metaArray)
      );
      console.log(`${obj}.json generated`);
    },
    (error) => console.log(error)
  );
});
