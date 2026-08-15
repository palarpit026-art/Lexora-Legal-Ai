/**
 * Juris Orbital courtroom reminder: the 3D object must feel weighted, judicial,
 * and materially credible—dark walnut, bronze, parchment, and Verdict Green only for active evidence signals.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Scale, ScrollText, Gavel } from "lucide-react";

type FocusId = "order" | "balance" | "evidence";

const focusItems: Record<FocusId, { label: string; title: string; body: string; Icon: typeof Gavel }> = {
  order: {
    label: "Order",
    title: "The gavel: a considered decision.",
    body: "A weighted decision point, held in view before it becomes a next step.",
    Icon: Gavel,
  },
  balance: {
    label: "Balance",
    title: "The scales: competing facts in view.",
    body: "Arguments, sources, and consequences belong in the same measured frame.",
    Icon: Scale,
  },
  evidence: {
    label: "Evidence",
    title: "The files: context before conclusion.",
    body: "Research, notes, and source trails form the structure behind a better answer.",
    Icon: ScrollText,
  },
};

function makeLine(points: THREE.Vector3[], material: THREE.LineBasicMaterial) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
}

export default function CourtroomScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<FocusId>("order");
  const [focus, setFocus] = useState<FocusId>("order");
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(true);

  const setSceneFocus = (next: FocusId) => {
    focusRef.current = next;
    setFocus(next);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setIsReady(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0.2, 1.5, 10.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.appendChild(renderer.domElement);

    const court = new THREE.Group();
    court.rotation.set(-0.08, -0.24, 0);
    scene.add(court);

    const walnut = new THREE.MeshStandardMaterial({ color: 0x442818, roughness: 0.32, metalness: 0.11 });
    const walnutLight = new THREE.MeshStandardMaterial({ color: 0x8a5636, roughness: 0.28, metalness: 0.08 });
    const bronze = new THREE.MeshStandardMaterial({ color: 0xc69b62, roughness: 0.2, metalness: 0.87 });
    const bronzeDark = new THREE.MeshStandardMaterial({ color: 0x705038, roughness: 0.27, metalness: 0.8 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x1b2c3d, roughness: 0.4, metalness: 0.39 });
    const parchment = new THREE.MeshStandardMaterial({ color: 0xe4d0a8, roughness: 0.64, metalness: 0.02 });
    const green = new THREE.MeshStandardMaterial({ color: 0x8de173, roughness: 0.35, metalness: 0.18, emissive: 0x203f1d, emissiveIntensity: 0.32 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9a7650, transparent: true, opacity: 0.72 });

    const plinth = new THREE.Group();
    const plinthBase = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.58, 3.35), graphite);
    plinthBase.position.y = -2.15;
    plinthBase.castShadow = true;
    plinth.add(plinthBase);
    const plinthTop = new THREE.Mesh(new THREE.BoxGeometry(8.25, 0.15, 3.08), walnut);
    plinthTop.position.y = -1.82;
    plinth.add(plinthTop);
    const inlay = new THREE.Mesh(new THREE.BoxGeometry(7.3, 0.025, 0.028), bronze);
    inlay.position.set(0, -1.725, 1.15);
    plinth.add(inlay);
    court.add(plinth);

    const gavel = new THREE.Group();
    gavel.position.set(-2.05, -0.28, 0.42);
    gavel.rotation.set(0.2, 0.2, -0.62);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 3.15, 32), walnutLight);
    handle.rotation.z = Math.PI / 2;
    handle.position.x = -0.55;
    gavel.add(handle);
    const collarA = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 24), bronze);
    collarA.rotation.z = Math.PI / 2;
    collarA.position.x = 0.62;
    gavel.add(collarA);
    const collarB = collarA.clone();
    collarB.position.x = 1.31;
    gavel.add(collarB);
    const gavelHead = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.58, 1.25, 32), walnut);
    gavelHead.rotation.z = Math.PI / 2;
    gavelHead.position.x = 1.0;
    gavel.add(gavelHead);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.61, 0.61, 0.12, 32), bronze);
    band.rotation.z = Math.PI / 2;
    band.position.x = 1.0;
    gavel.add(band);
    const block = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.8, 0.3, 32), walnutLight);
    block.scale.set(1.35, 1, 0.85);
    block.position.set(-1.95, -1.28, 0.08);
    gavel.add(block);
    court.add(gavel);

    const scales = new THREE.Group();
    scales.position.set(1.22, -0.86, -0.08);
    const scaleFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.94, 0.22, 36), bronzeDark);
    scales.add(scaleFoot);
    const scaleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.5, 0.34, 30), bronze);
    scaleBase.position.y = 0.25;
    scales.add(scaleBase);
    const scalePillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.17, 2.6, 24), bronze);
    scalePillar.position.y = 1.55;
    scales.add(scalePillar);
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 0.16), bronze);
    beam.position.y = 2.7;
    scales.add(beam);
    const fulcrum = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.48, 24), bronzeDark);
    fulcrum.position.y = 2.5;
    scales.add(fulcrum);
    [-1.48, 1.48].forEach((x, index) => {
      const chainGroup = new THREE.Group();
      chainGroup.position.set(x, 2.64, 0);
      chainGroup.add(makeLine([new THREE.Vector3(-0.07, 0, 0), new THREE.Vector3(-0.3, -0.87, 0)], lineMaterial));
      chainGroup.add(makeLine([new THREE.Vector3(0.07, 0, 0), new THREE.Vector3(0.3, -0.87, 0)], lineMaterial));
      const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.42, 0.12, 32), index === 0 ? parchment : graphite);
      pan.scale.y = 0.62;
      pan.position.y = -0.92;
      chainGroup.add(pan);
      scales.add(chainGroup);
    });
    court.add(scales);

    const files = new THREE.Group();
    files.position.set(2.45, -1.05, -0.35);
    const fileSpecs = [
      { x: -0.42, y: 0.1, z: 0.05, w: 1.38, h: 1.55, d: 0.28, r: -0.09, material: graphite },
      { x: 0.1, y: 0.38, z: -0.12, w: 1.48, h: 1.86, d: 0.32, r: 0.08, material: walnut },
      { x: 0.46, y: 0.75, z: -0.3, w: 1.24, h: 1.48, d: 0.25, r: 0.14, material: graphite },
    ];
    fileSpecs.forEach((spec, index) => {
      const file = new THREE.Group();
      const cover = new THREE.Mesh(new THREE.BoxGeometry(spec.w, spec.h, spec.d), spec.material);
      file.add(cover);
      const papers = new THREE.Mesh(new THREE.BoxGeometry(spec.w * 0.84, spec.h * 0.78, spec.d + 0.025), parchment);
      papers.position.z = spec.d / 2 + 0.014;
      file.add(papers);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(spec.w * 0.42, 0.15, 0.05), index === 1 ? green : bronze);
      tab.position.set(-spec.w * 0.2, spec.h / 2 + 0.07, spec.d / 2 + 0.03);
      file.add(tab);
      file.position.set(spec.x, spec.y, spec.z);
      file.rotation.z = spec.r;
      files.add(file);
    });
    court.add(files);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(3.5, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x8de173, transparent: true, opacity: 0.24 }),
    );
    halo.rotation.x = Math.PI / 2.55;
    halo.position.set(0.3, -1.32, -0.9);
    court.add(halo);

    scene.add(new THREE.HemisphereLight(0x89a0b7, 0x2a180e, 2.05));
    const key = new THREE.DirectionalLight(0xf5e5c7, 3.3);
    key.position.set(-4.5, 7.5, 5.2);
    scene.add(key);
    const windowLight = new THREE.SpotLight(0xffe6bd, 24, 18, Math.PI / 5.3, 0.52, 1.25);
    windowLight.position.set(-2.8, 6.3, 6.2);
    windowLight.target.position.set(-0.5, -0.2, 0);
    scene.add(windowLight, windowLight.target);
    const rim = new THREE.PointLight(0x8de173, 8.5, 12, 2);
    rim.position.set(2.2, 2.3, 3.7);
    scene.add(rim);
    const warm = new THREE.PointLight(0xd4a269, 15, 11, 2);
    warm.position.set(-4.2, -0.2, 3.2);
    scene.add(warm);

    const targetByFocus: Record<FocusId, THREE.Vector3> = {
      order: new THREE.Vector3(-1.0, -0.38, 0),
      balance: new THREE.Vector3(1.05, 0.52, 0),
      evidence: new THREE.Vector3(2.55, -0.15, 0),
    };
    const cameraByFocus: Record<FocusId, THREE.Vector3> = {
      order: new THREE.Vector3(0.1, 1.28, 9.7),
      balance: new THREE.Vector3(0.18, 1.8, 9.85),
      evidence: new THREE.Vector3(0.12, 1.25, 10.25),
    };

    let frameId = 0;
    let lastTime = performance.now();
    let active = true;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, down: false, moved: false, lastX: 0, lastY: 0, yaw: -0.24, pitch: -0.08 };
    const cameraTarget = new THREE.Vector3();
    const desiredCamera = new THREE.Vector3();

    const onResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const onPointerDown = (event: PointerEvent) => {
      pointer.down = true;
      pointer.moved = false;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      mount.setPointerCapture?.(event.pointerId);
      setIsDragging(true);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!pointer.down) return;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) pointer.moved = true;
      pointer.yaw += dx * 0.009;
      pointer.pitch = THREE.MathUtils.clamp(pointer.pitch + dy * 0.006, -0.45, 0.25);
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };
    const releasePointer = (event?: PointerEvent) => {
      pointer.down = false;
      if (event) mount.releasePointerCapture?.(event.pointerId);
      setIsDragging(false);
    };
    const onMotionPreference = (event: MediaQueryListEvent) => { reducedMotion = event.matches; };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (!reducedMotion && !pointer.down) pointer.yaw += delta * 0.08;
      const focusId = focusRef.current;
      cameraTarget.lerp(targetByFocus[focusId], 0.055);
      desiredCamera.copy(cameraByFocus[focusId]);
      desiredCamera.x += pointer.x * 0.22;
      desiredCamera.y -= pointer.y * 0.13;
      camera.position.lerp(desiredCamera, 0.05);
      court.rotation.y = THREE.MathUtils.lerp(court.rotation.y, pointer.yaw + pointer.x * 0.07, 0.06);
      court.rotation.x = THREE.MathUtils.lerp(court.rotation.x, pointer.pitch - pointer.y * 0.025, 0.06);
      if (!reducedMotion) {
        halo.rotation.z += delta * 0.12;
        gavel.position.y = -0.45 + Math.sin(time * 0.00075) * 0.04;
        files.position.y = -1.05 + Math.sin(time * 0.00058 + 1.2) * 0.025;
      }
      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);
      if (active) frameId = requestAnimationFrame(render);
    };

    onResize();
    frameId = requestAnimationFrame(render);
    window.addEventListener("resize", onResize);
    mount.addEventListener("pointerdown", onPointerDown);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerup", releasePointer);
    mount.addEventListener("pointerleave", releasePointer);
    motionQuery.addEventListener("change", onMotionPreference);

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onPointerDown);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerup", releasePointer);
      mount.removeEventListener("pointerleave", releasePointer);
      motionQuery.removeEventListener("change", onMotionPreference);
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
          child.geometry.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const current = focusItems[focus];
  const CurrentIcon = current.Icon;

  return (
    <section className="courtroom-scene" aria-label="Interactive Lexora judicial instrument table">
      <img className="courtroom-scene__atmosphere" src="/assets/lexora-courtroom-atmosphere.png" alt="" />
      <img className="courtroom-scene__archive" src="/assets/lexora-casefile-architecture.png" alt="" />
      <div className={isDragging ? "courtroom-scene__canvas courtroom-scene__canvas--dragging" : "courtroom-scene__canvas"} ref={mountRef} aria-hidden="true" />
      <div className="courtroom-scene__frame" aria-hidden="true" />
      <div className="courtroom-scene__seal"><img src="/assets/lexora-mark.png" alt="" /><span>Lexora / judicial workspace</span></div>
      <div className="courtroom-scene__topline"><span>Judicial instrument / 01</span><i /><span>{isDragging ? "Inspecting structure" : "Drag the legal structure"}</span></div>
      <div className="courtroom-scene__caption">
        <span className="courtroom-scene__caption-index">0{["order", "balance", "evidence"].indexOf(focus) + 1}</span>
        <div><b>{current.label}</b><small>{current.title}</small></div>
      </div>
      <div className="courtroom-scene__controls" role="tablist" aria-label="Focus a legal object">
        {(Object.keys(focusItems) as FocusId[]).map((key) => {
          const item = focusItems[key];
          const Icon = item.Icon;
          return (
            <button key={key} className={focus === key ? "courtroom-scene__control courtroom-scene__control--active" : "courtroom-scene__control"} onClick={() => setSceneFocus(key)} role="tab" aria-selected={focus === key}>
              <Icon size={14} /><span>{item.label}</span>
            </button>
          );
        })}
        <button className="courtroom-scene__reset" onClick={() => setSceneFocus("order")} aria-label="Reset the courtroom view"><RotateCcw size={15} /></button>
      </div>
      <div className="courtroom-scene__detail"><CurrentIcon size={16} /><p>{current.body}</p></div>
      {!isReady && <div className="courtroom-scene__fallback">Interactive 3D requires a WebGL-enabled browser. The legal structure remains available as a static composition.</div>}
    </section>
  );
}
