
"use strict";

// PART 1: Types & Coercion

// This function validates the amount and returns a valid positive number.
function parseAmount(input) {

    // null and undefined mean that the amount was not provided.
    if (input === null || input === undefined) {
        throw new Error("Amount is required.");
    }

    // Only strings and numbers are accepted.
    if (typeof input !== "string" && typeof input !== "number") {
        throw new Error("Invalid input type.");
    }

    let value = input;

    // Remove extra spaces before converting a string into a number.
    if (typeof value === "string") {
        value = value.trim();

        if (value === "") {
            throw new Error("Amount cannot be empty.");
        }
    }

    const amount = Number(value);

    // Number("abc") produces NaN, so invalid numbers must be rejected.
    if (Number.isNaN(amount)) {
        throw new Error("Please enter a valid number.");
    }

    // A transaction amount must always be greater than zero.
    if (amount <= 0) {
        throw new Error("Amount must be greater than zero.");
    }

    return amount;
}


// Testing parseAmount with different inputs
console.log("PART 1: AMOUNT VALIDATION");

const testInputs = [
    "500",
    " 250 ",
    "",
    "abc",
    null,
    undefined,
    "12.5.3"
];

for (const input of testInputs) {
    try {
        const result = parseAmount(input);
        console.log("Valid amount:", result);
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// Type Coercion Examples
console.log("\nTYPE COERCION");

console.log('"5" + 2 =', "5" + 2);
console.log('"5" - 2 =', "5" - 2);

// The + operator joins strings, while - converts numeric strings into numbers.
// typeof null returns "object" because of a historical JavaScript behaviour.
console.log("typeof null =", typeof null);


// PART 2: Scoping & Hoisting

// const is used because the bank name should never be reassigned.
// let is used because the transaction counter changes over time.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

transactionCounter++;
transactionCounter++;

console.log("\nPART 2: SCOPING & HOISTING");
console.log("Bank Name:", BANK_NAME);
console.log("Transaction Count:", transactionCounter);


// HOISTING DEMO

// During the creation phase, var is initialized with undefined.
// Its assigned value is available only during the execution phase.
console.log("var before declaration:", hoistedVar);
var hoistedVar = "Hello from var";

// let variables are in the Temporal Dead Zone before declaration.
try {
    console.log(hoistedLet);
    let hoistedLet = "Hello from let";
} catch (error) {
    console.log("let error:", error.message);
}

// Function declarations are hoisted with their function definition.
announce();

function announce() {
    console.log("Function declaration works before its definition.");
}

// A var function expression is initially undefined.
// Calling it before assignment causes a TypeError.
try {
    notify();
} catch (error) {
    console.log("Function expression error:", error.message);
}

var notify = function () {
    console.log("Notification sent.");
};


// ASYNCHRONOUS LOOP BUG

// var shares one variable across all loop iterations.
// When the callbacks execute, the loop has already finished.
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log("var loop:", i);
    }, 100);
}

// let creates a separate lexical binding for each iteration.
for (let j = 0; j < 3; j++) {
    setTimeout(function () {
        console.log("let loop:", j);
    }, 100);
}
