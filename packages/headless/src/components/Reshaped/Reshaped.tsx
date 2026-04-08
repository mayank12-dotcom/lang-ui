"use client";

import React from "react";

import { SingletonHotkeysProvider } from "@/hooks/_internal/useSingletonHotkeys";
import { SingletonKeyboardModeProvider } from "@/hooks/_internal/useSingletonKeyboardMode";
import { SingletonRTLProvider } from "@/hooks/_internal/useSingletonRTL";

import type * as T from "./Lang UI.types";

const Lang UI: React.FC<T.Props> = (props) => {
	const { children } = props;

	return (
		<SingletonRTLProvider>
			<SingletonKeyboardModeProvider>
				<SingletonHotkeysProvider>{children}</SingletonHotkeysProvider>
			</SingletonKeyboardModeProvider>
		</SingletonRTLProvider>
	);
};

Lang UI.displayName = "Headless.Lang UIProvider";

export default Lang UI;
