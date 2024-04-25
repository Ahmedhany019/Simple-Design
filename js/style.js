//Get localStorage
let mainColor = localStorage.getItem("option-color");
//Check if local storage not empty
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  //Remove Class Active From List Item
  document.querySelectorAll(".colorlist li").forEach((e) => {
    e.classList.remove("active");

    //Check If Dataset Color Element === local storage color item
    if (e.dataset.color === mainColor) {
      //Add Active Class
      e.classList.add("active");
    }
  });
}

// create Option Random Background
let backgroundOption = true;

//Check if Back ground Option is Empty
let backOptionLocal = document.querySelector(".random-background")

if(backOptionLocal !==null){
  
  if(backOptionLocal ==="true"){
    backgroundOption = true;
  }else{
    backgroundOption = false;
  }

  document.querySelectorAll(".random-background span").forEach((e)=>{
    e.classList.remove("active")

    //Add Class Active
    if(backOptionLocal ==="true"){
      document.querySelector(".random-background .yes").classList.add("active")
    }else{
      document.querySelector(".random-background .no").classList.add("active")
    }
  })
}

// create Option Random Background
let clearRandomInterval;

// toogle spin on click
document.querySelector(".toggle-setting .setting").onclick = function () {
  // Toggle Class fa-Spin To icon
  this.classList.toggle("fa-spin");

  //Toggle class open To  Setting Box
  document.querySelector(".setting-box").classList.toggle("open");
};

//Switch Colors
let colorLi = document.querySelectorAll(".colorlist li");

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    //set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //Set Color On Local Storage
    localStorage.setItem("option-color", e.target.dataset.color);

    handleActive(e)
  });
});
//Switch random background
let randomBackEl = document.querySelectorAll(".random-background span");

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    
    handleActive(e)

    //check if random background true
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      ranomizeImgs();

      localStorage.setItem("backgroundOption",true)
    } else {
      backgroundOption = false;
      clearInterval(clearRandomInterval);
      localStorage.setItem("backgroundOption",false)
    }
  });
});

// Select Landing Page Element
let landing = document.querySelector(".landing-page");

// Get Array Of Imgs
let arrImages = ["01.jpg", "07.jpg","06.jpg", "05.jpg", "08.jpg"];

function ranomizeImgs() {
  if (backgroundOption === true) {
    clearRandomInterval = setInterval(() => {
      // Get random Number
      let randomNumber = Math.floor(Math.random() * arrImages.length);

      //change Background Image Url
      landing.style.backgroundImage = `url(images/${arrImages[randomNumber]})`;
    }, 3000);
  }
}

// Select Skills Selector
let ourSkills = document.querySelector(".skills")

window.onscroll = function(){

  //Skill Ofset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  //Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight
  
  //window height 
  let windowHeight = this.innerHeight

  //Window Scroll Top
  let windowScrollTop = this.scrollY 

  if(windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)){

  let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

  allSkills.forEach(skill=>{

    skill.style.width = skill.dataset.prog

  })

  }
}

// Create popup With Image
let ourGallery = document.querySelectorAll(".gallery .images-box img")

ourGallery.forEach(img=>{

  img.addEventListener("click",function(){
    
    //Create Over lay
    let overlay = document.createElement('div')

    //Add Class To Overlay
    overlay.className = 'overlay-popup'

    //Add The Element To Body
    document.body.appendChild(overlay)

    //Create popup box
    let popupBox = document.createElement("div")

    //Add Class To popup box
    popupBox.className = 'popup-box'

    if(img.alt !== null){
      //Create Heading To  Popup Box
    let headPop = document.createElement('h3')

    //add class name to head
    headPop.className = 'head-pop'

    //Create Head Text
    let headPopText = document.createTextNode(img.alt)

    //Add Head Text To main head
    headPop.appendChild(headPopText)

    //Add head popup to box
    popupBox.appendChild(headPop)
    }

    //Create The Image
    let popupImage = document.createElement("img")

    //Set Image Source
    popupImage.src = img.src

    //Add The Element To Body
    popupBox.appendChild(popupImage)

    //Add popup Box To Page
    document.body.appendChild(popupBox)

    //Create Span Remover
    let exit = document.createElement("span")

    //Add Class To Exit
    exit.className = "exit"

    //Create span Text
    let exitText = document.createTextNode('X')

    //Add Text to Main Span
    exit.appendChild(exitText)

    //Add Main Span To Popup Box
    popupBox.appendChild(exit)

    document.addEventListener("click",function(e){
      if(e.target.className =="exit"){
        
        //remove popupbox
        document.querySelector(".popup-box").remove()

        //remove overlay
        document.querySelector(".overlay-popup").remove()
      }
    })
  })
})
// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullet .bullet")

allBullets.forEach((bullet)=>{

  bullet.addEventListener("click",(e)=>{

    document.querySelector(e.target.dataset.section).scrollIntoView({

      behavior: "smooth"
    })
  })
})

// handle Active Class
function handleActive(e){

    //Remove Class Active
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });

    //Add Class Active On Click
    e.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".option-bullets span")
let bulletsContainer = document.querySelector(".nav-bullet")
let bulletLocalItem = localStorage.getItem("option-bullets")

if(bulletLocalItem!==null){

  bulletsSpan.forEach((span)=>{

    span.classList.remove("active")

    if(bulletLocalItem==="block"){

      bulletsContainer.style.display="block"
      document.querySelector('.option-bullets .yes').classList.add("active")

    }else{

      bulletsContainer.style.display="none"
      document.querySelector('.option-bullets .no').classList.add("active")
    }
  })

}

bulletsSpan.forEach((span)=>{

  span.addEventListener("click",(e)=>{

  if(span.dataset.display==="show"){
    
    bulletsContainer.style.display="block"

    localStorage.setItem('option-bullets',"block")

  }else{
    bulletsContainer.style.display="none"

    localStorage.setItem('option-bullets',"none")

  }
handleActive(e)
  })

})

//reset Button
document.querySelector(".reset-button").onclick = function(){

    localStorage.clear()
    window.location.reload()

}

//Toggle Menu
let toggleBtn = document.querySelector(".icon")
let links =document.querySelector(".links")

toggleBtn.onclick = function(e){

  e.stopPropagation()
  this.classList.toggle("menu-active")
  links.classList.toggle("open")

}


document.addEventListener("click",function(e){
  
  if(e.target!==toggleBtn&& e.target!==links){
    
    // check if menu is open 
    if(links.classList.contains("open")){

      toggleBtn.classList.toggle("menu-active")
      links.classList.toggle("open")
    }

  }
})
links.onclick = function(e){
  e.stopPropagation()
}


