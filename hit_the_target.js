"use strict"; 

//import { roundto, randint, randfloat, get_round_settings } from "./modules/round_settings.js";
//import {Real, isReal, WhyNotReal, RealListIncludes} from "./modules/reals.js";


class HTT_Game {

    create_round(level) {
        this.level = level;
        this.level_out.innerText = `Level ${level}`;
        let settings = get_round_settings(level);
        this.starter = settings.starter;
        this.range_low = settings.range_low;
        this.range_high = settings.range_high;
        this.shots = [];
        this.goals = {
            low : null,
            high : null,
            hits : []
        };
        this.examples = [];
        this.example_block.classList.remove("invisible");
        this.example_button.classList.add("invisible");
        this.hint_out.innerText = "";
        this.example_out.innerText = "";
        this.shots_display = "";
        this.shot_input.value = "";
        this.range_low_out.innerText = this.range_low.toString();
        this.range_high_out.innerText = this.range_high.toString();
        this.starter_out.innerText = this.starter.toString();
        this.shot_record_out.innerText = "";
        this.update_goals_display();
    }

    do_one_shot() {
        let shot;
        if (isReal(this.shot_input.value)) {
            shot = new Real(this.shot_input.value);
            this.shot_input.classList.remove("bad_input");
        } else {
            this.hint_out.innerText = WhyNotReal(this.shot_input.value)+" Input a real number.";
            this.shot_input.classList.add("bad_input");
            return;
        }
        if (RealListIncludes(this.shots, shot)) {
            this.hint_out.innerText = `Repeated shot ${shot}, try another number.`;
            return;
        } else if (RealListIncludes(this.examples, shot)) {
            this.hint_out.innerText = `The shot ${shot} was given as an example, try another number.`;
            return;
        } else {
            this.example_out.innerText = "";
            this.shots.push(shot);
        }
        let result = shot.mult(this.starter);
        let message = "";
        if (result.less_than(this.range_low)) {
            if (this.goals.low === null) {
                this.goals.low = shot;
                message = "Yay, too low!";
            } else {
                message = "Oops, too low.";
            }
        } else if (result.greater_than(this.range_high)) {
            if (this.goals.high === null) {
                this.goals.high = shot;
                message = "Yay, too high!";
            } else {
                message = "Oops, too high.";
            }
        } else {
            message = "A hit!";
            if (this.goals.hits.length < 3) {
                this.goals.hits.push(shot);
            }
    
        }
        this.update_shots_display(shot, message);
        this.update_goals_display();
        this.display_hint();

        if (this.goals_done()) {
            this.round_done();
        }
    }

    goals_done() {
        let n = 0;
        if (this.goals.low !== null) n += 1;
        if (this.goals.high !== null) n += 1;
        n += this.goals.hits.length;
        return (n == 5);
    }

    round_done() {
        this.shot_input.disabled = true;
        this.shoot_button.disabled = true;
        this.goal_record_out.innerText += '\n\nTHREE GOALS ACHIEVED!';
        this.next_game_block.classList.remove("invisible");
        if (this.level >= this.max_levels) {
            this.level_up_button.classList.add("invisible");
        }
    }

    display_hint() {
        let hint = "";
        let high = 0;
        let low = 0;
        let not_hit = 0;
        let result;
        if (this.shots.length >= 3) {
            for (let n = 1; n <= 3; n++) {
                result = this.shots[this.shots.length - n].mult(this.starter);
                if (result.less_than(this.range_low)) {
                    low += 1;
                    not_hit += 1;
                } else if (result.greater_than(this.range_high)) {
                    high += 1;
                    not_hit += 1;
                }
            }
        }
        if (this.shots.length >= 10) {
            for (let n = 4; n <= 10; n++) {
                result = this.shots[this.shots.length - n].mult(this.starter);
                if (result.less_than(this.range_low)) {
                    not_hit += 1;
                } else if (result.greater_than(this.range_high)) {
                    not_hit += 1;
                }
            }
        }

        if (not_hit == 10) {
            hint = "Would you like an example of a hit?";
            this.example_button.classList.remove("invisible");
        } else if (low == 3) {
            hint = "Try a higher number!"
        } else if (high == 3) {
            hint = "Try a lower number!"
        }
        this.hint_out.innerText = hint;
    }

    give_example() {
        const lowNumber = (this.range_low / this.starter);
        const highNumber = (this.range_high / this.starter);
        let min = Math.min(lowNumber, highNumber);
        let max = Math.max(lowNumber, highNumber);
        let decimal_round = 0;
        let example = new Real(roundto((randfloat(min, max)), decimal_round));

        while (RealListIncludes(this.examples, example)
            || RealListIncludes(this.shots, example) || example.less_than(min) || example.greater_than(max)) {
            decimal_round = decimal_round + 1;
            example = new Real(roundto((randfloat(min, max)), decimal_round));
        }
        this.examples.push(example);
        console.log(this.examples);

        this.example_out.innerText += `Hit example: ${example}`;
        this.example_button.classList.add("invisible");
    }

    update_shots_display(shot, message) {
        let result = shot.mult(this.starter);
        this.shots_display += `${this.starter} ${this.times_char} ${shot} = ${result}, ${message}\n`;
        this.shot_record_out.innerText = this.shots_display;
    }

    update_goals_display() {
        let result;
        let shot;
        let s = "Under: ";
        if (this.goals.low !== null) {
            shot = this.goals.low;
            result = shot.mult(this.starter);
            s += `${this.starter} ${this.times_char} ${shot} = ${result}`; 
        }
        s += '\n Over : ';
        if (this.goals.high !== null) {
            shot = this.goals.high;
            result = shot.mult(this.starter);
            s += `${this.starter} ${this.times_char} ${shot} = ${result}`; 
        }
        let hitcounts = ["\n1st hit: ", "\n2st hit: ", "\n3rd hit: "];
        for (let i = 0; i < 3; i++) {
            s += hitcounts[i];
            if (this.goals.hits.length >= i + 1) {
                shot = this.goals.hits[i];
                result = shot.mult(this.starter);
                s += `${this.starter} ${this.times_char} ${shot} = ${result}`; 
            }
        }
        this.goal_record_out.innerText = s;
    }

    new_round(increase) {
        this.next_game_block.classList.add("invisible");
        this.shot_input.disabled = false;
        this.shoot_button.disabled = false;
        this.create_round(Math.min(this.level + increase, this.max_levels));
    }

    initiate_game() {
        this.level_out = document.getElementById("level");
        this.next_game_block = document.getElementById("next_game_block");
        this.repeat_level_button = document.getElementById("repeat");
        this.level_up_button = document.getElementById("level_up");
        this.starter_out = document.getElementById("starter");
        this.range_low_out = document.getElementById("range_low");
        this.range_high_out = document.getElementById("range_high");
        this.shot_input = document.getElementById("shot");
        this.shoot_button = document.getElementById("shoot");
        this.hint_out = document.getElementById("hint-message");
        this.example_block = document.getElementById("example-block");
        this.example_button = document.getElementById("example-button");
        this.example_out = document.getElementById("example");
        this.shot_record_out = document.getElementById("shots_display");
        this.goal_record_out = document.getElementById("goals_display");
        this.times_char = "\u00D7";
        this.create_round(1);
        this.shoot_button.addEventListener("click", () => this.do_one_shot());
        this.repeat_level_button.addEventListener("click", () => this.new_round(0));
        this.level_up_button.addEventListener("click", () => this.new_round(1));
        this.example_button.addEventListener("click", () => this.give_example());
        this.max_levels = 20;
    }

}


let GAME = new HTT_Game();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GAME.initiate_game());
} else {
    GAME.initiate_game();
}