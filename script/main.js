"use strict";

class ProfileCard extends HTMLElement {
  // the method that keeps track of the atributes, if any atributes changes is detected trigger attributeChangedCallback method
  static get observedAttributes() {
    return [
      "titleImg",
      "avatarImage",
      "name",
      "nameColor",
      "about",
      "twitter",
      "github",
      "location",
      "webSite",
      "webKeyWord",
      "aboutColor",
    ];
  }

  constructor() {
    super();

    // creating the shadow root in open mode
    var shadow = this.attachShadow({ mode: "open" });

    // the main div container
    var cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "cardContainer");

    // top container
    var topContainer = document.createElement("div");
    topContainer.setAttribute("class", "topContainer");

    // about container
    var aboutContainer = document.createElement("div");
    aboutContainer.setAttribute("class", "aboutContainer");

    // bottom container
    var infoContainer = document.createElement("div");
    infoContainer.setAttribute("class", "infoContainer");

    // call the function that sets the background image
    setTitleImage.call(this, cardContainer);

    // call the function that creates and sets the avatar image element
    var avatarImage = setAvatarImage.call(this);

    //
    var name = setName.call(this);

    // about section
    var about = setAbout.call(this);

    // info section
    var info = setInfo.call(this);

    // creating buttons
    var showSections = toggleButton.call(
      this,
      cardContainer,
      aboutContainer,
      infoContainer
    );

    // creating the menu
    var menuButton = setMenuButton.call(this, topContainer, infoContainer);
    // creating the style of the component
    var style = document.createElement("style");
    style.textContent = setStyleElement();

    // appending the nodes to the shadow root to conseal his properties
    // shadow.appendChild(style);
    // shadow.appendChild(cardContainer);

    // appending to the document body for testing purpoises
    document.body.appendChild(style);
    document.body.appendChild(cardContainer);

    cardContainer.prepend(menuButton);
    cardContainer.appendChild(topContainer);
    cardContainer.appendChild(showSections);

    topContainer.appendChild(avatarImage);
    topContainer.appendChild(name);

    aboutContainer.appendChild(about);

    infoContainer.appendChild(info);
  }

  connectedCallback() {}

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define("profile-card", ProfileCard);

function setStyleElement() {
  return `
        *{
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }
        a {
            color: #4A4363;
            text-decoration: none; /* no underline */
        }
        .cardContainer {
            max-width: 400px;
            width:400px;
            background-color: rgb(255, 255, 255);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            box-shadow: 2px 2px 3px #676767;
            margin: 30px;
            position: relative;
        }
        
        .topContainer {
            width: 100%;
            border-radius: 10px 10px 0 0;
            display: flex;
            flex-direction:column;
            flex-wrap:wrap;
            align-items: center;
            justify-content: space-between;
        }
        #name{
            padding: 10px;
            justify-items: center
        }
        
        #avatarImage {
            height: 120px;
            width: 120px;
            margin: 1em;
            border-radius: 50%;
        }

        .aboutContainer{
            width: 100%;
            padding:20px;
        }

        #aboutText{
            font-size: 20px;
            font-weight: 100;
            line-height: 1.4;
            color:#4A4363;

        }

        .infoContainer{
            width: 100%;
            padding:20px;

        }

        #infoWrapper a{
            vertical-align: middle;
            overflow: auto;
        }    
        #infoWrapper a:hover{
            color:#ff9e00;
        }

        #infoWrapper img{
            vertical-align: middle;
        }  

        #socialContainer{
            display:flex;
            flex-direction: column;
            padding-bottom: 20px;
        }

        #toggle{
            width: 100%;
            height: 30px;
            text-align: center;
        }

        #arrow{
            animation: pulse 1.5s infinite;
            height: 20px;

        }

        @keyframes pulse {
            0% {
                opacity: 0.5;
                height: 20px;

            }
            50% {
                opacity: 1;
                height: 22px;

            }
            100%{
                opacity: 0.5;
                height: 20px;
            }
        }
        #menuButtonContainer{
          width: 100%;
          position: relative;
          padding: 3px;
        }
        #menuButton{
          position: absolute;
          right:3px;
          z-index: 100;

          box-shadow:inset 0px 1px 0px 0px #ffffff;
          background-color:#f9f9f9;
          border-radius:5px;
          border:1px solid #dcdcdc;
          display:inline-block;
          cursor:pointer;
          color:#666666;
          font-size:12px;
          font-weight:bold;
          padding:3px 10px;
          text-decoration:none;
          text-shadow:2px 2px 0px #ffffff;
        }
        #menuButton:hover{
          background-color:#e9e9e9;

        }
        #menu{
          padding: 10px;
          margin:2px;
          width: 200px;
          height: 300px;
          position: absolute;
          background-color: white;
          right: 0px;
          top: 0px;
          z-index:75;
          border-radius:5px;
          box-shadow: -5px 4px 2px -3px rgba(0,0,0,0.75);
        }
        .menuField{
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        #submit{
          margin: 3px 0;
          box-shadow:inset 0px 1px 0px 0px #ffffff;
          background-color:#f9f9f9;
          border-radius:5px;
          border:1px solid #dcdcdc;
          display:inline-block;
          cursor:pointer;
          color:#666666;
          font-size:12px;
          font-weight:bold;
          padding:3px 10px;
          text-decoration:none;
          text-shadow:2px 2px 0px #ffffff;
        }

        #submit:hover{
          background-color:#e9e9e9;

        }
    `;
}

function setTitleImage(container) {
  let topImage;
  if (this.hasAttribute("titleImg")) {
    topImage = this.getAttribute("titleImg");
    container.style.backgroundImage = `url(${topImage})`;
  } else {
    container.style.backgroundImage = "url('./assets/icons/topcover1.svg')";
  }

  container.style.backgroundSize = "cover";
  container.style.backgroundRepeat = "no-repeat";
}

function setAvatarImage() {
  let avatarImage = document.createElement("img");
  avatarImage.setAttribute("id", "avatarImage");
  avatarImage.alt = "avatar-image";

  if (this.hasAttribute("avatarImage")) {
    avatarImage.src = this.getAttribute("avatarImage");
  } else {
    avatarImage.src = "./assets/morty.png";
  }

  return avatarImage;
}

function setName() {
  let name = document.createElement("h2");
  name.setAttribute("id", "name");

  if (this.hasAttribute("name")) {
    name.innerText = `Hi! I'm ${this.getAttribute("name")}!`;
  } else {
    name.innerText = "Hi! I'm Angelo!";
  }

  if (this.hasAttribute("nameColor")) {
    name.style.color = this.getAttribute("nameColor");
  } else {
    name.style.color = "black";
  }

  return name;
}

function setAbout() {
  let aboutContainer = document.createElement("div");
  aboutContainer.setAttribute("id", "aboutWrapper");
  let title = document.createElement("h2");
  title.innerText = "About me";
  let aboutText = document.createElement("p");
  aboutText.setAttribute("id", "aboutText");
  aboutContainer.appendChild(title);
  aboutContainer.appendChild(aboutText);

  if (this.hasAttribute("about")) {
    aboutText.innerText = this.getAttribute("about");
  } else {
    aboutText.innerText =
      "Im a physicist/software developer.  \n I have experience with ReactJS, Leaflet, MongoDB and NodeJS.";
  }

  if (this.hasAttribute("aboutColor")) {
    aboutText.style.color = this.getAttribute("aboutColor");
  }

  return aboutContainer;
}

function setInfo() {
  let infoContainer = document.createElement("div");
  infoContainer.setAttribute("id", "infoWrapper");
  let infoTitle = document.createElement("h2");
  infoTitle.setAttribute("id", "infoTitle");
  infoTitle.innerText = "Socials";
  infoContainer.appendChild(infoTitle);
  let socialContainer = document.createElement("div");
  socialContainer.setAttribute("id", "socialContainer");

  if (this.hasAttribute("twitter")) {
    let twitter = document.createElement("span");
    let icon = document.createElement("img");
    let link = document.createElement("a");
    link.setAttribute("id", "linkTwitter");

    icon.src = "./assets/icons/twitter.ico";
    icon.style.width = "1em";
    link.innerText = ` @${this.getAttribute("twitter")}`;
    link.href = `https://twitter.com/${this.getAttribute("twitter")}`;
    link.setAttribute("target", "_blank");

    twitter.appendChild(icon);
    twitter.appendChild(link);

    socialContainer.appendChild(twitter);
  }
  if (this.hasAttribute("github")) {
    let github = document.createElement("span");
    let icon = document.createElement("img");
    let link = document.createElement("a");
    link.setAttribute("id", "linkGithub");

    icon.src = "./assets/icons/github.ico";
    icon.style.width = "1em";
    link.innerText = ` ${this.getAttribute("github")}`;
    link.href = `https://github.com/${this.getAttribute("github")}`;
    link.setAttribute("target", "_blank");

    github.appendChild(icon);
    github.appendChild(link);

    socialContainer.appendChild(github);
  }
  if (this.hasAttribute("location")) {
    let location = document.createElement("span");
    let icon = document.createElement("img");
    let link = document.createElement("a");
    link.setAttribute("id", "linkLocation");

    icon.src = "./assets/icons/location_alt.png";
    icon.style.width = "1em";
    link.innerText = ` at ${this.getAttribute("location")}`;
    link.href = `https://www.google.com/maps/search/?api=1&query=${this.getAttribute(
      "location"
    )}`;
    link.setAttribute("target", "_blank");

    location.appendChild(icon);
    location.appendChild(link);

    socialContainer.appendChild(location);
  }

  if (this.hasAttribute("website")) {
    let website = document.createElement("span");
    let icon = document.createElement("img");
    let link = document.createElement("a");
    link.setAttribute("id", "linkWeb");

    icon.src = "./assets/icons/website.png";
    icon.style.width = "1em";
    link.innerText = this.hasAttribute("webKeyWord")
      ? `  ${this.getAttribute("webKeyWord")}`
      : " Website";
    link.href = this.getAttribute("website");
    link.setAttribute("target", "_blank");

    website.appendChild(icon);
    website.appendChild(link);

    socialContainer.appendChild(website);
  }

  infoContainer.appendChild(socialContainer);

  return infoContainer;
}

function toggleButton(cardContainer, aboutContainer, infoContainer) {
  let toggle = false;
  let buttonAbout = document.createElement("div");
  buttonAbout.setAttribute("id", "toggle");
  let arrow = document.createElement("img");
  arrow.setAttribute("id", "arrow");
  arrow.src = "./assets/icons/arrow.png";

  buttonAbout.appendChild(arrow);

  buttonAbout.onclick = function toggleFunction() {
    if (toggle) {
      cardContainer.removeChild(aboutContainer);
      cardContainer.removeChild(infoContainer);
      arrow.style.transform = "rotate(0deg)";
    } else {
      cardContainer.appendChild(aboutContainer);
      cardContainer.appendChild(infoContainer);
      arrow.style.transform = "rotate(180deg)";
      cardContainer.appendChild(buttonAbout);
    }
    toggle = !toggle;
  };
  return buttonAbout;
}

/* construct and add  interactivity to the options menu*/
function setMenuButton(topContainer, infoContainer) {
  // creating and apending toggle button and menu container
  let menuButtonContainer = document.createElement("div");
  menuButtonContainer.setAttribute("id", "menuButtonContainer");

  let menuButton = document.createElement("button");
  menuButton.setAttribute("id", "menuButton");
  menuButton.innerText = "Menu";

  menuButtonContainer.appendChild(menuButton);

  let menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  menu.style.display = "none";

  menuButtonContainer.prepend(menu);

  // set up of input fields
  let nameField = setUpInput("Name:");
  let webField = setUpInput("Website:");
  let twitterField = setUpInput("Twitter:");
  let githubField = setUpInput("Github:");
  let colorField = setUpInput("Name color:");
  let locationField = setUpInput("Location:");

  menu.appendChild(nameField);
  menu.appendChild(colorField);
  menu.appendChild(twitterField);
  menu.appendChild(githubField);
  menu.appendChild(webField);
  menu.appendChild(locationField);

  // submit button
  let submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submit");
  submitButton.innerText = "Apply";

  submitButton.onclick = () => {
    return changeStyle.call(this);
  };

  menu.appendChild(submitButton);

  let toggle = false;
  menuButton.onclick = function toggleMenu() {
    toggleMenuFunction();
  };

  function changeStyle() {
    let nameInput = menu.querySelector("#inputName").value;
    let colorInput = menu.querySelector("#inputNamecolor").value;
    let twitterInput = menu.querySelector("#inputTwitter").value;
    let githubInput = menu.querySelector("#inputGithub").value;
    let webInput = menu.querySelector("#inputWebsite").value;
    let locationInput = menu.querySelector("#inputLocation").value;

    if (nameInput) {
      this.setAttribute("name", nameInput);
    }
    if (colorInput) {
      this.setAttribute("nameColor", colorInput);
    }
    if (twitterInput) {
      this.setAttribute("twitter", twitterInput);
    }
    if (githubInput) {
      this.setAttribute("github", githubInput);
    }
    if (webInput) {
      this.setAttribute("webSite", webInput);
    }
    if (locationInput) {
      this.setAttribute("location", locationInput);
    }

    //updating nodes
    let newNameNode = setName.call(this);
    let oldNameNode = topContainer.querySelector("#name");
    topContainer.replaceChild(newNameNode, oldNameNode);

    let newInfoNode = setInfo.call(this);
    let oldInfoNode = infoContainer.querySelector("#infoWrapper");
    infoContainer.replaceChild(newInfoNode, oldInfoNode);

    toggleMenuFunction();
  }

  function toggleMenuFunction() {
    if (!toggle) {
      menu.style.display = "block";
      menuButton.innerText = "x";
    } else {
      menuButton.innerText = "Menu";
      menu.style.display = "none";
    }

    toggle = !toggle;
  }

  return menuButtonContainer;
}

function setUpInput(name) {
  let idName = name.split(" ").join("");
  let field = document.createElement("div");
  field.setAttribute("class", "menuField");

  let title = document.createElement("span");
  title.innerText = `${name}`;

  let input = document.createElement("input");
  input.setAttribute("id", `input${idName.substr(0, idName.length - 1)}`);
  field.appendChild(title);
  field.appendChild(input);

  return field;
}
