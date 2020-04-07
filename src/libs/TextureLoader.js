export default class TextureLoader {
	constructor () {
		/** @type {TextureConfigObject} */
		this.config = {};
		/** @type { Object<string, TextureObject> } */
		this.textures = {};
	}


	/** @param {string} configUrl */
	loadConfig (configUrl) {
		return fetch(configUrl)
			.then(resp => resp.json())
			.then(config => {
				if (!TextureConfig.validate(config)) throw new TypeError("config must be a TextureConfigObject");

				return this.config = TextureConfig.sanitize(config);
			});
	}

	loadTextures (p) {
		for (const entry of Object.entries(this.config.texture)) {
			const [ key, texture ] = [ entry[0], entry[1] ];

			let url = [];
			switch (texture.type) {
				case Texture.TextureType.Image:
					url = [ texture.url ];
					break;
				case Texture.TextureType.Animation:
					url = texture.url;
					break;
			}

			this.textures[key] = p.loadAnimation(...url);
		}
	}
}


/**
 * @typedef {object} TextureConfigObject
 * @prop {string} [root]
 * @prop { Object<string, TextureObject> } texture
 */
class TextureConfig {
	/**
	 * @param {TextureConfigObject} obj
	 * @return {boolean}
	 */
	static validate (obj) {
		if (!obj || !obj.texture) return false;
		return true;
	}

	/** @param {TextureConfigObject} obj */
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


/**
 * @typedef {object} TextureObject
 * @prop {"Image" | "Animation"} type
 * @prop {string | string[]} url
 */
class Texture {
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