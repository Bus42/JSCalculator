var inputButtons = document.querySelectorAll('.input'),
    output = document.querySelector('#output'), historyOutput = document.querySelector('#historyOutput'),
    inputString = '',
    operandButtons = document.querySelectorAll('.operand'),
    lastButton, acButton = document.querySelector('.ac'),
    decimalButton = document.querySelector('.decimal'),
    equalButton = document.querySelector('.equals'),
    historyArr = [];

function inputs() {
    if (!isNaN(lastButton) && this.innerHTML === '(' || !isNaN(this.innerHTML) && lastButton === ')') return;
    if (lastButton === '=') {//if last number was a result, reset everything.
        inputString = '';
        output.innerHTML = 0;
        historyArr = [];
        historyOutput.innerHTML = 0;
    }
    if (lastButton === '/' || lastButton === '*' || lastButton === '-' || lastButton === '+') {
        inputString = '';
    }
    inputString += this.innerHTML;
    historyArr.push(this.innerHTML);
    lastButton = this.innerHTML;
    output.innerHTML = inputString;
    historyOutput.innerHTML = historyArr.join('');
}

function operands() {
    if (inputString.length === 0 || lastButton === '.') {
        return;
    }
    lastButton = this.innerHTML; //store last button selected
    historyArr.push(this.innerHTML);
    historyOutput.innerHTML = historyArr.join('');
}

function allClear() {
    inputString = '';
    output.innerHTML = 0;
    lastButton = '';
    historyArr = [];
    historyOutput.innerHTML = 0;
}

function decimal() {
    if (inputString.length === 0 || isNaN(lastButton) || output.innerHTML.indexOf(this.innerHTML) != -1) {//prevent illegal use of decimals
        return;
    }
    inputString += this.innerHTML;
    output.innerHTML = inputString;
    lastButton = this.innerHTML;
    historyArr.push(this.innerHTML);
}

function equal() {
    if (inputString.length === 0) {
        return;
    }
    lastButton = this.innerHTML;
    output.innerHTML = math.eval(historyArr.join(''));
    historyArr = [math.eval(historyArr.join(''))];
}

inputButtons.forEach(function (button) {
    button.addEventListener('click', inputs);
});

operandButtons.forEach(function (button) {
    button.addEventListener('click', operands);
});

acButton.addEventListener('click', allClear);

decimalButton.addEventListener('click', decimal);

equalButton.addEventListener('click', equal);
/** Test script below this line. */
