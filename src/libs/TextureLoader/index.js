import TextureProject, { TextureProjectObject } from "./TextureProject";
import Texture, { TextureObject } from "./Texture";


export default class TextureLoader {
	constructor () {
		/** @type {TextureProjectObject} */
		this.project = {};
		/** @type { Object<string, TextureObject> } */
		this.textures = {};
	}

	/** @param {string} projectUrl */
	loadProject (projectUrl) {
		return fetch(projectUrl)
			.then(resp => resp.json())
			.then(project => {
				if (!TextureProject.validate(project)) throw new TypeError("project must be a TextureProject");

				return this.project = TextureProject.sanitize(project);
			});
	}

	/** @prop {p5Context} p */
	init (p) {
		for (const entry of Object.entries(this.project.texture)) {
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