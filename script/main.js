const ACTIVE = "active";

let linkButtons, sections, burgerMenuCont;

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
