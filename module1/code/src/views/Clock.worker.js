var time = 0;
self.onmessage = (e) => {
  console.log("worker接受到的message e--", e.data);
  if (e.data.start) {
    setInterval(() => {
      time++;
      self.postMessage({ time: time });
    }, 1000);
  }
};
