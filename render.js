const fs = require('fs');

const loremFile = fs.readFileSync('./static/content.txt', { encoding: "utf8" });
const indexFile = fs.readFileSync('./static/index.html', { encoding: "utf8" });
const notFoundFile = fs.readFileSync('./static/not_found.html', { encoding: "utf8" });

// Regular expressions used to isolate content
const regexPatterns = {
  paragraphs: /.*[^(?:\n){2}]$/gm,
  sentences: /[A-Z]\w*[\w,\ ]*\./g,
  words: /\w*[^\ ]/g
};

// Extract paragraphs, sentences and words from a string
const getLorem = (type, number, file) => {
  return file
          .match(regexPatterns[type])
          .slice(0, number);
};

const getSmallLorem = params => {
  let loremContent = getLorem("paragraphs", 5, loremFile);
  loremContent = getLorem(params.type, params.number, loremContent.toString());
  loremContent = loremContent.join(" ");
  return loremContent;
};

// Replace template placeholder with loremFile contents. Turn newlines into break tags
const renderLorem = (params) => {

  let loremContent = "";

  if(parseInt(params.number) !== 0){
    switch(params.type){
      case "paragraphs":
        loremContent = getLorem(params.type, parseInt(params.number), loremFile);
        loremContent = loremContent.join("<br /><br />");
        break;
      case "sentences":
        loremContent = getSmallLorem(params);
        break;
      case "words":
        loremContent = getSmallLorem(params);
        break;
      case "error":
        loremContent = params.error.message;
        break;
      default:
        loremContent = "";
        break;
    }
  }

  return indexFile.replace("{{ lorem ipsum }}", loremContent);
};

module.exports.renderLorem = renderLorem;
module.exports.notFoundFile = notFoundFile;