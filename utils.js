window.resumeUtils = {
  getDate: (dateISOString) => {
    const date = new Date(dateISOString);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
    return formattedDate;
  },

  createElement: (options) => {
    const { tagName, className, innerHTML, href, img, icon } = options;
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    if (innerHTML && !icon) {
      element.innerHTML = innerHTML;
    }
    if (href) {
      element.href = href;
    }
    if (img) {
      element.src = img;
    }
    if (innerHTML && icon) {
      element.innerHTML = innerHTML + ` <i class="${icon}"></i>`;
    }
    return element;
  }
}
