let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index){
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide(){
  currentSlide++;

  if(currentSlide >= slides.length){
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

function prevSlide(){
  currentSlide--;

  if(currentSlide < 0){
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

document.addEventListener("keydown", (e)=>{

  if(e.key === "ArrowRight" || e.key === " "){
    nextSlide();
  }

  if(e.key === "ArrowLeft"){
    prevSlide();
  }
});

function togglePresentMode(){
  document.body.classList.toggle("present-mode");
}

/* Editable Text */
document.querySelectorAll(".editable").forEach(el=>{
  el.contentEditable = true;
});

/* Draggable Elements */
const draggables = document.querySelectorAll(".draggable");

draggables.forEach(el=>{

  el.addEventListener("mousedown", dragMouseDown);

  function dragMouseDown(e){
    e.preventDefault();

    let shiftX = e.clientX - el.getBoundingClientRect().left;
    let shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(pageX, pageY){
      el.style.left = pageX - shiftX + "px";
      el.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e){
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", function(){
      document.removeEventListener("mousemove", onMouseMove);
    }, {once:true});
  }

});

/* Image Upload */
document.querySelectorAll(".imageUpload").forEach(input=>{

  input.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

      const reader = new FileReader();

      reader.onload = function(e){

        const img = document.createElement("img");
        img.src = e.target.result;

        input.parentElement.querySelector(".preview").appendChild(img);
      }

      reader.readAsDataURL(file);
    }

  });

});