import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

const SCREEN_WIDTH = 396;
const SCREEN_HEIGHT = 609;
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
