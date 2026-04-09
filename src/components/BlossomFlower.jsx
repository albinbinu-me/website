
// default style


// import React, { useRef, useMemo } from 'react';
// import { useFrame, Canvas } from '@react-three/fiber';
// import { Float, Environment } from '@react-three/drei';
// import * as THREE from 'three';

// /* ---------------- PETAL SHAPE ---------------- */
// const petalShape = new THREE.Shape();
// petalShape.moveTo(0, 0);
// petalShape.bezierCurveTo(0.4, 0.2, 0.8, 0.8, 0.6, 1.6);
// petalShape.bezierCurveTo(0.5, 2.0, 0.2, 1.8, 0, 1.4);
// petalShape.bezierCurveTo(-0.2, 1.8, -0.5, 2.0, -0.6, 1.6);
// petalShape.bezierCurveTo(-0.8, 0.8, -0.4, 0.2, 0, 0);

// const extrudeSettings = {
//   depth: 0.02,
//   bevelEnabled: true,
//   bevelSegments: 2,
//   steps: 1,
//   bevelSize: 0.02,
//   bevelThickness: 0.02,
// };

// /* ---------------- SHARED GEOMETRY ---------------- */
// let cachedGeometry = null;
// function getPetalGeometry() {
//   if (cachedGeometry) return cachedGeometry;

//   const geo = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
//   const pos = geo.attributes.position;

//   // 🌸 Natural curvature
//   for (let i = 0; i < pos.count; i++) {
//     const x = pos.getX(i);
//     const y = pos.getY(i);
//     const z = pos.getZ(i);

//     const curve = Math.abs(x) * 0.3;
//     const bend = Math.max(0, y - 0.5) * 0.4;

//     pos.setZ(i, z + curve - bend);
//   }

//   geo.computeVertexNormals();
//   cachedGeometry = geo;
//   return geo;
// }

// /* ---------------- FLOWER CORE ---------------- */
// const BlossomCore = () => {
//   const groupRef = useRef();

//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();

//     if (groupRef.current) {
//       // 🌬️ gentle breathing motion
//       groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.08;
//       groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.05;
//       groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;

//       const scale = 1 + Math.sin(t * 0.8) * 0.02;
//       groupRef.current.scale.set(scale, scale, scale);
//     }
//   });

//   const petals = useMemo(() => {
//     const arr = [];
//     const geo = getPetalGeometry();

//     for (let i = 0; i < 5; i++) {
//       const angle = (i / 5) * Math.PI * 2;

//       arr.push(
//         <group key={i} rotation={[0, 0, angle]}>
//           <mesh
//             geometry={geo}
//             position={[0, 0.1, 0]}
//             rotation={[0.4, 0, 0]}
//             scale={[1.1, 1.1, 1.1]}
//           >
//             <meshPhysicalMaterial
//               color="#ff8fb1"
//               emissive="#ffb3c7"
//               emissiveIntensity={0.08}
//               roughness={0.35}
//               transmission={0.5}
//               thickness={0.4}
//               clearcoat={0.4}
//               clearcoatRoughness={0.25}
//               sheen={1}
//               sheenColor="#ffd1dc"
//               side={THREE.DoubleSide}
//             />
//           </mesh>
//         </group>
//       );
//     }

//     return arr;
//   }, []);

//   /* 🌼 CENTER */
//   const stamens = useMemo(() => {
//     const arr = [];

//     for (let i = 0; i < 16; i++) {
//       const angle = (i / 16) * Math.PI * 2;
//       const h = 0.5 + Math.random() * 0.3;

//       arr.push(
//         <group key={i} rotation={[Math.random() * 0.4, angle, 0]}>
//           <mesh position={[0, h / 2, 0]}>
//             <cylinderGeometry args={[0.004, 0.008, h, 6]} />
//             <meshStandardMaterial
//               color="#ff6f91"
//               emissive="#ff9bb3"
//               emissiveIntensity={0.2}
//             />
//           </mesh>

//           <mesh position={[0, h, 0]}>
//             <sphereGeometry args={[0.025, 8, 8]} />
//             <meshStandardMaterial
//               color="#ffd166"
//               emissive="#ffe29a"
//               emissiveIntensity={0.3}
//             />
//           </mesh>
//         </group>
//       );
//     }

//     return arr;
//   }, []);

//   return (
//     <Float floatIntensity={1.2} speed={1.2} rotationIntensity={0.2}>
//       <group ref={groupRef} scale={1.2} rotation={[Math.PI / 4, 0, 0]}>
//         {/* Base */}
//         <mesh position={[0, 0, -0.1]}>
//           <sphereGeometry args={[0.3, 32, 16]} />
//           <meshPhysicalMaterial
//             color="#ff5c8a"
//             roughness={0.6}
//             clearcoat={0.3}
//           />
//         </mesh>

//         {petals}

//         <group rotation={[Math.PI / 2, 0, 0]}>
//           {stamens}
//         </group>
//       </group>
//     </Float>
//   );
// };

// /* ---------------- FALLING PETALS ---------------- */
// const FallingPetals = ({ count = 120 }) => {
//   const meshRef = useRef();
//   const dummy = useMemo(() => new THREE.Object3D(), []);

//   const particles = useMemo(() => {
//     const arr = [];

//     for (let i = 0; i < count; i++) {
//       arr.push({
//         x: (Math.random() - 0.5) * 12,
//         y: Math.random() * 10,
//         z: (Math.random() - 0.5) * 8,

//         rx: Math.random() * Math.PI,
//         ry: Math.random() * Math.PI,
//         rz: Math.random() * Math.PI,

//         speed: Math.random() * 0.015 + 0.008,

//         spinX: Math.random() * 0.01,
//         spinY: Math.random() * 0.01,
//         spinZ: Math.random() * 0.02,

//         scale: Math.random() * 0.2 + 0.12,
//       });
//     }

//     return arr;
//   }, [count]);

//   const geo = useMemo(() => getPetalGeometry(), []);

//   useFrame(() => {
//     particles.forEach((p, i) => {
//       p.y -= p.speed;

//       // 🌬️ wind drift
//       p.x += Math.sin(p.y * 0.6 + i) * 0.015;
//       p.z += Math.cos(p.y * 0.4 + i) * 0.01;

//       p.rx += p.spinX;
//       p.ry += p.spinY;
//       p.rz += p.spinZ;

//       if (p.y < -6) {
//         p.y = 6;
//       }

//       dummy.position.set(p.x, p.y, p.z);
//       dummy.rotation.set(p.rx, p.ry, p.rz);

//       const depth = (p.z + 4) / 8;
//       dummy.scale.setScalar(p.scale * depth);

//       dummy.updateMatrix();
//       meshRef.current.setMatrixAt(i, dummy.matrix);
//     });

//     meshRef.current.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <instancedMesh ref={meshRef} args={[geo, null, count]}>
//       <meshPhysicalMaterial
//         color="#ffc1cc"
//         emissive="#ffd6e0"
//         emissiveIntensity={0.05}
//         roughness={0.5}
//         transmission={0.35}
//         transparent
//         opacity={0.75}
//         side={THREE.DoubleSide}
//       />
//     </instancedMesh>
//   );
// };

// /* ---------------- MAIN COMPONENT ---------------- */
// export default function BlossomFlower() {
//   return (
//     <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-[#fffafc] via-[#fdecef] to-[#fffafc]">

//       {/* 🌅 soft glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,180,0.15),transparent_70%)]" />

//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//         <ambientLight intensity={0.7} />

//         <directionalLight
//           position={[3, 6, 4]}
//           intensity={2}
//           color="#ffe4ec"
//         />

//         <pointLight
//           position={[0, 2, 3]}
//           intensity={1.2}
//           color="#ffd6cc"
//         />

//         <Environment preset="studio" />

//         <BlossomCore />
//         <FallingPetals count={120} />
//       </Canvas>
//     </div>
//   );
// }






import React, { useRef, useMemo } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- PETAL SHAPE ---------------- */
const petalShape = new THREE.Shape();
petalShape.moveTo(0, 0);
petalShape.bezierCurveTo(0.4, 0.2, 0.8, 0.8, 0.6, 1.6);
petalShape.bezierCurveTo(0.5, 2.0, 0.2, 1.8, 0, 1.4);
petalShape.bezierCurveTo(-0.2, 1.8, -0.5, 2.0, -0.6, 1.6);
petalShape.bezierCurveTo(-0.8, 0.8, -0.4, 0.2, 0, 0);

/* ---------------- SHARED GEOMETRY ---------------- */
let cachedGeo = null;
function getPetalGeo() {
  if (cachedGeo) return cachedGeo;

  const geo = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.015,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });

  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const curve = Math.abs(x) * 0.35;
    const curl = Math.max(0, y - 0.5) * 0.45;

    pos.setZ(i, z + curve - curl);
  }

  geo.computeVertexNormals();
  cachedGeo = geo;
  return geo;
}

/* ---------------- FLOWER ---------------- */
export const Flower = () => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    ref.current.rotation.y = Math.sin(t * 0.1) * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.05;
    ref.current.position.y = Math.sin(t * 0.6) * 0.05;

    const s = 1 + Math.sin(t * 0.8) * 0.02;
    ref.current.scale.set(s, s, s);
  });

  const geo = useMemo(() => getPetalGeo(), []);

  /* 🌸 MULTI-LAYER PETALS (more detail, still light) */
  const petals = useMemo(() => {
    const arr = [];

    const layers = [
      { count: 5, radius: 0.0, scale: 1.1 },
      { count: 5, radius: 0.15, scale: 1.0 },
      { count: 5, radius: 0.28, scale: 0.9 },
    ];

    layers.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;

        arr.push(
          <group
            key={`${li}-${i}`}
            position={[
              Math.cos(angle) * layer.radius,
              0,
              Math.sin(angle) * layer.radius,
            ]}
            rotation={[0, 0, angle]}
          >
            <mesh
              geometry={geo}
              rotation={[0.4 + li * 0.1, 0, 0]}
              scale={[layer.scale, layer.scale, layer.scale]}
            >
              <meshPhysicalMaterial
                color="#ff8fb1"
                emissive="#ffb3c7"
                emissiveIntensity={0.06}
                roughness={0.45}
                transmission={0.45}
                thickness={0.35}
                clearcoat={0.35}
                sheen={1}
                sheenColor="#ffd6e0"
                iridescence={0.25}
                iridescenceIOR={1.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      }
    });

    return arr;
  }, []);

  /* 🌼 CENTER */
  const center = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const h = 0.4 + Math.random() * 0.25;

      arr.push(
        <group key={i} rotation={[Math.random() * 0.4, angle, 0]}>
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[0.004, 0.008, h, 6]} />
            <meshStandardMaterial
              color="#ff6f91"
              emissive="#ff9bb3"
              emissiveIntensity={0.15}
            />
          </mesh>

          <mesh position={[0, h, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color="#ffd166"
              emissive="#ffe29a"
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      );
    }

    return arr;
  }, []);

  return (
    <Float floatIntensity={1.2} speed={1.2}>
      <group ref={ref} scale={1.2} rotation={[Math.PI / 4, 0, 0]}>
        {/* base */}
        <mesh position={[0, 0, -0.1]}>
          <sphereGeometry args={[0.25, 24, 12]} />
          <meshPhysicalMaterial
            color="#ff5c8a"
            roughness={0.6}
            clearcoat={0.3}
          />
        </mesh>

        {petals}

        <group rotation={[Math.PI / 2, 0, 0]}>{center}</group>
      </group>
    </Float>
  );
};

/* ---------------- FALLING PETALS ---------------- */
export const FallingPetals = ({ count = 35 }) => {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => getPetalGeo(), []);

  const particles = useMemo(() => {
    return new Array(count).fill().map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 8,
      z: (Math.random() - 0.5) * 6,

      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,

      speed: Math.random() * 0.012 + 0.006,
      spin: Math.random() * 0.02,
      scale: Math.random() * 0.18 + 0.1,
    }));
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;

    particles.forEach((p, i) => {
      p.y -= p.speed;

      p.x += Math.sin(p.y * 0.4 + i) * 0.015;
      p.z += Math.cos(p.y * 0.3 + i) * 0.01;

      p.rx += p.spin;
      p.ry += p.spin * 0.6;

      if (p.y < -5) p.y = 5;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);

      const depth = THREE.MathUtils.clamp((p.z + 3) / 6, 0.4, 1);
      dummy.scale.setScalar(p.scale * depth);

      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);

      // 🌸 slight color variation
      const color = new THREE.Color().setHSL(
        0.95 + Math.random() * 0.02,
        0.6,
        0.75 + Math.random() * 0.1
      );
      ref.current.setColorAt(i, color);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[geo, null, count]}>
      <meshPhysicalMaterial
        vertexColors
        roughness={0.5}
        transmission={0.3}
        transparent
        opacity={0.75}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

/* ---------------- MAIN ---------------- */
export default function BlossomFlower() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-[#fffafc] via-[#fdecef] to-[#fffafc]">

      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,180,0.15),transparent_70%)]" />

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={["#fff5f7", 3, 10]} />

        <ambientLight intensity={0.5} />

        <directionalLight position={[2, 5, 3]} intensity={1.8} color="#ffe4ec" />

        <pointLight position={[0, 1.5, 2]} intensity={1.5} color="#ffd6cc" />

        <Environment preset="studio" />

        <Flower />
        <FallingPetals count={35} />
      </Canvas>
    </div>
  );
}