function isValidCoordinate(coord) {
  return coord.every(val => Number.isInteger(val));
}

function isValidCubeSize(cubeSize) {
  return cubeSize > 0;
}

function isPointOnWallFloorCeiling(coord, cubeSize) {
  return coord.every(val => val >= 0 && val <= cubeSize);
}

function func1(cubeSize, coord1, coord2) {
  if (!(isValidCubeSize(cubeSize) && isValidCoordinate(coord1) && isValidCoordinate(coord2))) {
      console.log("Nesprávný vstup, prosím vložte pouze správná čísla!!!");
      return;
  }

  if (!(isPointOnWallFloorCeiling(coord1, cubeSize) && isPointOnWallFloorCeiling(coord2, cubeSize))) {
      console.log("Nesprávný vstup: Zadaný bod neleží na zdi/podlaze/stropě.");
      return;
  }

  let n = 0;
  if (cubeSize !== coord1[2] && cubeSize !== coord2[2]) {
      for (let i = 0; i < 3; i++) {
          n += Math.abs(coord1[i] - coord2[i]);
      }
      return n;
  } else {
      const n1 = (cubeSize - coord1[1]) + (cubeSize - coord2[1]);
      const n2 = coord1[1] + coord2[1];
      const n3 = (cubeSize - coord1[0]) + (cubeSize - coord2[0]);
      const n4 = coord1[0] + coord2[0];
      const l = [n1, n2, n3, n4];
      const l2 = [];
      for (let i = 0; i < 4; i++) {
          if (i < 2) {
              l2.push(Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[2] - coord2[2]) + l[i]);
          } else {
              l2.push(Math.abs(coord1[1] - coord2[1]) + Math.abs(coord1[2] - coord2[2]) + l[i]);
          }
      }
      return Math.min(...l2);
  }
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Zadejte velikost krychle: ', cubeSize => {
  const cubeSizeNum = parseInt(cubeSize);
  readline.question('Zadejte x souřadnice pro bod1: ', coordX1 => {
      const coordX1Num = parseInt(coordX1);
      readline.question('Zadejte y souřadnice pro bod1: ', coordY1 => {
          const coordY1Num = parseInt(coordY1);
          readline.question('Zadejte z souřadnice pro bod1: ', coordZ1 => {
              const coordZ1Num = parseInt(coordZ1);
              readline.question('Zadejte x souřadnice pro bod2: ', coordX2 => {
                  const coordX2Num = parseInt(coordX2);
                  readline.question('Zadejte y souřadnice pro bod2: ', coordY2 => {
                      const coordY2Num = parseInt(coordY2);
                      readline.question('Zadejte z souřadnice pro bod2: ', coordZ2 => {
                          const coordZ2Num = parseInt(coordZ2);
                          const result = func1(cubeSizeNum, [coordX1Num, coordY1Num, coordZ1Num], [coordX2Num, coordY2Num, coordZ2Num]);
                          console.log(result);
                          readline.close();
                      });
                  });
              });
          });
      });
  });
});
