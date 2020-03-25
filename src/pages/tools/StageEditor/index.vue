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

			TEXTURES.Player.Standing = p.loadImage("/assets/characters/girl-standing.png", img => {
				img.width = 96, img.height = 128;
			});
		};

		p.setup = () => {
			p.createCanvas(p.windowMinSize, p.windowMinSize);

			player = p.createSprite(p.mouseX, p.mouseY, 48, 64);
			player.addImage(TEXTURES.Player.Standing);
		};

		p.draw = () => {
			p.background(255, 255, 255);

			player.position = p.createVector(p.mouseX, p.mouseY);

			p.drawSprites();
		};
	};

	new p5(sketch, "App");
</script>