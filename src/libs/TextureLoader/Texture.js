/**
 * @typedef {object} TextureObject
 *
 * @prop {"Image" | "Animation"} type
 * @prop {string | string[]} url
 */

export default class Texture {
	static get TextureType () {
		return {
			Image: "Image",
			Animation: "Animation"
		};
	}


	/**
	 * @param {TextureObject} obj
	 * @return {boolean}
	 */
	static validate (obj) {
		const { TextureType } = Texture;

		if (!obj || !obj.type || !obj.url) return false;
		if (![ TextureType.Image, TextureType.Animation ].includes(obj.type)) return false;
		if (!(typeof obj.url === "string" || Array.isArray(obj.url))) return false;

		return true;
	}
}