"use strict"; 

//import { Real } from "reals.js";

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

function real_is_equal(x) {
    if (!isReal(x)) {
        console.log(`x = ${x}, isReal returns false.`);
        return false;
    }
    let r = new Real(x);
    if (!r.equal_to(x)) {
        console.log(`x = ${x}, Real(x) not equal to x.`);
        return false;
    }
    return true;
}

function reals_compare(a,b) {
    let x = Math.min(a,b);
    let y = Math.max(a,b);
    let rx = new Real(x);
    let ry = new Real(y);
    if (x < y) {
        if (!(rx.less_than(ry))) {
            console.log(`x = ${x}, y = ${y}, Real(x).less_than(Real(y)) false`);
            return false;
        }
        if (!(rx.less_than(y))) {
            console.log(`x = ${x}, y = ${y}, Real(x).less_than(y) false`);
            return false;
        }
        if (!(ry.greater_than(rx))) {
            console.log(`x = ${x}, y = ${y}, Real(y).greater_than(Real(x)) false`);
            return false;
        }
        if (!(ry.greater_than(x))) {
            console.log(`x = ${x}, y = ${y}, Real(y).greater_than(x) false`);
            return false;
        }
        if ((rx.greater_than(ry))) {
            console.log(`x = ${x}, y = ${y}, Real(x).greater_than(Real(y)) true`);
            return false;
        }
        if ((rx.greater_than(y))) {
            console.log(`x = ${x}, y = ${y}, Real(x).greater_than(y) true`);
            return false;
        }
        if ((ry.less_than(rx))) {
            console.log(`x = ${x}, y = ${y}, Real(y).less_than(Real(x)) true`);
            return false;
        }
        if ((ry.less_than(x))) {
            console.log(`x = ${x}, y = ${y}, Real(y).greater_than(x) true`);
            return false;
        }

        if ((rx.equal_to(ry))) {
            console.log(`x = ${x}, y = ${y}, Real(x).equal_to(Real(y)) true`);
            return false;
        }

        if ((rx.equal_to(y))) {
            console.log(`x = ${x}, y = ${y}, Real(x).equal_to(y) true`);
            return false;
        }

        if ((ry.equal_to(rx))) {
            console.log(`x = ${x}, y = ${y}, Real(y).equal_to(Real(x)) true`);
            return false;
        }

        if ((ry.equal_to(x))) {
            console.log(`x = ${x}, y = ${y}, Real(y).equal_to(x) true`);
            return false;
        }
    } else { // x == y
        if ((rx.less_than(ry))) {
            console.log(`x = ${x}, y = ${y}, Real(x).less_than(Real(y)) true`);
            return false;
        }
        if ((rx.less_than(y))) {
            console.log(`x = ${x}, y = ${y}, Real(x).less_than(y) true`);
            return false;
        }
        if ((ry.greater_than(rx))) {
            console.log(`x = ${x}, y = ${y}, Real(y).greater_than(Real(x)) true`);
            return false;
        }
        if ((ry.greater_than(x))) {
            console.log(`x = ${x}, y = ${y}, Real(y).greater_than(x) true`);
            return false;
        }
        if ((rx.greater_than(ry))) {
            console.log(`x = ${x}, y = ${y}, Real(x).greater_than(Real(y)) true`);
            return false;
        }
        if ((rx.greater_than(y))) {
            console.log(`x = ${x}, y = ${y}, Real(x).greater_than(y) true`);
            return false;
        }
        if ((ry.less_than(rx))) {
            console.log(`x = ${x}, y = ${y}, Real(y).less_than(Real(x)) true`);
            return false;
        }
        if ((ry.less_than(x))) {
            console.log(`x = ${x}, y = ${y}, Real(y).greater_than(x) true`);
            return false;
        }

        if (!(rx.equal_to(ry))) {
            console.log(`x = ${x}, y = ${y}, Real(x).equal_to(Real(y)) false`);
            return false;
        }

        if (!(rx.equal_to(y))) {
            console.log(`x = ${x}, y = ${y}, Real(x).equal_to(y) false`);
            return false;
        }

        if (!(ry.equal_to(rx))) {
            console.log(`x = ${x}, y = ${y}, Real(y).equal_to(Real(x)) false`);
            return false;
        }

        if (!(ry.equal_to(x))) {
            console.log(`x = ${x}, y = ${y}, Real(y).equal_to(x) false`);
            return false;
        }

    }
    return true;
}

function auto_test_reals() {
    // test small integers
    for (let i = 0; i < 1000; i++) {
        let n1 = randint(-10, 10);
        let n2 = randint(-10, 10);
        if (!real_is_equal(n1) || !real_is_equal(n2)) {
            return;
        }
        if (!reals_compare(n1, n2)) {
            return;
        }
    }
    console.log("Auto tests for small integers done.")
    // test all integers
    for (let i = 0; i < 1000; i++) {
        let n1 = randint(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        let n2 = randint(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        if (!real_is_equal(n1) || !real_is_equal(n2)) {
            return;
        }
        if (!reals_compare(n1, n2)) {
            return;
        }
    }
    console.log("Auto tests for all integers done.")
    // test for reals that are not in exp notation
    for (let i = 0; i < 1000; i++) {
        let n1 = randfloat(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        let n2 = randfloat(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        if (!real_is_equal(n1) || !real_is_equal(n2)) {
            return;
        }
        if (!reals_compare(n1, n2)) {
            return;
        }
    }
    console.log("Auto tests for floats done.")
}

function manual_test_reals() {
    // manual tests
    let s = "";
    let xs = document.getElementById("x").value;
    let ys = document.getElementById("y").value;
    if (!isReal(xs) || !isReal(ys)) {
        s += "Input real numbers only";
    } else {
        let x = new Real(xs);
        let y = new Real(ys);
        let z = x.mult(y);
        console.log(x,y,z);
        s += `${x} times ${y} is ${z}, compare to float: ${parseFloat(xs)*parseFloat(ys)}\n`;
        s += `${x} < ${y} is ${x.less_than(y)}\n`;
        s += `${x} > ${y} is ${x.greater_than(y)}\n`;
        s += `${x} = ${y} is ${x.equal_to(y)}\n`;
    }
    document.getElementById("out").innerText = s;
}



function onReady() {
    auto_test_reals();
    document.getElementById("test").addEventListener("click", manual_test_reals);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
} else {
    onReady();
}
