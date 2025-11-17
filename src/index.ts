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

class BracketsString {
    str: string;

    static brackets = {
        '(': ')',
        '[': ']',
        '{': '}',
    }

    constructor(str: string) {
        this.str = str;
    }

    checkBrackets(): boolean {
        let opens_stack = [];
        let has_brackets = false;

        for (const char of this.str) {
            if (char in BracketsString.brackets) {
                opens_stack.push(char);
                has_brackets = true;
            }
            else if (Object.values(BracketsString.brackets).includes(char)) {
                const open = opens_stack.pop();
                has_brackets = true;
                if (BracketsString.brackets[open] !== char) {
                    return false
                }
            }
        }

        return (has_brackets && opens_stack.length === 0)
    }
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
    const str: BracketsString = new BracketsString(brackets.value);

    console.log(str)

    bracketsOutput.textContent = str.checkBrackets() ? 
    'Скобки в строке валидны' : 'Строка не прошла валидацию';
});