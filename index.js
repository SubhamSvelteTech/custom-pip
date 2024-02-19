// ###################################### PIP ######################################

let theme = "dark";
let themeAccent = "lavender";

let pipActive = false;

let config = {
  focus: 1500,
  short: 300,
  long: 900,
  longGap: 4,
};

//#region PIP Mode
let canvas = document.createElement("canvas");
canvas.width = canvas.height = "fit-content";
let ctx = canvas.getContext("2d");

function loop() {
  ctx.fillRect(0, 0, 400, 400);
  ctx.font = "80px monospace";
  ctx.textAlign = "center";
  let seconds = config[roundInfo.current] - roundInfo.t;
  let timestr =
    Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (seconds % 60).toString().padStart(2, "0");
  ctx.fillText(timestr, 200, 200, 280);

  ctx.font = "32px monospace";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(200, 200, 180, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(
    200,
    200,
    180,
    -Math.PI / 2,
    (1 - roundInfo.t / config[roundInfo.current]) * Math.PI * 2 - Math.PI / 2
  );
  ctx.stroke();
}

if ("documentPictureInPicture" in window) {
  let timerContainer = null;
  let pipWindow = null;

  async function enterPiP() {
    const timer = document.querySelector("#timer");
    timerContainer = timer.parentNode;
    timerContainer.classList.add("pip");

    const pipOptions = {
      initialAspectRatio: timer.clientWidth / timer.clientHeight,
      lockAspectRatio: true,
      copyStyleSheets: true,
    };

    pipWindow = await documentPictureInPicture.requestWindow(pipOptions);

    // Copy style sheets over from the initial document
    // so that the player looks the same.
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules]
          .map((rule) => rule.cssText)
          .join("");
        const style = document.createElement("style");

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media;
        link.href = styleSheet.href;
        pipWindow.document.head.appendChild(link);
      }
    });

    // Add timer to the PiP window.
    pipWindow.document.body.append(timer);

    // Listen for the PiP closing event to put the timer back.
    pipWindow.addEventListener("unload", onLeavePiP.bind(pipWindow), {
      once: true,
    });
  }

  // Called when the PiP window has closed.
  function onLeavePiP() {
    if (this !== pipWindow) {
      return;
    }

    // Add the timer back to the main window.
    const timer = pipWindow.document.querySelector("#timer");
    timerContainer.append(timer);
    timerContainer.classList.remove("pip");
    pipWindow.close();

    pipWindow = null;
    timerContainer = null;
  }
  document.getElementById("popupbtn").addEventListener("click", () => {
    if (!pipWindow) {
      enterPiP();
    } else {
      onLeavePiP.bind(pipWindow)();
    }
  });
} else {
  let video = document.createElement("video");

  if (document.pictureInPictureEnabled || document.fullscreenEnabled) {
    document.body.appendChild(video);
    document.body.appendChild(canvas);
    canvas.id = "canvas";
    let stream = canvas.captureStream();
    video.srcObject = stream;
    video.autoplay = false;
    video.controls = true;
    video.addEventListener("play", () => {
      if (!roundInfo.running) pauseplay();
    });
    video.addEventListener("pause", () => {
      if (roundInfo.running) pauseplay();
    });
    loop();

    video.onenterpictureinpicture = () => {
      pipActive = true;
      video.classList.add("pipactive");
    };
    video.onleavepictureinpicture = () => {
      if (document.fullscreenElement) return;
      pipActive = false;
      video.classList.remove("pipactive");
    };
    video.onfullscreenchange = (ev) => {
      if (document.fullscreenElement) {
        pipActive = true;
        video.classList.add("pipactive");
      } else {
        pipActive = false;
        video.classList.remove("pipactive");
      }
    };
    document.getElementById("popupbtn").addEventListener("click", () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
        video.classList.remove("pipactive");
        return;
      }
      if (pipActive) {
        pipActive = false;
        video.classList.remove("pipactive");
        return;
      }
      loop();
      video.play();
      video.classList.add("pipactive");
      if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture();
      }
      pipActive = true;
    });
  } else {
    document.getElementById("popupbtn").style.display = "none";
  }
}
