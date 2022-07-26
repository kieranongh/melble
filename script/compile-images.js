/* eslint-disable @typescript-eslint/no-var-requires */
// run in browser console on https://www.jetpunk.com/user-quizzes/150455/melbourne-suburbs/stats

var burbs = [];
var paths = Array.from(document.querySelectorAll(".quiz-stats-answer"));

paths.forEach((path) => {
  path.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  var name = $(".hovered-path")[0].textContent.replace(/\d+% - /, "");
  var { x, y, width, height } = path.getBBox();
  path.setAttribute(
    "transform",
    `scale(${1024 / Math.max(width, height)}) translate(-${x + width / 2} -${
      y + height / 2
    })`
  );
  path.removeAttribute("data-id");
  path.removeAttribute("class");
  path.removeAttribute("id");
  path.removeAttribute("fill");
  path.removeAttribute("stroke");
  path.removeAttribute("stroke-miterlimit");
  path.removeAttribute("stroke-width");
  path.removeAttribute("style");
  var svg = `<?xml version="1.0" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
  "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="1024.000000pt" height="1024.000000pt" viewBox="-512 -512 1024 1024"
  preserveAspectRatio="xMidYMid meet">
    ${path.outerHTML}
  </svg>
  `;
  burbs.push({ svg, name });
});

console.log(JSON.stringify(burbs));

// export this ^^ into a node console, and run:

var burbData = require("./burbs.json");
var md5 = require("md5");
var fs = require("fs");
burbData.forEach((burb) => {
  var hash = md5(burb.name.toUpperCase());
  fs.mkdirSync("public/images/suburbs/" + hash, { recursive: true });
  fs.writeFileSync(
    "public/images/suburbs/" + hash + "/vector.svg",
    burb.svg,
    "utf8"
  );
});
