document.addEventListener('DOMContentLoaded', () => {
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    const currentDisplay = document.getElementById('current-operand');
    const previousDisplay = document.getElementById('previous-operand');
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const decimalButton = document.getElementById('decimal');

    // Atualiza o display
    function updateDisplay() {
        currentDisplay.textContent = currentInput;
        previousDisplay.textContent = previousInput;
    }

    // Adiciona número
    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Adiciona ponto decimal
    function appendDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            updateDisplay();
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    // Escolhe a operação
    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operation = op;
        previousInput = `${currentInput} ${operation}`;
        currentInput = '';
        updateDisplay();
    }

    // Calcula o resultado
    function compute() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = current === 0 ? 'Erro' : prev / current;
                break;
            default:
                return;
        }
        
        if (computation === 'Erro') {
            currentInput = 'Erro';
            operation = null;
            previousInput = '';
        } else {
            currentInput = computation.toString();
            operation = null;
            previousInput = '';
        }
        resetScreen = true;
        updateDisplay();
    }

    // Limpa tudo
    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Apaga o último dígito
    function deleteLastDigit() {
        if (currentInput === 'Erro') {
            clearAll();
            return;
        }
        if (currentInput.length === 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Event Listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.textContent));
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => chooseOperation(button.textContent));
    });

    equalsButton.addEventListener('click', compute);
    clearButton.addEventListener('click', clearAll);
    deleteButton.addEventListener('click', deleteLastDigit);
    decimalButton.addEventListener('click', appendDecimal);

    // Inicializa o display
    updateDisplay();
});