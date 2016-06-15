import move from '../modules/moves';
import * as fire from '../modules/fire';
import * as handler from '../modules/handlers';
import * as set from "../modules/gameProperties";
import createEnemies from '../modules/createEnemies';

var spacefield;
var backgroundVelocity;
var player;
var cursors;
var bullets;
var enemyBullets;
var enemies;
var scoreText;
var enemyBullet;
var fireButton;
var numberOfBullets = 3;

class Main extends Phaser.State {

	create() {
		// Set physics for the groups
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		spacefield = this.game.add.tileSprite(0,0,800,600,"starfield");
		backgroundVelocity = 5;
		player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'player');

		scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

		// Set physics for spaceship
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		cursors = this.game.input.keyboard.createCursorKeys();

		// Player bullets
		bullets = this.game.add.group();
		set.bulletsProperties(bullets, 30, 'bullet');

		// Enemy bullets
		enemyBullets = this.game.add.group();
		set.bulletsProperties(enemyBullets, numberOfBullets, 'enemyBullet');

		enemies = this.game.add.group();
		enemies.enableBody = true;
		createEnemies(this.game, enemies, 'enemy');

		fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	}

	update() {

		if(player.alive) {
			move(player, cursors, this.game);
			fire.ship(bullets, player, this.game, fireButton);
			if (enemies.countLiving() > 0) {
				fire.enemy(enemyBullets, enemies, this.game, player);
			}
			else if (enemies.countLiving() == 0) {
				createEnemies(this.game, enemies, 'enemy');
				set.bulletsProperties(enemyBullets, numberOfBullets += 3, 'enemyBullet');
			}

			this.game.physics.arcade.overlap(enemyBullets, player, killPlayer, null, this);
		}


		function killPlayer(player, bullet) {
			//explode player
			//decrease lives, if no lives left - kill player
			player.kill();
		}

		this.game.physics.arcade.overlap(bullets, enemies, handler.collision, null, this);
		scoreText.text = handler.getScore();

		spacefield.tilePosition.y += backgroundVelocity;

	}

}

export default Main;
