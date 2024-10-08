// reload the page two times before launch
// to allow the webcam to work
let firstTime = localStorage.getItem("firstTime");

if (!firstTime) {
	localStorage.setItem("firstTime", true);
	location.reload();
}

const video = document.getElementById("webcam");

const constraints = {
	video: {
		width: 369,
		height: 591,
	},
};

const videoStream = await navigator.mediaDevices.getUserMedia(constraints);
video.srcObject = videoStream;

function getLandmarks(results) {
	if (results.detections.length > 0) {
		const newPos = results.detections[0].landmarks[4].y * 591;

		const event = new CustomEvent("updatedPosition", {
			detail: { newPos },
		});
		window.dispatchEvent(event);
	}
}

const faceDetection = new FaceDetection({
	locateFile: (file) => {
		return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
	},
});

faceDetection.setOptions({
	model: "short",
	minDetectionConfidence: 0.5,
});
faceDetection.onResults(getLandmarks);

let lastVideoTime = -1;

video.addEventListener("timeupdate", async () => {
	if (lastVideoTime === video.currentTime) {
		return;
	}
	lastVideoTime = video.currentTime;
	await faceDetection.send({ image: video });
});
