/**
 * Mathematical formula for the procedural rose.
 * 
 * rho(u,v) = a * exp(-b * v) * sin(pi * v)^2 * (1 + c * sin(6u)) 
 *            + eps * sum_{n=0..N}(lambda^n * cos(2^n * u + 3^n * v))
 * 
 * R(u,v) = (
 *   rho(u,v) * cos(u + tau * v),
 *   h * v + d * rho(u,v)^2,
 *   rho(u,v) * sin(u + tau * v)
 * )
 */

export function calculateRosePoint(u, v, params) {
  const { a, b, c, tau, h, d, eps, lambda, N } = params;

  // Calculate rho(u, v)
  let rho = a * Math.exp(-b * v) * Math.pow(Math.sin(Math.PI * v), 2) * (1 + c * Math.sin(6 * u));

  // Fractal perturbation (faded out at the base using v)
  let perturbation = 0;
  for (let n = 0; n <= N; n++) {
    perturbation += Math.pow(lambda, n) * Math.cos(Math.pow(2, n) * u + Math.pow(3, n) * v);
  }
  rho += eps * perturbation * Math.min(v * 10, 1.0); // Fade in perturbation quickly from v=0

  // Calculate R(u, v)
  const x = rho * Math.cos(u + tau * v);
  const y = h * v + d * Math.pow(rho, 2);
  const z = rho * Math.sin(u + tau * v);

  return { x, y, z };
}

/**
 * Procedural stem calculation
 */
export function calculateStemPoint(v, h_total) {
  // v from 0 to 1 (bottom to top)
  // Scale v to go down from the flower base
  const y = -h_total * (1 - v);
  const radius = 0.03 + 0.01 * Math.sin(v * 10);
  return { y, radius };
}

/**
 * Procedural leaf calculation
 */
export function calculateLeafPoint(u, v, side = 1) {
  // Simple parametric leaf
  // u in [0, 1], v in [0, 1]
  const length = 0.8;
  const width = 0.4 * Math.sin(Math.PI * v);
  
  const x = side * (v * length);
  const z = width * Math.sin(Math.PI * u - Math.PI / 2);
  const y = 0.1 * Math.sin(Math.PI * v); // Slight curve
  
  return { x, y, z };
}
