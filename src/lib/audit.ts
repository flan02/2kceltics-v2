export const auditSchedule = (schedule: any[]) => {
  const inconsistencies: any[] = [];

  let realWins = 0;
  let realLosses = 0;

  schedule.forEach((game) => {
    const s1 = Number(game.scoreTeam1);
    const s2 = Number(game.scoreTeam2);
    const res = game.result; // 'WIN' o 'LOSS'

    // Condición ideal:
    // Si s1 > s2 debería ser WIN
    // Si s1 < s2 debería ser LOSS
    const isWin = s1 > s2;
    const isLoss = s1 < s2;

    // Detectar discordancias
    if ((isWin && res !== "WIN") || (isLoss && res !== "LOSS") || s1 === s2) {
      inconsistencies.push({
        id: game.id,
        game: game.currentGame,
        team2: game.team_code2 || game.team2,
        scoreTeam1: s1,
        scoreTeam2: s2,
        resultInDB: res,
        expectedResult: isWin ? "WIN" : isLoss ? "LOSS" : "TIE/ERROR",
      });
    }

    if (isWin) realWins++;
    if (isLoss) realLosses++;
  });

  console.log(`\n=== REPORTE DE AUDITORÍA ===`);
  console.log(`Total partidos: ${schedule.length}`);
  console.log(
    `Victorias según marcador (scoreTeam1 > scoreTeam2): ${realWins}`,
  );
  console.log(
    `Derrotas según marcador (scoreTeam1 < scoreTeam2): ${realLosses}`,
  );
  console.log(`Inconsistencias detectadas: ${inconsistencies.length}`);

  if (inconsistencies.length > 0) {
    console.log(`\nPartidos con errores o discrepancias:`);
    console.table(inconsistencies);
  }
};

export const robustAuditSchedule = (schedule: any[]) => {
  const issues: any[] = [];

  schedule.forEach((game) => {
    const s1 = Number(game.scoreTeam1); // Boston Celtics
    const s2 = Number(game.scoreTeam2); // Rival
    const dbResult = game.result;

    const errors: string[] = [];

    // 1. Extraer puntos de gameStats identificando las columnas dinámicamente
    let statsPtsTeam1: number | null = null;
    let statsPtsTeam2: number | null = null;

    if (game.gameStats) {
      const lines = game.gameStats
        .split("\n")
        .map((l: string) => l.trim())
        .filter(Boolean);
      const headerLine = lines[0] || "";
      const pointsLine = lines.find(
        (l: string) =>
          l.toLowerCase().includes("| points |") ||
          l.toLowerCase().includes("| pts |"),
      );

      if (headerLine && pointsLine) {
        const headers = headerLine
          .split("|")
          .map((c: string) => c.trim())
          .filter(Boolean);
        const pointValues = pointsLine
          .split("|")
          .map((c: string) => c.trim())
          .filter(Boolean);

        // headers suele ser: [ 'Statistic', 'Boston Celtics (Away)', 'Atlanta Hawks (Home)' ]
        // pointValues: [ 'Points', '121', '119' ]
        if (headers.length >= 3 && pointValues.length >= 3) {
          const col1Name = headers[1].toLowerCase();
          const col2Name = headers[2].toLowerCase();

          const ptsCol1 = Number(pointValues[1]);
          const ptsCol2 = Number(pointValues[2]);

          // Verificamos si la columna 1 o la 2 es de Boston
          if (
            col1Name.includes("celtics") ||
            col1Name.includes("boston") ||
            col1Name.includes("bos")
          ) {
            statsPtsTeam1 = ptsCol1;
            statsPtsTeam2 = ptsCol2;
          } else if (
            col2Name.includes("celtics") ||
            col2Name.includes("boston") ||
            col2Name.includes("bos")
          ) {
            statsPtsTeam1 = ptsCol2;
            statsPtsTeam2 = ptsCol1;
          }
        }
      }
    }

    // 2. Extraer puntos de los boxscores individuales
    let boxPtsTeam1: number | null = null;
    let boxPtsTeam2: number | null = null;

    const getBoxscoreTotal = (boxText: string) => {
      if (!boxText) return null;
      // Busca la fila que empieza con | Total | y toma la columna PTS (segunda columna numérica tras MIN)
      const match = boxText.match(/\|\s*Total\s*\|\s*\d+\s*\|\s*(\d+)\s*\|/i);
      return match ? Number(match[1]) : null;
    };

    boxPtsTeam1 = getBoxscoreTotal(game.boxscoreTeam1);
    boxPtsTeam2 = getBoxscoreTotal(game.boxscoreTeam2);

    // 3. Chequeos de consistencia

    // Consistencia básica cabecera
    if (s1 > s2 && dbResult !== "WIN")
      errors.push(`Header indica WIN (${s1}-${s2}) pero result es ${dbResult}`);
    if (s1 < s2 && dbResult !== "LOSS")
      errors.push(
        `Header indica LOSS (${s1}-${s2}) pero result es ${dbResult}`,
      );
    if (s1 === s2) errors.push(`Empate en cabecera (${s1}-${s2})`);

    // Comparación cabecera vs gameStats
    if (statsPtsTeam1 !== null && statsPtsTeam1 !== s1) {
      errors.push(`scoreTeam1 (${s1}) != gameStats Celtics (${statsPtsTeam1})`);
    }
    if (statsPtsTeam2 !== null && statsPtsTeam2 !== s2) {
      errors.push(`scoreTeam2 (${s2}) != gameStats Rival (${statsPtsTeam2})`);
    }

    // Comparación cabecera vs boxscores
    if (boxPtsTeam1 !== null && boxPtsTeam1 !== s1) {
      errors.push(`scoreTeam1 (${s1}) != boxscoreTeam1 (${boxPtsTeam1})`);
    }
    if (boxPtsTeam2 !== null && boxPtsTeam2 !== s2) {
      errors.push(`scoreTeam2 (${s2}) != boxscoreTeam2 (${boxPtsTeam2})`);
    }

    // Verificación final del ganador real según estadísticas detalladas
    const refPts1 = statsPtsTeam1 ?? boxPtsTeam1;
    const refPts2 = statsPtsTeam2 ?? boxPtsTeam2;

    if (refPts1 !== null && refPts2 !== null) {
      const realWinner = refPts1 > refPts2 ? "WIN" : "LOSS";
      if (dbResult !== realWinner) {
        errors.push(
          `Resultado real según stats detalladas es ${realWinner} (${refPts1}-${refPts2}), pero figura ${dbResult}`,
        );
      }
    }

    if (errors.length > 0) {
      issues.push({
        game: game.currentGame,
        rival: game.team_code2 || game.team2,
        headerScores: `${s1} - ${s2}`,
        dbResult,
        statsPts: `${statsPtsTeam1 ?? "N/A"} - ${statsPtsTeam2 ?? "N/A"}`,
        boxPts: `${boxPtsTeam1 ?? "N/A"} - ${boxPtsTeam2 ?? "N/A"}`,
        id: game.id,
        detalle: errors.join(" | "),
      });
    }
  });

  console.log(`\n=== AUDITORÍA DINÁMICA DE PARTIDOS ===`);
  console.log(`Partidos procesados: ${schedule.length}`);
  console.log(`Partidos con inconsistencias: ${issues.length}`);

  if (issues.length > 0) {
    console.table(issues);
  } else {
    console.log(
      "Todos los datos coinciden correctamente entre cabecera, tablas y resultado.",
    );
  }
};
