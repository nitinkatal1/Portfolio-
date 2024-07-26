// Script for Preloader
var loader = document.querySelector('.preloader');
var span = document.querySelector('.load-text');
var path = document.querySelector('.preloader svg path');
window.addEventListener("load", function(){
  span.classList.add('zindex');
  path.classList.add('svg-animate');
  loader.classList.add('closed');
})
// Script for sticky header
document.addEventListener('scroll', () =>{
  const header = document.querySelector('header');
  if (window.scrollY > 500){
    header.classList.add('scrolled');
  }else {
    header.classList.remove('scrolled');
  }
})
// Script for Header Toggle
let menutoggle = document.querySelector('.menutoggle');
let nav = document.querySelector('.menu-bar');
let header1 = document.querySelector('header');
menutoggle.onclick = function(){
    header1.classList.toggle('active');
}
nav.onclick = function(){
    header1.classList.remove('active');
}
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.menu nav a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)
// Script for back to top
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#8750f7 ${scrollValue}%, #0f0715 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
// Script for tipewriter effect
class TypeWriter {
      constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 8);
        this.type();
        this.isDeleting = false;
      }

      type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
          // Remove char
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          // Add char
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // change color for data-text
        this.txtElement.innerHTML = `<span class="txt"
        style="color: #dddddd;
        background: linear-gradient(to right, #8750f7 0%, white 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 200;

        if(this.isDeleting) {
          typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
          // Make pause at end
          typeSpeed = this.wait;
          // Set delete to true
          this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          // Move to next word
          this.wordIndex++;
          // Pause before start typing
          typeSpeed = 300;
        }

        setTimeout(() => this.type(), typeSpeed);
      }
    }

    // Init On DOM Load
    document.addEventListener('DOMContentLoaded', init);

    // Init App
    function init() {
      const txtElement = document.querySelector('.txt-type');
      const words = JSON.parse(txtElement.getAttribute('data-words'));
      const wait = txtElement.getAttribute('data-wait');
      // Init TypeWriter
      new TypeWriter(txtElement, words, wait);
    }