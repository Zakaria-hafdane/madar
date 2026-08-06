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


  });



});


function closePopup(){


    lightbox.classList.remove("open");

    backdropBox.classList.remove("open");


    document.body.style.overflow="";


}

closeBtn.addEventListener("click",closePopup);


backdropBox.addEventListener("click",closePopup);

document.addEventListener("keydown",(e)=>{


    if(e.key==="Escape"){

        closePopup();

    }

});