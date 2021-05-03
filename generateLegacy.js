// let md =
//   "[LINK TO NOFO](CACILeadEntityNOFO.docx) {.text-center .nofo-link}\n\nThe Illinois Criminal Justice Information Authority is requesting applications for grants Services for Children’s Advocacy Centers Program. Grants will be made with FFY17 Victims of Crime Act funds. A total of $7.1 million is available through this solicitation for use over a period of 12 months.\n\n**Application deadline:** Application materials must be received by **11:59 p.m. on Sunday, March 3, 2019**.\n\n## Program Requirements\n\nAs part of the recommendations established by the Victim Services Ad Hoc Committee, the strengthening and expansion of core services for victims of crime is a priority. To fulfill this priority, ICJIA made available $7.1 million in VOCA grant funding for core services and related support costs for minor victims of abuse. These funds will be made available to the Children’s Advocacy Centers of Illinois.\n\n## Eligibility Information\n\nAgencies must be pre-qualified through the Grant Accountability and Transparency Act (GATA) Grantee Portal, https://grants.illinois.gov/portal/, to become eligible to apply for an award. Applicants must have completed the GATA pre-qualification process and received approval of their Internal Control Questionnaire (ICQ) by the date of period of performance start date, July 1, 2019, to be considered for funding.\n\n## Eligible Applicants\n\nThis solicitation is open to the Children’s Advocacy Centers of Illinois, 400 S. 9th Street, Springfield, Illinois, 62701.\n\n## Deadline\n\nCompleted application materials must be emailed to NOFOemail@Illinois.gov by **11:59 p.m., on Sunday, March 3, 2019,** to be considered for funding. Proposals will not be accepted by mail, fax, or in-person. Incomplete applications will not be reviewed. Late submissions will not be reviewed.\n\n## Available Funds\n\nGrants available through this funding opportunity are a portion of Victims of Crime Act FFY17 funds. A minimum of $7.1 million will be made available through this funding opportunity.\n\n## Period of Performance\n\nFunding is available for the period of July 1, 2019, through June 30, 2020.\n\n## Technical Assistance Session\n\nN/A\n\n## Timeline\n\n|                             Task                             |       Date        |\n| :----------------------------------------------------------: | :---------------: |\n|                         NOFO posted                          | February 1, 2019  |\n|           Technical Assistance Recording available           |        N/A        |\n|                     Notice of Intent due                     |        N/A        |\n|              NOFO question submission deadline               | February 25, 2019 |\n|                     **Applications Due**                     | **March 3, 2019** |\n| Budget Committee review/approval of recommended designations |     June 2019     |\n|                      Program start date                      |   July 1, 2019    |\n\n## Reporting\n\nRecipients must submit monthly/quarterly financial reports, monthly/quarterly progress reports, final financial and progress reports, and, if applicable, an annual audit report in accordance with the CFR Part 200 Uniform Requirements. Future awards and fund drawdowns may be withheld if reports are delinquent.\n\nIn addition, funded programs will be required to report performance measures through the U.S. Office of Victims of Crime portal at https://ovcpmt.ojp.gov/.\n\n## Required Documents\n\nThe following documents must be emailed to NOFOemail@Illinois.gov by the **11:59 p.m., Sunday, March 3, 2019**, deadline for application review.\n\n- [Completed and signed Uniform State Grant Application (Word)](CACIapplication.pdf)\n- [Completed Program Narrative (Word)](CACIprogramnarrative.docx)\n- [Completed Budget/Budget Narrative (Excel)](CACIbudget.xls.xlsx)\n\n## Questions\n\nQuestions regarding this NOFO may be submitted to NOFOemail@Illinois.gov until **11:59 p.m., Sunday, March 3, 2019**. Questions and responses will be posted at https://grants.icjia.cloud.\n\n## Contact Information\n\nRonnie J. Reichgelt\n\nIllinois Criminal Justice Information Authority\n\n300 West Adams, Suite 200\n\nChicago, IL 60606\n\nNOFOemail@illinois.gov\n";

// let updatedMdText = md.replace(
//   /\]\((?!https?:\/\/)/gi,
//   "](" +
//     "https://archive.icjia-api.cloud/files/icjia/gata/materials/funding/2019-caci/"
// );

// console.log(updatedMdText);

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
  return function(a, b) {
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
  const result = html.replace(/href="([^"]+)/g, function($1) {
    const arr = $1.split('"');
    let match = re.test(arr[1]);
    let isAFile = /^.*\.(pdf|doc|docx|xls|xlsx|zip|txt)$/i.test(arr[1]);
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

const readFiles = dirname => {
  const readDirPr = new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) =>
      err ? reject(err) : resolve(filenames)
    );
  });

  return readDirPr.then(filenames =>
    Promise.all(
      filenames.map(filename => {
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
              obj.path = `${config.siteConfig[obj.section].parentPath}${
                obj.slug
              }`;
            } else {
              obj.path = `/`;
            }

            let html = linkify(md.render(obj.body), obj.section, obj.slug);
            obj.html = html.replace(/(\r\n|\n|\r)/gm, "");

            let legacyMarkdown = linkifyLegacy(obj.body, obj.section, obj.slug);
            obj.legacyMarkdown = legacyMarkdown.replace(/(\r\n|\n|\r)/gm, "");

            resolve(obj);
          });
        });
      })
    ).catch(error => Promise.reject(error))
  );
};

// if (!fs.existsSync(`${jsonDestinationPath}`)) {
//   fs.mkdirSync(`${jsonDestinationPath}`)
// }

const routes = [];
const funding = [];
siteArray.forEach(obj => {
  readFiles(`${markdownSourcePath}${obj}/`).then(
    allContents => {
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
      allContents.forEach(item => {
        let meta = {};
        meta.slug = item.slug;
        meta.legacy = true;
        meta.title = item.title;
        meta.summary = item.excerpt;
        meta.posted = item.posted;
        meta.expires = item.expires;
        meta.body = item.legacyMarkdown;
        if (item.fundingType === "Request for Information") {
          meta.fundingType = "rfi";
        } else {
          meta.fundingType = "nofo";
        }
        metaArray.push(meta);
      });
      /**
       * ... write meta files to api folder...
       */
      fs.writeFileSync(
        `./public/api/legacy/${obj}.json`,
        JSON.stringify(metaArray)
      );
      console.log(`/legacy/${obj}.json generated`);
    },
    error => console.log(error)
  );
});
