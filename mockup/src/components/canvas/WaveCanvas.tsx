import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import ShaderProgram from "./ShaderProgram";

const POINT_SIZE = 2.0;

const PARTICLE_TEXTURE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC";

const VERTEX = `
  #define M_PI 3.1415926535897932384626433832795

  precision highp float;

  attribute vec4 a_position;
  attribute vec4 a_color;

  uniform float u_time;
  uniform float u_size;
  uniform float u_speed;
  uniform vec3 u_field;
  uniform mat4 u_projection;

  varying vec4 v_color;

  void main() {
    vec3 pos = a_position.xyz;

    pos.y += (
      cos(pos.x / u_field.x * M_PI * 6.0 + u_time * u_speed) +
      sin(pos.z / u_field.z * M_PI * 6.0 + u_time * u_speed)
    ) * u_field.y;

    gl_Position = u_projection * vec4(pos.xyz, a_position.w);
    gl_PointSize = (u_size / gl_Position.w) * 100.0;

    v_color = a_color;
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform sampler2D u_texture;

  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);
  }
`;

interface Props {
  readonly style?: CSSProperties;
}

export default function WaveCanvas({ style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<ReturnType<typeof ShaderProgram> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sp = ShaderProgram(containerRef.current, {
      texture: PARTICLE_TEXTURE,
      uniforms: {
        size: { type: "float", value: POINT_SIZE },
        field: { type: "vec3", value: [0, 0, 0] },
        speed: { type: "float", value: 0.8 },
      },
      vertex: VERTEX,
      fragment: FRAGMENT,
      onResize(w, h, dpi) {
        const position: number[] = [];
        const color: number[] = [];

        const width = 400 * (w / h);
        const depth = 500;
        const height = 2;
        const distance = 6;

        for (let x = 0; x < width; x += distance) {
          for (let z = 0; z < depth; z += distance) {
            position.push(-width / 2 + x, -30, -depth / 2 + z);

            // Depth-based fade: near (bottom) = bright white, far (top) = dim
            const depthFade = z / depth;
            const brightness = 0.9 + depthFade * 0.1;
            const alpha = depthFade * depthFade * 0.9;

            color.push(brightness, brightness, brightness, alpha);
          }
        }

        this.uniforms.field = [width, height, depth];
        this.buffers.position = position;
        this.buffers.color = color;
        this.uniforms.size = (h / 400) * POINT_SIZE * dpi;
      },
    });

    programRef.current = sp;

    return () => {
      sp.dispose();
      programRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
