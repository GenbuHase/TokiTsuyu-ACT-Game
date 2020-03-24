module.exports = {
	publicPath: '/',
	outputDir: 'docs',

	pages: {
		index: {
			entry: "src/pages/app.js",

			filename: "index.html",
			title: "ときちゅゆプロジェクト"
		},

		"tools/StageEditor": {
			entry: "src/pages/tools/StageEditor/app.js",

			filename: "tools/StageEditor/index.html",
			title: "ステージエディタ｜ときちゅゆプロジェクト"
		}
	}
};