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
    console.log('section', section);
    const sectionContainer = resumeUtils.createElement({ tagName: 'section', className: 'section-container' });

    // Setting the title
    const sectionTitle = resumeUtils.createElement({ tagName: 'div', className: 'section-title', innerHTML: section.name });
    sectionContainer.appendChild(sectionTitle);

    // Setting the items
    section.items && section.items.forEach(item => {
      const itemContainer = resumeUtils.createElement({ tagName: 'div', className: 'item-container' });
      if (item.type === 'timelineObject') {
        itemContainer.classList.add('timelineObject');
      } else if (item.type === 'skill') {
        itemContainer.classList.add('skill');
      }

      // Setting the item title
      if (!item.link) {
        const itemTitle = resumeUtils.createElement({ tagName: 'div', className: 'item-title', innerHTML: item.name, icon: item.icon });
        itemContainer.appendChild(itemTitle);
      }

      // Setting the description
      if (item.description) {
        const itemDescription = resumeUtils.createElement({ tagName: 'div', className: 'hobbyDetails', innerHTML: item.description });
        itemContainer.appendChild(itemDescription);
      }

      if (item.dateRange) {
        // Setting the item date range
        const itemDateRange = resumeUtils.createElement({
          tagName: 'div', className: 'item-date-range',
          innerHTML: `${resumeUtils.getDate(item.dateRange.start)}-${resumeUtils.getDate(item.dateRange.end)}`
        });
        itemContainer.appendChild(itemDateRange);
      }
      else if (item.src) {
        const skillSrc = resumeUtils.createElement({ tagName: 'img', img: item.src, className: 'skillImg' });
        itemContainer.appendChild(skillSrc);
      }
      else if (item.link) {
        console.log('item.link', item.link);
        const projectItem = resumeUtils.createElement({ tagName: 'li', className: 'project-container' });
        const projectLink = resumeUtils.createElement({ tagName: 'a', innerHTML: item.name, href: item.link });

        projectItem.appendChild(projectLink);
        itemContainer.appendChild(projectItem);
      }
      else if (item.hobbyDetails) {
        const hobbyDetails = resumeUtils.createElement({ tagName: 'div', className: 'hobbyDetails', innerHTML: item.hobbyDetails });
        itemContainer.appendChild(hobbyDetails);
      }
      else if (item.details) {
        let details;
        if (item.name === 'Github' || item.name === 'Linkedin') {
          details = resumeUtils.createElement({ tagName: 'a', className: 'myDetails', innerHTML: item.details, href: item.details, target: '_blank' });
        } else {
          details = resumeUtils.createElement({ tagName: 'div', className: 'myDetails', innerHTML: item.details });
        }
        itemContainer.appendChild(details);
      }
      sectionContainer.appendChild(itemContainer);
    });

    sectionsContainer.appendChild(sectionContainer);
  });

  // Init animation
  const headerOriginalHeight = header.getBoundingClientRect().height;
  const differenceBetweenMaxAndMinHeight = headerOriginalHeight - HEADER_MIN_HEIGHT;

  console.log('header.getBoundingClientRect()', header.getBoundingClientRect());
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
