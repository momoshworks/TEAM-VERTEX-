import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Vertex3DScene() {
  const mountRef = useRef(null);
  const coreGroupRef = useRef(null);
  const brainMeshRef = useRef(null);
  const quantumCoreRef = useRef(null);
  const innerLightRef = useRef(null);
  const orbitGroup1Ref = useRef(null);
  const orbitGroup2Ref = useRef(null);
  const electron1Ref = useRef(null);
  const electron2Ref = useRef(null);
  const synapticPointsRef = useRef(null);

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
      48,
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
    // Optimize pixel ratio for smooth performance on weak and mobile GPUs
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. High-Tech Cyber Lighting (Optimized for low-end GPUs)
    const ambientLight = new THREE.AmbientLight(0x0a1628, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 5, 35);
    cyanLight.position.set(6, 4, 7);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 5, 35);
    purpleLight.position.set(-6, -4, 7);
    scene.add(purpleLight);

    // 3. Central Master Group for 3D Cybernetic Robot Brain
    const masterCore = new THREE.Group();
    coreGroupRef.current = masterCore;
    scene.add(masterCore);

    // --- Helper to build a lightweight procedural Brain Hemisphere with Gyri & Sulci folds ---
    const createHemisphereGeom = (isLeft) => {
      // 24x24 segments (Super lightweight for low-end devices, retains realistic organic curvature)
      const geom = new THREE.SphereGeometry(2.35, 24, 24);
      const pos = geom.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        // Anatomical Brain Dimensions
        x *= 0.82;
        y *= 0.96;
        z *= 1.28;

        // Medial Sagittal Fissure
        if (isLeft) {
          if (x > 0.05) x *= 0.2;
          x -= 0.68;
        } else {
          if (x < -0.05) x *= 0.2;
          x += 0.68;
        }

        // Temporal Lobe Bulge
        if (y < 0.1 && y > -1.3 && z > -0.6 && z < 0.9) {
          x += isLeft ? -0.28 : 0.28;
        }

        // Frontal Lobe Expansion
        if (z > 0.8 && y > -0.2) {
          z += 0.22;
          y += 0.12;
        }

        // Cerebellum
        if (y < -0.7 && z < -0.4) {
          y -= 0.28;
          z -= 0.18;
          x *= 0.88;
        }

        // Procedural Gyri & Sulci
        const fold1 = Math.sin(x * 5.4) * Math.sin(y * 5.4) * Math.cos(z * 5.4);
        const fold2 = Math.sin(x * 11.2 + z * 10.5) * 0.5;
        const fold3 = Math.cos(y * 14.0 + x * 9.0) * 0.3;
        const convolution = fold1 * 0.15 + fold2 * 0.07 + fold3 * 0.04;

        x += convolution * (isLeft ? -0.85 : 0.85);
        y += convolution * 0.85;
        z += convolution * 0.95;

        pos.setXYZ(i, x, y, z);
      }

      geom.computeVertexNormals();
      return geom;
    };

    // --- Left Hemisphere (Cyber Cyan, Optimized Standard Material) ---
    const leftGeom = createHemisphereGeom(true);
    const leftMat = new THREE.MeshStandardMaterial({
      color: 0x051329,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.88,
    });
    const leftHemisphere = new THREE.Mesh(leftGeom, leftMat);
    masterCore.add(leftHemisphere);

    // Lightweight Cybernetic Contours (EdgesGeometry instead of heavy full Wireframe)
    const leftWireGeom = new THREE.EdgesGeometry(leftGeom, 18);
    const leftWireMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.45,
    });
    const leftWire = new THREE.LineSegments(leftWireGeom, leftWireMat);
    leftHemisphere.add(leftWire);

    // --- Right Hemisphere (Electric Violet / Purple, Optimized) ---
    const rightGeom = createHemisphereGeom(false);
    const rightMat = new THREE.MeshStandardMaterial({
      color: 0x1b072e,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.88,
    });
    const rightHemisphere = new THREE.Mesh(rightGeom, rightMat);
    masterCore.add(rightHemisphere);

    // Right Cybernetic Contours
    const rightWireGeom = new THREE.EdgesGeometry(rightGeom, 18);
    const rightWireMat = new THREE.LineBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.45,
    });
    const rightWire = new THREE.LineSegments(rightWireGeom, rightWireMat);
    rightHemisphere.add(rightWire);

    // --- Synaptic Neural Nodes (Glowing Points on Brain Surface) ---
    const buildSynapticPoints = () => {
      const positions = [];
      const colors = [];
      const leftPos = leftGeom.attributes.position;
      const rightPos = rightGeom.attributes.position;

      // Sample every 4th vertex for high-tech synaptic nodes
      for (let i = 0; i < leftPos.count; i += 4) {
        positions.push(leftPos.getX(i), leftPos.getY(i), leftPos.getZ(i));
        // Cyan color
        colors.push(0.0, 0.9, 1.0);
      }

      for (let i = 0; i < rightPos.count; i += 4) {
        positions.push(rightPos.getX(i), rightPos.getY(i), rightPos.getZ(i));
        // Purple color
        colors.push(0.75, 0.35, 1.0);
      }

      const pointsGeom = new THREE.BufferGeometry();
      pointsGeom.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      pointsGeom.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const pointsMat = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(pointsGeom, pointsMat);
    };

    const synapticPoints = buildSynapticPoints();
    synapticPointsRef.current = synapticPoints;
    masterCore.add(synapticPoints);

    // --- Synaptic Neural Axons (Circuit lines crossing corpus callosum) ---
    const buildAxonBridges = () => {
      const linePoints = [];
      const count = 45;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const y = Math.sin(t * 3) * 0.8 + 0.1;
        const z = Math.cos(t * 2) * 1.3;
        // Connect left to right
        linePoints.push(new THREE.Vector3(-0.75, y, z));
        linePoints.push(new THREE.Vector3(0.75, y + (Math.random() - 0.5) * 0.2, z));
      }
      const axonGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
      const axonMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.LineSegments(axonGeom, axonMat);
    };
    masterCore.add(buildAxonBridges());

    // --- Internal Quantum AI Processor Core (Heart of the Brain) ---
    const quantumCoreGroup = new THREE.Group();
    quantumCoreRef.current = quantumCoreGroup;
    quantumCoreGroup.position.set(0, 0.1, 0);
    masterCore.add(quantumCoreGroup);

    // Pulsing Inner Processor Nucleus
    const innerCoreGeom = new THREE.IcosahedronGeometry(0.85, 1);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00e5ff,
      emissiveIntensity: 3.0,
      roughness: 0.1,
      metalness: 0.9,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeom, innerCoreMat);
    quantumCoreGroup.add(innerCoreMesh);

    // Outer Geodesic AI Core Cage
    const cageGeom = new THREE.OctahedronGeometry(1.3, 1);
    const cageWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageWireMat);
    quantumCoreGroup.add(cageMesh);

    // Dynamic Internal Point Light
    const innerLight = new THREE.PointLight(0x00e5ff, 8, 25);
    innerLightRef.current = innerLight;
    quantumCoreGroup.add(innerLight);

    // --- Robotic Brainstem & Cyber Spine (Base of Brain) ---
    const spineGroup = new THREE.Group();
    spineGroup.position.set(0, -2.1, -0.2);
    masterCore.add(spineGroup);

    // Stacked Cervical Cyber Rings (Optimized Segments)
    const ringCount = 5;
    for (let i = 0; i < ringCount; i++) {
      const ringRadius = 0.7 - i * 0.08;
      const spineRingGeom = new THREE.TorusGeometry(ringRadius, 0.07, 8, 20);
      const spineRingMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: i % 2 === 0 ? 0x00e5ff : 0x9333ea,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(spineRingGeom, spineRingMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -i * 0.42;
      spineGroup.add(ringMesh);
    }

    // Fiber Optic Cables descending through spine
    const cablePoints = [];
    for (let c = 0; c < 6; c++) {
      const angle = (c / 6) * Math.PI * 2;
      const rad = 0.45;
      cablePoints.push(new THREE.Vector3(Math.cos(angle) * rad, 0.2, Math.sin(angle) * rad));
      cablePoints.push(new THREE.Vector3(Math.cos(angle) * rad * 0.6, -2.2, Math.sin(angle) * rad * 0.6));
    }
    const cableGeom = new THREE.BufferGeometry().setFromPoints(cablePoints);
    const cableMat = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    spineGroup.add(new THREE.LineSegments(cableGeom, cableMat));

    // --- Holographic Gyroscopic Rings (Orbiting Data Rings, Optimized Segments) ---
    // Ring 1: Cyan Equatorial Ring
    const orbitGroup1 = new THREE.Group();
    orbitGroup1Ref.current = orbitGroup1;
    orbitGroup1.rotation.x = Math.PI / 2.6;
    orbitGroup1.rotation.y = -Math.PI / 10;
    masterCore.add(orbitGroup1);

    const gyroRingGeom1 = new THREE.TorusGeometry(4.4, 0.04, 8, 48);
    const gyroRingMat1 = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.8,
    });
    const gyroRingMesh1 = new THREE.Mesh(gyroRingGeom1, gyroRingMat1);
    orbitGroup1.add(gyroRingMesh1);

    // Orbiting Electron / Data Packet 1
    const electronGeom1 = new THREE.SphereGeometry(0.28, 10, 10);
    const electronMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00e5ff,
      emissiveIntensity: 3.0,
      roughness: 0.1,
    });
    const electron1 = new THREE.Mesh(electronGeom1, electronMat1);
    electron1Ref.current = electron1;
    orbitGroup1.add(electron1);

    // Ring 2: Purple Polar Ring
    const orbitGroup2 = new THREE.Group();
    orbitGroup2Ref.current = orbitGroup2;
    orbitGroup2.rotation.x = -Math.PI / 4;
    orbitGroup2.rotation.z = Math.PI / 6;
    masterCore.add(orbitGroup2);

    const gyroRingGeom2 = new THREE.TorusGeometry(4.7, 0.03, 8, 48);
    const gyroRingMat2 = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.8,
    });
    const gyroRingMesh2 = new THREE.Mesh(gyroRingGeom2, gyroRingMat2);
    orbitGroup2.add(gyroRingMesh2);

    // Orbiting Electron / Data Packet 2
    const electronGeom2 = new THREE.SphereGeometry(0.22, 10, 10);
    const electronMat2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xc084fc,
      emissiveIntensity: 3.0,
      roughness: 0.1,
    });
    const electron2 = new THREE.Mesh(electronGeom2, electronMat2);
    electron2Ref.current = electron2;
    orbitGroup2.add(electron2);

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
      mouseRef.current.isDown = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
      mouseRef.current.rotSpeedX = 0;
      mouseRef.current.rotSpeedY = 0;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    // Touch support for mobile devices
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        mouseRef.current.isDown = true;
        mouseRef.current.prevX = e.touches[0].clientX;
        mouseRef.current.prevY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (mouseRef.current.isDown && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - mouseRef.current.prevX;
        const deltaY = e.touches[0].clientY - mouseRef.current.prevY;
        mouseRef.current.rotSpeedY = deltaX * 0.008;
        mouseRef.current.rotSpeedX = deltaY * 0.008;

        if (coreGroupRef.current) {
          coreGroupRef.current.rotation.y += mouseRef.current.rotSpeedY;
          coreGroupRef.current.rotation.x += mouseRef.current.rotSpeedX;
        }

        mouseRef.current.prevX = e.touches[0].clientX;
        mouseRef.current.prevY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
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
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
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

    // 6. Animation Render Loop (with Tab Visibility Pause to save battery & CPU)
    let animationId;
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Smart GPU optimization: Pause Three.js rendering if viewing other pages or scrolled far away
      const currentHash = window.location.hash;
      const isViewingOtherPage =
        currentHash.includes('services') ||
        currentHash.includes('events') ||
        currentHash.includes('admin');
      if (isViewingOtherPage || window.scrollY > (window.innerHeight || 800) * 2.2) {
        return;
      }

      const elapsed = performance.now() * 0.001;

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Smooth scroll lerping
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.06;
      const scrollProgress = scrollRef.current.y;

      // Continuous 360° Rotating Cyber Robot Brain ("بيكون بيلف")
      if (coreGroupRef.current) {
        if (!mouseRef.current.isDown) {
          // Inertia damping
          mouseRef.current.rotSpeedX *= 0.94;
          mouseRef.current.rotSpeedY *= 0.94;
          coreGroupRef.current.rotation.x += mouseRef.current.rotSpeedX;

          // Continuous smooth majestic auto-spin
          coreGroupRef.current.rotation.y += mouseRef.current.rotSpeedY + 0.008;

          // Parallax tilt from mouse hover
          coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(
            coreGroupRef.current.rotation.x,
            mouseRef.current.y * 0.25,
            0.05
          );
        }

        // Float motion & Scroll Response (Zooms, scales and shifts on mouse roll)
        coreGroupRef.current.position.y =
          Math.sin(elapsed * 1.5) * 0.25 - scrollProgress * 7;
        coreGroupRef.current.position.z = -scrollProgress * 9;
        coreGroupRef.current.scale.setScalar(1 - scrollProgress * 0.25);

        // Internal Quantum AI Core Rotation & Pulse
        if (quantumCoreRef.current) {
          quantumCoreRef.current.rotation.y = -elapsed * 1.2;
          quantumCoreRef.current.rotation.x = Math.sin(elapsed * 0.8) * 0.3;
          const pulse = 1.0 + Math.sin(elapsed * 3.2) * 0.18;
          quantumCoreRef.current.scale.setScalar(pulse);

          if (innerLightRef.current) {
            innerLightRef.current.intensity = 6 + Math.sin(elapsed * 3.2) * 3;
          }
        }

        // Synaptic Points pulse
        if (synapticPointsRef.current) {
          synapticPointsRef.current.material.size =
            0.12 + Math.sin(elapsed * 4.0) * 0.03;
        }

        // Orbit 1 Rotation & Electron
        if (orbitGroup1Ref.current) {
          orbitGroup1Ref.current.rotation.z = elapsed * 0.75;
          if (electron1Ref.current) {
            const angle = elapsed * 2.2;
            electron1Ref.current.position.x = Math.cos(angle) * 4.4;
            electron1Ref.current.position.y = Math.sin(angle) * 4.4;
          }
        }

        // Orbit 2 Rotation & Electron
        if (orbitGroup2Ref.current) {
          orbitGroup2Ref.current.rotation.z = -elapsed * 0.6;
          if (electron2Ref.current) {
            const angle = -elapsed * 1.8;
            electron2Ref.current.position.x = Math.cos(angle) * 4.7;
            electron2Ref.current.position.y = Math.sin(angle) * 4.7;
          }
        }
      }

      // Parallax camera
      camera.position.x = mouseRef.current.x * 1.2;
      camera.position.y = mouseRef.current.y * 0.9 - scrollProgress * 3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
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
        title="اسحب بالماوس لتدوير عقل الروبوت ثلاثي الأبعاد 360°"
      />

      {/* Clean, Deep Ambient Glows (Behind the 3D Brain, Pure Black Void) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}
