// let audioSelect = document.getElementById("audio-select");
// if (localStorage.getItem("pomo-audio-type")) {
// 	let audioTypeL = localStorage.getItem("pomo-audio-type");
// 	if (audioTypes.includes(audioTypeL)) {
// 		audioType = audioTypeL;
// 		audioSelect.value = audioType;
// 	}
// } else {
// 	audioSelect.value = "disabled";
// }

// let audioCtx;
// let noiseSource;
// let gain;
// let noiseTimeout;

// let isWhiteNoiseRunning = false;
// let isFadingOut = false;

// audioSelect.addEventListener("change", () => {
// 	audioType = audioSelect.value;
// 	if(audioType !== "noise" && isWhiteNoiseRunning) {
// 		fadeOut()
// 	}
// 	localStorage.setItem("pomo-audio-type", audioType);
// });

// function initNoise() {
// 	if (!audioCtx) {
// 		audioCtx = new AudioContext();
// 	}
// 	const bufferSize = audioCtx.sampleRate * 3;
// 	const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
// 	let data = buffer.getChannelData(0);

// 	for (let i = 0; i < bufferSize; i++) {
// 		data[i] = Math.random() * 2 - 1;
// 	}

// 	noiseSource = audioCtx.createBufferSource();
// 	noiseSource.buffer = buffer;

// 	gain = audioCtx.createGain();
// 	gain.gain = volume / 100;

// 	noiseSource.connect(gain);
// 	gain.connect(audioCtx.destination);
// }

// function playNoise() {
// 	noiseSource.loop = true;
// 	noiseSource.start();
// 	isWhiteNoiseRunning = true;
// }

// function stopNoise() {
// 	noiseSource.stop();
// 	isWhiteNoiseRunning = false;
// 	isFadingOut = false;
// }

// function fadeOut() {
// 	if (!isWhiteNoiseRunning) return;
// 	isFadingOut = true;
// 	gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
// 	noiseTimeout = setTimeout(stopNoise, 1000);
// }

// function fadeIn() {
// 	clearTimeout(noiseTimeout);
// 	if (!isFadingOut) {
// 		initNoise();
// 		gain.gain.setValueAtTime(0, audioCtx.currentTime);
// 		gain.gain.linearRampToValueAtTime(volume / 100, audioCtx.currentTime + 1);
// 		playNoise(0);
// 	} else {
// 		gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
// 		gain.gain.linearRampToValueAtTime(volume / 100, audioCtx.currentTime + 1);
// 	}
// }

//#endregion

//#region Current View

// const animations = {
// 	out: [
// 		{ opacity: "1", transform: "translateY(0)" },
// 		{
// 			opacity: "0",
// 			transform: "translateY(50px)",
// 		},
// 	],
// 	in: [
// 		{
// 			opacity: "0",
// 			transform: "translateY(50px)",
// 		},
// 		{ opacity: "1", transform: "translateY(0)" },
// 	],
// 	animoptions: {
// 		duration: 200,
// 		fill: "forwards",
// 	},
// };

// let lastanim;

// menubtn.addEventListener("click", () => {
// 	if (lastanim) lastanim.cancel();
// 	if (viewState === "menu") {
// 		mainel.style.display = "flex";
// 		lastanim = menu.animate(animations.out, animations.animoptions);
// 		lastanim.onfinish = () => {
// 			menu.style.display = "none";
// 		};
// 		menubtn.title = "Open Settings";
// 		menubtn.classList.remove("cross");
// 		viewState = "timer";
// 	} else {
// 		if (viewState !== "timer") return;
// 		menu.style.display = "flex";
// 		menu.scroll({ top: 0 });
// 		lastanim = menu.animate(animations.in, animations.animoptions);
// 		lastanim.onfinish = () => (mainel.style.display = "none");
// 		menubtn.classList.add("cross");
// 		menubtn.title = "Close Settings";
// 		viewState = "menu";
// 	}
// });

// document.getElementById("managetaskbtn").addEventListener("click", function () {
// 	if (lastanim) lastanim.cancel();
// 	if (viewState !== "timer") return;
// 	manageTasks.style.display = "flex";
// 	manageTasks.scroll({ top: 0 });
// 	lastanim = manageTasks.animate(animations.in, animations.animoptions);
// 	lastanim.onfinish = () => (mainel.style.display = "none");
// 	viewState = "tasks";
// });

// document.getElementById("closetasks").addEventListener("click", function () {
// 	if (lastanim) lastanim.cancel();
// 	if (viewState === "tasks") {
// 		mainel.style.display = "flex";
// 		lastanim = manageTasks.animate(animations.out, animations.animoptions);
// 		lastanim.onfinish = () => {
// 			manageTasks.style.display = "none";
// 		};
// 		viewState = "timer";
// 	}
// });

// document.getElementById("statbtn").addEventListener("click", function () {
// 	if (lastanim) lastanim.cancel();
// 	if (viewState !== "timer") return;
// 	statisticsDiv.style.display = "flex";
// 	statisticsDiv.scroll({ top: 0 });
// 	lastanim = statisticsDiv.animate(animations.in, animations.animoptions);
// 	lastanim.onfinish = () => (mainel.style.display = "none");
// 	viewState = "statistics";
// 	loadStatistics();
// });

//#endregion

//#region Statistics

// let tasks = ["Default Task"];

// let selectedTask = "Default Task";

// let taskContainer = document.getElementById("task-container");
// let filterContainer = document.getElementById("filters");
// let filteredTasks = new Set();
// let db;

// let statTimeSelect = document.getElementById("stat-time-select");

// async function getRecords(time) {
// 	let result = [];
// 	return new Promise((resolve) => {
// 		if (filteredTasks.size === 0) {
// 			resolve(result);
// 		} else if (filteredTasks.size === tasks.length) {
// 			let tr = db.transaction("records", "readonly").objectStore("records").index("task").getAll();
// 			tr.onsuccess = () => resolve(tr.result);
// 		} else {
// 			let filteredArray = Array.from(filteredTasks);
// 			filteredArray.forEach((task, i) => {
// 				let tr = db
// 					.transaction("records", "readonly")
// 					.objectStore("records")
// 					.index("task")
// 					.getAll(IDBKeyRange.only(task));
// 				tr.onsuccess = (ev) => {
// 					result.push(...tr.result);

// 					if (i === filteredArray.length - 1) {
// 						resolve(result);
// 					}
// 				};
// 			});
// 		}
// 	});
// }

// function saveRecord(r) {
// 	let tr = db.transaction("records", "readwrite").objectStore("records").add(r);
// 	tr.onsuccess = () => console.log("Added new record!");
// }

// function deleteRecords(task) {
// 	db
// 		.transaction("records", "readwrite")
// 		.objectStore("records")
// 		.index("task")
// 		.openCursor(IDBKeyRange.only(task)).onsuccess = (ev) => {
// 		let cursor = ev.target.result;
// 		if (cursor) {
// 			cursor.delete();
// 			cursor.continue();
// 		}
// 	};
// }

// function deleteRecord(d) {
// 	db.transaction("records", "readwrite").objectStore("records").delete(d);
// }

// function saveTasks() {
// 	localStorage.setItem("pomo-tasks", JSON.stringify(tasks));
// }

// function focusEnd(t) {
// 	let minutes = Math.round(t / 60);
// 	if (minutes <= 0) return;
// 	if (tasks.includes(selectedTask)) {
// 		saveRecord({
// 			t: minutes,
// 			d: Date.now(),
// 			n: selectedTask,
// 		});
// 	}
// }

// document.getElementById("create-backup").addEventListener("click", () => {
// 	let tr = db.transaction("records", "readonly").objectStore("records").index("task").getAll();
// 	tr.onsuccess = () => {
// 		let res = tr.result;
// 		let blob = new Blob([JSON.stringify(res)], { type: "application/json" });
// 		let url = URL.createObjectURL(blob);
// 		let link = document.createElement("a");
// 		link.href = url;
// 		link.download = "tomodorobackup.json";
// 		link.click();
// 		setTimeout(() => URL.revokeObjectURL(url), 1000);
// 	};
// });

// let allCheckbox = document.getElementById("all");
// let pieCardContainer = document.getElementById("pie-card-container");
// let timeSpentChart = document.getElementById("timespent");
// let timeSixHourlyChart = document.getElementById("timesixhourly");
// let timeDailyChart = document.getElementById("timedaily");
// let timeMonthlyChart = document.getElementById("timemonthly");
// let timeYearlyChart = document.getElementById("timeyearly");
// statTimeSelect.addEventListener("change", () => {
// 	localStorage.setItem("pomo-stat-period", statTimeSelect.value);
// 	loadStatistics();
// });

// let taskBars = {};
// let pieCards = {};

// let format = new Intl.DateTimeFormat(undefined, {
// 	dateStyle: "full",
// 	timeStyle: "short",
// });

// function pieCardGenerator(task) {
// 	let el = document.createElement("div");
// 	el.className = "pie-card";
// 	let pieName = document.createElement("div");
// 	pieName.className = "pie-card-name";
// 	pieName.innerText = task;
// 	el.appendChild(pieName);
// 	let timeHolder = document.createElement("div");
// 	let text = document.createElement("span");
// 	text.innerText = "Time Spent: ";
// 	let timeSpan = document.createElement("span");
// 	timeSpan.className = "pie-card-time";
// 	let ee = document.createElement("div");
// 	ee.className = "pie-card-time-div";
// 	let totaltime = document.createElement("span");
// 	totaltime.className = "pie-card-time-text";
// 	ee.append(document.createTextNode("("), totaltime, document.createTextNode(")"));
// 	let roundno = document.createElement("div");
// 	roundno.className = "pie-card-rounds";
// 	let roundnospan = document.createElement("span");
// 	roundnospan.className = "pie-card-rounds-span";
// 	roundno.append(document.createTextNode("Number of Rounds: "), roundnospan);
// 	timeHolder.append(text, timeSpan, ee, roundno);
// 	el.appendChild(timeHolder);
// 	return el;
// }

// function barGenerator(task) {
// 	let taskBarContainer = document.createElement("div");
// 	taskBarContainer.className = "task-bar-container";
// 	let legend = document.createElement("div");
// 	legend.className = "legend";
// 	legend.innerText = task;
// 	let barContainer = document.createElement("div");
// 	barContainer.className = "bar-container";
// 	let bar = document.createElement("div");
// 	bar.className = "bar";
// 	barContainer.appendChild(bar);
// 	let tooltip = document.createElement("div");
// 	tooltip.className = "tooltip";
// 	tooltip.innerText = task;
// 	let valueEl = document.createElement("div");
// 	valueEl.className = "stat-value";
// 	bar.append(tooltip, valueEl);
// 	taskBarContainer.append(legend, barContainer);
// 	taskBarContainer.dataset.task = task;
// 	return taskBarContainer;
// }

// function roundEntryGen(entry) {
// 	let roundEntry = document.createElement("div");
// 	roundEntry.className = "round-entry";
// 	let roundEntryName = document.createElement("div");
// 	roundEntryName.className = "round-entry-name";
// 	roundEntryName.innerText = entry.n;
// 	let roundEntryDuration = document.createElement("round-entry-duration");
// 	roundEntryDuration.className = "round-entry-duration";
// 	roundEntryDuration.innerText = hmstrFull(entry.t);
// 	let roundEntryTime = document.createElement("div");
// 	roundEntryTime.className = "round-entry-time";
// 	roundEntryTime.innerText = format.format(entry.d);
// 	let entryDelete = document.createElement("button");
// 	entryDelete.className = "entry-delete";
// 	entryDelete.innerText = "Delete";
// 	entryDelete.addEventListener("click", () => {
// 		let p = confirm("Are you sure you want to delete this record? This cannot be undone.");
// 		if (!p) return;
// 		deleteRecord(entry.d);
// 		roundEntry.remove();
// 		loadStatistics(false);
// 	});
// 	roundEntry.append(roundEntryName, roundEntryDuration, roundEntryTime, entryDelete);
// 	return roundEntry;
// }

// let hourlyNames = ["0-6", "6-12", "12-18", "18-24"];

// let hourlyFullNames = ["00:00 - 00:06", "06:00 - 12:00", "12:00 - 18:00", "18:00 - 24:00"];

// let hourlyBars = hourlyNames.map((d) => document.getElementById("hourly-" + d));

// let dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// let dayBars = dayNames.map((d) => document.getElementById("day-" + d));

// let monthNames = [
// 	"january",
// 	"february",
// 	"march",
// 	"april",
// 	"may",
// 	"june",
// 	"july",
// 	"august",
// 	"september",
// 	"october",
// 	"november",
// 	"december",
// ];

// let monthBars = monthNames.map((d) => document.getElementById("month-" + d));

// let pieSVG = document.querySelector("#pie svg");
// let statSummaryTotal = document.getElementById("stat-summary-total");
// let statSummaryRounds = document.getElementById("stat-summary-rounds");
// let statSummaryAverage = document.getElementById("stat-summary-average");
// let statSummaryShortest = document.getElementById("stat-summary-shortest");
// let statSummaryLongest = document.getElementById("stat-summary-longest");

// let remarkHourly = document.getElementById("remark-hourly");
// let remarkMonthly = document.getElementById("remark-monthly");
// let remarkDaily = document.getElementById("remark-daily");
// let roundEntries = document.getElementById("round-entries");

// async function loadStatistics(updateEntryCards = true) {
// 	// let timeValue = statTimeSelect.value;
// 	let rec = await getRecords();
// 	if (!(timeValue === "all")) {
// 		if (parseInt(timeValue) === 0) {  // Today
// 			// Get the current date without the time component
// 			const currentDate = new Date();
// 			currentDate.setHours(0, 0, 0, 0);

// 			// Calculate the start and end timestamps for the current day
// 			const startOfDay = currentDate.getTime();
// 			const endOfDay = startOfDay + 24 * 60 * 60 * 1000;

// 			rec = rec.filter((r) => {
// 				// Check if the task is within the current day
// 				return r.d >= startOfDay && r.d < endOfDay && filteredTasks.has(r.n);
// 			});
// 		} else {
// 			let tt = Date.now() - parseInt(timeValue) * 24 * 60 * 60 * 1000;
// 			rec = rec.filter((r) => r.d >= tt && filteredTasks.has(r.n));
// 		}
// 	}
// 	let charts = [];
// 	let maxvalue = 0;
// 	let minRoundValue = 0;
// 	let maxRoundValue = 0;
// 	let totalValue = 0;
// 	let hourlyTimes = new Array(4).fill(0);
// 	let dayTimes = new Array(7).fill(0);
// 	let monthTimes = new Array(12).fill(0);
// 	for (let task of filteredTasks) {
// 		let chart = {
// 			t: 0,
// 			task: task,
// 			n: 0,
// 		};
// 		rec.filter((r) => r.n === task).forEach((r) => {
// 			chart.t += r.t;
// 			totalValue += r.t;
// 			let d = new Date(r.d);
// 			hourlyTimes[Math.floor(d.getHours() / 6)] += r.t;
// 			dayTimes[d.getDay()] += r.t;
// 			monthTimes[d.getMonth()] += r.t;
// 			chart.n++;
// 			if (minRoundValue === 0) {
// 				minRoundValue = r.t;
// 			} else {
// 				minRoundValue = minRoundValue > r.t ? r.t : minRoundValue;
// 			}
// 			maxRoundValue = maxRoundValue < r.t ? r.t : maxRoundValue;
// 		});
// 		maxvalue = maxvalue < chart.t ? chart.t : maxvalue;

// 		charts.push(chart);
// 	}
// 	// statSummaryTotal.innerText = hmstrFull(totalValue);
// 	statSummaryRounds.innerText = rec.length;
// 	// statSummaryAverage.innerText = hmstrFull(totalValue / (rec.length === 0 ? 1 : rec.length));
// 	// statSummaryShortest.innerText = hmstrFull(minRoundValue);
// 	// statSummaryLongest.innerText = hmstrFull(maxRoundValue);

// 	if (totalValue === 0) {
// 		remarkDaily.style.display = remarkHourly.style.display = remarkMonthly.style.display = "none";
// 	} else {
// 		remarkDaily.style.display = remarkHourly.style.display = remarkMonthly.style.display = "block";
// 		let maxH = 1;
// 		let maxHV = 0;
// 		hourlyTimes.forEach((v, i) => {
// 			if (v > maxHV) {
// 				maxHV = v;
// 				maxH = i;
// 			}
// 		});
// 		remarkHourly.querySelector(".remark-value").innerText = hourlyFullNames[maxH];

// 		let maxD = 1;
// 		let maxDV = 0;
// 		dayTimes.forEach((v, i) => {
// 			if (v > maxDV) {
// 				maxDV = v;
// 				maxD = i;
// 			}
// 		});
// 		remarkDaily.querySelector(".remark-value").innerText = dayNames[maxD] + "s";

// 		let maxM = 1;
// 		let maxMV = 0;
// 		monthTimes.forEach((v, i) => {
// 			if (v > maxMV) {
// 				maxMV = v;
// 				maxM = i;
// 			}
// 		});
// 		remarkMonthly.querySelector(".remark-value").innerText = monthNames[maxM];
// 	}

// 	pieSVG.innerHTML = "";
// 	let sumOfPrev = 0;
// 	charts
// 		.sort((a, b) => b.t - a.t)
// 		.forEach((chart, i) => {
// 			taskBars[chart.task].querySelector(".stat-value").innerText = hmstr(chart.t);
// 			taskBars[chart.task].querySelector(".bar").style.width = (chart.t / maxvalue) * 100 + "%";
// 			taskBars[chart.task].style.order = i + 1;
// 			pieCards[chart.task].style.order = i + 1;
// 			pieCards[chart.task].querySelector(".pie-card-time").innerText = `${(
// 				(chart.t / (totalValue === 0 ? 1 : totalValue)) *
// 				100
// 			).toFixed(2)}%`;
// 			// pieCards[chart.task].querySelector(".pie-card-time-text").innerText = hmstrFull(chart.t);
// 			pieCards[chart.task].querySelector(".pie-card-rounds-span").innerText = chart.n;

// 			let pie = document.createElementNS("http://www.w3.org/2000/svg", "path");
// 			let a = (sumOfPrev / totalValue) * Math.PI * 2;

// 			let p1 = [60 + Math.sin(a) * 50, 60 - Math.cos(a) * 50];
// 			let b = ((sumOfPrev + chart.t) / totalValue) * Math.PI * 2;

// 			let p2 = [60 + Math.sin(b) * 50, 60 - Math.cos(b) * 50];

// 			let normal = (a + b) / 2;
// 			if (totalValue === chart.t) {
// 				pie.setAttribute("d", `M60,10 A50 50 0 1 1 60 110 A50 50 0 1 1 60 10 z`);
// 				pie.dataset.circle = true;
// 			} else {
// 				pie.setAttribute(
// 					"d",
// 					`M60,60 L${p1.join(",")} A50 50 0 ${b - a > Math.PI ? 1 : 0} 1 ${p2.join(" ")} L60,60 z`
// 				);
// 			}
// 			let title = document.createElementNS("http://www.w3.org/2000/svg", "title");
// 			title.innerHTML = `${chart.task} ${((chart.t / (totalValue === 0 ? 1 : totalValue)) * 100).toFixed(2)}%`;
// 			pie.appendChild(title);
// 			pie.dataset.normal = normal;
// 			pie.dataset.task = chart.task;
// 			pie.addEventListener("pointerenter", pathPointerEnter);
// 			pie.addEventListener("pointerleave", pathPointerLeave);
// 			pieSVG.appendChild(pie);
// 			sumOfPrev += chart.t;
// 		});

// 	let hourlyMax = 1;
// 	hourlyTimes.forEach((t) => (hourlyMax = hourlyMax < t ? t : hourlyMax));
// 	hourlyTimes.forEach((t, i) => {
// 		hourlyBars[i].querySelector(".stat-value").innerText = hmstr(t);
// 		hourlyBars[i].style.width = (t / hourlyMax) * 100 + "%";
// 	});

// 	let dayMax = 1;
// 	dayTimes.forEach((t) => (dayMax = dayMax < t ? t : dayMax));
// 	dayTimes.forEach((t, i) => {
// 		dayBars[i].querySelector(".stat-value").innerText = hmstr(t);
// 		dayBars[i].style.width = (t / dayMax) * 100 + "%";
// 	});

// 	let monthMax = 1;
// 	monthTimes.forEach((t) => (monthMax = monthMax < t ? t : monthMax));
// 	monthTimes.forEach((t, i) => {
// 		monthBars[i].querySelector(".stat-value").innerText = hmstr(t);
// 		monthBars[i].style.width = (t / monthMax) * 100 + "%";
// 	});

// 	if (updateEntryCards) {
// 		roundEntries.innerHTML = "";
// 		rec.sort((a, b) => b.d - a.d).forEach((e) => {
// 			roundEntries.appendChild(roundEntryGen(e));
// 		});
// 	}
// }

// function pathPointerEnter(ev) {
// 	let el = pieCards[ev.target.dataset.task];
// 	if (!ev.target.dataset.circle) {
// 		let a = parseFloat(ev.target.dataset.normal);
// 		ev.target.style.transform = `translate(${Math.sin(a) * 5}px, ${-Math.cos(a) * 5}px)`;
// 	}
// 	pieCardContainer.scrollTo({
// 		left: el.offsetLeft,
// 		top: el.offsetTop,
// 		behavior: "smooth",
// 	});
// 	el.classList.add("pie-card-active");
// }

// function pathPointerLeave(ev) {
// 	let el = pieCards[ev.target.dataset.task];
// 	ev.target.style.transform = `translate(0px, 0px)`;
// 	el.classList.remove("pie-card-active");
// }

// function hmstr(t) {
// 	let h = Math.floor(t / 60);
// 	let m = t - h * 60;
// 	return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
// }

// function hmstrFull(t) {
// 	let r = hmstr(t)
// 		.split(":")
// 		.map((i) => parseInt(i));
// 	if (r[0] === 0) return r[1] + " Minutes";
// 	if (r[1] === 0) return r[0] + " Hour" + (r[0] === 1 ? "" : "s");
// 	return `${r[0]} Hour${r[0] > 1 ? "s" : ""} & ${r[1]} Minute${r[1] > 1 ? "s" : ""}`;
// }

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

function nextRound() {
	let finished = fullname[roundInfo.current];
	let body = "Begin ";
	if (roundInfo.current === "focus") {
		if (audioType === "noise") {
			fadeOut();
		}
		focusEnd(roundInfo.t);
		finished += " Round";
		if (roundInfo.focusNum >= config.longGap) {
			roundInfo.current = "long";
			roundInfo.focusNum = 0;
		} else {
			roundInfo.current = "short";
		}
		body += "a " + Math.floor(config[roundInfo.current] / 60) + " minute " + fullname[roundInfo.current];
	} else {
		roundInfo.current = "focus";
		roundInfo.focusNum++;
		roundnoDiv.innerText = roundInfo.focusNum + "/" + config.longGap;
		body += "focusing for " + Math.floor(config.focus / 60) + " minutes";
	}

	timer.className = "t-" + roundInfo.current;
	roundInfo.t = 0;
	if (roundInfo.running) {
		if (roundInfo.current === "focus" && audioType === "noise") {
			fadeIn();
		}
	}
	// notify(`${finished} Complete`, body);
}

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
	if (seconds < 0) {
		nextRound();
		return;
	}
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
	ctx.arc(200, 200, 180, -Math.PI / 2, (1 - roundInfo.t / config[roundInfo.current]) * Math.PI * 2 - Math.PI / 2);
	ctx.stroke();
}

if ('documentPictureInPicture' in window) {
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
				const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
				const style = document.createElement('style');

				style.textContent = cssRules;
				pipWindow.document.head.appendChild(style);
			} catch (e) {
				const link = document.createElement('link');

				link.rel = 'stylesheet';
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