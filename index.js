// import data from './data.json';
// import data from './data';

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
    const sectionContainer = document.createElement('section');
    sectionContainer.classList.add('section-container');

    // Setting the title
    const sectionTitle = document.createElement('div');
    console.log('sectionTitle', sectionTitle);
    sectionTitle.classList.add('section-title');
    sectionTitle.innerHTML = section.name;
    sectionContainer.appendChild(sectionTitle);

    // Setting the items
    section.items && section.items.forEach(item => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('item-container');

      // Setting the item title
      const itemTitle = document.createElement('div');
      itemTitle.classList.add('item-title');
      itemTitle.innerHTML = item.name;
      itemContainer.appendChild(itemTitle);

      if (item.dateRange) {
        // Setting the item date range
        const itemDateRange = document.createElement('div');
        itemDateRange.classList.add('item-date-range');
        console.log('resumeUtils', resumeUtils);
        itemDateRange.innerHTML = `${resumeUtils.getDate(item.dateRange.start)}-${resumeUtils.getDate(item.dateRange.end)}`;
        itemContainer.appendChild(itemDateRange);
      } else if (item.projectsList) {
        const projectsListContainer = document.createElement('ul');

        item.projectsList.forEach(project => {
          const projectItem = resumeUtils.createElement({ tagName: 'li', className: 'project-container' });
          const projectLink = resumeUtils.createElement({ tagName: 'a', innerHTML: project.name, href: project.src });

          projectItem.appendChild(projectLink);
          projectsListContainer.appendChild(projectItem);
          itemContainer.appendChild(projectsListContainer);
        });
      }

      sectionContainer.appendChild(itemContainer);
    });

    // section.projectsList &&

    sectionsContainer.appendChild(sectionContainer);
  })
}

init();
