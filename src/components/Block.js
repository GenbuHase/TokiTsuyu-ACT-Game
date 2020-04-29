/**
 * @typedef {object} BlockOption
 *
 * @prop {Number} x
 * @prop {Number} y
 * @prop {Number} width
 * @prop {Number} height
 */

export default class Block {
	/**
	 * @param {p5Context} p
	 * @param {BlockOption} [option = {}]
	 */
	constructor (p, option = {}) {
		this.__p = p;
		this.option = option;

		this.init(option);
	}

	/** @param {BlockOption} option */
	init (option) {
		option = option || this.option;

		option.x = option.x || 0,
		option.y = option.y || 0,
		option.width = option.width || 0,
		option.height = option.height || 0;


		const p = this.__p;
		this.sprite = p.createSprite(option.x, option.y, option.width, option.height);
	}

	draw () {
		const p = this.__p;
		p.drawSprite(this.sprite);
	}
}