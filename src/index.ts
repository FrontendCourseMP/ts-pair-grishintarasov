function checkValidity(value: number, min: number, max: number) {
    return (value >= min) && (value <= max) 
}

function calculateTimeDelay(arrival: number, delay: number) {
    let result: number = arrival + delay;
    
    while (result > 23) {
        result -= 24;
    }

    return result
}


const arrival = document.getElementsByClassName('input-arr')[0] as HTMLInputElement;
const late = document.getElementsByClassName('input-late')[0] as HTMLInputElement;
const output = document.getElementsByClassName('first-output')[0] as HTMLOutputElement;

const minValue: number = 0;
const maxValue: number = 23;
const inputs = [arrival, late];


inputs.forEach(_ => {
    _.addEventListener('input', () => {
        const arrivalTime: number = Number(arrival.value);
        const lateTime: number = Number(late.value);
        let answ: number = -1;
        
        if (checkValidity(arrivalTime, minValue, maxValue)) {
            answ = calculateTimeDelay(arrivalTime, lateTime);
        }

        output.textContent = answ > -1 ? String(answ) : 'Некорректный ввод';
    });
});