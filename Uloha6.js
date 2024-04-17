const readline = require('readline');

function getInput() {
    const shelfDict = {};
    const shoppingList = [];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Zadejte počet regálů: ", (numShelves) => {
        numShelves = parseInt(numShelves);
        let shelvesProcessed = 0;

        function processShelfInput() {
            rl.question(`Zadejte zboží pro regál ${shelvesProcessed}: `, (item) => {
                if (item === "") {
                    if (shelvesProcessed < numShelves - 1) {
                        shelvesProcessed++;
                        processShelfInput();
                    } else {
                        processShoppingListInput();
                    }
                } else {
                    shelfDict[item.toLowerCase()] = shelvesProcessed;
                    processShelfInput();
                }
            });
        }

        processShelfInput();

        function processShoppingListInput() {
            rl.question("Zadejte zboží, které chcete koupit: ", (item) => {
                if (item === "") {
                    rl.close();
                    const optimizedShoppingList = optimizeShoppingList(shelfDict, shoppingList);
                    console.log("Optimalizovaný nákupní seznam:");
                    optimizedShoppingList.forEach((item, index) => {
                        console.log(`${index}. ${item[1].toUpperCase()} -> #${item[0]} ${item[1]}`);
                    });
                } else {
                    shoppingList.push(item.toLowerCase());
                    processShoppingListInput();
                }
            });
        }
    });
}

function findItem(shelfDict, item) {
    for (const key in shelfDict) {
        if (key.includes(item)) {
            return shelfDict[key];
        }
    }
    return Infinity;
}

function optimizeShoppingList(shelfDict, shoppingList) {
    const optimizedShoppingList = [];
    shoppingList.sort((a, b) => findItem(shelfDict, a) - findItem(shelfDict, b));
    shoppingList.forEach((item) => {
        optimizedShoppingList.push([findItem(shelfDict, item), item]);
    });
    return optimizedShoppingList;
}

getInput();
