<template>
  <div class="flex flex-col min-h-screen bg-[#0a0a16] text-white lg:grid lg:grid-cols-2">
    <!-- Top/Left Column: Content -->
    <div class="relative z-10 flex flex-col items-center justify-center order-1 pt-32 pb-16 lg:items-start lg:order-none">
      <div class="w-full px-8 text-center lg:text-left lg:pl-24 lg:pr-8">
        <h1
          class="bg-gradient-to-r from-white to-[#ff6ec7] bg-clip-text text-5xl font-extrabold leading-tight tracking-tighter text-transparent md:text-7xl mb-4"
          style="filter: drop-shadow(0 0 1rem rgba(255, 110, 199, 0.3))"
        >
          Tu futuro profesional comienza aquí
        </h1>
        <p class="mt-4 max-w-xl text-lg text-gray-300 md:text-xl">
          Bienvenido a la plataforma oficial de empleos de LEAD UNI, donde conectamos el talento del mañana con las oportunidades de hoy.
        </p>
        <router-link
          to="/ofertas"
          class="cta-button group relative mt-12 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#d93340] to-[#b62667] px-10 py-5 text-xl font-bold text-white"
        >
          <span class="z-10">Explorar Ofertas</span>
          <svg class="z-10 ml-3 h-6 w-6 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </router-link>
      </div>
    </div>

    <!-- Bottom/Right Column: Animation -->
    <div class="relative order-2 w-full h-[50vh] lg:h-full lg:order-none">
      <!-- Gradient Overlay for Desktop -->
      <div class="absolute left-0 top-0 z-10 hidden h-full w-48 bg-gradient-to-r from-[#0a0a16] via-[#0a0a16]/80 to-transparent lg:block"></div>

      <div ref="nexusContainer" class="absolute inset-0 z-0 overflow-visible pointer-events-none isolation-auto">
        <div
          v-for="node in nodes"
          :key="node.id"
          class="node animate-slow-pulse"
          :style="{
            transform: `translate(${node.x}px, ${node.y}px)`,
            width: `${node.size}px`,
            height: `${node.size}px`,
          }"
        ></div>
        <svg class="absolute left-0 top-0 h-full w-full overflow-visible" preserveAspectRatio="none">
          <line
            v-for="line in reactiveLines"
            :key="line.id"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            class="nexus-line"
            :style="{ animationDuration: line.duration }"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';

const nexusContainer = ref(null);
const nodes = ref([]);
const connections = ref([]);
const NUM_NODES = 20;
let connectionInterval;
let animationFrameId;
let resizeTimeout;

// --- Animation Engine ---
const createNodes = (width, height) => {
  const nodeArray = [];
  const margin = 40;
  for (let i = 0; i < NUM_NODES; i++) {
    nodeArray.push({
      id: i,
      x: Math.random() * (width - margin * 2) + margin,
      y: Math.random() * (height - margin * 2) + margin,
      size: Math.random() < 0.3 ? 10 : 5, // Primary and secondary sizes
      baseX: Math.random() * (width - margin * 2) + margin,
      baseY: Math.random() * (height - margin * 2) + margin,
      angle: Math.random() * 2 * Math.PI,
      speed: (Math.random() * 0.2) + 0.1,
      radius: Math.random() * 20 + 10,
    });
  }
  nodes.value = nodeArray;
};

const updateNodes = () => {
  const time = Date.now() * 0.0005;
  nodes.value.forEach(node => {
    node.angle += node.speed * 0.1;
    node.x = node.baseX + Math.cos(node.angle + time) * node.radius;
    node.y = node.baseY + Math.sin(node.angle + time) * node.radius;
  });
  animationFrameId = requestAnimationFrame(updateNodes);
};

// --- Connection Logic ---
const distance = (node1, node2) => Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));

const createConnections = () => {
  if (nodes.value.length === 0) return;
  const newConnections = [];
  const addedPairs = new Set();

  for (let i = 0; i < nodes.value.length; i++) {
    const sourceNode = nodes.value[i];
    const neighbors = nodes.value.map((node, index) => ({ index, dist: distance(sourceNode, node) })).filter(n => n.index !== i).sort((a, b) => a.dist - b.dist);

    for (let k = 0; k < 2; k++) { // Connect to 2 nearest neighbors
      if(neighbors[k]) {
        const targetNodeIndex = neighbors[k].index;
        const pairKey = i < targetNodeIndex ? `${i}-${targetNodeIndex}` : `${targetNodeIndex}-${i}`;
        if (!addedPairs.has(pairKey)) {
          newConnections.push({ id: `conn-${pairKey}`, from: i, to: targetNodeIndex, duration: `${6 + Math.random() * 5}s` });
          addedPairs.add(pairKey);
        }
      }
    }
  }
  // Ensure at least 10 lines
  while (newConnections.length < 10 && newConnections.length < (NUM_NODES * (NUM_NODES - 1)) / 2) {
    const i = Math.floor(Math.random() * NUM_NODES);
    const j = Math.floor(Math.random() * NUM_NODES);
    if (i === j) continue;
    const pairKey = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (!addedPairs.has(pairKey)) {
      newConnections.push({ id: `conn-${pairKey}`, from: i, to: j, duration: `${6 + Math.random() * 5}s` });
      addedPairs.add(pairKey);
    }
  }
  connections.value = newConnections;
};

const reactiveLines = computed(() => {
  return connections.value.map(conn => {
    const fromNode = nodes.value[conn.from];
    const toNode = nodes.value[conn.to];
    if (!fromNode || !toNode) return {};
    return { id: conn.id, x1: fromNode.x + fromNode.size / 2, y1: fromNode.y + fromNode.size / 2, x2: toNode.x + toNode.size / 2, y2: toNode.y + toNode.size / 2, duration: conn.duration };
  });
});

// --- Lifecycle & Resize ---
const cleanupAnimation = () => {
  clearInterval(connectionInterval);
  cancelAnimationFrame(animationFrameId);
  nodes.value = [];
  connections.value = [];
};

const initAnimation = () => {
  cleanupAnimation();
  nextTick(() => {
    if (nexusContainer.value) {
      const { width, height } = nexusContainer.value.getBoundingClientRect();
      if (width > 0 && height > 0) {
        createNodes(width, height);
        createConnections();
        connectionInterval = setInterval(createConnections, 3000);
        updateNodes();
      }
    }
  });
};

const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initAnimation, 250); // Debounced resize
};

onMounted(() => {
  initAnimation();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cleanupAnimation();
});
</script>

<style scoped>
/* Node Styling and Animation */
@keyframes slow-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
.node {
  position: absolute; left: 0; top: 0; z-index: 10; border-radius: 9999px;
  background-image: radial-gradient(circle, #ff6ec7 0%, #b62667 100%);
  box-shadow: 0 0 20px 4px rgba(255, 110, 199, 1);
}
.animate-slow-pulse { animation: slow-pulse 5s ease-in-out infinite; }
.node::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%); width: 200%; height: 200%;
  border-radius: 9999px; background-color: #ff2d95;
  filter: blur(20px); z-index: -1; opacity: 0.5;
}

/* Connection Styling and Animation */
@keyframes connect {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.6; }
}
@keyframes flow {
  from { stroke-dashoffset: 20; }
  to { stroke-dashoffset: 0; }
}
.nexus-line {
  stroke: #ff2d95; stroke-width: 2px; stroke-dasharray: 10 5;
  filter: drop-shadow(0 0 5px #ff2d95);
  animation: connect linear infinite, flow linear infinite 6s;
}

/* CTA Button Hover Effect */
@keyframes pulse-shadow {
  0%, 100% { box-shadow: 0 0 25px rgba(217, 51, 64, 0.5); }
  50% { box-shadow: 0 0 40px rgba(182, 38, 103, 0.8); }
}
.cta-button:hover { animation: pulse-shadow 2s infinite ease-in-out; }
</style>