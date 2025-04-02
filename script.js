document.addEventListener('DOMContentLoaded', function() {
    // Initial data
    const initialPoints = [
      {
        title: "Enhancing Visual Appeal",
        description: "Infographics leverage visually appealing designs, which can capture users' attention quickly on Pinterest's image-centric platform. This visual aspect can lead to increased engagement and higher pin rates."
      },
      {
        title: "Simplifying Complex Information",
        description: "Infographics simplify complex data and concepts into digestible visual formats. This is particularly useful for e-commerce brands or service providers looking to explain products or services quickly."
      },
      {
        title: "Boosting Brand Awareness",
        description: "Consistent use of infographics helps in building brand identity. By using specific colors, fonts, and styles, brands can create a distinct visual language that resonates with users and enhances recall."
      },
      {
        title: "Encouraging Shares and Saves",
        description: "Infographics are highly shareable content; they encourage users to save, pin, or share them due to their informative nature. This can lead to organic reach and visibility on Pinterest."
      },
      {
        title: "Driving Traffic to Websites",
        description: "Infographics can include call-to-actions (CTAs) linking back to your website or landing page, facilitating the conversion of Pinterest users into website visitors, thus driving traffic effectively."
      },
      {
        title: "Leveraging SEO Benefits",
        description: "When properly tagged with keywords and descriptions, infographics can enhance SEO on Pinterest. This can improve discoverability, making it easier for users interested in specific topics to find your pins."
      },
      {
        title: "Creating Educational Content",
        description: "Infographics can serve as educational tools or tutorials, providing value to your audience. This type of informative content can establish authority in your niche and attract a loyal following."
      }
    ];
  
    let points = [...initialPoints];
    let primaryColor = '#006169';
    let secondaryColor = '#d1e6e8';
  
    // DOM Elements
    const titleInput = document.getElementById('titleInput');
    const primaryColorInput = document.getElementById('primaryColor');
    const secondaryColorInput = document.getElementById('secondaryColor');
    const pointsContainer = document.getElementById('pointsContainer');
    const addPointBtn = document.getElementById('addPointBtn');
    const updateBtn = document.getElementById('updateBtn');
    const takeScreenshotBtn = document.getElementById('takeScreenshotBtn');
    const infographicTitle = document.getElementById('infographicTitle');
    const timeline = document.querySelector('.timeline');
    const modal = document.getElementById('screenshot-modal');
    const closeModal = document.querySelector('.close');
    const screenshotImage = document.getElementById('screenshot-image');
    const downloadBtn = document.getElementById('downloadBtn');
  
    // Initialize the application
    function init() {
      renderPointControls();
      renderInfographic();
      setupEventListeners();
    }
  
    // Render control inputs for each point
    function renderPointControls() {
      pointsContainer.innerHTML = '';
      
      points.forEach((point, index) => {
        const pointControl = document.createElement('div');
        pointControl.className = 'point-controls';
        pointControl.innerHTML = `
          <h4>Point ${index + 1}</h4>
          <input type="text" class="point-title" value="${point.title}" placeholder="Point Title">
          <textarea class="point-description" placeholder="Point Description">${point.description}</textarea>
          <div class="point-actions">
            <button class="moveUpBtn" data-index="${index}" ${index === 0 ? 'disabled' : ''}>Move Up</button>
            <button class="moveDownBtn" data-index="${index}" ${index === points.length - 1 ? 'disabled' : ''}>Move Down</button>
            <button class="removePointBtn" data-index="${index}">Remove</button>
          </div>
        `;
        pointsContainer.appendChild(pointControl);
      });
    }
  
    // Render the infographic
    function renderInfographic() {
      // Update the title
      infographicTitle.textContent = titleInput.value;
      
      // Apply colors
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
      
      // Update infographic styles
      const infographic = document.getElementById('infographic');
      infographic.style.setProperty('--primary-color', primaryColor);
      infographicTitle.style.color = primaryColor;
      
      // Clear and rebuild timeline
      timeline.innerHTML = '';
      
      // Create timeline items
      points.forEach((point, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const isEven = index % 2 === 0;
        
        timelineItem.innerHTML = `
          <div class="timeline-number" style="background-color: ${primaryColor}; color: white;">
            ${index + 1}
          </div>
          <div class="timeline-content">
            <h3 class="timeline-title" style="color: ${primaryColor};">${point.title}</h3>
            <p class="timeline-description">${point.description}</p>
          </div>
          <div class="timeline-node" style="background-color: ${primaryColor};"></div>
          <div class="timeline-line" style="background-color: ${primaryColor};"></div>
        `;
        
        timeline.appendChild(timelineItem);
      });
    }
  
    // Set up event listeners
    function setupEventListeners() {
      // Update infographic when the update button is clicked
      updateBtn.addEventListener('click', updateInfographic);
      
      // Add a new point
      addPointBtn.addEventListener('click', addNewPoint);
      
      // Take screenshot
      takeScreenshotBtn.addEventListener('click', takeScreenshot);
      
      // Close the modal
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      // Download the screenshot
      downloadBtn.addEventListener('click', downloadScreenshot);
      
      // Handle point controls (remove, move up, move down)
      pointsContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('removePointBtn')) {
          removePoint(parseInt(target.dataset.index));
        } else if (target.classList.contains('moveUpBtn')) {
          movePoint(parseInt(target.dataset.index), -1);
        } else if (target.classList.contains('moveDownBtn')) {
          movePoint(parseInt(target.dataset.index), 1);
        }
      });
      
      // Close modal when clicking outside
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
      
      // Update color inputs
      primaryColorInput.addEventListener('input', (e) => {
        primaryColor = e.target.value;
      });
      
      secondaryColorInput.addEventListener('input', (e) => {
        secondaryColor = e.target.value;
      });
    }
  
    // Update the infographic based on current settings
    function updateInfographic() {
      // Update points data from inputs
      const titleInputs = document.querySelectorAll('.point-title');
      const descriptionInputs = document.querySelectorAll('.point-description');
      
      points = Array.from(titleInputs).map((titleInput, index) => {
        return {
          title: titleInput.value,
          description: descriptionInputs[index].value
        };
      });
      
      renderInfographic();
    }
  
    // Add a new point
    function addNewPoint() {
      points.push({
        title: "New Point",
        description: "Enter your description here."
      });
      
      renderPointControls();
      renderInfographic();
    }
  
    // Remove a point
    function removePoint(index) {
      points.splice(index, 1);
      renderPointControls();
      renderInfographic();
    }
  
    // Move a point up or down
    function movePoint(index, direction) {
      const newIndex = index + direction;
      
      if (newIndex >= 0 && newIndex < points.length) {
        const temp = points[index];
        points[index] = points[newIndex];
        points[newIndex] = temp;
        
        renderPointControls();
        renderInfographic();
      }
    }
  
    // Take a screenshot of the infographic
    function takeScreenshot() {
      const infographicElement = document.getElementById('infographic');
      
      html2canvas(infographicElement, {
        scale: 2,
        logging: false,
        backgroundColor: null
      }).then(canvas => {
        // Display the screenshot in the modal
        const imageDataURL = canvas.toDataURL('image/png');
        screenshotImage.src = imageDataURL;
        modal.style.display = 'block';
      });
    }
  
    // Download the screenshot
    function downloadScreenshot() {
      const a = document.createElement('a');
      a.href = screenshotImage.src;
      a.download = 'pinterest-infographic.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  
    // Initialize the app
    init();
  });