<script>
  import { onMount, onDestroy } from 'svelte';
  import { RoseScene } from './lib/scene';
  import Controls from './components/Controls.svelte';
  import FormulaDisplay from './components/FormulaDisplay.svelte';

  const defaultParams = {
    a: 1.5,
    b: 1.1,
    c: 0.5,
    tau: 4.8,
    h: 2.1,
    d: 0.55,
    eps: 0.17,
    lambda: 0.5,
    N: 5,
    nu: 220,
    nv: 110
  };

  let params = { ...defaultParams };
  let canvas;
  let sceneManager;

  onMount(() => {
    sceneManager = new RoseScene(canvas);
    sceneManager.updateRose(params);
  });

  onDestroy(() => {
    if (sceneManager) sceneManager.dispose();
  });

  // Reactive update when any property of params changes
  $: if (sceneManager && params) {
    // Svelte 4 trick to track all properties if params is bound/reassigned
    params; 
    sceneManager.updateRose(params);
  }

  function handleReset() {
    params = { ...defaultParams };
  }
</script>

<main class="background-animate">
  <div class="sant-jordi-card">
    <header>
      <h1>Feliç Sant Jordi</h1>
      <div class="divider"></div>
    </header>

    <div class="canvas-container">
      <canvas bind:this={canvas}></canvas>
    </div>

    <div class="card-footer">
      <FormulaDisplay />
      
      <div class="controls-drawer">
        <Controls bind:params={params} onReset={handleReset} />
      </div>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
  }

  .background-animate {
    background: radial-gradient(circle at center, #4a0404 0%, #1a0505 100%);
    position: relative;
    overflow: hidden;
  }

  .background-animate::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 70% 70%, rgba(255, 0, 0, 0.1) 0%, transparent 40%);
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .sant-jordi-card {
    position: relative;
    width: 100%;
    max-width: 900px;
    height: 90vh;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(30px) saturate(150%);
    border-radius: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    padding: 3rem;
    box-sizing: border-box;
    z-index: 10;
  }

  header {
    text-align: center;
    margin-bottom: 1rem;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 800;
    font-style: italic;
    margin: 0;
    background: linear-gradient(to right, #ffd700, #ff4d4d, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
    letter-spacing: -0.02em;
  }

  .divider {
    height: 2px;
    width: 60px;
    background: linear-gradient(to right, transparent, #ffd700, transparent);
    margin: 1rem auto;
  }

  .canvas-container {
    flex: 1;
    min-height: 0;
    position: relative;
    cursor: grab;
  }

  .canvas-container:active {
    cursor: grabbing;
  }

  canvas {
    width: 100%;
    height: 100%;
    outline: none;
  }

  .card-footer {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .controls-drawer {
    max-height: 200px;
    overflow-y: auto;
    padding-right: 1rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  .controls-drawer::-webkit-scrollbar {
    width: 4px;
  }

  .controls-drawer::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    h1 { font-size: 2.2rem; }
    .sant-jordi-card { padding: 1.5rem; border-radius: 20px; }
  }
</style>
