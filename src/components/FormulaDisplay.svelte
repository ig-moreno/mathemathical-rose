<script>
  import { onMount } from 'svelte';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';

  let formulaContainer;
  let rhoContainer;

  const formula = `R(u,v) = \\begin{pmatrix} \\rho(u,v) \\cos(u + \\tau v) \\\\ h v + d \\rho(u,v)^2 \\\\ \\rho(u,v) \\sin(u + \\tau v) \\end{pmatrix}`;
  const rhoFormula = `\\rho(u,v) = a e^{-bv} \\sin^2(\\pi v) (1 + c \\sin(6u)) + \\epsilon \\sum_{n=0}^{N} \\lambda^n \\cos(2^n u + 3^n v)`;

  onMount(() => {
    katex.render(formula, formulaContainer, { displayMode: true });
    katex.render(rhoFormula, rhoContainer, { displayMode: true });
  });
</script>

<div class="formula-container">
  <div bind:this={formulaContainer} class="math-row"></div>
  <div bind:this={rhoContainer} class="math-row small"></div>
</div>

<style>
  .formula-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .math-row {
    color: #ffd700;
    opacity: 0.9;
    font-size: 1.1rem;
  }

  .math-row.small {
    font-size: 0.85rem;
    opacity: 0.7;
    color: #ff8080;
  }
</style>
