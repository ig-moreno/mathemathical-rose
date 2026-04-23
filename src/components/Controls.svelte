<script>
  export let params;
  export let onReset;

  const labels = {
    a: "Scale (a)",
    b: "Decay (b)",
    c: "Waviness (c)",
    tau: "Twist (tau)",
    h: "Height (h)",
    d: "Curvature (d)",
    eps: "Fractal Amp (eps)",
    lambda: "Persistence (lambda)",
    N: "Fractal Depth (N)",
    nu: "U Resolution (nu)",
    nv: "V Resolution (nv)"
  };

  const steps = {
    a: 0.1, b: 0.1, c: 0.05, tau: 0.1, h: 0.1, d: 0.05, eps: 0.01, lambda: 0.05, N: 1, nu: 10, nv: 10
  };

  const ranges = {
    a: [0.5, 3], b: [0, 3], c: [0, 1], tau: [0, 10], h: [0.5, 5], d: [0, 2], eps: [0, 0.5], lambda: [0.1, 0.9], N: [0, 8], nu: [50, 400], nv: [50, 400]
  };
</script>

<div class="controls-panel">
  <div class="header">
    <h3>Parameters</h3>
    <button on:click={onReset}>Reset</button>
  </div>

  <div class="grid">
    {#each Object.keys(params) as key}
      <div class="control-group">
        <label for={key}>{labels[key]}</label>
        <div class="input-row">
          <input 
            type="range" 
            id={key + "-range"}
            min={ranges[key][0]} 
            max={ranges[key][1]} 
            step={steps[key]} 
            bind:value={params[key]}
            on:input={() => params = params}
          />
          <input 
            type="number" 
            id={key}
            step={steps[key]} 
            bind:value={params[key]}
            on:input={() => params = params}
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .controls-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }

  h3 {
    margin: 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: rgba(255, 255, 255, 0.5);
  }

  button {
    background: transparent;
    border: 1px solid rgba(255, 77, 77, 0.4);
    color: #ff4d4d;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.75rem;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }

  button:hover {
    background: rgba(255, 77, 77, 0.1);
    border-color: #ff4d4d;
    transform: translateY(-1px);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
  }

  .input-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  input[type="range"] {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    appearance: none;
    accent-color: #ff4d4d;
  }

  input[type="number"] {
    width: 45px;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffd700;
    padding: 0.1rem;
    font-family: monospace;
    font-size: 0.8rem;
    text-align: right;
  }
</style>
