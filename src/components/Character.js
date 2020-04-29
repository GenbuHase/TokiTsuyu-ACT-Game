export default class Character {
	/**
	 * @param {p5Context} p
	 * @param { Object<string, TextureObject> } textures
	 */
	constructor (p, textures) {
		this.textures = textures;

		this.__p = p;
		this.sprite = p.createSprite();
	}

	draw () {
		const p = this.__p;
		p.drawSprite(this.sprite);
	}


	get width () { return this.sprite.width }
	set width (value) { this.sprite.width = value }

	get height () { return this.sprite.height }
	set height (value) { this.sprite.height = value }

	get scale () { return this.sprite.scale }
	set scale (value) { this.sprite.scale = value }

	get position () { return this.sprite.position }
	set position (value) { this.sprite.position = value }

	get rotation () { return this.sprite.rotation }
	set rotation (value) { this.sprite.rotation = value }

	get velocity () { return this.sprite.velocity }
	set velocity (value) { this.sprite.velocity = value }

	get life () { return this.sprite.life }
	set life (value) { this.sprite.life = value }

	get addSpeed () { return this.sprite.addSpeed }
	get setSpeed () { return this.sprite.setSpeed }
	get setVelocity () { return this.sprite.setVelocity }
	get attractionPoint () { return this.sprite.attractionPoint }
	get collide () { return this.sprite.collide }
}