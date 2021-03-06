var gravity = 1;

var player;
var jumping = false;
var holdingAxe = false;
var pushingStone = false;

var psstSoundPlayed = false;

var platformWidth = 541;

// Sounds
var forestSounds, collectSound, removePlatformSound, psstSound, woodChopSound, levelCompleteSound;

// Groups
var platforms, items, interactables;

// Things
var foregroundFiller;
var item2, bush3, stone, axe, ladder, tree, treeCut, note;
var tip1, tip2, tip3, tip4;

// Images
var platform1Img, platform2Img, platform3Img, platform4Img, platform5Img, platform6Img, platform7Img, platform8Img, platform9Img, platform10Img, platform11Img, platform12Img, platform13Img, platform14Img, platform15Img, platform16Img, platform17Img, platform18Img, platform19Img, platform20Img, platform21Img, platform22Img, platform23Img, platform24Img, platform25Img, platform26Img, platform27Img, platform28Img, platform29Img, platform30Img, platform31Img;

var forestBackgroundImg, caveBackgroundImg, foregroundImg, foregroundFillerImg;
var lightImg, stoneImg, axeImg, ladderImg, treeImg, treeCutImg, noteImg, signImg;
var tip1Img, tip2Img, tip3Img, tip4Img;
var jumpImg, jumpAxeImg, preClimbImg;

// Animations
var animateBush1, animateBush2;
var animateIdle, animateWalk, animatePush, animateClimb, animateIdleAxe, animateWalkAxe, animateChop;

// Score
var score = 0;
var totalScore = document.querySelector('#score');
var scoreCount = document.querySelector('#player-score');

// End screen
var endScreen = document.querySelector('#end-screen');

function preload() {

	// Preload sounds
	soundFormats('mp3', 'ogg');
	forestSounds = loadSound("assets/audio/forest.mp3");
	collectSound = loadSound("assets/audio/collect_1.mp3");
	removePlatformSound = loadSound("assets/audio/sound_earthquake.mp3");
	psstSound = loadSound("assets/audio/pssst.mp3");
	woodChopSound = loadSound("assets/audio/treehack.mp3");
	levelCompleteSound = loadSound("assets/audio/collect_2.ogg");

	forestSounds.setVolume(0.03);
	collectSound.setVolume(0.4);
	levelCompleteSound.setVolume(0.4);
	psstSound.setVolume(0.5);

	// Preload images
	platform1Img = loadImage("assets/map/1.png");
	platform2Img = loadImage("assets/map/2.png");
	platform3Img = loadImage("assets/map/3.png");
	platform4Img = loadImage("assets/map/4.png");
	platform5Img = loadImage("assets/map/5.png");
	platform6Img = loadImage("assets/map/6.png");
	platform7Img = loadImage("assets/map/7.png");
	platform8Img = loadImage("assets/map/8.png");
	platform9Img = loadImage("assets/map/9.png");
	platform10Img = loadImage("assets/map/10.png");
	platform11Img = loadImage("assets/map/11.png");
	platform12Img = loadImage("assets/map/12.png");
	platform13Img = loadImage("assets/map/13.png");
	platform14Img = loadImage("assets/map/14.png");
	platform15Img = loadImage("assets/map/15.png");
	platform16Img = loadImage("assets/map/16.png");
	platform17Img = loadImage("assets/map/17.png");
	platform18Img = loadImage("assets/map/18.png");
	platform19Img = loadImage("assets/map/19.png");
	platform20Img = loadImage("assets/map/20.png");
	platform21Img = loadImage("assets/map/21.png");
	platform22Img = loadImage("assets/map/22.png");
	platform23Img = loadImage("assets/map/23.png");
	platform24Img = loadImage("assets/map/24.png");
	platform25Img = loadImage("assets/map/25.png");
	platform26Img = loadImage("assets/map/26.png");
	platform27Img = loadImage("assets/map/holefiller.png");

	forestBackgroundImg = loadImage("assets/background_forest.jpg");
	caveBackgroundImg = loadImage("assets/Background_Underground.jpg");
	foregroundImg = loadImage("assets/foreground.png");
	foregroundFillerImg = loadImage("assets/holefiller_overlays.png");

	lightImg = loadImage("assets/LightemOne.png");
	stoneImg = loadImage("assets/item_stone.png");
	axeImg = loadImage("assets/axe_ground.png");
	ladderImg = loadImage("assets/ladder.png");
	treeImg = loadImage("assets/Trees/tree_black.png")
	treeCutImg = loadImage("assets/Trees/tree_black_cut.png");
	noteImg = loadImage("assets/item_note.png");
	signImg = loadImage("assets/map_sign.png");
    
	bush3Img = loadImage("assets/busheskt/Bush_3.png");

	// Tips
	tip1Img = loadImage("assets/controls/tip_1.png");
	tip2Img = loadImage("assets/controls/tip_2.png");
	tip3Img = loadImage("assets/controls/tip_3.png");
	tip4Img = loadImage("assets/controls/tip_4.png");
    
    jumpImg = loadImage("assets/Animations/Jump/jump0001.png");
	jumpAxeImg = loadImage("assets/Animations/Jump_axe/jumpaxe0002.png");
	preClimbImg = loadImage("assets/Animations/Pre-climb/preclimb0001.png");

	// Preload animations
    animateBush1 = loadAnimation("assets/busheskt/Bush_1/bush1.png", "assets/busheskt/Bush_1/bush1_eyes.png");
    animateBush2 = loadAnimation("assets/busheskt/Bush_2/bush2_eyes.png", "assets/busheskt/Bush_2/bush2.png");
        
	animateIdle = loadAnimation("assets/Animations/Idle/idle0001.png", "assets/Animations/Idle/idle0002.png");
	animateWalk = loadAnimation("assets/Animations/Walk/walk0001.png", "assets/Animations/Walk/walk0002.png");
	animatePush = loadAnimation("assets/Animations/Walk_push/walkpush0001.png", "assets/Animations/Walk_push/walkpush0002.png");
	animateClimb = loadAnimation("assets/Animations/Climb/climb0001.png", "assets/Animations/Climb/climb0004.png");
	animateIdleAxe = loadAnimation("assets/Animations/Idle_axe/idleaxe0001.png", "assets/Animations/Idle_axe/idleaxe0002.png");
	animateWalkAxe = loadAnimation("assets/Animations/Walk_axe/walkaxe0001.png", "assets/Animations/Walk_axe/walkaxe0002.png");
    animateChop = loadAnimation("assets/Animations/Chop/chop0001.png", "assets/Animations/Chop/chop0002.png");

    animateBush1.frameDelay = 110;
    animateBush2.frameDelay = 70;
    
	animateIdle.frameDelay = 55;
	animateWalk.frameDelay = 10;
	animatePush.frameDelay = 10;
	animateClimb.frameDelay = 10;
	animateIdleAxe.frameDelay = 55;
    animateChop.frameDelay = 14;
}

function setup() {
	createCanvas(innerWidth, innerHeight);

	// Background music
	forestSounds.play();
	forestSounds.loop();

	// Create groups
	platforms = new Group();
	items = new Group();
	interactables = new Group();

	// Add backgrounds
	var forestBackground = createSprite(2575, -800);
	forestBackground.addImage(forestBackgroundImg);

	var caveBackground = createSprite(2475, 620);
	caveBackground.addImage(caveBackgroundImg);

	// Add platforms
	var platform1 = createSprite(1, 0);
	platform1.addImage(platform1Img);
	platforms.add(platform1);

	var platform2 = createSprite(platformWidth, 56);
	platform2.addImage(platform2Img);
	platforms.add(platform2);

	var platform3 = createSprite(platformWidth * 2, 83);
	platform3.addImage(platform3Img);
	platforms.add(platform3);

	var platform4 = createSprite(platformWidth * 3, 63);
	platform4.addImage(platform4Img);
	platforms.add(platform4);

	var platform5 = createSprite(platformWidth * 4, 55);
	platform5.addImage(platform5Img);
	platforms.add(platform5);

	var platform6 = createSprite(platformWidth * 5, 55);
	platform6.addImage(platform6Img);
	platforms.add(platform6);

	var platform7 = createSprite(platformWidth * 6 - 46, 66);
	platform7.addImage(platform7Img);
	platforms.add(platform7);

	var platform8 = createSprite(platformWidth * 7 + 51, 83);
	platform8.addImage(platform8Img);
	platforms.add(platform8);

	var platform9 = createSprite(platformWidth * 8, 87);
	platform9.addImage(platform9Img);
	platforms.add(platform9);

	var platform10 = createSprite(platformWidth * 9, 87);
	platform10.addImage(platform10Img);
	platforms.add(platform10);

	var platform11 = createSprite(0, 537);
	platform11.addImage(platform11Img);
	platforms.add(platform11);

	var platform12 = createSprite(platformWidth - 67, 537);
	platform12.addImage(platform12Img);
	platforms.add(platform12);

	var platform13 = createSprite(platformWidth * 6 + 2, 536);
	platform13.addImage(platform13Img);
	platforms.add(platform13);

	var platform14 = createSprite(platformWidth * 7, 534);
	platform14.addImage(platform14Img);
	platforms.add(platform14);

	var platform15 = createSprite(platformWidth * 8, 535);
	platform15.addImage(platform15Img);
	platforms.add(platform15);

	var platform16 = createSprite(platformWidth * 9, 535);
	platform16.addImage(platform16Img);
	platforms.add(platform16);

	var platform17 = createSprite(0, 1078);
	platform17.addImage(platform17Img);
	platforms.add(platform17);

	var platform18 = createSprite(platformWidth, 1078);
	platform18.addImage(platform18Img);
	platforms.add(platform18);

	var platform19 = createSprite(platformWidth * 2, 1128);
	platform19.addImage(platform19Img);
	platforms.add(platform19);

	var platform20 = createSprite(platformWidth * 3, 1206);
	platform20.addImage(platform20Img);
	platforms.add(platform20);

	var platform21 = createSprite(platformWidth * 4, 1215);
	platform21.addImage(platform21Img);
	platforms.add(platform21);

	var platform22 = createSprite(platformWidth * 5, 1213);
	platform22.addImage(platform22Img);
	platforms.add(platform22);

	var platform23 = createSprite(platformWidth * 6, 1077);
	platform23.addImage(platform23Img);
	platforms.add(platform23);

	var platform24 = createSprite(platformWidth * 7, 1076);
	platform24.addImage(platform24Img);
	platforms.add(platform24);

	var platform25 = createSprite(platformWidth * 8, 1076);
	platform25.addImage(platform25Img);
	platforms.add(platform25);

	var platform26 = createSprite(platformWidth * 9, 1076);
	platform26.addImage(platform26Img);
	platforms.add(platform26);

	var platform27 = createSprite(platformWidth * 6 + 200, 85);
	platform27.addImage(platform27Img);
	platforms.add(platform27);

	// Add bushes
	bush1 = createSprite(1550, -200);
    bush1.addAnimation("bush1", animateBush1);
    
	bush3 = createSprite(2500, -250);
	bush3.addImage(bush3Img);
	interactables.add(bush3);

	// Screen tips
	tip1 = createSprite(700, -250);
	tip1.addImage(tip1Img);

	tip2 = createSprite(1250, -240);
	tip2.addImage(tip2Img);

	tip3 = createSprite(3000, -250);
	tip3.addImage(tip3Img);
    
    tip4 = createSprite(3525, 925);
    tip4.addImage(tip4Img);

	ladder = createSprite(platformWidth * 8 - 75, 400);
	ladder.addImage(ladderImg);

	stone = createSprite(2000, 400);
	stone.addImage(stoneImg);

	tree = createSprite(3924, -450);
	tree.addImage(treeImg);
	interactables.add(tree);

	treeCut = createSprite(3924, -127);
	treeCut.addImage(treeCutImg);

	var sign = createSprite(4900, -170);
	sign.addImage(signImg);

	// Create player
	player = createSprite(50, 0);

	// Player images and animations
	player.addImage("jump", jumpImg);
	player.addImage("jumpAxe", jumpAxeImg);
	player.addImage("preClimb", preClimbImg);

	player.addAnimation("idle", animateIdle);
	player.addAnimation("walk", animateWalk);
	player.addAnimation("push", animatePush);
	player.addAnimation("climb", animateClimb);
	player.addAnimation("idleAxe", animateIdleAxe);
	player.addAnimation("walkAxe", animateWalkAxe);
    player.addAnimation("chop", animateChop);

	axe = createSprite(2800, 1031);
	axe.addImage(axeImg);
	interactables.add(axe);

	// Add foreground
	var foreground = createSprite(2435, 545);
	foreground.addImage(foregroundImg);

	foregroundFiller = createSprite(platformWidth * 6 + 247, 100);
	foregroundFiller.addImage(foregroundFillerImg);

	bush2 = createSprite(1750, -175);
    bush2.addAnimation("bush2", animateBush2);

	var item1 = createSprite(1000, 700);
	item1.addImage(lightImg);
	items.add(item1);

	item2 = createSprite(3000, -250);
	item2.addImage(lightImg);
	item2.visible = false;

	note = createSprite(4110, 795);
	note.addImage(noteImg);
	items.add(note);
}

function draw() {
	background("#000000");
	
	// Set camera position
	camera.position.y = player.position.y - 180;
	camera.zoom = .8;

	// Limit camera movements
	if (player.position.x <= 931) {
		camera.position.x = 931;
	} else if (player.position.x >= 3950) {
		camera.position.x = 3950;
	} else {
		camera.position.x = player.position.x;
	}

	if (player.position.x >= 3075 && player.position.x <= 4000 && player.position.y <= 150 && !foregroundFiller.removed) {
		camera.position.x = 3075;
	}

	// Limit player movements
	if (player.position.x < player.width / 2 - 252) player.position.x = player.width / 2 - 252;
	if (player.position.x >= 5100) player.position.x = 5100;

	if (player.position.x >= 2700) {
		tip1.remove();
		tip2.remove();
	}

	// Show end screen if level is complete and player is at the end of the level
	if (player.position.x >= 5000 && score == 2) {
		endScreen.classList.add('end');
        noLoop();
	}

	if (!holdingAxe) {
        player.changeAnimation("idle");
	} else if (woodChopSound.isPlaying()) {
        player.changeAnimation("chop");
    } else {
        player.changeAnimation("idleAxe");
	}

	if (jumping) {
		if (holdingAxe) {
			player.changeImage("jumpAxe");
		} else {
			player.changeImage("jump");
		}
	}

	// Interact when player overlaps interactable and presses x
	player.overlap(interactables, interact);


	// Handle collisions between player, stone and platforms
	player.overlap(platforms, checkOverlap);
	stone.overlap(platforms, checkOverlap);

	if (player.displace(stone)) {
		pushingStone = true;
	} else {
		pushingStone = false;
	}

	// Make player collide with tree if it's not removed
	if (!tree.removed) {
		player.overlap(tree, function () {
			// Check if player's right side collides with tree
			if (tree.overlapPixel(player.position.x + (player.width / 2) + 10, player.position.y)) {
				player.position.x -= 1;
			}

			while (tree.overlapPixel(player.position.x + (player.width / 2) + 10, player.position.y)) {
				player.position.x -= 1;
			}

			// Check if player's left side collides with tree
			if (tree.overlapPixel(player.position.x - (player.width / 2) - 10, player.position.y)) {
				player.position.x += 1;
			}

			while (tree.overlapPixel(player.position.x - (player.width / 2) - 10, player.position.y)) {
				player.position.x += 1;
			}
		});
	}

	// Play psst-sound when player overlaps the interactable bush
	if (player.overlap(bush3) && !foregroundFiller.removed) {
		if (!psstSoundPlayed) {
			psstSound.play();
			psstSoundPlayed = true;
		}
	} else {
		psstSoundPlayed = false;
	}

	player.velocity.y += gravity;
	stone.velocity.y += gravity;

	// Enable jumping on stone
	if (stone.overlapPixel(player.position.x, player.position.y + player.height / 2 + 3)) {
		pushingStone = false;
		jumping = false;
		player.velocity.y = 0;
	}

	// Remove item on overlap
	player.overlap(items, getItem);

	// When player overlaps ladder, climb up with arrow up and down with arrow down
	player.overlap(ladder, climb);


	/* CONTROLS */

	// Move player with arrow keys
	if (keyIsDown(RIGHT_ARROW)) {
		player.position.x += 8;
		player.mirrorX(1);

		if (holdingAxe) {
			player.changeAnimation("walkAxe");

			if (jumping) {
				player.changeImage("jumpAxe");
			}
		} else if (pushingStone) {
			player.changeAnimation("push");
		} else {
			player.changeAnimation("walk");

			if (jumping) {
				player.changeImage("jump");
			}
		}
	}

	if (keyIsDown(LEFT_ARROW)) {
		player.position.x -= 8;
		player.mirrorX(-1);

		if (holdingAxe) {
			player.changeAnimation("walkAxe");

			if (jumping) {
				player.changeImage("jumpAxe");
			}
		} else if (pushingStone) {
			player.changeAnimation("push");
		} else {
			player.changeAnimation("walk");

			if (jumping) {
				player.changeImage("jump");
			}
		}
	}

	// Jump
	if (keyWentDown(' ')) {
		if (!jumping) {
			jumping = true;
			player.velocity.y -= 15;
		}
	}
    
    // Pause game when bag is opened
    if (keyWentDown('B')) {
        if (tip4.removed == false) {
            tip4.remove();
        }
        
        noLoop();
    }
    
    drawSprites();
}

// Continue game when bag is closed
document.addEventListener("keydown", function () {
    if (event.which == 27) {
        loop();
    }
});

function checkOverlap(sprite, platform) {

	// Check if the sprite is standing on a platform
	if (platform.overlapPixel(sprite.position.x, sprite.position.y + sprite.height / 2)) {
		if (sprite === player) jumping = false;

		sprite.velocity.y = 0;
		sprite.position.y -= 1;

		while (platform.overlapPixel(sprite.position.x, sprite.position.y + sprite.height / 2)) {
			sprite.position.y -= 1;
		}
	}

	// Check if the top of the sprite is hitting a platform
	if (platform.overlapPixel(sprite.position.x, sprite.position.y - sprite.height / 2)) {
		sprite.velocity.y = 0;
		sprite.position.y += 1;

		while (platform.overlapPixel(sprite.position.x, sprite.position.y - sprite.height / 2)) {
			sprite.position.y += 1;
		}
	}

	// Check if the sprite's left side is hitting a platform
	if (platform.overlapPixel(sprite.position.x - (sprite.width / 2) - 20, sprite.position.y - sprite.height / 2)) {
		if (sprite === stone) sprite.displace(player);

		sprite.velocity.y = 0;
		sprite.position.x += 1;

		while (platform.overlapPixel(sprite.position.x - (sprite.width / 2) - 20, sprite.position.y - sprite.height / 2)) {
			sprite.position.x += 1;
		}
	}

	// Check if the sprite's right side is hitting a platform
	if (platform.overlapPixel(sprite.position.x + (sprite.width / 2) + 20, sprite.position.y - sprite.height / 2)) {
		if (sprite === stone) sprite.displace(player);

		sprite.velocity.y = 0;
		sprite.position.x -= 1;

		while (platform.overlapPixel(sprite.position.x + (sprite.width / 2) + 20, sprite.position.y - sprite.height / 2)) {
			sprite.position.x -= 1;
		}
	}
}

function getItem(player, item) {
	item.remove();

	if (!(item === note) && score < 2) {
		collectSound.play();
		score += 1;
		scoreCount.innerHTML = score;
	}

	if (score == 2) {
		levelCompleteSound.play();
		totalScore.classList.add('complete');
	}
}

function interact(player, interactable) {
	if (keyWentDown(88)) {
		if (interactable === bush3 && !foregroundFiller.removed) {
			tip3.remove();
			removePlatformSound.play();
			platforms.get(26).remove();
			foregroundFiller.remove();
		} else if (interactable === axe) {
			interactable.remove();
			holdingAxe = true;
		} else if (interactable === tree && holdingAxe) {
			woodChopSound.play();
			setTimeout(function () {
				interactable.remove();
				holdingAxe = false;

				item2.visible = true;
				items.add(item2);
			}, 2000);
		}
	}
}

function climb(player, climbable) {
	player.velocity.y = 0;
	player.position.y = player.position.y;
	player.changeImage("preClimb");

	if (keyIsDown(UP_ARROW)) {
		player.changeAnimation("climb");
		player.position.y -= 8;
	}

	if (keyIsDown(DOWN_ARROW)) {
		player.changeAnimation("climb");
		player.position.y += 8;
	}
}
