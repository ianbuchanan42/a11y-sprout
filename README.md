# A11y Sprout

A11y Sprout leverages [Puppeteer](https://website-name.com) to scrape the accessability tree of a designated website and returns the current state of Links, Headers, Landmarks and Tabindex. Which can give us a glimpse into a websites usability in regards to [assistive technology ](https://www.levelaccess.com/blog/assistive-technology/) such as [screen readers](https://www.afb.org/blindness-and-low-vision/using-technology/assistive-technology-products/screen-readers) and [VoiceOver](https://support.apple.com/guide/voiceover-guide/welcome/web)

## Accessibility.snapshot() method

As stated in the [Puppeteer Docs](https://pptr.dev/api/puppeteer.accessibility.snapshot/) the method...

"Captures the current state of the accessibility tree. The returned object represents the root accessible node of the page."

```bash
    const snapshot = await page.accessibility.snapshot();
```

## What does A11y Sprout focus on?

Links

- Checks for a [skip link](https://webaim.org/techniques/skipnav/) that allows a user to skip to the main content instead of having to tab through the header and navigation of a page.
- [Meaningful links](https://digital.accessibility.princeton.edu/how/content/links) that provide context to the links content or purpose.

Headers

- [Header ranking](https://www.w3.org/WAI/tutorials/page-structure/headings/), making sure that only one h1 is on a page and that the h1-h6 element hierarchy is semantic and not stylistically driven.

Landmarks

- Expose [landmark structure](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) based on the default and set [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) of a pages elements.

Tabindex

- Proper use of the [tabindex HTML attribute](https://www.a11y-collective.com/blog/tabindex-accessibility/), meaning that all important elements on a web page are focusable and accessible in a meaningful order when navigating a page using the tab key on the keyboard.
