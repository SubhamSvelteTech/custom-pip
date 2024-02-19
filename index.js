// ###################################### PIP ######################################

let theme = "dark";
let themeAccent = "lavender";

let pipActive = false;

const fullname = {
  focus: "Focus",
  short: "Short Break",
  long: "Long Break",
};

const accents = {
  dark: {
    red: {
      "--bgcolor": "#252222",
      "--bgcolor2": "#403333",
      "--color": "#ffeeee",
      "--coloraccent": "#ffaaaa",
    },
    violet: {
      "--bgcolor": "#252225",
      "--bgcolor2": "#3a2a3a",
      "--color": "#ffeeff",
      "--coloraccent": "#ee82ee",
    },
    blue: {
      "--bgcolor": "#131320",
      "--bgcolor2": "#1d3752",
      "--color": "#eeeeff",
      "--coloraccent": "#9bb2ff",
    },
    lavender: {
      "--bgcolor": "#222230",
      "--bgcolor2": "#333340",
      "--color": "#eeeeff",
      "--coloraccent": "#b2b2ff",
    },
    green: {
      "--bgcolor": "#1d201d",
      "--bgcolor2": "#143814",
      "--color": "#eeffee",
      "--coloraccent": "#8dd48d",
    },
    teal: {
      "--bgcolor": "#111f1f",
      "--bgcolor2": "#334040",
      "--color": "#eeffff",
      "--coloraccent": "#00aaaa",
    },
    grey: {
      "--bgcolor": "#222222",
      "--bgcolor2": "#444444",
      "--color": "#dddddd",
      "--coloraccent": "#aaaaaa",
    },
  },
  black: {
    red: {
      "--bgcolor2": "#403333",
      "--color": "#ffeeee",
      "--coloraccent": "#ffaaaa",
      "--bgcolor": "#000000",
    },
    violet: {
      "--bgcolor": "#000000",
      "--bgcolor2": "#312131",
      "--color": "#ffeeff",
      "--coloraccent": "#ee82ee",
    },
    blue: {
      "--bgcolor2": "#1d3752",
      "--color": "#eeeeff",
      "--coloraccent": "#9bb2ff",
      "--bgcolor": "#000000",
    },
    lavender: {
      "--bgcolor2": "#333340",
      "--color": "#eeeeff",
      "--coloraccent": "#b2b2ff",
      "--bgcolor": "#000000",
    },
    green: {
      "--bgcolor2": "#143814",
      "--color": "#eeffee",
      "--coloraccent": "#8dd48d",
      "--bgcolor": "#000000",
    },
    teal: {
      "--bgcolor": "#000000",
      "--bgcolor2": "#303f3f",
      "--color": "#eeffff",
      "--coloraccent": "#00aaaa",
    },
    grey: {
      "--bgcolor2": "#444444",
      "--color": "#dddddd",
      "--coloraccent": "#aaaaaa",
      "--bgcolor": "#000000",
    },
  },
  light: {
    red: {
      "--bgcolor": "#fff3f3",
      "--bgcolor2": "#ffd2d2",
      "--color": "#222222",
      "--coloraccent": "#d64f4f",
    },
    violet: {
      "--bgcolor": "#fff3ff",
      "--bgcolor2": "#ffd2ff",
      "--color": "#222222",
      "--coloraccent": "#ee82ee",
    },
    blue: {
      "--bgcolor": "#f3f3ff",
      "--bgcolor2": "#d2d2ff",
      "--color": "#222222",
      "--coloraccent": "#4169e4",
    },
    lavender: {
      "--bgcolor": "#faf1ff",
      "--bgcolor2": "#e2d4ff",
      "--color": "#222222",
      "--coloraccent": "#8b51ff",
    },
    teal: {
      "--bgcolor": "#faffff",
      "--bgcolor2": "#cbebeb",
      "--color": "#222222",
      "--coloraccent": "#008080",
    },
    green: {
      "--bgcolor": "#f3fff3",
      "--bgcolor2": "#cafcc1",
      "--color": "#222222",
      "--coloraccent": "#39743d",
    },
    grey: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#dddddd",
      "--color": "#333333",
      "--coloraccent": "#555555",
    },
  },
  white: {
    red: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#ffd2d2",
      "--color": "#222222",
      "--coloraccent": "#ee7777",
    },
    violet: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#ffd2ff",
      "--color": "#222222",
      "--coloraccent": "#ee82ee",
    },
    blue: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#d2d2ff",
      "--color": "#222222",
      "--coloraccent": "#4169e4",
    },
    lavender: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#e2d4ff",
      "--color": "#222222",
      "--coloraccent": "#8b51ff",
    },
    teal: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#cbebeb",
      "--color": "#222222",
      "--coloraccent": "#008080",
    },
    green: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#cafcc1",
      "--color": "#222222",
      "--coloraccent": "#39743d",
    },
    grey: {
      "--bgcolor": "#ffffff",
      "--bgcolor2": "#dddddd",
      "--color": "#333333",
      "--coloraccent": "#555555",
    },
  },
};

const themes = {
  dark: {
    props: {
      "color-scheme": "dark",
      "--focus": "#d64f4f",
      "--short": "#26baba",
      "--long": "#5fbbe6",
    },
    defaccent: "lavender",
  },
  light: {
    props: {
      "color-scheme": "light",
      "--focus": "#d64f4f",
      "--short": "#26baba",
      "--long": "#5fbbe6",
    },
    defaccent: "red",
  },
  black: {
    props: {
      "color-scheme": "dark",
      "--focus": "#d64f4f",
      "--short": "#26baba",
      "--long": "#5fbbe6",
    },
    defaccent: "lavender",
  },
  white: {
    props: {
      "color-scheme": "light",
      "--focus": "#d64f4f",
      "--short": "#26baba",
      "--long": "#5fbbe6",
    },
    defaccent: "red",
  },
};

let config = {
  focus: 1500,
  short: 300,
  long: 900,
  longGap: 4,
};

// function nextRound() {
//   let finished = fullname[roundInfo.current];
//   let body = "Begin ";
//   if (roundInfo.current === "focus") {
//     if (audioType === "noise") {
//       fadeOut();
//     }
//     focusEnd(roundInfo.t);
//     finished += " Round";
//     if (roundInfo.focusNum >= config.longGap) {
//       roundInfo.current = "long";
//       roundInfo.focusNum = 0;
//     } else {
//       roundInfo.current = "short";
//     }
//     body +=
//       "a " +
//       Math.floor(config[roundInfo.current] / 60) +
//       " minute " +
//       fullname[roundInfo.current];
//   } else {
//     roundInfo.current = "focus";
//     roundInfo.focusNum++;
//     roundnoDiv.innerText = roundInfo.focusNum + "/" + config.longGap;
//     body += "focusing for " + Math.floor(config.focus / 60) + " minutes";
//   }

//   timer.className = "t-" + roundInfo.current;
//   roundInfo.t = 0;
//   if (roundInfo.running) {
//     if (roundInfo.current === "focus" && audioType === "noise") {
//       fadeIn();
//     }
//   }
// }

//#region PIP Mode
let canvas = document.createElement("canvas");
canvas.width = canvas.height = 400;
let ctx = canvas.getContext("2d");

function loop() {
  ctx.fillStyle = accents[theme][themeAccent]["--bgcolor"];
  ctx.fillRect(0, 0, 400, 400);

  ctx.fillStyle = accents[theme][themeAccent]["--color"];
  ctx.font = "80px monospace";
  ctx.textAlign = "center";
  let seconds = config[roundInfo.current] - roundInfo.t;
//   if (seconds < 0) {
//     nextRound();
//     return;
//   }
  let timestr =
    Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (seconds % 60).toString().padStart(2, "0");
  ctx.fillText(timestr, 200, 200, 280);

  ctx.font = "32px monospace";
  ctx.fillText(fullname[roundInfo.current].toUpperCase(), 200, 260, 280);

  ctx.strokeStyle = accents[theme][themeAccent]["--coloraccent"];
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(200, 200, 180, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = themes[theme].props["--" + roundInfo.current];
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
