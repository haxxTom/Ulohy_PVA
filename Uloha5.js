const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Zadejte souřadnice a označení letadel:");
  
  function calculateDistance(p1, p2) {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  function findClosestPlanes(planes) {
    let minDistance = Infinity;
    const closestPairs = [];
  
    for (let i = 0; i < planes.length; i++) {
      for (let j = i + 1; j < planes.length; j++) {
        const dist = calculateDistance(planes[i][0], planes[j][0]);
        if (dist < minDistance) {
          minDistance = dist;
          closestPairs.length = 0; 
          closestPairs.push([planes[i][1], planes[j][1]]);
        } else if (dist === minDistance) {
          closestPairs.push([planes[i][1], planes[j][1]]);
        }
      }
    }
  
    return [minDistance, closestPairs];
  }
  
  const planes = [];
  
  readline.on('line', (line) => {
    if (!line) {
      readline.close();
      return;
    }
  
    try {
      const [coords, name] = line.split(':');
      const [x, y] = coords.split(',').map(Number);
      planes.push([[x, y], name]);
    } catch (error) {
      console.error("Chyba: nesprávný formát vstupu");
    }
  });
  
  readline.on('close', () => {
    if (planes.length < 2) {
      console.error("Chyba: méně než dvě letadla na vstupu");
    } else {
      const [minDistance, pairs] = findClosestPlanes(planes);
      console.log(`Vzdálenost nejbližších letadel: ${minDistance.toFixed(6)}`);
      console.log(`Nalezených dvojic: ${pairs.length}`);
      for (const pair of pairs) {
        console.log(` - ${pair.join(' - ')}`);
      }
    }
  });
  