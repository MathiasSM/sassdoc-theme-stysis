import def from "../default";
import { Promise } from "es6-promise";
import es6denodeify from "es6-denodeify";
import extend from "extend";
import fs from "fs-extra";
import { minify } from "html-minifier";
import path from "path";
import sassdocExtras from "sassdoc-extras";
import normalizePackageData from "normalize-package-data";
import swig from "./swig";
import annotations from "./annotations";

const denodeify = es6denodeify(Promise);

const copy = denodeify(fs.copy);
const renderFile = denodeify(swig.renderFile);
const writeFile = denodeify(fs.writeFile);

function applyDefaults (ctx) {
  return extend({}, def, ctx, {
    groups: extend(def.groups, ctx.groups),
    display: extend(def.display, ctx.display)
  });
}

function shortcutIcon (dest, ctx) {
  if (!ctx.shortcutIcon) {
    ctx.shortcutIcon = { type: "internal", url: "assets/images/favicon.png" };
  }
  else if (ctx.shortcutIcon.type === "internal") {
    ctx.shortcutIcon.url = "assets/images/" + ctx.shortcutIcon.url;

    return () => copy(ctx.shortcutIcon.path, path.resolve(dest, ctx.shortcutIcon.url));
  }
}

function byGroupAndTypeOrdered (data) {
  let sorted = {};

  data.forEach((item) => {
    let group = item.group[0];
    let type = item.context.type;

    if (!(group in sorted)) {
      sorted[group] = {};
    }

    if (!(type in sorted[group])) {
      sorted[group][type] = [];
    }

    sorted[group][type].push(item);
  });

  let sortedGroups = [];

  Object.keys(sorted).forEach((key) => {
    sortedGroups.push({name: key, group: sorted[key]});
  });

  sortedGroups.sort((a, b) => {
    if (a.name === "undefined") return -1;
    if (b.name === "undefined") return 1;
    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
  });

  return sortedGroups;
}

function styleguide__colors (data) {
  data.styleguide.colors = [];
  data.forEach((annotation) => {
    if(annotation.color){
      if(Array.isArray(annotation.color))
        annotation.color.forEach(a => {data.styleguide.colors.push(a);})
      else
        data.styleguide.colors.push(annotation.color);
    }
  });
}

function styleguide (data) {
  data.styleguide = {};
  styleguide__colors(data);
}

function theme (dest, ctx) {
  normalizePackageData(ctx.package);
  ctx = applyDefaults(ctx);
  sassdocExtras(ctx,
    "description",
    "markdown",
    "display",
    "groupName",
    "shortcutIcon",
    "sort",
    "resolveVariables"
  );

  ctx.data.byGroupAndType = byGroupAndTypeOrdered(ctx.data);

  styleguide(ctx.data);

  const index = path.resolve(__dirname, "../views/documentation/index.html.swig");

  return Promise.all([
    copy(path.resolve(__dirname, "../assets"), path.resolve(dest, "assets"))
      .then(shortcutIcon(dest, ctx)),

    renderFile(index, ctx)
      .then(html => minify(html, { collapseWhitespace: true }))
      .then(html => writeFile(path.resolve(dest, "index.html"), html))
  ]);
}
theme.annotations = annotations;

export default theme;
