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
		let girl, boy;
		
		new p5(p => {
			const getCvsSize = () => Math.min(p.windowWidth, p.windowHeight);


			p.preload = () => {
				textureLoader.loadTextures(p);
			};

			p.setup = () => {
				p.createCanvas(getCvsSize(), getCvsSize());
				
				/*for (const img of TEXTURES["girl/Standing"].images) img.width = getCvsSize() / 4, img.height = getCvsSize() / 3;
				for (const img of TEXTURES["girl/Running"].images) img.width = getCvsSize() / 4, img.height = getCvsSize() / 3;*/

				girl = p.createSprite();
				girl.addAnimation("Standing", textureLoader.textures.Girl_Standing);
				girl.addAnimation("Running", textureLoader.textures.Girl_Running);
			};

			p.draw = () => {
				p.background(255, 255, 255);

				switch (true) {
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
						girl.changeAnimation("Standing");
						break;
				}

				if (getCvsSize() < girl.position.x) girl.position.x = 0;
				else if (girl.position.x < 0) girl.position.x = getCvsSize();

				p.drawSprites();
			};
		}, "App");
	});
</script>