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
	import TextureLoader from "@/libs/TextureLoader.js";


	let textureLoader = new TextureLoader();
	textureLoader.loadConfig("/assets/characters/texture.json").then(config => {
		console.log(config);
	}).then(() => {
		// let girl, boy;
		let girl, boy = null;
		
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

				girl = p.createSprite(200, 200);
				girl.addAnimation("Standing", textureLoader.textures.Girl_Standing);
				girl.addAnimation("Running", textureLoader.textures.Girl_RunningLeft);
				girl.addAnimation("Jumping", textureLoader.textures.Girl_JumpingLeft);
				girl.addAnimation("Talking", textureLoader.textures.Girl_TalkingLeft);
				girl.addAnimation("Hurt", textureLoader.textures.Girl_Hurt);

				boy = p.createSprite(400, 400);
				boy.addAnimation("Standing", textureLoader.textures.Boy_Standing);
				boy.addAnimation("Running", textureLoader.textures.Boy_WalkingLeft);
				boy.addAnimation("Jumping", textureLoader.textures.Boy_JumpingLeft);
				boy.addAnimation("Talking", textureLoader.textures.Boy_TalkingLeft);
				boy.addAnimation("Hurt", textureLoader.textures.Boy_HurtLeft);
			};

			p.draw = () => {
				p.background(255, 255, 255);

				switch (true) {
					case p.keyIsDown(83): // Key-S
						girl.changeAnimation("Standing");
						boy.changeAnimation("Standing");
						break;
					case p.keyIsDown(82): // Key-R
						girl.changeAnimation("Running");
						boy.changeAnimation("Running");
						break;
					case p.keyIsDown(74): // Key-J
						girl.changeAnimation("Jumping");
						boy.changeAnimation("Jumping");
						break;
					case p.keyIsDown(84): // Key-T
						girl.changeAnimation("Talking");
						boy.changeAnimation("Talking");
						break;
					case p.keyIsDown(72): // Key-H
						girl.changeAnimation("Hurt");
						boy.changeAnimation("Hurt");
						break;

					case p.keyIsDown(p.LEFT_ARROW):
						girl.changeAnimation("Running");
						girl.addSpeed(-0.25, 0);
						break;
					case p.keyIsDown(p.RIGHT_ARROW):
						girl.changeAnimation("Running");
						girl.addSpeed(0.2, 0);
						break;
					case p.keyIsDown(p.UP_ARROW):
						girl.changeAnimation("Running");
						girl.addSpeed(-0.1, 90);
						break;
					case p.keyIsDown(p.DOWN_ARROW):
						girl.changeAnimation("Running");
						girl.addSpeed(0.1, 90);
						break;
					default:
						// girl.changeAnimation("Standing");
						break;
				}

				if (getCvsSize() < girl.position.x) girl.position.x = 0;
				else if (girl.position.x < 0) girl.position.x = getCvsSize();

				p.drawSprites();
			};
		}, "App");
	});
</script>