// Created using ChatGPT and Copilot.
let questionsAI = [{
    question: "How to write an IF statement in JavaScript?",
    answers: [
        "if i = 5 then",
        "if i == 5 then",
        "if (i == 5) {}",
        "if i = 5"
    ],
    correct: 2
}, {
    question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: [
        "if (i != 5)",
        "if i <> 5",
        "if (i <> 5)",
        "if i =! 5 then"
    ],
    correct: 0
}, {
    question: "How does a WHILE loop start?",
    answers: [
        "while (i <= 10; i++)",
        "while i = 1 to 10",
        "while (i <= 10)",
        "while (i <= 10; i++)"
    ],
    correct: 2
}, {
    question: "How does a FOR loop start?",
    answers: [
        "for (i <= 5; i++)",
        "for (i = 0; i <= 5)",
        "for i = 1 to 5",
        "for (let i = 0; i <= 5; i++)"
    ],
    correct: 3
}, {
    question: "How can you add a comment in a JavaScript?",
    answers: [
        "'This is a comment",
        "//This is a comment OR /*This is a comment*/",
        "!--This is a comment--",
        ">thisisacomment<>/thisisacomment<"
    ],
    correct: 1
}, {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
        "rnd(7.25)",
        "Math.rnd(7.25)",
        "round(7.25)",
        "Math.round(7.25)"
    ],
    correct: 3
}, {
    question: "How do you find the number with the highest value of x and y?",
    answers: [
        "ceil(x, y)",
        "Math.ceil(x, y)",
        "top(x, y)",
        "Math.max(x, y)"
    ],
    correct: 3
}, {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
        "onchange",
        "onmouseclick",
        "onmouseover",
        "onclick"
    ],
    correct: 3
}, {
    question: "Is JavaScript case-sensitive?",
    answers: [
        "Yes",
        "No",
        "Maybe",
        "I don't know"
    ],
    correct: 0
}, {
    question: "What is the correct JavaScript syntax to write 'Hello World'?",
    answers: [
        "System.out.println('Hello World');",
        "println ('Hello World');",
        "document.write('Hello World'); in document OR console.log('Hello World'); in console",
        "response.write('Hello World');"
    ],
    correct: 2
}, {
    question: "How do you create a variable with the numeric value 5?",
    answers: [
        "let x = 5;", 
        "var x = '5';",
        "x = 5;",
        "x = '5';"
    ],
    correct: 0
}, {
    question: "How do you create a variable with the string value of 'John Doe'?",
    answers: [
        "var x = 'John Doe';",
        "var x = John Doe;",    
        "x = 'John Doe';",
        "x = John Doe;"
    ],
    correct: 0
}, {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
        "*",
        "-",
        "x",
        "="
    ],
    correct: 3
}, {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
    '<script href="xxx.js">', 
    '<script name="xxx.js">', 
    '<script src="xxx.js">', 
    '<script file="xxx.js">'], 
    correct: 2, 
}, 

{
    question: 'What is the correct syntax for creating a function in JavaScript?', 
    answers: [
    'function myFunction()', 
    'function = myFunction()', 
    'function:myFunction()', 
    'function myFunction'], 
    correct: 0, 
},

{
    question: 'What is the correct syntax for creating an array in JavaScript?', 
    answers: [
    'var colors = "red", "green", "blue"', 
    'var colors = (1:"red", 2:"green", 3:"blue")', 
    'var colors = ["red", "green", "blue"]', 
    'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'], 
    correct: 2,  
},

{
    question: 'What is the correct syntax for looping through an array?', 
    answers: [
    'for (i = 0; i < colors.length; i++)', 
    'for (i <= colors.length; i++)', 
    'for (i = 0; i <= colors.length; i++)', 
    'for (i < colors.length; i++)'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for writing a comment in JavaScript?', 
    answers: [
    '//This is a comment', 
    '<!--This is a comment-->', 
    '**This is a comment**', 
    '#This is a comment'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for declaring a variable in JavaScript?', 
    answers: [
    'v carName;', 
    'variable carName;', 
    'var carName;', 
    'let carName;'], 
    correct: 2,  
},

{
    question: 'What is the correct syntax for using an if statement in JavaScript?', 
    answers: [
    'if i = 5 then', 
    'if (i == 5)', 
    'if i == 5 then', 
    'if i = 5'], 
    correct: 1,  
},

{
    question: 'What is the correct syntax for using a switch statement in JavaScript?', 
    answers: [
    'switch (i) {case 0: ...}', 
    'switch (i) {0: ...}', 
    'switch i {case 0: ...}', 
    'switch i {0: ...}'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for using a while loop in JavaScript?', 
    answers: [
    'while (i <= 10; i++)', 
    'while i = 1 to 10', 
    'while (i <= 10) {i++}', 
    'while i = 1 to 10 {i++}'], 
    correct: 2,  
},

{
    question: 'What is the correct syntax for using a for loop in JavaScript?', 
    answers: [
    'for (i = 0; i <= 5; i++)', 
    'for (i <= 5; i++)', 
    'for i = 1 to 5', 
    'for (i = 0; i <= 5)'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for using a do-while loop in JavaScript?', 
    answers: [
    'do { i++; } while (i <= 10)', 
    'do (i++) while (i <= 10)', 
    'do while (i <= 10; i++)', 
    'do { i++; } while i <= 10'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for using a break statement in JavaScript?', 
    answers: [
    'break;', 
    'break i;', 
    'exit;', 
    'stop;'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for using a continue statement in JavaScript?', 
    answers: [
    'continue;', 
    'continue i;', 
    'skip;', 
    'pass;'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for using a try-catch statement in JavaScript?', 
    answers: [
    'try { ... } catch (err) { ... }', 
    'try ( ... ) catch { ... }', 
    'try { ... } catch { ... }', 
    'try ( ... ) catch (err) { ... }'], 
    correct: 0,  
}, {
    question: 'What is the correct syntax for using a throw statement in JavaScript?', 
    answers: [
    'throw err;', 
    'throw new Error("...");', 
    'throw "...";', 
    'throwError("...");'], 
    correct: 1,  
},

{
    question: 'What is the correct syntax for using a with statement in JavaScript?', 
    answers: [
    'with (object) { ... }', 
    'with object { ... }', 
    'with (object; ... )', 
    'with object; { ... }'], 
    correct: 0,  
},

{
    question: 'What is the correct syntax for using a debugger statement in JavaScript?', 
    answers: [
    'debugger;', 
    'debugger i;', 
    'debug;', 
    'debug i;'], 
    correct: 0
}];