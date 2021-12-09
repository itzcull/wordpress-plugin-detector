// Get all links from sitemap
import Parser from "dom-parser";
import { readFile } from "fs/promises";
import { Plugin } from "./types/index";
import getUrlsFromSitemap from "./utils/getUrlsFromSitemap";

const pluginMaps: Plugin[] = [];
const parser = new Parser();

const outputPluginReport = async (text: string) => {
  const sitemapUrls = await readFile("../sitemap.rss", { encoding: "utf-8" }).then(
    (buffer) => getUrlsFromSitemap(buffer.toString())
  );

  for (const link of sitemapUrls) {
    if (
      link.includes("/sessions/") ||
      link.includes("/quizzes/") ||
      link.includes("/series/") ||
      link.includes("/modules/")
    ) {
      continue;
    }

    const html = await fetch(link)
      .then((res) => res.text())
      .catch((err) => {
        console.log(err.code);
      });

    const document = parser.parseFromString(html) || null;

    const resources = document ? document.getElementsByTagName("script") : [];

    pluginMaps.push({
      : Array.from(resources)
        .map((e) => e.src)
        .filter((url) => url.includes("app/plugins")),
      siteMapUrl: href,
    });
  }
};
