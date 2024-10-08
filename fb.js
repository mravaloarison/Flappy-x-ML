import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

const SCREEN_WIDTH = 396;
const SCREEN_HEIGHT = 591;
const BASE_SPEED = 69;
let PIPE_SPEED = 120;
let PLAYER_Y_POS = SCREEN_HEIGHT / 2;
let SCORE = 0;
let GAME_OVER = false;

kaboom({
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
	canvas: document.getElementById("game"),
});

loadSprite("bluebird-downflap", "assets/bluebird-downflap.png");
loadSprite("bluebird-midflap", "assets/bluebird-midflap.png");
loadSprite("bluebird-upflap", "assets/bluebird-upflap.png");
loadSprite("background", "assets/background-day.png");
loadSprite("pipe", "assets/pipe-green.png");
loadSprite("game-over", "assets/gameover.png");
loadSprite("message", "assets/message.png");
loadSprite("restart", "assets/restart.png");
for (let i = 0; i <= 9; i++) {
	loadSprite(`${i}`, `assets/${i}.png`);
}
loadSprite("base", "assets/base.png");

scene("game-start", () => {
	add([sprite("background", { width: width(), height: height() })]);

	window.removeEventListener("updatedPosition", () => {});

	add([
		sprite("message"),
		pos(SCREEN_WIDTH / 2 - 100, SCREEN_HEIGHT / 2 - 100),
		"message",
	]);

	onClick(() => {
		destroyAll("message");
		go("game");
	});
});

scene("game-stop", () => {
	add([sprite("background", { width: width(), height: height() })]);

	window.removeEventListener("updatedPosition", () => {});

	const formatedScore = SCORE.toString().split("");
	for (let i = 0; i < formatedScore.length; i++) {
		add([
			sprite(`${formatedScore[i]}`),
			pos(SCREEN_WIDTH / 2 - 24 / 2 + i * 20, SCREEN_HEIGHT / 2),
			"score",
		]);
	}
	add([
		sprite("game-over"),
		pos(SCREEN_WIDTH / 2 - 192 / 2, SCREEN_HEIGHT / 4),
	]);
	add([
		sprite("restart"),
		pos(SCREEN_WIDTH / 2 - 60, SCREEN_HEIGHT / 2 + 100),
		"restart",
		area(),
	]);
	onClick(() => {
		SCORE = 0;
		go("game");
	});
});

scene("game", () => {
	GAME_OVER = false;

	add([sprite("background", { width: width(), height: height() })]);

	add([sprite("0"), pos(50, 50), "score"]);

	const base1 = add([
		sprite("base", { width: width() }),
		pos(0, SCREEN_HEIGHT - 50),
		area(),
		z(1),
	]);

	const base2 = add([
		sprite("base", { width: width() }),
		pos(width(), SCREEN_HEIGHT - 50),
		area(),
		z(1),
	]);

	function moveBase() {
		if (GAME_OVER) return;

		base1.move(-BASE_SPEED, 0);
		base2.move(-BASE_SPEED, 0);

		if (base1.pos.x + base1.width < 0) {
			base1.pos.x = base2.pos.x + base2.width;
		}

		if (base2.pos.x + base2.width < 0) {
			base2.pos.x = base1.pos.x + base1.width;
		}
	}

	loop(0.01, moveBase);

	const player = add([
		pos(50, PLAYER_Y_POS),
		sprite("bluebird-midflap"),
		area(),
		"player",
	]);

	let targetY = PLAYER_Y_POS;
	let currentY = player.pos.y;

	window.addEventListener("updatedPosition", (event) => {
		targetY = event.detail.newPos;
	});

	function smoothMove() {
		if (GAME_OVER) return;

		if (Math.abs(currentY - targetY) > 0.1) {
			currentY = currentY + (targetY - currentY) * 0.1;
			player.pos.y = currentY;
		}
	}

	loop(0.01, smoothMove);

	const birdFrames = [
		"bluebird-downflap",
		"bluebird-midflap",
		"bluebird-upflap",
	];

	let currentFrame = 0;

	loop(0.1, () => {
		if (GAME_OVER) return;

		player.use(sprite(birdFrames[currentFrame]));
		currentFrame = (currentFrame + 1) % birdFrames.length;
	});

	function spawnPipe() {
		if (GAME_OVER) return;

		const pipeHeight = 320;
		const pipeGap = 81;
		const timeFactor = 2;
		const amplitude = 100;

		let pipeY =
			SCREEN_HEIGHT / 2 +
			Math.sin(time() * timeFactor) * amplitude +
			rand(-50, 0);

		if (pipeY < 192) pipeY = 192;
		else if (pipeY > 360) pipeY = 360;

		add([
			sprite("pipe", { flipY: true }),
			pos(SCREEN_WIDTH, pipeY - pipeGap / 2 - pipeHeight),
			area(),
			"pipe",
			{ passed: false },
			move(LEFT, PIPE_SPEED),
		]);

		add([
			sprite("pipe"),
			pos(SCREEN_WIDTH, pipeY + pipeGap / 2),
			area(),
			"pipe",
			move(LEFT, PIPE_SPEED),
		]);
	}

	loop(2, spawnPipe);

	onCollide("pipe", "player", () => {
		GAME_OVER = true;
		go("game-stop");
	});

	onUpdate("pipe", (pipe) => {
		if (pipe.pos.x < player.pos.x && !pipe.passed && pipe.flipY) {
			SCORE++;
			pipe.passed = true;
			destroyAll("score");

			if (SCORE > 9) {
				const formatedScore = SCORE.toString().split("");
				for (let i = 0; i < formatedScore.length; i++) {
					add([
						sprite(`${formatedScore[i]}`),
						pos(50 + i * 20, 50),
						"score",
					]);
				}
			} else {
				add([sprite(`${SCORE}`), pos(50, 50), "score"]);
			}
		}
	});
});

go("game-start");
