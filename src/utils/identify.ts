import fs from "fs";

const plugins: Plugin[] = JSON.parse(
  fs.readFileSync("./plugins.json").toString()
);

const pluginCount = (plugins: Plugin[]) => {
  let returnObj = {} as any;

  for (const plugin of plugins) {
    plugin.pluginFetches.forEach((url) => {
      const pluginName = url.split("/")[5];
      if (!returnObj[pluginName]) {
        returnObj[pluginName] = 1;
      } else {
        returnObj[pluginName]++;
      }
    });
  }

  return returnObj;
};

const changeCase = (str: string) => {
  return str
    .split("-")
    .map((word) => word.toUpperCase()[0] + word.slice(1).toLowerCase())
    .join(" ");
};

const processed: any = {};

plugins.forEach((element) => {
  const titles = Array.from(
    new Set(
      element.pluginFetches.map((i: string) => changeCase(i.split("/")[5]))
    )
  );

  processed[element.siteMapUrl] = titles;
});

console.log(pluginCount(plugins));

fs.writeFileSync("./plugin-freq.json", JSON.stringify(pluginCount(plugins)));
