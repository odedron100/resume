window.resumeUtils = {
  getDate: (dateISOString) => {
    const date = new Date(dateISOString);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
    return formattedDate;
  },

  createElement: (options) => {
    const { tagName, className, innerHTML, href, img, icon, target } = options;
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    if (innerHTML && !icon) {
      if (innerHTML.includes("\n")) {
        const txt = `<div>${innerHTML.split('\n').join('<div></div> <div></div>')}</div>`
        element.innerHTML = txt;
      } else {
        element.innerHTML = innerHTML;
      }
    }
    if (href) {
      element.href = href;
    }
    if (img) {
      element.src = img;
    }
    if (target) {
      element.target = target;
    }
    if (innerHTML && icon) {
      element.innerHTML = `<i class="${icon}"></i> ` + innerHTML;
    }
    return element;
  }
}
