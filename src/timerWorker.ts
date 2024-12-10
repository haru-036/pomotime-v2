let timerId: number | undefined;

self.onmessage = (event) => {
  const { command, endTime } = event.data;

  if (command === "start") {
    if (timerId) return; // 既に動作中なら無視

    const interval = 1000;
    timerId = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = Math.max(Math.floor((endTime - currentTime) / 1000), 0);

      self.postMessage({ timeLeft });

      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = undefined;
      }
    }, interval);
  } else if (command === "stop") {
    clearInterval(timerId);
    timerId = undefined;
  }
};
