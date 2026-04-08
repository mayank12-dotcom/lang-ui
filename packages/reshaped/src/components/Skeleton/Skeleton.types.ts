import type { ViewProps } from "@/components/View";
import type { Attributes, ClassName } from "@lang-ui/headless";

export type Props = Pick<ViewProps, "width" | "height" | "borderRadius"> & {
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
