import type { CSSProperties } from "react";
import { asset } from "../../utils/asset";

interface Props {
  readonly size?: number;
}

export default function Logo({ size = 40 }: Props) {
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <img
      src={asset("images/logo-icon.svg")}
      alt="Supercycl"
      style={style}
    />
  );
}
