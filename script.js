let calculation = localStorage.getItem('calculation') || '';

displayCalculation();

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    // Numbers
    if (key >= '0' && key <= '9') {
        updateCalculation(key);
    }
    // Operators
    else if ('+-*/'.includes(key)) {
        updateCalculation(key);
    }
    // Decimal
    else if (key === '.') {
        updateCalculation('.');
    }
    // Calculate
    else if (key === '=' || key === 'Enter') {
        evaluateCalculation();
    }
    // Backspace
    else if (key === 'Backspace') {
        calculation = calculation.slice(0, -1);
        displayCalculation();
        saveCalculation();
    }
    // Clear
    else if (key === 'Escape') {
        clearCalculation();
    }
});

function updateCalculation(value) {
    calculation += value;
    displayCalculation();
}

function evaluateCalculation() {
    try {
        // Fix for cases like "5+" which would error
        if ('+-*/'.includes(calculation.slice(-1))) {
            calculation = calculation.slice(0, -1);
        }
        const result = eval(calculation);
        calculation = result.toString();
        displayCalculation();
        saveCalculation();
    } catch (error) {
        calculation = 'Error';
        displayCalculation();
        setTimeout(clearCalculation, 1500);
    }
}

function clearCalculation() {
    calculation = '';
    displayCalculation();
    saveCalculation();
}

function displayCalculation() {
    document.querySelector('.js-output-display').innerHTML = calculation;
}

function saveCalculation() {
    localStorage.setItem('calculation', calculation);
}
