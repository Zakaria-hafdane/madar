// work2.js


const projects = [

  {
    title: "Packaging 01",
    images: [
      "../assets/images/image1.png",
      "../assets/images/image2.png",
      "../assets/images/image3.png"
    ],
    desc:"Packaging project presentation"
  },


  {
    title: "Packaging 02",
    images: [
      "../assets/images/image5.png",
      "../assets/images/image4.png"
    ],
    desc:"Packaging project presentation"
  }

];



const cards = document.querySelectorAll(".pop-card");


const lightbox = document.getElementById("lightbox");
const backdropBox = document.getElementById("lbBackdrop");
const closeBtn = document.getElementById("lbClose");
const lbBody = document.getElementById("lbBody");

const imgViewer = document.getElementById("imgViewer");
const imgViewerImg = document.getElementById("imgViewerImg");
const imgViewerClose = document.getElementById("imgViewerClose");

function openImgViewer(src, alt) {
  imgViewerImg.src = src;
  imgViewerImg.alt = alt || "";
  imgViewer.classList.add("open");
}
function closeImgViewer() {
  imgViewer.classList.remove("open");
}
imgViewerClose.addEventListener("click", closeImgViewer);
imgViewer.addEventListener("click", (e) => {
  if (e.target === imgViewer) closeImgViewer();
});


cards.forEach(card=>{


  card.addEventListener("click",()=>{


    const id = card.dataset.project;

    const project = projects[id];

    lbBody.innerHTML = `

    <div class="package-frame">


        <h2>${project.title}</h2>


        <div class="package-images">

            ${project.images.map(img=>`

                <img src="${img}" alt="${project.title}">

            `).join("")}


        </div>



        <p>${project.desc}</p>



        <a href="contact.html" class="btn-y">
            اعمل معنا
        </a>


    </div>

    `;

    lightbox.classList.add("open");
    backdropBox.classList.add("open");


    document.body.style.overflow="hidden";

    lbBody.querySelectorAll(".package-images img").forEach(img => {
      img.addEventListener("click", () => openImgViewer(img.src, img.alt));
    });


  });



});


function closePopup(){


    lightbox.classList.remove("open");

    backdropBox.classList.remove("open");

    closeImgViewer();


    document.body.style.overflow="";


}

closeBtn.addEventListener("click",closePopup);


backdropBox.addEventListener("click",closePopup);

document.addEventListener("keydown",(e)=>{


    if(e.key==="Escape"){

        if (imgViewer.classList.contains("open")) {
            closeImgViewer();
        } else {
            closePopup();
        }

    }

});