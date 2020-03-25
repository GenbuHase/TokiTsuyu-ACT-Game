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
	import { p5Plus } from "@/libs/p5.plus";

	const TEXTURES = {
		Player: {
			Standing: null,
			Walking: null,
			Running: null
		}
	};


	let player;

	const sketch = p => {
		p.preload = () => {
			p5Plus(p);

			TEXTURES.Player.Standing = p.loadAnimation("/assets/characters/girl_running--001.png", "/assets/characters/girl_running--003.png");
			TEXTURES.Player.Standing.frameDelay = 10;
		};

		p.setup = () => {
			for (const img of TEXTURES.Player.Standing.images) img.width = p.windowMinSize/4, img.height = p.windowMinSize/3;

			p.createCanvas(p.windowMinSize, p.windowMinSize);

			player = p.createSprite(p.mouseX, p.mouseY);
			player.addAnimation("player", TEXTURES.Player.Standing);
		};

		p.draw = () => {
			p.background(255, 255, 255);

			player.position = p.createVector(p.mouseX, p.mouseY);

			p.drawSprites();
		};
	};

	new p5(sketch, "App");
</script>