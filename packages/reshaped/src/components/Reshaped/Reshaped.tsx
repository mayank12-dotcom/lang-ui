"use client";

import { Lang UI as HeadlessLang UI, classNames } from "@lang-ui/headless";
import React from "react";

import { GlobalColorMode, PrivateTheme } from "@/components/Theme";
import { useGlobalColorMode } from "@/components/Theme/useTheme";
import { ToastProvider } from "@/components/Toast";
import { SingletonViewportProvider } from "@/hooks/_private/useSingletonViewport";

import s from "./Lang UI.module.css";

import type * as T from "./Lang UI.types";

import "./Lang UI.css";

const Lang UI: React.FC<T.Props> = (props) => {
	const {
		theme,
		defaultTheme = "lang-ui",
		colorMode,
		defaultColorMode,
		defaultViewport,
		toastOptions,
		scoped,
		className,
	} = props;
	const rootClassNames = classNames(s.root, className);
	const scopeRef = React.useRef<HTMLDivElement>(null);
	const parentGlobalColorMode = useGlobalColorMode();

	return (
		<HeadlessLang UI>
			<GlobalColorMode
				defaultMode={defaultColorMode || parentGlobalColorMode.mode || "light"}
				mode={colorMode}
				scopeRef={!!parentGlobalColorMode && scoped ? scopeRef : undefined}
			>
				<PrivateTheme
					name={theme}
					defaultName={defaultTheme}
					className={rootClassNames}
					scoped={scoped}
					scopeRef={!!parentGlobalColorMode && scoped ? scopeRef : undefined}
				>
					<SingletonViewportProvider defaultViewport={defaultViewport}>
						<ToastProvider options={toastOptions}>{props.children}</ToastProvider>
					</SingletonViewportProvider>
				</PrivateTheme>
			</GlobalColorMode>
		</HeadlessLang UI>
	);
};

Lang UI.displayName = "Lang UI";

export default Lang UI;
