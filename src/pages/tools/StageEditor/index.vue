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
	import TextureLoader from "@/libs/TextureLoader";


	let textureLoader = new TextureLoader();
	textureLoader.loadConfig("/assets/characters/texture.json").then(config => {
		console.log(config);
	}).then(() => {
		let pointer;

		new p5(p => {
			const getCvsSize = () => Math.min(p.windowWidth, p.windowHeight);


			p.preload = () => {
				textureLoader.loadTextures(p);
			};

			p.setup = () => {
				const { Girl_Standing } = textureLoader.textures;
				Girl_Standing.images[0].width = getCvsSize() / 4, Girl_Standing.images[0].height = getCvsSize() / 3;


				p.createCanvas(getCvsSize(), getCvsSize());

				pointer = p.createSprite(p.mouseX, p.mouseY);
				pointer.addAnimation("Default", textureLoader.textures.Girl_Standing);
			};

			p.draw = () => {
				p.background(255, 255, 255);

				pointer.position = p.createVector(p.mouseX, p.mouseY);

				p.drawSprites();
			};
		}, "App");
	});
</script>