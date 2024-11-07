// Landmarks
// navigate by landmarks headers, main, nav ,sections
// https://www.youtube.com/watch?v=8YSEJ7wPcqw&t=26s

const puppeteer = require('puppeteer');
//const fs = require('fs');
//const { urlToHttpOptions } = require('url');

const A11ySprout = {};

// !!!!! do I need new snap shots to work on???
// !!!!! add img alt text attr checker, ignore if alt=''

A11ySprout.parse = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  function findFocusedNode(node) {
    if (node.focused) {
      return node;
    }

    for (const child of node.children || []) {
      const focusedNode = findFocusedNode(child);
      if (focusedNode) {
        return focusedNode;
      }
    }
  }

  let snap = true;
  const tabIndex = [];
  while (snap) {
    await page.keyboard.press('Tab');
    snap = await page.accessibility.snapshot();

    const focusedNode = findFocusedNode(snap);
    if (!focusedNode) break;

    const tab = {
      role: focusedNode.role,
      name: focusedNode.name,
    };
    tabIndex.push(tab);
  }

  const links = await page.evaluate(() => {
    // Define non-meaningful terms to search for
    // let look at this and sort out what is being returned for skipLink
    let skipLink = document.querySelector('a');
    if (skipLink) {
      // add a check for the text of a skip link incase the href is not telling of its purpose
      const skipLinkRegex =
        /^#.*(skip|main|content|primary|main-content|page-content|primary-content|body-content|wrapper|container|app-content|app|site-content).*/;
      if (skipLinkRegex.test(skipLink.getAttribute('href'))) {
        const text = skipLink.innerText.trim().toLowerCase();
        skipLink = { text: text, link: skipLink.href };
      } else {
        skipLink = { text: '', link: '' };
      }
    } else {
      skipLink = { text: '', link: '' };
    }

    const nonSemanticRegex =
      /\b(click here|here|more details|more info|more|details|read more|learn more|go here|this link|link)\b/i;

    // Get all <a> elements
    const links = Array.from(document.querySelectorAll('a')).map((link) => {
      const text = link.innerText.trim().toLowerCase();
      return { text: text, link: link.href };
    });

    const nonSemanticLinks = links.filter((link) => {
      return link.text.length === 0 || nonSemanticRegex.test(link.text);
    }); // Return the href attribute of each filtered link
    return { links, nonSemanticLinks, skipLink };
  });

  //console.log(nonSemanticLinks);
  //console.log(links);

  const tree = await page.accessibility.snapshot({
    interestingOnly: true,
  });

  const snapshot = await page.accessibility.snapshot();

  const headers = [];

  let h1 = false;
  let previousHeaderLevel = 1;
  let brokenHierarchy = false;

  snapshot.children.forEach((element) => {
    let rating = '';
    if (element.role === 'heading') {
      rating = 'good';
      // check for and rate for one h1 header
      if (element.level == 1) {
        if (!h1) {
          h1 = true;
        } else {
          rating = 'bad';
        }
      } else {
        if (element.level >= previousHeaderLevel) {
          if (brokenHierarchy) {
            rating = 'bad';
          } else if (
            element.level === previousHeaderLevel ||
            element.level - 1 === previousHeaderLevel
          ) {
            rating = 'good';
          } else {
            rating = 'bad';
            brokenHierarchy = true;
          }
        } else {
          brokenHierarchy = false;
        }
      }

      previousHeaderLevel = element.level;

      headers.push({
        role: element.role,
        name: element.name,
        level: element.level,
        rating: rating,
      });
    }
  });

  const cleanTree = tree.children.map((element) => {
    return { role: element.role, name: element.name, level: element.level };
  });

  console.log('clean:', cleanTree);

  //const cleanHeaders
  await browser.close();
  console.log(links);
  const result = {
    url: url,
    tree: cleanTree,
    tabIndex,
    headers,
    links: links.links,
    nonSemanticLinks: links.nonSemanticLinks,
    skipLink: links.skipLink,
    h1: h1,
  };

  //console.log({ result });

  return result;
};

module.exports = A11ySprout;
