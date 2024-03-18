function nextPalindrome(from_num, radix, next) {
    if (radix < 2 || radix > 36) {
        return 0;
    }
    
    function isPalindrome(n, base) {
        let num_str = '';
        while (n > 0) {
            num_str += String(n % base);
            n = Math.floor(n / base);
        }
        return num_str === num_str.split('').reverse().join('');
    }
    
    while (true) {
        from_num++;
        if (isPalindrome(from_num, radix)) {
            next[0] = from_num;
            return 1;
        }
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Zadejte počáteční číslo: ', from_num => {
    from_num = parseInt(from_num);
    readline.question('Zadejte číselnou soustavu (2 až 36): ', radix => {
        radix = parseInt(radix);
        
        if (radix < 2 || radix > 36) {
            console.log("Neplatná číselná soustava.");
            readline.close();
        } else {
            const next_palindrome_num = [0];
            if (nextPalindrome(from_num, radix, next_palindrome_num)) {
                console.log(`Nejbližší větší palindrom než ${from_num} je ${next_palindrome_num[0]}`);
            } else {
                console.log("Nelze nalézt nejbližší větší palindrom.");
            }
            readline.close();
        }
    });
});
