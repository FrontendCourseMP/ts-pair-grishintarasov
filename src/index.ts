function checkValidity(value: number, min: number, max: number): boolean {
    return (value >= min) && (value <= max) 
}

function calculateTimeDelay(arrival: number, delay: number): number {
    let result: number = arrival + delay;
    
    while (result > 23) {
        result -= 24;
    }

    return result
}


const Brackets = {
    '(': ')',
    '[': ']',
    '{': '}',
}

class Stack {
    stack: Array<string>;

    constructor() {
        this.stack = [];
    }

    peek(value: string) {
        return this.stack[-1];
    }

    pop() {
        return this.stack.pop();
    }
    
    push(value: string) {
        this.stack.push(value);
    }
}

function checkBrackets(str: string): boolean {
    const opens_stack = new Stack();
    let has_brackets = false;

    for (const char of str) {
        if (char in Brackets) {
            opens_stack.push(char);
            has_brackets = true;
        }
        else if (Brackets[char]) {
            const open = opens_stack.pop();
            has_brackets = true;
            if (Brackets[open] !== char) {
                return false
            }
        }
    }

    return has_brackets && !opens_stack
}


const arrival = document.getElementsByClassName('input-arr')[0] as HTMLInputElement;
const late = document.getElementsByClassName('input-late')[0] as HTMLInputElement;
const timeOutput = document.getElementsByClassName('time-output')[0] as HTMLOutputElement;
const minValue: number = 0;
const maxValue: number = 23;
const timeInputs = [arrival, late];

const brackets = document.getElementsByClassName('brackets-input')[0] as HTMLInputElement;
const bracketsOutput = document.getElementsByClassName('brackets-output')[0] as HTMLOutputElement;
const bracketsButton = document.getElementsByClassName('check-btn')[0] as HTMLButtonElement;


timeInputs.forEach(_ => {
    _.addEventListener('input', () => {
        const arrivalTime: number = Number(arrival.value);
        const lateTime: number = Number(late.value);
        let answ: number = -1;
        
        if (checkValidity(arrivalTime, minValue, maxValue)) {
            answ = calculateTimeDelay(arrivalTime, lateTime);
        }

        timeOutput.textContent = answ > -1 ? String(answ) : 'Некорректный ввод';
    });
});

bracketsButton.addEventListener('click', (event) => {
    event.preventDefault;
    const str: string = brackets.value;

    console.log(str)

    bracketsOutput.textContent = checkBrackets(str) ? 
    'Скобки в строке валидны' : 'Строка не прошла валидацию';
});