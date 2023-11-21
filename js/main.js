(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const marterialsCon = document.querySelector("#marterialsCon");
  const loading = document.querySelector("#loading");

  const spinner = `<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <path fill="#333" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
  <animateTransform
  attributeName="transform"
  attributeType="XML"
  type="rotate"
  dur="1s"
  from="0 50 50"
  to="360 50 50"
  repeatCount="indefinite" />
  </path>
  </svg>`;



    //This information needs to be removed then pulled with an AJAX Call using the Fetch API
    //this is the api url https://swiftpixel.com/earbud/api/materials"

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }



  function loadInfoBoxes() {
    function getData() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(info => {
      console.log(info);

      info.forEach((infoBox, index) => {
      let info = document.querySelector(`#hotspot-${index+1}`);
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

       const imgElement = document.createElement('img');
       imgElement.src = `images/${infoBox.thumbnail}`; //show the local images

      info.appendChild(titleElement);
      info.appendChild(textElement);
      info.appendChild(imgElement);
    });
    
    })
    .catch(error => console.error(error)); //catch and report any errors
    
  }
    getData();
  }
  loadInfoBoxes();

  loading.innerHTML = spinner



//loadMateraials
  function loadMateraialsBox(){
    function getData() {
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(respone => respone.json())
    .then(materials => {
      console.log(materials);

      let ul = document.createElement("ul")

      materials.forEach((materialsBox)=> {
        const li = document.createElement("li");

        const h3 = document.createElement("h3");
        h3.textContent = materialsBox.heading;
        
        const p = document.createElement("p");
        p.textContent = materialsBox.description;


        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);

        marterialsCon.appendChild(ul);
      });
    })
       .catch(error => console.error(error)); //catch and report any errors

    }
    getData();
  }
  loadMateraialsBox();
  



 












  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

