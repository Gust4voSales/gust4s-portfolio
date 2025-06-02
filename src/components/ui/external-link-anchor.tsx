import { ComponentProps } from "react";

export function ExternalLinkAnchor({ ...props }: ComponentProps<"a">) {
  return <a target="_blank" rel="noopener noreferrer" {...props}></a>;
}
