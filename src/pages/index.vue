<template>
	<Div ID = "App" />
</template>

<style lang = "scss">
	body {
		overflow: hidden;
	}

	#App canvas {
		display: block;
		margin: 0 auto;

		border: 1px solid gray;
	}
</style>

<script>
	import TextureLoader from "../libs/TextureLoader";
	import Girl from "../components/Girl";
	import Block from "../components/Block";


	let textureLoader = new TextureLoader();
	textureLoader.loadProject("/assets/characters/texture.json").then(project => {
		console.log(project);
	}).then(() => {
		/** @type {Girl} */
		let girl = null;
		let boy = null;
		/** @type { Block[] } */
		let blocks = [];
		
		new p5(p => {
			const getCvsSize = () => Math.min(p.windowWidth, p.windowHeight);


			p.preload = () => {
				textureLoader.loadTextures(p);
			};

			p.setup = () => {
				const {
					Girl_Standing, Girl_RunningLeft, Girl_JumpingLeft, Girl_TalkingLeft, Girl_Hurt,
					Boy_Standing, Boy_WalkingLeft, Boy_JumpingLeft, Boy_TalkingLeft, Boy_HurtLeft
				} = textureLoader.textures;

				for (const texture of [
					Girl_Standing, Girl_RunningLeft, Girl_JumpingLeft, Girl_TalkingLeft, Girl_Hurt,
					Boy_Standing, Boy_WalkingLeft, Boy_JumpingLeft, Boy_TalkingLeft, Boy_HurtLeft
				]) for (const image of texture.images) image.width = getCvsSize() / 4, image.height = getCvsSize() / 3;


				textureLoader.textures.Girl_RunningLeft.frameDelay = 10;
				textureLoader.textures.Boy_WalkingLeft.frameDelay = 15;


				p.createCanvas(getCvsSize(), getCvsSize());
				p.frameRate(60);

				window.girl = girl = new Girl(p, textureLoader.textures);

				/*girl = p.createSprite(200, 200);
				girl.addAnimation("Standing", textureLoader.textures.Girl_Standing);
				girl.addAnimation("Running", textureLoader.textures.Girl_RunningLeft);
				girl.addAnimation("Jumping", textureLoader.textures.Girl_JumpingLeft);
				girl.addAnimation("Talking", textureLoader.textures.Girl_TalkingLeft);
				girl.addAnimation("Hurt", textureLoader.textures.Girl_Hurt);*/

				boy = p.createSprite(400, 400);
				boy.addAnimation("Standing", textureLoader.textures.Boy_Standing);
				boy.addAnimation("Running", textureLoader.textures.Boy_WalkingLeft);
				boy.addAnimation("Jumping", textureLoader.textures.Boy_JumpingLeft);
				boy.addAnimation("Talking", textureLoader.textures.Boy_TalkingLeft);
				boy.addAnimation("Hurt", textureLoader.textures.Boy_HurtLeft);

				let memW = getCvsSize() / 8;
				for (let i = 0; i < 10; i++) {
					blocks.push(new Block(p, {
						x: memW * Math.floor(Math.random()*8),
						y: memW * Math.floor(Math.random()*8),
						width: memW, height: memW
					}));
				}
			};

			p.draw = () => {
				p.background(255, 255, 255);

				switch (true) {
					case p.keyIsDown(83): // Key-S
						girl.state = "stand";
						boy.changeAnimation("Standing");
						break;
					case p.keyIsDown(82): // Key-R
						girl.state = "run";
						boy.changeAnimation("Running");
						break;
					case p.keyIsDown(74): // Key-J
						girl.state = "jump";
						boy.changeAnimation("Jumping");
						break;
					case p.keyIsDown(84): // Key-T
						girl.state = "talk";
						boy.changeAnimation("Talking");
						break;
					case p.keyIsDown(72): // Key-H
						girl.state = "hurt";
						boy.changeAnimation("Hurt");
						break;

					case p.keyIsDown(p.LEFT_ARROW):
						girl.state = "run";
						girl.addSpeed(-0.25, 0);
						break;
					case p.keyIsDown(p.RIGHT_ARROW):
						girl.state = "run";
						girl.addSpeed(0.2, 0);
						break;
					case p.keyIsDown(p.UP_ARROW):
						girl.state = "run";
						girl.addSpeed(-0.1, 90);
						break;
					case p.keyIsDown(p.DOWN_ARROW):
						girl.state = "run";
						girl.addSpeed(0.1, 90);
						break;
					default:
						// girl.state = "stand";
						break;
				}

				if (getCvsSize() < girl.sprite.position.x) girl.sprite.position.x = 0;
				else if (girl.sprite.position.x < 0) girl.sprite.position.x = getCvsSize();

				p.drawSprites();
				girl.draw();

				for (const block of blocks) block.draw();

				girl.attractionPoint(0.1, 200, 200);
			};
		}, "App");
	});
</script>