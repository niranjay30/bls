//////////// Sticky Navbar ///////////
window.onscroll = function(){
  stickyNavbar();
};

var navbar = document.querySelector("nav");
var sticky = navbar.offsetTop;

function stickyNavbar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
    adjustWidth();
  } else {
    navbar.classList.remove("sticky");
  }
}

// setting navbar's width equal to its parent's width
function adjustWidth() {
   var parentwidth = $("header").width();
   $("nav").width(parentwidth);
 }


//////////////////// Responsive Navbar ///////////////////////
function openSideMenu(){
  document.getElementById("side-menu").style.width = "100vw";
}

function closeSideMenu(){
  document.getElementById("side-menu").style.width = "0";
}


//////////// Carousel ///////////////
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const auto = true;
const intervalTime = 4000;
let slideInterval;

const nextSlide = function(){
  // Get current class
  const current = document.querySelector(".current");
  // Remove current class
  current.classList.remove("current");

  // Check for next slide
  if(current.nextElementSibling){
    // Check if next sibling is a "slide"
    if(current.nextElementSibling.className === "slide"){
      // Add current to next sibling
      current.nextElementSibling.classList.add("current");
    } else {
      // Add current to start
      slides[0].classList.add("current");
    }
  }
}

const prevSlide = function(){
  // Get current class
  const current = document.querySelector(".current");
  // Remove current class
  current.classList.remove("current");

  // Check for prev slide
  if(current.previousElementSibling){
    // Add current to prev sibling
    current.previousElementSibling.classList.add("current");
  } else {
    // Add current to end
    slides[slides.length - 1].classList.add("current");
  }
}

// Button Events
nextButton.addEventListener("click", e => {
  nextSlide();
  if(auto){
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prevButton.addEventListener("click", e => {
  prevSlide();
  if(auto){
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if(auto){
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}


////////////// Footer Year /////////////////
let date = new Date();
let year = date.getFullYear();

document.getElementById("copyright-year").innerHTML = year;
