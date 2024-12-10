import { useEffect, useRef, useState } from "react";
import Snow from "./snow";
import { Helmet } from "react-helmet-async";

const Timer = ({ focus }: { focus: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(focus ? 25 * 60 : 5 * 60); // 25分を秒で表現
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Web Workerを初期化
    workerRef.current = new Worker(
      new URL("../timerWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event) => {
      setTimeLeft(event.data.timeLeft);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const startTimer = () => {
    if (workerRef.current) {
      const endTime = Date.now() + timeLeft * 1000; // 現在時刻 + 残り時間
      workerRef.current.postMessage({ command: "start", endTime });
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ command: "stop" });
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ command: "stop" });
      setIsRunning(false);
      setTimeLeft(focus ? 25 * 60 : 5 * 60);
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      // 通知が許可されていたら早期リターン
      const permission = Notification.permission;
      if (permission === "denied" || permission === "granted") {
        return;
      }
      // 通知の許可を求める
      Notification.requestPermission();
    }
  }, []);

  const handlePushNotif = () => {
    if ("Notification" in window) {
      const notif = new Notification("タイマー終了", {
        body: focus ? "休憩しよう！" : "作業だよー",
      });
      // プッシュ通知が表示された時に起きるイベント
      notif.addEventListener("show", () => {
        // 状態によって音の有無を変える
      });
    }
  };

  if (timeLeft <= 0) {
    handlePushNotif();
    setIsRunning(false);
  }
  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{formattedTime}</title>
      </Helmet>

      {isRunning && <Snow />}
      <div className="space-y-10 text-center">
        <h1 className="text-7xl md:text-9xl font-bold">
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </h1>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {isRunning ? (
            <button
              className="bg-neutral-100 hover:bg-neutral-300 text-neutral-800 px-8 py-3 rounded-md font-semibold text-lg disabled:opacity-40"
              onClick={stopTimer}
              disabled={!isRunning}
            >
              STOP
            </button>
          ) : (
            <button
              className="bg-neutral-100 hover:bg-neutral-300 text-neutral-800 px-8 py-3 rounded-md font-semibold text-lg disabled:opacity-40"
              onClick={startTimer}
              disabled={isRunning}
            >
              START
            </button>
          )}

          <button
            className="border border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 text-neutral-100 px-8 py-3 rounded-md text-lg disabled:opacity-40"
            onClick={resetTimer}
          >
            RESET
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
