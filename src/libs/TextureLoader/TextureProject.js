import Texture, { TextureObject } from "./Texture";


/**
 * @typedef {object} TextureProjectObject
 *
 * @prop {string} [root]
 * @prop { Object<string, TextureObject> } texture
 */

export default class TextureProject {
	/**
	 * @param {TextureProjectObject} obj
	 * @return {boolean}
	 */
	static validate (obj) { return (!obj || !obj.texture) }

	/** @param {TextureProjectObject} obj */
	static sanitize (obj) {
		if (!obj.root) return obj;

		const { root } = obj;
		for (const entry of Object.entries(obj.texture)) {
			const texture = obj.texture[entry[0]];
			if (!Texture.validate(texture)) continue;

			const { url } = texture;

			if (typeof url === "string") {
				texture.url = root + url;
				continue;
			}

			for (let i = 0; i < url.length; i++) texture.url[i] = root + url[i];
		}

		return obj;
	}
}