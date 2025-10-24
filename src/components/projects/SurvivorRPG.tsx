import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import './style/SurvivorRPG.css';

// --- TYPE DEFINITIONS ---
interface Vector {
  x: number;
  y: number;
}

interface GameObject {
  pos: Vector;
  radius: number;
}

interface Player extends GameObject {
  speed: number;
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  attackSpeed: number; // attacks per second
  projectileSpeed: number;
  damage: number;
  lastAttackTime: number;
  pickupRadius: number;
  projectileCount: number;
  xpGainMultiplier: number;
}

interface Enemy extends GameObject {
  id: number;
  speed: number;
  hp: number;
  maxHp: number;
  damage: number;
  xpValue: number;
}

interface Projectile extends GameObject {
  id: number;
  velocity: Vector;
  damage: number;
  lifespan: number; // in frames
}

interface XPOrb extends GameObject {
  id: number;
  value: number;
}

interface Upgrade {
  title: string;
  description: string;
  apply: (player: Player) => void;
}

const initialPlayerState: Player = {
  pos: { x: 0, y: 0 },
  radius: 0.5,
  speed: 5, // Adjusted speed for the new model
  hp: 150,
  maxHp: 150,
  level: 1,
  xp: 0,
  xpToNextLevel: 10,
  attackSpeed: 1.2,
  projectileSpeed: 7,
  damage: 15,
  lastAttackTime: 0,
  pickupRadius: 3,
  projectileCount: 2,
  xpGainMultiplier: 1,
};

// --- UI Component ---
const UI = ({ player, gameTime }: { player: Player; gameTime: number }) => (
  <div className="survivor-ui">
    <div className="ui-bar-container">
      <div
        className="ui-bar health-bar"
        style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
      ></div>
      <div className="ui-bar-text">
        {Math.ceil(player.hp)} / {player.maxHp}
      </div>
    </div>
    <div className="ui-bar-container">
      <div
        className="ui-bar xp-bar"
        style={{ width: `${(player.xp / player.xpToNextLevel) * 100}%` }}
      ></div>
      <div className="ui-bar-text">Lvl {player.level}</div>
    </div>
    <div className="game-time">Time: {Math.floor(gameTime)}s</div>
  </div>
);

// --- SCENERY FUNCTIONS ---
const createGroundTexture = () => {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  if (!context) {
    return null;
  }

  context.fillStyle = '#3a4a3a'; // Dark green base
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 1.5;
    context.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`; // Darker specks
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 1;
    context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`; // Lighter specks
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  return canvas;
};

const createTrees = (
  scene: THREE.Scene,
  count: number,
  area: { width: number; height: number },
) => {
  const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // Brown for trunk
  const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // Forest green for leaves

  for (let i = 0; i < count; i++) {
    const tree = new THREE.Group();

    const trunkHeight = Math.random() * 2 + 1;
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, trunkHeight, 8);
    const trunk = new THREE.Mesh(trunkGeo, treeMaterial);
    trunk.castShadow = true;
    trunk.position.y = trunkHeight / 2;
    tree.add(trunk);

    const leavesHeight = Math.random() * 3 + 2;
    const leavesGeo = new THREE.ConeGeometry(1.5, leavesHeight, 8);
    const leaves = new THREE.Mesh(leavesGeo, leavesMaterial);
    leaves.castShadow = true;
    leaves.position.y = trunkHeight + leavesHeight / 2 - 0.5;
    tree.add(leaves);

    const x = THREE.MathUtils.randFloat(-area.width / 2, area.width / 2);
    const z = THREE.MathUtils.randFloat(-area.height / 2, area.height / 2);

    tree.position.set(x, 0, z);
    scene.add(tree);
  }
};

// --- CHARACTER MODELS ---
const createPlayerModel = () => {
  const playerGroup = new THREE.Group();
  playerGroup.scale.set(0.4, 0.4, 0.4);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    roughness: 0.6,
    metalness: 0.3,
  });
  const bodyGeo = new THREE.BoxGeometry(0.9, 1.2, 0.5);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.6;
  body.castShadow = true;
  body.name = 'body';
  playerGroup.add(body);

  const headMat = new THREE.MeshStandardMaterial({
    color: 0xf8e71c,
    roughness: 0.7,
  });
  const headGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 1.5;
  head.castShadow = true;
  head.name = 'head';
  playerGroup.add(head);

  const armMat = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    roughness: 0.6,
    metalness: 0.3,
  });
  const armGeo = new THREE.BoxGeometry(0.25, 1, 0.25);

  const leftArm = new THREE.Mesh(armGeo, armMat);
  leftArm.position.set(-0.7, 0.6, 0);
  leftArm.castShadow = true;
  leftArm.name = 'leftArm';
  playerGroup.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, armMat);
  rightArm.position.set(0.7, 0.6, 0);
  rightArm.castShadow = true;
  rightArm.name = 'rightArm';
  playerGroup.add(rightArm);

  const legMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.8,
  });
  const legGeo = new THREE.BoxGeometry(0.3, 1, 0.3);

  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.25, -0.4, 0);
  leftLeg.castShadow = true;
  leftLeg.name = 'leftLeg';
  playerGroup.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.25, -0.4, 0);
  rightLeg.castShadow = true;
  rightLeg.name = 'rightLeg';
  playerGroup.add(rightLeg);

  return playerGroup;
};

const createHumanoidEnemyModel = () => {
  const enemyGroup = new THREE.Group();
  enemyGroup.scale.set(0.4, 0.4, 0.4);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff6347,
    roughness: 0.8,
  });
  const bodyGeo = new THREE.BoxGeometry(0.9, 1.2, 0.5);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.6;
  body.castShadow = true;
  enemyGroup.add(body);

  const headMat = new THREE.MeshStandardMaterial({
    color: 0xffa07a,
    roughness: 0.7,
  });
  const headGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 1.5;
  head.castShadow = true;
  enemyGroup.add(head);

  const legMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.8,
  });
  const legGeo = new THREE.BoxGeometry(0.3, 1, 0.3);

  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.25, -0.4, 0);
  leftLeg.castShadow = true;
  enemyGroup.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.25, -0.4, 0);
  rightLeg.castShadow = true;
  enemyGroup.add(rightLeg);

  return enemyGroup;
};

const createBossEnemyModel = () => {
  const bossGroup = new THREE.Group();
  bossGroup.scale.set(1, 1, 1);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x8b0000,
    roughness: 0.8,
    metalness: 0.5,
  });
  const bodyGeo = new THREE.DodecahedronGeometry(2, 0);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.position.y = 2;
  bossGroup.add(body);

  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffff00,
  });
  const eyeGeo = new THREE.SphereGeometry(0.3, 16, 16);
  const eye = new THREE.Mesh(eyeGeo, eyeMat);
  eye.position.set(0, 2.5, 1.5);
  bossGroup.add(eye);

  return bossGroup;
};

const SurvivorRPG = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // --- Game State Refs ---
  const playerRef = useRef<Player>(
    JSON.parse(JSON.stringify(initialPlayerState)),
  );
  const enemiesRef = useRef<Enemy[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const xpOrbsRef = useRef<XPOrb[]>([]);
  const keys = useRef<Record<string, boolean>>({});

  // --- UI State ---
  const [gameTime, setGameTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [upgradeChoices, setUpgradeChoices] = useState<Upgrade[]>([]);
  const [isSpecialLevelUp, setIsSpecialLevelUp] = useState(false);
  const [specialUpgradeChoices, setSpecialUpgradeChoices] = useState<Upgrade[]>(
    [],
  );
  const [uiUpdate, setUiUpdate] = useState(0);

  const stateRef = useRef({
    isGameOver,
    isLevelUp,
    isPaused,
    isSpecialLevelUp,
  });
  stateRef.current = { isGameOver, isLevelUp, isPaused, isSpecialLevelUp };

  const gameArea = { width: 200, height: 200 };

  // --- THREE.js refs ---
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const playerMeshRef = useRef<THREE.Group>();
  const groundRef = useRef<THREE.Mesh>();
  const gridHelperRef = useRef<THREE.GridHelper>();
  const enemyMeshes = useRef(new Map<number, THREE.Group>());
  const projectileMeshes = useRef(new Map<number, THREE.Mesh>());
  const xpOrbMeshes = useRef(new Map<number, THREE.Mesh>());

  const upgradesRef = useRef<Upgrade[]>([
    {
      title: 'Velocidade de Ataque',
      description: 'Aumenta a velocidade de ataque em 15%.',
      apply: (p) => {
        p.attackSpeed *= 1.15;
      },
    },
    {
      title: 'Velocidade de Projéteis',
      description: 'Aumenta a velocidade dos projéteis em 10%.',
      apply: (p) => {
        p.projectileSpeed *= 1.1;
      },
    },
    {
      title: 'Dano Aumentado',
      description: 'Aumenta o dano em 5.',
      apply: (p) => {
        p.damage += 5;
      },
    },
    {
      title: 'Mais Vida',
      description: 'Aumenta a vida máxima em 20.',
      apply: (p) => {
        p.maxHp += 20;
        p.hp += 20;
      },
    },
    {
      title: 'Imã de XP',
      description: 'Aumenta o raio de coleta de XP.',
      apply: (p) => {
        p.pickupRadius *= 1.25;
      },
    },
    {
      title: 'Velocidade de Movimento',
      description: 'Aumenta a velocidade de movimento em 10%.',
      apply: (p) => {
        p.speed *= 1.1;
      },
    },
    {
      title: 'Adiciona Projéteis',
      description: 'Aumenta o número de projéteis em 20%.',
      apply: (p) => {
        p.projectileCount = Math.round(p.projectileCount * 1.5);
      },
    },
    {
      title: 'Aumento de XP',
      description: 'Aumenta em 40% a experiência recebida.',
      apply: (p) => {
        p.xpGainMultiplier = (p.xpGainMultiplier || 1) * 1.4;
      },
    },
  ]);

  const restartGame = useCallback(() => {
    playerRef.current = JSON.parse(JSON.stringify(initialPlayerState));
    enemiesRef.current = [];
    projectilesRef.current = [];
    xpOrbsRef.current = [];
    setGameTime(0);
    setIsGameOver(false);
    setIsLevelUp(false);
    setIsSpecialLevelUp(false);
    setIsPaused(false); // Reset pause state on restart

    // Clear meshes
    enemyMeshes.current.forEach((mesh) => sceneRef.current?.remove(mesh));
    enemyMeshes.current.clear();
    projectileMeshes.current.forEach((mesh) => sceneRef.current?.remove(mesh));
    projectileMeshes.current.clear();
    xpOrbMeshes.current.forEach((mesh) => sceneRef.current?.remove(mesh));
    xpOrbMeshes.current.clear();

    // Reset ground color
    if (groundRef.current) {
      (groundRef.current.material as THREE.MeshStandardMaterial).color =
        new THREE.Color(0x4a5a4a);
    }

    // Remove and re-add grid helper to reset its position
    if (sceneRef.current && gridHelperRef.current) {
      sceneRef.current.remove(gridHelperRef.current);
      gridHelperRef.current.dispose();
      gridHelperRef.current = undefined;
    }
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      mountRef.current?.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  // --- INPUT HANDLING ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'escape') {
        setIsPaused((prev) => !prev);
      }
      keys.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // --- GAME LOGIC FUNCTIONS ---
  let walkAnimationTime = 0;

  const animatePlayer = (
    isMoving: boolean,
    playerMesh: THREE.Group,
    delta: number,
  ) => {
    if (!playerMesh) return;

    const leftArm = playerMesh.getObjectByName('leftArm');
    const rightArm = playerMesh.getObjectByName('rightArm');
    const leftLeg = playerMesh.getObjectByName('leftLeg');
    const rightLeg = playerMesh.getObjectByName('rightLeg');

    const animationSpeed = 12;
    const swingAngle = 0.9;
    const bobAmount = 0.05;

    if (isMoving) {
      walkAnimationTime += delta * animationSpeed;
      const swing = Math.sin(walkAnimationTime) * swingAngle;
      const bob = Math.abs(Math.sin(walkAnimationTime)) * bobAmount;

      if (leftArm) leftArm.rotation.x = swing;
      if (rightArm) rightArm.rotation.x = -swing;
      if (leftLeg) leftLeg.rotation.x = -swing;
      if (rightLeg) rightLeg.rotation.x = swing;

      playerMesh.position.y = 0.5 + bob; // Add bobbing motion
    } else {
      walkAnimationTime = 0;
      // Smoothly return to default position
      const lerpFactor = delta * 10;
      if (leftArm)
        leftArm.rotation.x = THREE.MathUtils.lerp(
          leftArm.rotation.x,
          0,
          lerpFactor,
        );
      if (rightArm)
        rightArm.rotation.x = THREE.MathUtils.lerp(
          rightArm.rotation.x,
          0,
          lerpFactor,
        );
      if (leftLeg)
        leftLeg.rotation.x = THREE.MathUtils.lerp(
          leftLeg.rotation.x,
          0,
          lerpFactor,
        );
      if (rightLeg)
        rightLeg.rotation.x = THREE.MathUtils.lerp(
          rightLeg.rotation.x,
          0,
          lerpFactor,
        );

      playerMesh.position.y = THREE.MathUtils.lerp(
        playerMesh.position.y,
        0.5,
        lerpFactor,
      );
    }
  };

  const animateShoot = (playerMesh: THREE.Group) => {
    if (!playerMesh) return;

    const rightArm = playerMesh.getObjectByName('rightArm');
    if (rightArm) {
      const initialRotation = rightArm.rotation.x;
      const targetRotation = initialRotation - Math.PI / 4;

      let step = 0;
      const animate = () => {
        step++;
        if (step <= 5) {
          rightArm.rotation.x -= Math.PI / 4 / 5;
        } else if (step <= 10) {
          rightArm.rotation.x += Math.PI / 4 / 5;
        } else {
          return;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  };

  const updatePlayer = (timestamp: number): boolean => {
    const player = playerRef.current;
    const moveSpeed = player.speed * (1 / 60);
    let moved = false;

    const moveDirection = new THREE.Vector2(0, 0);

    if (keys.current['w'] || keys.current['arrowup']) {
      moveDirection.y -= 1;
    }
    if (keys.current['s'] || keys.current['arrowdown']) {
      moveDirection.y += 1;
    }
    if (keys.current['a'] || keys.current['arrowleft']) {
      moveDirection.x -= 1;
    }
    if (keys.current['d'] || keys.current['arrowright']) {
      moveDirection.x += 1;
    }

    if (moveDirection.length() > 0) {
      moved = true;
      moveDirection.normalize().multiplyScalar(moveSpeed);
      player.pos.x += moveDirection.x;
      player.pos.y += moveDirection.y;

      // Rotate player model to face movement direction
      if (playerMeshRef.current) {
        const angle = Math.atan2(moveDirection.x, moveDirection.y);
        playerMeshRef.current.rotation.y = angle;
      }
    }

    player.pos.x = Math.max(
      -gameArea.width / 2,
      Math.min(gameArea.width / 2, player.pos.x),
    );
    player.pos.y = Math.max(
      -gameArea.height / 2,
      Math.min(gameArea.height / 2, player.pos.y),
    );

    if (playerMeshRef.current) {
      // We now set the y position in animatePlayer
      playerMeshRef.current.position.x = player.pos.x;
      playerMeshRef.current.position.z = player.pos.y;
    }

    if (timestamp - player.lastAttackTime > 1000 / player.attackSpeed) {
      const closestEnemy = findClosestEnemy();
      if (closestEnemy) {
        attack(closestEnemy);
        player.lastAttackTime = timestamp;
      }
    }
    return moved;
  };

  const updateEnemies = () => {
    const player = playerRef.current;
    enemiesRef.current.forEach((enemy) => {
      const angle = Math.atan2(
        player.pos.y - enemy.pos.y,
        player.pos.x - enemy.pos.x,
      );
      const moveSpeed = enemy.speed * (1 / 60);
      enemy.pos.x += Math.cos(angle) * moveSpeed;
      enemy.pos.y += Math.sin(angle) * moveSpeed;

      const mesh = enemyMeshes.current.get(enemy.id);
      if (mesh) {
        if (enemy.radius === 2) {
          // It's a boss
          mesh.position.set(enemy.pos.x, 0, enemy.pos.y);
        } else {
          // It's a humanoid
          mesh.position.set(enemy.pos.x, 0.36, enemy.pos.y);
        }
      }
    });
  };

  const updateProjectiles = () => {
    projectilesRef.current = projectilesRef.current.filter((p) => {
      const moveSpeed = 1 / 60;
      p.pos.x += p.velocity.x * moveSpeed;
      p.pos.y += p.velocity.y * moveSpeed;
      p.lifespan -= 1;

      const mesh = projectileMeshes.current.get(p.id);
      if (mesh) {
        mesh.position.set(p.pos.x, 0.5, p.pos.y);
      }

      if (p.lifespan <= 0) {
        if (mesh) {
          sceneRef.current?.remove(mesh);
          projectileMeshes.current.delete(p.id);
        }
        return false;
      }
      return true;
    });
  };

  const updateXPOrbs = () => {
    const player = playerRef.current;
    xpOrbsRef.current.forEach((orb) => {
      const distance = Math.hypot(
        player.pos.x - orb.pos.x,
        player.pos.y - orb.pos.y,
      );
      if (distance < player.pickupRadius) {
        const angle = Math.atan2(
          player.pos.y - orb.pos.y,
          player.pos.x - orb.pos.x,
        );
        const moveSpeed = 8 * (1 / 60);
        orb.pos.x += Math.cos(angle) * moveSpeed;
        orb.pos.y += Math.sin(angle) * moveSpeed;

        const mesh = xpOrbMeshes.current.get(orb.id);
        if (mesh) {
          mesh.position.set(orb.pos.x, 0.2, orb.pos.y);
        }
      }
    });
  };

  const handleCollisions = () => {
    const player = playerRef.current;

    projectilesRef.current = projectilesRef.current.filter((p) => {
      let hit = false;
      enemiesRef.current = enemiesRef.current.filter((enemy) => {
        const distance = Math.hypot(
          p.pos.x - enemy.pos.x,
          p.pos.y - enemy.pos.y,
        );
        if (distance < p.radius + enemy.radius) {
          hit = true;
          enemy.hp -= p.damage;
          if (enemy.hp <= 0) {
            const orbId = Date.now() + Math.random();
            xpOrbsRef.current.push({
              id: orbId,
              pos: enemy.pos,
              radius: 0.2,
              value: enemy.xpValue,
            });
            const orbGeo = new THREE.SphereGeometry(0.2, 8, 8);
            const orbMat = new THREE.MeshStandardMaterial({
              color: 0x00ffff,
              emissive: 0x00ffff,
            });
            const orbMesh = new THREE.Mesh(orbGeo, orbMat);
            orbMesh.position.set(enemy.pos.x, 0.2, enemy.pos.y);
            xpOrbMeshes.current.set(orbId, orbMesh);
            sceneRef.current?.add(orbMesh);

            const mesh = enemyMeshes.current.get(enemy.id);
            if (mesh) {
              sceneRef.current?.remove(mesh);
              enemyMeshes.current.delete(enemy.id);
            }
            return false;
          }
        }
        return true;
      });

      if (hit) {
        const mesh = projectileMeshes.current.get(p.id);
        if (mesh) {
          sceneRef.current?.remove(mesh);
          projectileMeshes.current.delete(p.id);
        }
      }
      return !hit;
    });

    enemiesRef.current = enemiesRef.current.filter((enemy) => {
      const distance = Math.hypot(
        player.pos.x - enemy.pos.x,
        player.pos.y - enemy.pos.y,
      );
      if (distance < player.radius + enemy.radius) {
        player.hp -= enemy.damage;
        if (player.hp <= 0) {
          player.hp = 0;
          setIsGameOver(true);
        }
        const mesh = enemyMeshes.current.get(enemy.id);
        if (mesh) {
          sceneRef.current?.remove(mesh);
          enemyMeshes.current.delete(enemy.id);
        }
        return false;
      }
      return true;
    });

    xpOrbsRef.current = xpOrbsRef.current.filter((orb) => {
      const distance = Math.hypot(
        player.pos.x - orb.pos.x,
        player.pos.y - orb.pos.y,
      );
      if (distance < player.radius + 0.2) {
        gainXP(orb.value);
        const mesh = xpOrbMeshes.current.get(orb.id);
        if (mesh) {
          sceneRef.current?.remove(mesh);
          xpOrbMeshes.current.delete(orb.id);
        }
        return false;
      }
      return true;
    });
  };

  const gainXP = (amount: number) => {
    const player = playerRef.current;
    player.xp += amount * (player.xpGainMultiplier || 1);
    if (player.xp >= player.xpToNextLevel) {
      player.level += 1;
      player.xp -= player.xpToNextLevel;
      player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.2);
      player.hp = player.maxHp;

      if (player.level % 10 === 0) {
        const specialUpgrades = [
          {
            title: 'Dano Massivo',
            description: 'Aumenta o dano em 25%.',
            apply: (p: Player) => {
              p.damage *= 1.25;
            },
          },
          {
            title: 'Projétil Extra',
            description: 'Dispara um projétil adicional.',
            apply: (p: Player) => {
              p.projectileCount += 1;
            },
          },
        ];
        setSpecialUpgradeChoices(specialUpgrades);
        setIsSpecialLevelUp(true);
      } else {
        const shuffled = [...upgradesRef.current].sort(
          () => 0.5 - Math.random(),
        );
        setUpgradeChoices(shuffled.slice(0, 3));
        setIsLevelUp(true);
      }

      // Change ground color on level up
      if (groundRef.current) {
        const newColor = new THREE.Color(Math.random() * 0xffffff);
        (groundRef.current.material as THREE.MeshStandardMaterial).color =
          newColor;
      }
    }
  };

  const applyUpgrade = (upgrade: Upgrade) => {
    upgrade.apply(playerRef.current);
    setIsLevelUp(false);
  };

  const applySpecialUpgrade = (upgrade: Upgrade) => {
    upgrade.apply(playerRef.current);
    setIsSpecialLevelUp(false);
  };

  const spawnEnemies = () => {
    const player = playerRef.current;
    const maxEnemies = 30 + (player.level - 1) * 10;
    const spawnChance = 0.02 + (player.level - 1) * 0.01;

    if (enemiesRef.current.length < maxEnemies && Math.random() < spawnChance) {
      const side = Math.floor(Math.random() * 4);
      let pos: Vector;
      const x = gameArea.width / 2;
      const y = gameArea.height / 2;
      switch (side) {
        case 0:
          pos = { x: -x, y: THREE.MathUtils.randFloat(-y, y) };
          break;
        case 1:
          pos = { x: x, y: THREE.MathUtils.randFloat(-y, y) };
          break;
        case 2:
          pos = { x: THREE.MathUtils.randFloat(-x, x), y: -y };
          break;
        default:
          pos = { x: THREE.MathUtils.randFloat(-x, x), y: y };
          break;
      }

      const levelModifier = 1 + gameTime / 75;
      const enemyId = Date.now() + Math.random();
      let newEnemy: Enemy;
      let mesh: THREE.Group;

      // Boss spawn logic
      if (Math.random() < 0.05) {
        // 5% chance to spawn a boss
        newEnemy = {
          id: enemyId,
          pos,
          radius: 2,
          speed: 0.5 + Math.random() * 0.2 * levelModifier,
          hp: Math.floor(200 * levelModifier),
          maxHp: Math.floor(200 * levelModifier),
          damage: Math.floor(20 * levelModifier),
          xpValue: 50,
        };
        mesh = createBossEnemyModel();
      } else {
        // Normal enemy spawn
        newEnemy = {
          id: enemyId,
          pos,
          radius: 0.5,
          speed: 1 + Math.random() * 0.5 * levelModifier,
          hp: Math.floor(20 * levelModifier),
          maxHp: Math.floor(20 * levelModifier),
          damage: Math.floor(5 * levelModifier),
          xpValue: 2,
        };
        mesh = createHumanoidEnemyModel();
      }

      enemiesRef.current.push(newEnemy);

      mesh.position.set(pos.x, 0.5, pos.y);
      mesh.castShadow = true;
      enemyMeshes.current.set(enemyId, mesh);
      sceneRef.current?.add(mesh);
    }
  };

  const findClosestEnemy = () => {
    const player = playerRef.current;
    let closest: Enemy | null = null;
    let minDistance = Infinity;
    enemiesRef.current.forEach((enemy) => {
      const distance = Math.hypot(
        player.pos.x - enemy.pos.x,
        player.pos.y - enemy.pos.y,
      );
      if (distance < minDistance) {
        minDistance = distance;
        closest = enemy;
      }
    });
    return closest;
  };

  const attack = (target: Enemy) => {
    const player = playerRef.current;

    if (playerMeshRef.current) {
      animateShoot(playerMeshRef.current);
    }

    const angle = Math.atan2(
      target.pos.y - player.pos.y,
      target.pos.x - player.pos.x,
    );
    const projectileId = Date.now() + Math.random();
    const newProjectile: Projectile = {
      id: projectileId,
      pos: { ...player.pos },
      radius: 0.2,
      velocity: {
        x: Math.cos(angle) * player.projectileSpeed,
        y: Math.sin(angle) * player.projectileSpeed,
      },
      damage: player.damage,
      lifespan: 240, // Increased lifespan
    };
    projectilesRef.current.push(newProjectile);

    const geo = new THREE.ConeGeometry(0.1, 0.5, 8);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2; // Point the cone forward

    const light = new THREE.PointLight(0xffff00, 1, 5);
    mesh.add(light);

    mesh.position.set(player.pos.x, 0.5, player.pos.y);
    mesh.castShadow = true;
    projectileMeshes.current.set(projectileId, mesh);
    sceneRef.current?.add(mesh);
  };

  // --- GAME SETUP & LOOP ---
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x282c34);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 15, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const groundGeo = new THREE.PlaneGeometry(gameArea.width, gameArea.height);
    const groundTexture = new THREE.CanvasTexture(createGroundTexture()!);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ map: groundTexture });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    groundRef.current = ground;

    createTrees(scene, 150, gameArea);

    const playerMesh = createPlayerModel();
    playerMeshRef.current = playerMesh;
    scene.add(playerMesh);

    const gridHelper = new THREE.GridHelper(gameArea.width, gameArea.width / 5);
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    let lastTimestamp = 0;

    const gameLoop = (timestamp: number) => {
      if (stateRef.current.isGameOver) {
        renderer.render(scene, cameraRef.current!);
        return;
      }

      const player = playerRef.current;

      if (stateRef.current.isPaused || stateRef.current.isLevelUp) {
        renderer.render(scene, cameraRef.current!);
        if (cameraRef.current) {
          cameraRef.current.position.set(player.pos.x, 8, player.pos.y + 7);
          cameraRef.current.lookAt(player.pos.x, 0, player.pos.y);
        }
        return;
      }

      const deltaTime = (timestamp - lastTimestamp) / 1000 || 0;
      lastTimestamp = timestamp;

      setGameTime((prev) => prev + deltaTime);

      const isMoving = updatePlayer(timestamp);
      if (playerMeshRef.current) {
        animatePlayer(isMoving, playerMeshRef.current, deltaTime);
      }
      updateProjectiles();
      updateEnemies();
      updateXPOrbs();
      handleCollisions();
      spawnEnemies();

      if (cameraRef.current) {
        const cameraTargetPosition = new THREE.Vector3(
          player.pos.x,
          12,
          player.pos.y + 8,
        );
        cameraRef.current.position.lerp(cameraTargetPosition, 0.05);

        const lookAtTarget = new THREE.Vector3(player.pos.x, 0, player.pos.y);
        cameraRef.current.lookAt(lookAtTarget);
      }

      if (gridHelperRef.current) {
        gridHelperRef.current.position.set(player.pos.x, 0, player.pos.y);
      }

      setUiUpdate((u) => u + 1);

      renderer.render(scene, cameraRef.current!);
    };

    renderer.setAnimationLoop(gameLoop);

    const handleResize = () => {
      if (cameraRef.current) {
        cameraRef.current.aspect = mount.clientWidth / mount.clientHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      if (sceneRef.current && gridHelperRef.current) {
        sceneRef.current.remove(gridHelperRef.current);
        gridHelperRef.current.dispose();
      }
    };
  }, []); // Removed dependencies to avoid re-triggering useEffect

  return (
    <div className="survivor-rpg-container">
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <UI player={playerRef.current} gameTime={gameTime} />
      <button onClick={toggleFullScreen} className="fullscreen-button">
        Tela Cheia
      </button>
      {isLevelUp && (
        <div className="level-up-screen">
          <h2>Level Up!</h2>
          <p>Escolha uma melhoria:</p>
          <div className="upgrade-choices">
            {upgradeChoices.map((upgrade, index) => (
              <div
                key={index}
                className="upgrade-card"
                onClick={() => applyUpgrade(upgrade)}
              >
                <h3>{upgrade.title}</h3>
                <p>{upgrade.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {isPaused && !isLevelUp && (
        <div className="pause-screen">
          <h2>Jogo Pausado</h2>
          <p>Pressione ESC para continuar</p>
        </div>
      )}
      {isGameOver && (
        <div className="game-over-screen">
          <h2>Game Over</h2>
          <p>Você sobreviveu por {Math.floor(gameTime)} segundos.</p>
          <p>Nível alcançado: {playerRef.current.level}</p>
          <button onClick={restartGame}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorRPG;
