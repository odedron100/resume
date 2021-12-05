const START_SCROLL_ANIMATION = 0;
const END_SCROLL_ANIMATION = 175;
const HEADER_MIN_HEIGHT = 100;
const HEADER_ORIGINAL_MARGIN_TOP = 5;

const init = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();

  const mainContainer = document.querySelector('.main-container');
  const header = mainContainer.querySelector('.header');
  const picture = header.querySelector('.picture');
  const nameContainer = header.querySelector('.name-container');
  const jobContainer = header.querySelector('.job-container');
  const summaryContainer = header.querySelector('.summary-container');
  const sectionsContainer = mainContainer.querySelector('.sections-container');

  nameContainer.innerHTML = data.name;
  jobContainer.innerHTML = data.job;
  summaryContainer.innerHTML = `<div>${data.summary.split('\n').join('</div><div>')}</div>`;
  picture.style.backgroundImage = `url("${data.pictureSrc}")`;

  data.sections.forEach(section => {
    const sectionContainer = resumeUtils.createElement({ tagName: 'section', className: 'section-container' });

    // Setting the title
    const sectionTitle = resumeUtils.createElement({ tagName: 'div', className: 'section-title', innerHTML: section.name });
    sectionContainer.appendChild(sectionTitle);

    // Setting the items
    section.items && section.items.forEach(item => {
      let itemContainer = resumeUtils.createElement({ tagName: 'div', className: 'item-container' });
      if (item.type === 'timelineObject') {
        itemContainer.classList.add('timelineObject');
      } else if (item.type === 'skill') {
        itemContainer.classList.add('skill');
      }

      // Setting the item title
      if (!item.link && !item.companyImg) {
        const itemTitle = resumeUtils.createElement({ tagName: 'div', className: 'item-title', innerHTML: item.name, icon: item.icon });
        itemContainer.appendChild(itemTitle)
      }
      if (item.companyImg) {
        const companySrc = resumeUtils.createElement({ tagName: 'img', img: item.companyImg, className: 'company-img' });
        itemContainer.appendChild(companySrc);
      }

      if (item.link) {
        const projectItem = resumeUtils.createElement({ tagName: 'li', className: 'project-container' });
        const projectLink = resumeUtils.createElement({ tagName: 'a', innerHTML: item.name, href: item.link, target: '_blank' });

        projectItem.appendChild(projectLink);
        itemContainer.appendChild(projectItem);
      }
      sectionContainer.appendChild(itemContainer);

      // Setting the description
      if (item.description) {
        let itemDescription;
        if (item.name === 'Github' || item.name === 'Linkedin') {
          itemDescription = resumeUtils.createElement({ tagName: 'a', className: 'link-description', innerHTML: item.description, href: item.description, target: '_blank' });
        }
        else {
          itemDescription = resumeUtils.createElement({ tagName: 'div', className: 'description', innerHTML: item.description });
          if (item.webLinkName) {
            const webLink = resumeUtils.createElement({ tagName: 'a', className: 'web-link', innerHTML: item.webLinkName, href: item.webLink, target: '_blank' });
            itemDescription.appendChild(webLink);
          }
        }
        itemContainer.appendChild(itemDescription);
      }

      if (item.points) {
        const pointsContainer = resumeUtils.createElement({ tagName: 'ul', className: 'points-container' });
        item.points.forEach(point => {
          const pointElement = resumeUtils.createElement({ tagName: 'li', className: 'point', innerHTML: point });
          pointsContainer.appendChild(pointElement);
        })
        itemContainer.appendChild(pointsContainer);
      }

      if (item.tags) {
        const tagsContainer = resumeUtils.createElement({ tagName: 'div', className: 'tags-container' });
        item.tags.forEach(tag => {
          const tagElement = resumeUtils.createElement({ tagName: 'span', className: 'tag', innerHTML: tag });
          tagsContainer.appendChild(tagElement);
        })
        itemContainer.appendChild(tagsContainer);
      }
      sectionContainer.appendChild(itemContainer);

      // else if (item.webLinkName) {
      //   const webLink = resumeUtils.createElement({ tagName: 'a', className: 'web-link', innerHTML: item.webLinkName, href: item.webLink, target: '_blank' });
      //   itemContainer.appendChild(webLink);
      // }

      if (item.dateRange) {
        // Setting the item date range
        const endDateRange = typeof item.dateRange.end === 'string' ? resumeUtils.getDate(item.dateRange.end) : 'Precent';
        const itemDateRange = resumeUtils.createElement({
          tagName: 'div', className: 'item-date-range',
          innerHTML: `${resumeUtils.getDate(item.dateRange.start)} - ${endDateRange}`
        });
        itemContainer.appendChild(itemDateRange);
      }
      // if (item.companyImg) {
      //   const companySrc = resumeUtils.createElement({ tagName: 'img', img: item.companyImg, className: 'companyImg' });
      //   itemContainer.appendChild(companySrc);
      // }
      if (item.src) {
        const skillSrc = resumeUtils.createElement({ tagName: 'img', img: item.src, className: 'skillImg' });
        itemContainer.appendChild(skillSrc);
      }
    });

    sectionsContainer.appendChild(sectionContainer);
  });

  // Init animation
  let headerOriginalHeight = header.getBoundingClientRect().height;
  const differenceBetweenMaxAndMinHeight = headerOriginalHeight - HEADER_MIN_HEIGHT;

  document.addEventListener('scroll', (e) => {
    const currentScroll = window.scrollY;
    const animationStage = currentScroll / END_SCROLL_ANIMATION;

    // Picture animation
    picture.style.transform = `scale(${1 + animationStage * 0.3}) rotate(${20 * animationStage}deg)`
    picture.style.opacity = 1 - animationStage;

    // Summary animation
    summaryContainer.style.opacity = 1 - animationStage;
    summaryContainer.style.transform = `translateX(${100 * animationStage}px)`;

    // Header animation
    let newHeight = headerOriginalHeight - differenceBetweenMaxAndMinHeight * animationStage;
    newHeight = newHeight > HEADER_MIN_HEIGHT ? newHeight : HEADER_MIN_HEIGHT;
    header.style.height = `${newHeight}px`;
    let newMarginTop = HEADER_ORIGINAL_MARGIN_TOP - HEADER_ORIGINAL_MARGIN_TOP * animationStage;
    newMarginTop = newMarginTop > 0 ? newMarginTop : 0;
    header.style.marginTop = `${newMarginTop}px`;
  })

}

init();
