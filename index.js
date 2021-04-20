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
        const details = resumeUtils.createElement({ tagName: 'div', className: 'myDetails', innerHTML: item.details });
        itemContainer.appendChild(details);
      }
      sectionContainer.appendChild(itemContainer);
    });

    sectionsContainer.appendChild(sectionContainer);
  })
}

init();
