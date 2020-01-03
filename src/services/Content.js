/* eslint-disable no-console */
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { EventBus } from "@/event-bus";
const config = require("@/config.json");
const xss = require("xss");

const getContent = async (section, slug) =>
  await import(`../../public/api/${section}/${slug}.json`).then(
    m => m.default || m
  );

const getAllFunding = async () =>
  await import(`../../public/api/meta/funding.json`).then(m => m.default || m);

const getAllNews = async () =>
  await import(`../../public/api/meta/news.json`).then(m => m.default || m);

const getAllPages = async () =>
  await import(`../../public/api/meta/pages.json`).then(m => m.default || m);

export { getContent, getAllFunding, getAllNews, getAllPages };
