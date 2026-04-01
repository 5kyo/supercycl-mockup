// Adapted from https://github.com/bsehovac/shader-program

interface ShaderUniforms {
  [key: string]: { type: string; value: number | number[] };
}

interface ShaderBuffers {
  position: number[];
  color: number[];
}

interface ShaderProgramOptions {
  texture?: string;
  uniforms?: ShaderUniforms;
  vertex: string;
  fragment: string;
  onResize?: (this: ShaderProgramInstance, w: number, h: number, dpi: number) => void;
}

interface ShaderProgramInstance {
  uniforms: Record<string, unknown>;
  buffers: ShaderBuffers;
  dispose: () => void;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderProgram(
  container: HTMLElement,
  options: ShaderProgramOptions
): ShaderProgramInstance {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  canvas.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%";

  const gl = canvas.getContext("webgl", { antialias: false, alpha: true })!;

  const vertShader = createShader(gl, gl.VERTEX_SHADER, options.vertex)!;
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, options.fragment)!;

  const program = gl.createProgram()!;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // Uniforms
  const uniformLocations: Record<string, WebGLUniformLocation | null> = {};
  const uniformValues: Record<string, unknown> = {};

  function setUniform(name: string, type: string, value: unknown) {
    const loc = uniformLocations[name] ?? gl.getUniformLocation(program, `u_${name}`);
    uniformLocations[name] = loc;
    if (!loc) return;
    if (type === "float") gl.uniform1f(loc, value as number);
    else if (type === "vec3") gl.uniform3fv(loc, value as Float32Array | number[]);
    else if (type === "mat4") gl.uniformMatrix4fv(loc, false, value as Float32Array);
  }

  if (options.uniforms) {
    for (const [key, u] of Object.entries(options.uniforms)) {
      uniformValues[key] = u.value;
    }
  }

  // Texture
  if (options.texture) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };
    img.src = options.texture;
  }

  // Buffers
  const posBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  let vertexCount = 0;

  const buffers: ShaderBuffers = { position: [], color: [] };

  function updateBuffers() {
    if (buffers.position.length === 0) return;

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffers.position), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    const aCol = gl.getAttribLocation(program, "a_color");
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffers.color), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aCol);
    gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, 0, 0);

    vertexCount = buffers.position.length / 3;
  }

  // Projection
  function perspective(fov: number, aspect: number, near: number, far: number): Float32Array {
    const f = 1.0 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0,
    ]);
  }

  // Resize
  let disposed = false;

  function resize() {
    if (disposed) return;
    const dpi = window.devicePixelRatio || 1;
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    canvas.width = w * dpi;
    canvas.height = h * dpi;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const proj = perspective(Math.PI / 3, w / h, 1, 10000);
    setUniform("projection", "mat4", proj);

    if (options.onResize) {
      options.onResize.call(instance, w, h, dpi);
      updateBuffers();
    }
  }

  // Animation
  const startTime = performance.now();
  let animId = 0;

  function render() {
    if (disposed) return;
    const time = (performance.now() - startTime) / 1000;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    setUniform("time", "float", time);

    if (options.uniforms) {
      for (const [key, u] of Object.entries(options.uniforms)) {
        setUniform(key, u.type, uniformValues[key]);
      }
    }

    if (vertexCount > 0) {
      gl.drawArrays(gl.POINTS, 0, vertexCount);
    }

    animId = requestAnimationFrame(render);
  }

  // Proxy for uniform values
  const uniformProxy = new Proxy(uniformValues, {
    set(target, prop, value) {
      target[prop as string] = value;
      return true;
    },
    get(target, prop) {
      return target[prop as string];
    },
  });

  const instance: ShaderProgramInstance = {
    uniforms: uniformProxy,
    buffers,
    dispose() {
      disposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(colorBuffer);
    },
  };

  gl.clearColor(0, 0, 0, 0);
  window.addEventListener("resize", resize);
  resize();
  render();

  return instance;
}
