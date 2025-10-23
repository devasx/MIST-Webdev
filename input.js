const plus = document.getElementById("+");
const minus = document.getElementById("-");
const multiply = document.getElementById("*");
const divide = document.getElementById("/");

const decimal = document.getElementById(".");
const equal = document.getElementById("=");

const screen = document.getElementById("screen");

const clearScreen = document.getElementById("C");
const deleteButton = document.getElementById("del");


let showingResult = 0;


let index = 0;
let index2 = 0;
let previndex = [];
let iprevindex = -1;
let operations = [];

let operators = ["/", "*", "+", "-"];

let n = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
let m = [1,2,3,4,5,6,7,8,9,0];

for (let i = 0; i < n.length; i++){
    let element = document.getElementById(`${m[i]}`);

    element.onclick = function(){
        screen.textContent = screen.textContent + `${m[i]}`;
        index2++;
        console.log(`index2 = ${index2}`);
    }
}

decimal.onclick = function(){
    screen.textContent = screen.textContent + ".";
    index2++;
}

for (let i = 0; i < operators.length; i++){
    let element = document.getElementById(`${operators[i]}`);
    let oper = operators[i];

    element.onclick = function(){
        if (operators.includes(screen.textContent.trim().charAt(index2 - 1))){
            operations.pop();
            operations.push(`${oper}`);
            screen.textContent = screen.textContent.trim().slice(0,index2 - 1) + `${oper}`;
            console.log(operations);
        }
        else{
            screen.textContent = screen.textContent + `${oper}`;
            console.log(index);

            let lindex = screen.textContent.trim().indexOf(`${oper}`, index);
            
            console.log(screen.textContent.trim().slice(index, lindex));
            operations.push(Number(screen.textContent.trim().slice(index, lindex)));
            operations.push(`${oper}`);
            previndex.push(index);
            iprevindex++;
            index = lindex + 1;
            index2++;
            console.log(operations);
        }
    }
}

clearScreen.onclick = function(){
    index = 0;
    index2 = 0;
    showingResult = 0;
    previndex = [];
    iprevindex = -1;
    operations = [];
    screen.textContent = "";
}


deleteButton.onclick = function(){

    let char = screen.textContent.trim().charAt(index2 - 1);

    if (operators.includes(char)){

        operations.pop();
        operations.pop();
        index = previndex[iprevindex];
        iprevindex--;
        screen.textContent = screen.textContent.trim().slice(0, index2-1);

        console.log(operations);
        index2--;
    }
    else if ((!isNaN(char) && isFinite(char) && screen.textContent !== "") || char === "."){
        console.log('reached the number part');

        screen.textContent = screen.textContent.trim().slice(0,index2-1);
        index2--;
        console.log(index2);
    }
    else{
        console.log('empty');
    }
    

}


equal.onclick = function(){
    if (operators.includes(screen.textContent.trim()[0])){
        window.alert("The first element can't be an operator!");
    }
    else if (operators.includes(screen.textContent.trim()[screen.textContent.trim().length - 1])){
        window.alert("The last element can't be an operator!");
    }
    else{
        
        operations.push(Number(screen.textContent.trim().slice(index,)));
        console.log(operations);

        let divideByZero = 0;
        for (let i = 0; i<operations.length; i++){
            if (operations[i] === "/"){
                if (operations[i+1] === 0){
                    window.alert("Division by 0 not possible!");
                    operations.pop();
                    divideByZero = 1;
                    break;
                }
            }
        }

        if (!divideByZero){
            
                
            for (let j = 0; j<operations.length; j++){
                if (operations[j] === "*" || operations[j] === "/"){
                    let result;
                    if (operations[j] === "*"){
                        result = operations[j-1] * operations[j+1]; 
                    }
                    else{
                        result = operations[j - 1] / operations[j+1];
                    }
                    operations[j - 1] = result;
                    operations.splice(j, 2);
                    console.log(operations);
                    j -= 2;
                }
            }

            for (let j = 0; j<operations.length; j++){
                if (operations[j] === "+" || operations[j] === "-"){
                    let result;
                    if (operations[j] === "+"){
                        result = operations[j-1] + operations[j+1]; 
                    }
                    else{
                        result = operations[j - 1] - operations[j+1];
                    }
                    operations[j - 1] = result;
                    operations.splice(j, 2);
                    console.log(operations);
                    j -= 2;
                }
            }
            
            screen.textContent = operations[0];

            index = 0;
            index2 = String(operations[0]).length;
            console.log(index2);
            showingResult = 0;
            previndex = [];
            iprevindex = -1;
            operations.pop();
        }
    }
}
