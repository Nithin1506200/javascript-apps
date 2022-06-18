class DeviceMotion {
  timer = {
    T: 1000,
    timer: null,
    setT() {
      this.timer = true;
      setTimeout(() => {
        this.timer = false;
      }, this.T || 1000);
    },
  };
  deviceMotion;
  constructor(alphaFn, betaFn, gammaFn, reactTime = 60) {
    this.deviceMotion = new DeviceMotionEvent("devicemotion");
  }
}

export default DeviceMotion;
