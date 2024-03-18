function areCollinear(A, B, C) {
    return (B[1] - A[1]) * (C[0] - B[0]) === (C[1] - B[1]) * (B[0] - A[0]);
}

function midpoint(A, B, C) {
    if (areCollinear(A, B, C)) {
        if ((A[0] <= B[0] && B[0] <= C[0]) || (C[0] <= B[0] && B[0] <= A[0])) {
            return B;
        } else if ((B[0] <= A[0] && A[0] <= C[0]) || (C[0] <= A[0] && A[0] <= B[0])) {
            return A;
        } else {
            return C;
        }
    } else {
        return null;
    }
}

function parseInput(inputStr) {
    try {
        const coords = inputStr.split(' ').map(coord => parseFloat(coord));
        if (coords.length !== 2 || coords.some(isNaN)) {
            throw new Error("Nesprávný vstup");
        }
        return coords;
    } catch (error) {
        throw new Error("Nesprávný vstup");
    }
}

function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Bod A:\n', input_A => {
        const A = parseInput(input_A);
        readline.question('Bod B:\n', input_B => {
            const B = parseInput(input_B);
            readline.question('Bod C:\n', input_C => {
                const C = parseInput(input_C);

                if (JSON.stringify(A) === JSON.stringify(B) && JSON.stringify(B) === JSON.stringify(C)) {
                    console.log("Dva nebo všechny tři zadané body splývají.");
                } else if (JSON.stringify(A) === JSON.stringify(B) || JSON.stringify(A) === JSON.stringify(C) || JSON.stringify(B) === JSON.stringify(C)) {
                    console.log("Některé body splývají.");
                } else if (areCollinear(A, B, C)) {
                    console.log("Body leží na jedné přímce.");
                    const mid = midpoint(A, B, C);
                    if (mid) {
                        if (JSON.stringify(mid) === JSON.stringify(A)) {
                            console.log("Prostřední je bod A.");
                        } else if (JSON.stringify(mid) === JSON.stringify(B)) {
                            console.log("Prostřední je bod B.");
                        } else if (JSON.stringify(mid) === JSON.stringify(C)){
                            console.log("Prostřední je bod C.");
                        }
                    }
                } else {
                    console.log("Body neleží na jedné přímce.");
                }
                readline.close();
            });
        });
    });
}

main();
