var toggle = true;
var intersecting = false;
var attackReceived = false;
var score = 0;
var lives = 3;

export function updateScore(bullet,enemy){
	bullet.kill();
	console.log(enemy)
	enemy.kill();
	scoreUp();
};

export function getScore(){
	return score;
};

function scoreUp() {
	score += 10;
};

export function killPlayer(player, bullet){
	attackReceived = true;
	bullet.kill();
	if (lives < 1){
		player.kill();
	}
};

export function lifeScore(lifeText) {
	if (attackReceived){
		lives -= 1;
		lifeText.text = 'Lives: ' + lives;
		attackReceived = false;
	}
};

export function getLives(){
	return lives;
}

export function reset(){
	lives = 3;
	score = 0;
}

export function toggleSound(game) {
	toggle = !toggle;
	game.sound.mute = toggle;
}
