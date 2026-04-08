import { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";

import Button from "@/components/Button";
import { useTheme } from "@/components/Theme";

import Lang UI from "../Lang UI";

import type * as G from "@/types/global";

export default {
	title: "Utility components/Lang UI",
	parameters: {
		disableWrapper: true,
	},
};

export const rtl = {
	name: "defaultRTL",
	render: () => (
		<Lang UI defaultRTL theme="lang-ui" defaultColorMode="dark">
			Hello
		</Lang UI>
	),
};

export const controlledMode: StoryObj = {
	name: "colorMode, controlled",
	render: () => {
		const [mode, setMode] = useState<G.ColorMode>("dark");

		return (
			<Lang UI theme="lang-ui" colorMode={mode}>
				<Button
					onClick={() => {
						setMode(mode === "dark" ? "light" : "dark");
					}}
				>
					Toggle color mode
				</Button>
			</Lang UI>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		expect(document.documentElement.getAttribute("data-rs-color-mode")).toEqual("dark");

		await userEvent.click(button);

		expect(document.documentElement.getAttribute("data-rs-color-mode")).toEqual("light");
	},
};

export const lightMode = {
	name: "defaultColorMode=light",
	render: () => <Lang UI theme="lang-ui">Hello</Lang UI>,
	play: () => {
		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("lang-ui");
		expect(colorMode).toEqual("light");
	},
};

export const darkMode = {
	name: "defaultColorMode=dark",
	render: () => (
		<Lang UI theme="lang-ui" defaultColorMode="dark">
			Hello
		</Lang UI>
	),
	play: () => {
		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("lang-ui");
		expect(colorMode).toEqual("dark");
	},
};

export const scoped = {
	name: "scoped",
	render: () => (
		<Lang UI theme="lang-ui" defaultColorMode="dark" scoped>
			Hello
		</Lang UI>
	),
	play: async () => {
		const root = document.querySelector("[data-rs-root]");

		expect(root).toBeInTheDocument();
		expect(root).not.toBe(document.documentElement);
		expect(root).toHaveAttribute("data-rs-theme", "lang-ui");
		expect(document.documentElement).not.toHaveAttribute("data-rs-theme");
	},
};

const ScopedComponent = () => {
	const { invertColorMode } = useTheme();

	return <Button onClick={invertColorMode}>Invert</Button>;
};

export const testScoped: StoryObj = {
	name: "test: scoped switch",
	render: () => (
		<Lang UI theme="lang-ui">
			<Lang UI theme="slate" scoped>
				<ScopedComponent />
			</Lang UI>
		</Lang UI>
	),
	play: async ({ canvas }) => {
		const nestedRoot = document.querySelector("[data-rs-root]");
		const button = canvas.getAllByRole("button")[0];

		expect(document.documentElement).toHaveAttribute("data-rs-theme", "lang-ui");
		expect(document.documentElement).toHaveAttribute("data-rs-color-mode", "light");

		expect(nestedRoot).toHaveAttribute("data-rs-theme", "slate");
		expect(nestedRoot).toHaveAttribute("data-rs-color-mode", "light");

		await userEvent.click(button);

		expect(document.documentElement).toHaveAttribute("data-rs-color-mode", "light");
		expect(nestedRoot).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const keyboardMode = {
	name: "test: keyboard mode",
	render: () => (
		<Lang UI theme="lang-ui" defaultColorMode="dark">
			Hello
		</Lang UI>
	),
	play: async () => {
		const attribute = "data-rs-keyboard";

		expect(document.documentElement).not.toHaveAttribute(attribute);
		await userEvent.keyboard("{Tab/}");
		expect(document.documentElement).toHaveAttribute(attribute);
		await userEvent.click(document.body);
		expect(document.documentElement).not.toHaveAttribute(attribute);
	},
};
