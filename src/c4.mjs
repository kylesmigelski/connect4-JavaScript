/******************************************
 *
 * Kyle Smigelski
 * Fall 2022
 * CIS 343
 *
 *****************************************/

import { exit } from "process";        // Provides an exit method
import Connect4 from "./Connect4.mjs"  // Demonstrates how to import other .mjs files *if* you want to


// process.argv contains the _entire_ command line including "node" and "c4.mjs".
// calling slice removes these first two items.
const myArgs = process.argv.slice(2);

let rows = 6;
let cols = 7;
let winLength = 4;


if (myArgs.length >= 1) {
    // Use a regular expression to parse rowsxcols
    let matches = /(\d+)x(\d+)/.exec(myArgs[0]);
    if (matches === null) {
        console.log(`Board size "${myArgs[0]}" is not formatted properly.`);
        exit();  // This exit method is only available if you import it above.
    } else {
        // The matches will be Strings unless you call parseInt.
        rows = parseInt(matches[1]);
        cols = parseInt(matches[2]);
        winLength = parseInt(myArgs[1]);
    }
}
(new Connect4(rows, cols, winLength)).playGame();