const body = document.querySelector('body');
const classHolder = document.querySelector('#main-section');

const themeOne = document.querySelector('#radio-1');
const themeTwo = document.querySelector('#radio-2');
const themeThree = document.querySelector('#radio-3');

themeOne.addEventListener('click', () => {
    classHolder.classList.add('theme-one');
    classHolder.classList.remove('theme-two');
    classHolder.classList.remove('theme-three');
})

themeTwo.addEventListener('click', () => {
    classHolder.classList.add('theme-two');
    classHolder.classList.remove('theme-one');
    classHolder.classList.remove('theme-three');
})

themeThree.addEventListener('click', () => {
    classHolder.classList.add('theme-three');
    classHolder.classList.remove('theme-one');
    classHolder.classList.remove('theme-two');
})

// // Scientific Mode
const sciMode = document.querySelector('#scientific-mode');
const sciPad = document.querySelector('#button-pad');

sciMode.addEventListener('click', () => {
    sciPad.classList.toggle('buttons-panel-scientific');
})

// Calculator Functionality
const numberButtons = document.querySelectorAll('[numbers]')
const operationButtons = document.querySelectorAll('[operation]')
const sciButtons = document.querySelectorAll('[sci]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[reset]')
const previousOperandTextElement = document.querySelector('[prev-input]')
const currentOperandTextElement = document.querySelector('[current-input]')

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    deleteOperation() {
        this.operation = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    chooseOperationSci(operation) {
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    factorial(number) {
        if (number <= 1) {
            return 1
        }
        else {
            return this.factorial(number - 1) * number
        }
    }

    compute() {
        let computation
        let temp
        let i
        let prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            case 'sin':
                if (isNaN(prev)) {
                    temp = Math.sin(current * (Math.PI / 180))
                    computation = Math.round(temp * 10000) / 10000
                }
                else {
                    temp = prev * (Math.sin(current * (Math.PI / 180)))
                    computation = Math.round(temp * 10000) / 10000
                }
                break
            case 'cos':
                if (isNaN(prev)) {
                    temp = Math.cos(current * (Math.PI / 180))
                    computation = Math.round(temp * 10000) / 10000
                }
                else {
                    temp = prev * (Math.cos(current * (Math.PI / 180)))
                    computation = Math.round(temp * 10000) / 10000
                }
                break
            case 'tan':
                if (isNaN(prev)) {
                    temp = Math.tan(current * (Math.PI / 180))
                    computation = Math.round(temp * 10000) / 10000
                }
                else {
                    temp = prev * (Math.tan(current * (Math.PI / 180)))
                    computation = Math.round(temp * 10000) / 10000
                }
                break
            case ')²':
                if (isNaN(prev)) {
                    return
                }
                else {
                    computation = prev * prev
                }
                break
            case '√':
                if (isNaN(current)) {
                    return
                }
                else {
                    computation = Math.sqrt(current)
                }
                break
            case 'ln':
                if (isNaN(prev)) {
                    temp = Math.log(current)
                    computation = Math.round(temp * 10000) / 10000
                }
                else {
                    temp = prev * Math.log(current)
                    computation = Math.round(temp * 10000) / 10000
                }
                break
            case 'log':
                if (isNaN(prev)) {
                    temp = Math.log10(current)
                    computation = Math.round(temp * 10000) / 10000
                }
                else {
                    temp = prev * Math.log10(current)
                    computation = Math.round(temp * 10000) / 10000
                }
                break
            case 'π':
                computation = Math.round(Math.PI * 10000) / 10000
                break
            case '!':
                if (isNaN(prev)) {
                    return
                }
                else {
                    computation = this.factorial(prev)
                }
                break
            case '^':
                if (isNaN(prev)) {
                    return
                }
                else {
                    computation = Math.pow(prev, current)
                }
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.currentOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(this.currentOperand)}`
        }
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

sciButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperationSci(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
