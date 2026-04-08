import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
	panelPosition: "right",
	theme: create({
		base: "dark",
		brandTitle: "Lang UI",
		brandUrl: "https://lang-ui.so",
		brandImage: "./logo.svg",
		brandTarget: "_self",
	}),
});
