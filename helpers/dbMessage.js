const clearLastLine = () => {
    process.stdout.moveCursor(0, -1); // up one line
    process.stdout.clearLine(1); // from cursor to end
  };
  
  let loadingEffect = () => {
    let i = 0;
    return setInterval(() => {
      let counterElements = ["|", "\\", "|","/","/" ];
      console.log("Loading DB " + counterElements[i]);
      i++;
      if (i == counterElements.length - 1) {
        i = 0;
      }
      setTimeout(() => {
        clearLastLine();
      }, 220);
    }, 220);
  };

module.exports = {
    clearLastLine,
    loadingEffect
}