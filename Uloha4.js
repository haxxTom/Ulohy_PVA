const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question("Zadejte posloupnost čísel oddělených mezerou: ", (sequenceString) => {
    
    if (sequenceString.length > 2000 || sequenceString.length < 2) {
      console.error("Chyba: vstupní posloupnost je prázdná nebo příliš dlouhá");
      process.exit(1);
    }
  
    
    const sequence = sequenceString.split(" ").map(num => parseInt(num));
    for (const num of sequence) {
      if (isNaN(num)) {
        console.error("Chyba: hodnota na vstupu není platné celé číslo");
        process.exit(1);
      }
    }
  
    
    const sums = {};
    for (let i = 0; i < sequence.length; i++) {
      for (let j = i + 1; j < sequence.length; j++) {
        const intervalSum = sequence.slice(i, j + 1).reduce((sum, num) => sum + num, 0);
        if (!sums[intervalSum]) {
          sums[intervalSum] = 1;
        } else {
          sums[intervalSum]++;
        }
      }
    }
  
    
    let pairs = 0;
    for (const value of Object.values(sums)) {
      if (value > 1) {
        pairs += value * (value - 1) / 2;
      }
    }
  
    
    console.log(`Počet párů: ${pairs}`);
  
    readline.close();
  });
  