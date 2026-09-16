import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Vertex3DScene() {
  const mountRef = useRef(null);
  const coreGroupRef = useRef(null);
  const orbitGroupRef = useRef(null);
  const electronRef = useRef(null);
  const diamondGroupRef = useRef(null);
  const circuitGroupRef = useRef(null);

  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
    prevX: 0,
    prevY: 0,
    rotSpeedX: 0,
    rotSpeedY: 0,
  });

  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. High-Tech Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1026, 2.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00e5ff, 5, 40);
    cyanPointLight.position.set(5, 5, 8);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 5, 40);
    purplePointLight.position.set(-5, -3, 8);
    scene.add(purplePointLight);

    const blueDirLight = new THREE.DirectionalLight(0x3b82f6, 2.5);
    blueDirLight.position.set(0, 10, 10);
    scene.add(blueDirLight);

    const backRimLight = new THREE.PointLight(0x6366f1, 4, 30);
    backRimLight.position.set(0, -6, -4);
    scene.add(backRimLight);

    // 3. Central 3D VERTEX Master Group
    const masterCore = new THREE.Group();
    coreGroupRef.current = masterCore;
    scene.add(masterCore);

    // --- High-Fidelity 3D "V" Shape from Logo ---
    const vGroup = new THREE.Group();
    masterCore.add(vGroup);

    // Faceted V-wing geometry
    const wingGeom = new THREE.CylinderGeometry(0.25, 0.75, 6.2, 5);
    
    // Left Wing (Cyber Blue / Cyan)
    const leftWingMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d1f54,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const leftWing = new THREE.Mesh(wingGeom, leftWingMat);
    leftWing.position.set(-1.8, 0.4, 0);
    leftWing.rotation.z = Math.PI / 6.6;
    vGroup.add(leftWing);

    // Right Wing (Electric Violet / Purple)
    const rightWingMat = new THREE.MeshPhysicalMaterial({
      color: 0x310e54,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const rightWing = new THREE.Mesh(wingGeom, rightWingMat);
    rightWing.position.set(1.8, 0.4, 0);
    rightWing.rotation.z = -Math.PI / 6.6;
    vGroup.add(rightWing);

    // Glowing wireframe edges for the wings
    const edgesLeft = new THREE.EdgesGeometry(wingGeom);
    const lineMatCyan = new THREE.LineBasicMaterial({ color: 0x00e5ff, linewidth: 2 });
    const lineMeshLeft = new THREE.LineSegments(edgesLeft, lineMatCyan);
    leftWing.add(lineMeshLeft);

    const edgesRight = new THREE.EdgesGeometry(wingGeom);
    const lineMatPurple = new THREE.LineBasicMaterial({ color: 0xd946ef, linewidth: 2 });
    const lineMeshRight = new THREE.LineSegments(edgesRight, lineMatPurple);
    rightWing.add(lineMeshRight);

    // Base Tip of the V
    const tipGeom = new THREE.ConeGeometry(0.85, 2.0, 5);
    const tipMat = new THREE.MeshPhysicalMaterial({
      color: 0x172554,
      emissive: 0x2563eb,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.85,
    });
    const tipMesh = new THREE.Mesh(tipGeom, tipMat);
    tipMesh.position.set(0, -2.4, 0);
    tipMesh.rotation.z = Math.PI;
    vGroup.add(tipMesh);

    // --- Neural Diamond & Constellation on Top (Matching Logo) ---
    const diamondGroup = new THREE.Group();
    diamondGroupRef.current = diamondGroup;
    diamondGroup.position.set(0, 2.5, 0);
    masterCore.add(diamondGroup);

    // Diamond Octahedron Frame
    const octaGeom = new THREE.OctahedronGeometry(1.5, 0);
    const octaWireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const octaMesh = new THREE.Mesh(octaGeom, octaWireMat);
    diamondGroup.add(octaMesh);

    // Luminous Neural Core Sphere inside Diamond
    const coreSphereGeom = new THREE.SphereGeometry(0.65, 24, 24);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.8,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeom, coreSphereMat);
    diamondGroup.add(coreSphere);

    // Glowing Neural Nodes at Diamond Vertices
    const nodeGeom = new THREE.SphereGeometry(0.13, 12, 12);
    const nodeMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 2.0,
    });
    const nodeMatPurple = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xa855f7,
      emissiveIntensity: 2.0,
    });

    const octaPositions = octaGeom.attributes.position;
    for (let i = 0; i < octaPositions.count; i++) {
      const isTop = octaPositions.getY(i) > 0;
      const node = new THREE.Mesh(nodeGeom, isTop ? nodeMatCyan : nodeMatPurple);
      node.position.set(
        octaPositions.getX(i),
        octaPositions.getY(i),
        octaPositions.getZ(i)
      );
      diamondGroup.add(node);
    }

    // --- Vertical Circuit Tree Lines (Descending into V Core) ---
    const circuitGroup = new THREE.Group();
    circuitGroupRef.current = circuitGroup;
    masterCore.add(circuitGroup);

    const circuitLinePoints = [
      new THREE.Vector3(0, 2.4, 0),
      new THREE.Vector3(0, -0.6, 0),
      // Branches
      new THREE.Vector3(0, 1.4, 0),
      new THREE.Vector3(-0.6, 0.6, 0.2),
      new THREE.Vector3(0, 1.0, 0),
      new THREE.Vector3(0.6, 0.4, -0.2),
    ];
    const circuitGeom = new THREE.BufferGeometry().setFromPoints(circuitLinePoints);
    const circuitMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const circuitLines = new THREE.LineSegments(circuitGeom, circuitMat);
    circuitGroup.add(circuitLines);

    // --- Orbiting Planetary Ring (Logo Feature) ---
    const orbitGroup = new THREE.Group();
    orbitGroupRef.current = orbitGroup;
    orbitGroup.rotation.x = Math.PI / 2.7;
    orbitGroup.rotation.y = -Math.PI / 12;
    masterCore.add(orbitGroup);

    // Primary Cyan Torus Ring
    const ringGeom = new THREE.TorusGeometry(4.3, 0.05, 20, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    orbitGroup.add(ringMesh);

    // Secondary subtle outer ring for extra depth
    const ringGeom2 = new THREE.TorusGeometry(4.8, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 16;
    orbitGroup.add(ringMesh2);

    // Orbiting Electron / Planetary Sphere
    const electronGeom = new THREE.SphereGeometry(0.32, 20, 20);
    const electronMat = new THREE.MeshStandardMaterial({
      color: 0xa5f3fc,
      emissive: 0x00e5ff,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });
    const electron = new THREE.Mesh(electronGeom, electronMat);
    electronRef.current = electron;
    orbitGroup.add(electron);

    // 4. Mouse & Touch Interaction (360° Drag & Hover)
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;

      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        const deltaY = e.clientY - mouseRef.current.prevY;
        mouseRef.current.rotSpeedY = deltaX * 0.007;
        mouseRef.current.rotSpeedX = deltaY * 0.007;

        if (coreGroupRef.current) {
          coreGroupRef.current.rotation.y += mouseRef.current.rotSpeedY;
          coreGroupRef.current.rotation.x += mouseRef.current.rotSpeedX;
        }

        mouseRef.current.prevX = e.clientX;
        mouseRef.current.prevY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      // Only drag if clicking on background or directly dragging
      mouseRef.current.isDown = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
      mouseRef.current.rotSpeedX = 0;
      mouseRef.current.rotSpeedY = 0;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    // 5. Scroll Interaction (Mouse Roll Reactivity)
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollRef.current.targetY = scrollY / maxScroll;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Render Loop
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Smooth scroll lerping
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.06;
      const scrollProgress = scrollRef.current.y;

      // Rotate Master Core
      if (coreGroupRef.current) {
        if (!mouseRef.current.isDown) {
          // Inertia damping
          mouseRef.current.rotSpeedX *= 0.94;
          mouseRef.current.rotSpeedY *= 0.94;
          coreGroupRef.current.rotation.x += mouseRef.current.rotSpeedX;
          coreGroupRef.current.rotation.y += mouseRef.current.rotSpeedY + 0.007;

          // Parallax tilt from mouse
          coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(
            coreGroupRef.current.rotation.x,
            mouseRef.current.y * 0.3,
            0.05
          );
        }

        // Float motion & Scroll Response (Zooms, scales and shifts on roll)
        coreGroupRef.current.position.y =
          Math.sin(elapsed * 1.6) * 0.22 - scrollProgress * 7;
        coreGroupRef.current.position.z = -scrollProgress * 9;
        coreGroupRef.current.scale.setScalar(1 - scrollProgress * 0.25);

        // Neural Diamond Pulse & Spin
        if (diamondGroupRef.current) {
          diamondGroupRef.current.rotation.y = -elapsed * 0.8;
          diamondGroupRef.current.position.y = 2.5 + Math.sin(elapsed * 2.8) * 0.12;
        }

        // Orbit Rotation & Traveling Electron
        if (orbitGroupRef.current) {
          orbitGroupRef.current.rotation.z = elapsed * 0.85;
          if (electronRef.current) {
            const angle = elapsed * 2.4;
            electronRef.current.position.x = Math.cos(angle) * 4.3;
            electronRef.current.position.y = Math.sin(angle) * 4.3;
          }
        }
      }

      // Parallax camera
      camera.position.x = mouseRef.current.x * 1.4;
      camera.position.y = mouseRef.current.y * 1.0 - scrollProgress * 3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Interactive 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
        title="اسحب بالماوس لتدوير مجسم VERTEX ثلاثي الأبعاد 360°"
      />

      {/* Clean, Deep Ambient Glows (Behind the 3D Core, No Distracting Dots) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}
