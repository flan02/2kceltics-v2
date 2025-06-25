/* 
  const maxPts = Math.max(...players.map((p: any) => p.pts));
  const roundedMax = Math.ceil(maxPts / 2.5) * 2.5;
  const ticks = useYAxisTicks(0, roundedMax, 2.5);
*/

export function useYAxisTicks(min: number, max: number, step: number): number[] {
  const ticks: number[] = [];

  // basic form
  // for (let i = min; i <= max; i += step) {
  //   ticks.push(Number(i.toFixed(1))); // always return an exact decimal number
  // }

  // Validaciones de seguridad
  if (isNaN(min) || isNaN(max) || isNaN(step)) return [];
  if (step <= 0 || max <= min) return [];

  const count = Math.floor((max - min) / step);

  for (let i = 0; i <= count; i++) {
    const tick = Number((min + i * step).toFixed(2)); // más precisión si usás decimales bajos
    ticks.push(tick);
  }

  return ticks;

  return ticks;
}
