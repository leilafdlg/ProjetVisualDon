import data from "../data/data.json";

const allTimelineData = data.Timeline;
const imageContainers = document.querySelector(".images");

function makePopup(
  divImage,
  description,
  backgroundColor,
  divId,
  titleText,
  sourceimg
) {
  //on crée le popup
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.setAttribute("id", `popup_${divId}`);
  popup.style.display = "none";

  divImage.appendChild(popup);
  //document.querySelector(".blocHorizontal").prepend(popup);

  //popup.innerHTML = ""; // Effacer le contenu précédent

  //créer la div de la description
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  popupContent.style.backgroundColor = backgroundColor;

  const title = document.createElement("p");
  title.setAttribute("id", "title");
  title.innerHTML = titleText;

  //créer la description
  const text = document.createElement("p");
  text.innerHTML = description;

  const source = document.createElement("p");
  source.setAttribute("id", "source");
  source.innerHTML = `<br>source image : ${sourceimg}`;

  //créer le bouton de fermeture
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.setAttribute("id", `button_${divId}`);

  closeButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';

  popupContent.appendChild(title);
  popupContent.appendChild(text);
  popupContent.appendChild(source);
  popupContent.appendChild(closeButton);
  popup.appendChild(popupContent);

  divImage.querySelector("img").addEventListener("click", () => {
    document.getElementById(`popup_${divId}`).style.display = "block"; //FLEX?
    console.log("coucou");
    //popup.style.visibility = "visible";
  });

  console.log(divImage.querySelector("img"), divId);

  document.getElementById(`button_${divId}`).addEventListener("click", () => {
    document.getElementById(`popup_${divId}`).style.display = "none";
    // console.log("coucou");
    // console.log(popup.style.display);
    //popup.style.visibility = "hidden";
  });

  //   divImage.appendChild(container);
}

function openPopup(id) {
  document.getElementById(`popup_${id}`).style.display = "block";
}
function closePopup(id) {
  document.getElementById(`popup_${id}`).style.display = "none";
}

//makePopup(allTimelineData);

export { makePopup, openPopup, closePopup };
