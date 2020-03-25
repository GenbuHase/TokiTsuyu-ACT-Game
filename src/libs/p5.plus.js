export function p5Plus (p) {
	p.windowMinSize = Math.min(p.windowWidth, p.windowHeight);
	p.windowMaxSize = Math.max(p.windowWidth, p.windowHeight);
}