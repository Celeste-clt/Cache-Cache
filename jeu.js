const jeu = document.getElementById("grille");
const randomIndex = Math.floor(Math.random() * 64);
let blue = false;
let intrusIndex = -1;

for (let i = 0; i < 64; i++) {
  jeu.innerHTML += '<div class="square"><img id="thanos" src="img/thanos.png"></div>';
}

const score = document.querySelector("#score");
let click = 20;

const squares = document.querySelectorAll(".square");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopupButton = document.getElementById("close-popup");

const revealBlueSquare = () => {
  squares[randomIndex].style.backgroundColor = "#ED1D24";
  const thanosImage = document.createElement("img");
  thanosImage.src = "find.png";  
  squares[randomIndex].innerHTML = '';  
  squares[randomIndex].appendChild(thanosImage);  
}

const showPopup = (message) => {
  popupMessage.textContent = message;  
  popup.style.display = "flex";  
}

const closePopup = () => {
  popup.style.display = "none";  
}

const getRandomNonRevealedIndex = () => {
  let randomNewIndex;
  do {
    randomNewIndex = Math.floor(Math.random() * 64); 
  } while (squares[randomNewIndex].style.backgroundColor !== '' || randomNewIndex === randomIndex);
  return randomNewIndex;  
};

const moveIntrus = () => {

  intrusIndex = getRandomNonRevealedIndex();
  
  const intrusImage = document.createElement("img");
  intrusImage.src = "thanos.png";  

  squares[intrusIndex].innerHTML = '';  

  squares[intrusIndex].appendChild(intrusImage);

  console.log("L'intrus s'est déplacé à la case : " + intrusIndex);
};

const startIntrusMovement = (interval) => {
  setInterval(moveIntrus, interval);
};

startIntrusMovement(5000);


squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (click <= 0) {
      return;
    }

    square.classList.add("flipped");

    if (index === randomIndex && !blue) {
      blue = true;
      square.style.backgroundColor = "blue";
      square.textContent = "Thanos";
      showPopup("Félicitations ! Vous avez trouvé la case bleue !");
      return;
    }

    square.style.backgroundColor = "black";
    square.style.color = "white";
    square.textContent = "";
    click -= 1;
    score.textContent = click;
    if (click === 0 && !blue) {
      revealBlueSquare();
      showPopup("Fin du jeu ! La case bleue était à la position " + randomIndex);
    }
  });
});

const button = document.querySelector("#reset");
button.addEventListener("click", () => {
  window.location.href = "jeu.html";  
});
