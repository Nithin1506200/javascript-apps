class DeviceMotion {
  timer = {
    T: 1000,
    timer: undefined,
    setT() {
      this.timer = true;
      setTimeout(() => {
        this.timer = false;
      }, this.T);
    },
  };

  deviceMotion;
  event;
  x;
  y;
  z;
  ax;
  ay;
  az;
  alphaFn;
  betaFn;
  gammaFn;

  constructor(
    alphaFn = null,
    betaFn = null,
    gammaFn = null,
    reactTime = 1000,
    ax = 15,
    ay = 15,
    az = 15
  ) {
    this.timer.T = reactTime;
    [this.ax, this.ay, this.az] = [ax, ay, az];
    [this.alphaFn, this.betaFn, this.gammaFn] = [alphaFn, betaFn, gammaFn];
    this.event = window.addEventListener(
      "devicemotion",
      (e) => {
        if (!this.timer.timer) {
          this.eventFn(e);
        }
      },
      false
    );
  }
  eventFn(e) {
    this.x = e.acceleration.x;
    this.y = e.acceleration.y;
    this.z = e.acceleration.z;
    if (Math.abs(this.z) > this.az && this.gammaFn) {
      this.gammaFn();
      this.timer.setT();
    } else if (Math.abs(this.x) > this.ax && this.alphaFn) {
      this.alphaFn();
      this.timer.setT();
    } else if (Math.abs(this.y) > this.ay && this.betaFn) {
      this.betaFn();
      this.timer.setT();
    }
  }
}

export default DeviceMotion;
