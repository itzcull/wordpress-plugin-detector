import Parser from "rss-parser";

const getUrlsFromSitemap = async (rssFeedString: string): Promise<string[]> => {
  const parser = new Parser();

  const feed = await parser.parseString(rssFeedString, (err, parsed) => {
    if (err) {
      console.error(err);
      return;
    }

    return parsed;
  });

  const urls = feed.items.map((item) => item.link || "");

  return urls;
};

export default getUrlsFromSitemap;
