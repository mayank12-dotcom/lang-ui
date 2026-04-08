import React from "react";

import type { Attributes } from "@lang-ui/headless";

export type ContentProps = {
	active?: boolean;
	children?: React.ReactNode;
	attributes?: Attributes<"div">;
};
