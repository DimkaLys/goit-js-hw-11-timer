class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.idInterval = null;
  }

  start() {
    this.idInterval = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  }

  getRefs() {
    const container = document.querySelector(this.selector);
    const daysRef = container.querySelector('[data-value="days"]');
    const hoursRef = container.querySelector('[data-value="hours"]');
    const minsRef = container.querySelector('[data-value="mins"]');
    const secsRef = container.querySelector('[data-value="secs"]');
    return { daysRef, hoursRef, minsRef, secsRef };
  }

  updateTimer({ daysRef, hoursRef, minsRef, secsRef }) {
    const time = this.targetDate - Date.now();
    if (time < 0) {
      clearInterval(this.idInterval);
      return;
    }
    daysRef.textContent = Math.floor(time / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    hoursRef.textContent = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, "0");
    minsRef.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    secsRef.textContent = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Aug 19, 2021 11:20:30"),
});

timer.start();
