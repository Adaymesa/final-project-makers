var score = 0;

export function update(bullet,enemy){
	bullet.kill();
	console.log(enemy)
	enemy.kill();
	scoreUp();
};

export function get(){
	return score;
};

function scoreUp() {
	score += 10;
};

export function reset(){
	score = 0;
}
