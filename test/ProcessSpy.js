module.exports = function ProcessSpy() {
  this.hasExitedWithCode = null;

  this.exit = (code) => {
    this.hasExitedWithCode = code;
  }
}
