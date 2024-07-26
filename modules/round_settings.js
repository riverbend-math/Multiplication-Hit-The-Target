"use strict"; 

function roundto(x, d) { // rounds Number x to d decimal digits
    return Math.round((10 ** d) * x) / (10 ** d);
}

function randint(a, b) { // returns a random integer a <= N <= b
    let range = Math.ceil(b - a);
    return roundto(Math.random() * range, 0) + Math.ceil(a);
}

function randfloat(a, b) { // returns a random number a <= x < b
    return Math.random() * (b - a) + a;
}

function get_round_settings(level) {
    let starter;
    let range_low;
    let range_high;

    if (level == 1) {
        starter = randint(2, 9);
        let hit = randint(2, 9);
        let low_buffer = randint(1, starter - 1);
        let high_buffer = randint(1, starter - 1);
        range_low = hit * starter - low_buffer;
        range_high = hit * starter + high_buffer;
    } else if (level == 2) {
        starter = randint(3, 9);
        let hit_low = randint(2, 11);
        let shift = randint(1, Math.floor(starter / 2));
        let range = randint(1, starter - shift - 1);
        range_low = starter * hit_low + shift;
        range_high = starter * hit_low + shift + range;
    } else if (level == 3) {
        // code for getting starter, range_low, range_high
        starter = randint(11, 99);
        let tenth = starter/10;
        let low_buffer = randint(1, 9);
        let high_buffer = randint(1, 9);
        range_low = Math.max(1, (roundto(tenth, 0) - low_buffer));
        range_high = Math.min(9, (roundto(tenth, 0) + high_buffer));
        //Math. ... ceiling of 9, floor of 1

    } else if (level == 4) {
        // code for getting starter, range_low, range_high
        starter = randint(10, 99);
        range_low = 0 ;
        range_high = randint(1,9);
    
    } else if (level == 5) {
        // code for getting starter, range_low, range_high
        starter = randint(1,9);
        let number = randint(1,9);
        let bonjour = number * starter * 10;
        let low_buffer = randint(10,40);
        let high_buffer = randint(10,40);
        range_low = bonjour -  low_buffer;
        range_high = bonjour + high_buffer;
    } else if (level == 6) {
        // code for getting starter, range_low, range_high
        starter = randint(2, 9);
        let hit = 100 * starter;
        range_low = hit - starter + 1;
        range_high = hit + starter - 1;
    } else if (level == 7) {
        // code for getting starter, range_low, range_high
        starter = randint(10,99);
        range_low = randint(-9,-1);
        range_high = randint(1,9);
    } else if (level == 8) {
        // code for getting starter, range_low, range_high
        starter = randint(10, 99);
        let multiple = randint(5, 7);
        range_low = Math.round((starter * multiple + Math.random()) * 100) / 100;
        range_high = Math.round((starter * (multiple + 1) - Math.random()) * 100) / 100;
    } else if (level == 9) {
        // code for getting starter, range_low, range_high
        starter = randint(100,999);
        range_low = 0;
        range_high = randint(1,9);
        
    } else if (level == 10) {
        // code for getting starter, range_low, range_high
        starter = roundto(randfloat(0.01,0.1),3);
        let hit = 1000 * starter;
        range_low = roundto(hit - starter + 1,0);
        range_high = roundto(hit + starter + 2,0);
    } else if (level == 11) {
        // code for getting starter, range_low, range_high
        let begin = randint(1000000000, 10000000000);
        starter = roundto((begin/100000000), 1);
        range_low = starter*1000;
        range_high = range_low + 1;
        
    } else if (level == 12) {
        // code for getting starter, range_low, range_high
        starter = randint(1000001, 10000000);
        let target = starter * .0001;
        range_low = Math.round(target) - 50; 
        range_high = Math.round(target) + 50;  
    } else if (level == 13) {
        // code for getting starter, range_low, range_high
        starter = randint(2,200);
        let half = (starter/2);
        let low_buffer = randint(1,5);
        let high_buffer = randint(1,4);
        range_low = roundto(half - low_buffer, 0);
        range_high = roundto(half + high_buffer, 0);
        
    } else if (level == 14) {
        // code for getting starter, range_low, range_high
        do {
            starter = roundto(randfloat(1,10),1);
            range_low = randint(100,999);
        } while (range_low % starter === 0);
        range_high = range_low + 1;
    } else if (level == 15) {
        // code for getting starter, range_low, range_high
        let hit = randint(2,9);
        let smarter = randint(2,9);
        starter = (smarter * (-1));
        let low_buffer = randint(1, (smarter - 1));
        let high_buffer = randint(1, (smarter - 1));
        range_low = hit * smarter - low_buffer;
        range_high = hit * smarter + high_buffer;
        
    } else if (level == 16) {
        // code for getting starter, range_low, range_high
        starter = randint(10,99);
        range_low = randint(-99,-10);
        range_high = range_low + 5;
    } else if (level == 17) {
        // code for getting starter, range_low, range_high
        let begin = randint(-1000000, -100000);
        starter = roundto((begin/10000), 1);
        let number = randint (-20, 0);
        let low_buffer = randint(-20, 0);
        let high_buffer = randint(-20, 0);
        range_low = Math.max((-20), number + low_buffer);
        range_high = Math.min(0, number - high_buffer);
        
    } else if (level == 18) {
        // code for getting starter, range_low, range_high
        starter = roundto(randfloat(-100,-10),1);
        range_low = randint(0,20);
        range_high = range_low + 1;
    } else if (level == 19) {
        // code for getting starter, range_low, range_high
        let begin = randint(-1000000, -100000);
        starter = roundto((begin/10000), 1);
        let high = randint(1,100);
        let low = (high - 1);
        range_high = high/100;
        range_low = low/100;
        
    } else if (level == 20) {
        // code for getting starter, range_low, range_high
        starter = randint(100,999);
        range_low = roundto(randfloat(-10,-5),3);
        range_high = roundto(range_low + 0.01,3);
    }

    let settings = {
        starter : starter,
        range_low : range_low,
        range_high : range_high
    }
    return settings; 
}


// export {roundto, randint, randfloat, get_round_settings}

