const ACTIVE = "active";
const FORWARD = "forward";
const BACKWARD = "backward";

let linkButtons, sections, burgerMenuCont;

const educationCards = [
  "<ul class='slot-content'><li><h4>Copernico</h4></li><li><span>Where: Firenze</span></li><li><span>When: [2013 - 2017]</span></li><li><span>Certificate: Diploma</span></li></ul>",
  "<ul class='slot-content'><li><h4>Epicode</h4></li><li><span>Where: Online</span></li><li><span>When: [2025 - Present]</span></li><li><span>Certificate: Bachelor's</span></li></ul>",
];
const educationContentSlotPrev = document.querySelector(".edu-carousel .slot-prev");
const educationContentSlotCurrent = document.querySelector(".edu-carousel .slot-current");
const educationContentSlotNext = document.querySelector(".edu-carousel .slot-next");

const workCards = [
  "<ul class='slot-content'><li><h4>FC Automazione</h4></li><li><span>Where: Firenze</span></li><li><span>When: [2020 - 2023]</span></li><li><span>PLC Programmer</span></li></ul>",
  "<ul class='slot-content'><li><h4>Technology Reply</h4></li><li><span>Where: Milano</span></li><li><span>When: [2023 - 2025]</span></li><li><span>Java Developer</span></li></ul>",
  "<ul class='slot-content'><li><h4>SITTI</h4></li><li><span>Where: Milano</span></li><li><span>When: [2026 - Present]</span></li><li><span>Springboot Developer</span></li></ul>",
  "<ul class='slot-content'><li><h4>Future Job</h4></li><li><span>Where: Unknown</span></li><li><span>When: Unknown</span></li><li><span>AI Developer</span></li></ul>",
];
const workContentSlotPrev = document.querySelector(".work-carousel .slot-prev");
const workContentSlotCurrent = document.querySelector(".work-carousel .slot-current");
const workContentSlotNext = document.querySelector(".work-carousel .slot-next");

const placeholderCard = "<ul class='slot-content'><li>This is a Placeholder...</li>";

document.addEventListener("DOMContentLoaded", () => {
  // Inject Links Buttons
  const headerNav = document.querySelector(".header-bottom");
  if (headerNav) headerNav.innerHTML = window.linksTemplate;

  const burgerBody = document.querySelector(".burger-menu-body");
  if (burgerBody) burgerBody.innerHTML = window.linksTemplate;

  linkButtons = document.querySelectorAll(".btn-link");
  sections = document.querySelectorAll("main section");
  burgerMenuCont = document.querySelector(".burger-menu-container");
  const burgerBtnOpen = document.querySelector(".btn-burger");
  const burgerBtnClose = document.querySelector(".burger-menu .btn-close");

  // Sections
  linkButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      swapSections(targetId);
    });
  });

  // Burger Menu
  burgerBtnOpen.addEventListener("click", openBurgerMenu);
  burgerBtnClose.addEventListener("click", closeBurgerMenu);

  // Contact Section Form
  nameInput = document.getElementById("name-input");
  emailInput = document.getElementById("email-input");
  messageInput = document.getElementById("message-input");

  nameError = document.querySelector(".name-error");
  emailError = document.querySelector(".email-error");
  messageError = document.querySelector(".message-error");

  sendBtn = document.getElementById("send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", submitForm);
  }

  moveCarousel(educationCards, educationContentSlotPrev, educationContentSlotCurrent, educationContentSlotNext, FORWARD);
  moveCarousel(workCards, workContentSlotPrev, workContentSlotCurrent, workContentSlotNext, BACKWARD);
});

function swapSections(targetId) {
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    sections.forEach((s) => s.classList.remove(ACTIVE));
    targetSection.classList.add(ACTIVE);

    linkButtons.forEach((b) => b.classList.remove(ACTIVE));
    const matchingButtons = document.querySelectorAll(`[data-target="${targetId}"]`);
    matchingButtons.forEach((mBtn) => mBtn.classList.add(ACTIVE));

    closeBurgerMenu();
  }
}

function openBurgerMenu() {
  burgerMenuCont.classList.add(ACTIVE);
}

function closeBurgerMenu() {
  if (burgerMenuCont.classList.contains(ACTIVE)) {
    burgerMenuCont.classList.remove(ACTIVE);
  }
}

function moveCarousel(cards, slotPrev, slotCurrent, slotNext, direction) {
  const totalCards = cards.length;
  let counter = 0;

  setInterval(() => {
    let isPrevVisible = window.getComputedStyle(slotPrev).display !== "none";
    let isNextVisible = window.getComputedStyle(slotNext).display !== "none";

    let totalSlots = 1 + (isPrevVisible ? 1 : 0) + (isNextVisible ? 1 : 0);
    let cycleLength = Math.max(totalCards, totalSlots);

    let prev = counter - 1;
    let current = counter;
    let next = counter + 1;

    if (next >= cycleLength) next = 0;
    if (prev < 0) prev = cycleLength - 1;

    if (isPrevVisible) slotPrev.innerHTML = getCard(prev, cards);
    slotCurrent.innerHTML = getCard(current, cards);
    if (isNextVisible) slotNext.innerHTML = getCard(next, cards);

    if (direction === BACKWARD) {
      counter++;
      if (counter >= cycleLength) {
        counter = 0;
      }
    } else if (direction === FORWARD) {
      counter--;
      if (counter < 0) {
        counter = cycleLength - 1;
      }
    }
  }, 2000);
}

function getCard(index, cards) {
  if (index < cards.length) {
    return cards[index];
  } else {
    return placeholderCard;
  }
}

function submitForm() {
  console.log("Send Btn clicked");

  clearErrors();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  let hasErrors = false;

  if (nameValue == "") {
    nameError.textContent = "Name must not be empty";
    hasErrors = true;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue == "") {
    emailError.textContent = "Email must not be empty";
    hasErrors = true;
  } else if (!regex.test(emailValue)) {
    emailError.textContent = "Provide a valid email";
    hasErrors = true;
  }

  if (messageValue == "") {
    messageError.textContent = "Leave a message!";
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log("Form Submitted!");
    console.log("Data:", { nameValue, emailValue, messageValue });
    clearErrors();
    clearValues();
    alert("Your email has been successfully sent!");
  }
}

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
}

function clearValues() {
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}
