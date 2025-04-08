function Slidezy(selector, option = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.log(`Slidezy: Container "${selector}" not found`);
    return;
  }

  this.opt = Object.assign({}, option);
  this.slides = Array.from(this.container.children);
  this.currentIdex = 0;

  this._init();
}

Slidezy.prototype._init = function () {
  this.container.classList.add("slidezy-wrapper");
  this._createTrack();
  this._createNavigation();
};

Slidezy.prototype._createTrack = function () {
  this.track = document.createElement("div");
  this.track.className = "slidezy-track";

  this.slides.forEach((slide) => {
    slide.classList.add("slidezy-slide");
    this.track.appendChild(slide);
  });
  this.container.append(this.track);
};

Slidezy.prototype._createNavigation = function () {
  this.prevBtn = document.createElement("button");
  this.nextBtn = document.createElement("button");

  this.prevBtn.textContent = "<";
  this.nextBtn.textContent = ">";

  this.prevBtn.className = "slidezy-prev";
  this.nextBtn.className = "slidezy-next";

  this.container.append(this.prevBtn, this.nextBtn);

  this.prevBtn.onclick = () => this.moveSlide(-1);
  this.nextBtn.onclick = () => this.moveSlide(1);
};

Slidezy.prototype.moveSlide = function (step) {
  console.log(this.currentIdex);

  this.currentIdex = Math.min(
    Math.max(this.currentIdex + step, 0),
    this.slides.length - 3
  );
  this.offset = -(this.currentIdex * (100 / 3));
  this.track.style.transform = `translateX(${this.offset}%)`;
};
