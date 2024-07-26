"use strict"; 

//import { roundto, randint, randfloat, get_round_settings } from "./modules/round_settings.js";

function test_get_round_settings() {
    let settings;
    let starter;
    let low;
    let high;
    let s = "";
    for (let level=1; level < 21; level++) {
        s += `\n\nLevel ${level}\n`;
        for (let n = 0; n < 10; n++) {
            settings = get_round_settings(level);
            starter = settings[0];
            low = settings[1];
            high = settings[2]
            s += `starter: ${starter}, range: [${low},${high}], range width: ${high - low}, hit range: [${roundto(low/starter,6)}, ${roundto(high/starter,6)}]\n`;
        }
    }
    document.getElementById("out").innerText = s;
}



function onReady() {
    test_get_round_settings(2);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
} else {
    onReady();
}
