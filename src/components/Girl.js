import { TextureObject } from "../libs/TextureLoader";
import Character from "./Character";


export default class Girl extends Character {
	/**
	 * @param {*} p
	 * @param { Object<string, TextureObject> } textures
	 */
	constructor (p, textures) {
		super(p);
		this.textures = textures;

		const { sprite } = this;
		sprite.addAnimation("stand", textures.Girl_Standing);
		sprite.addAnimation("run", textures.Girl_RunningLeft);
		sprite.addAnimation("jump", textures.Girl_JumpingLeft);
		sprite.addAnimation("talk", textures.Girl_TalkingLeft);
		sprite.addAnimation("hurt", textures.Girl_Hurt);
	}


	get state () { return this.__state }
	set state (value) {
		this.__state = value;
		this.sprite.changeAnimation(value);
	}
}