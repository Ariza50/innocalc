import './Calculator.css';
import {useState} from 'react';
import Button from './components/Button/Button';

const Calculator = () => {

  const calculatorButtons = [
    [
      {
        label: 'AC',
        class: 'special',
        type: 'special'
      },
      {
        label: '+/-',
        class: 'special',
        type: 'special'
      },
      {
        label: '%',
        class: 'special',
        type: 'special'
      },
      {
        label: '÷',
        class: '',
        type: 'operator'
      },
    ],
    [
      {
        label: '7',
        class: '',
        type: 'number'
      },
      {
        label: '8',
        class: '',
        type: 'number'
      },
      {
        label: '9',
        class: '',
        type: 'number'
      },
      {
        label: '×',
        class: '',
        type: 'operator'
      },
    ],
    [
      {
        label: '4',
        class: '',
        type: 'number'
      },
      {
        label: '5',
        class: '',
        type: 'number'
      },
      {
        label:'6',
        class: '',
        type: 'number'
      },
      {
        label:'-',
        class: '',
        type: 'operator'
      },
    ],
    [
      {
        label:'1',
        class: '',
        type: 'number'
      },
      {
        label: '2',
        class: '',
        type: 'number'
      },
      {
        label:'3',
        class: '',
        type: 'number'
      },
      {
        label: '+',
        class: '',
        type: 'operator'
      },
    ],
    [
      {
        label: '0',
        class: '',
        type: 'number'
      },
      {
        label: '.',
        class: '',
        type: 'decimal'
      },
      {
        label:'=',
        class: 'operator extra',
        type: '='
      },
    ],
  ];

  let [calculator, setCalculator] = useState({
    displayValue: '0',
    firstValue: 0,
    secondValue: 0,
    operator: null,
    operated: false,
    askDecimal: false,
    highlighOperation: null,
  })

  const resetValues = () => {
    setCalculator({
      displayValue: '0',
      firstValue: 0,
      secondValue: 0,
      operator: null,
      askDecimal: false,
      highlighOperation: null,
    });
  }

  const invertSign = () => {
    const key = calculator.operator ? 'secondValue' : 'firstValue';
    setCalculator({
      ...calculator,
      displayValue: calculator.displayValue * -1,
      [key]: calculator[key] * -1
    });
  }

  const numberClick = (newNumber) => {
    let value;
    let key;
    let operated;
    if (calculator.operated) {
      key = 'firstValue'
      value = newNumber;
      operated = false;
    } else {
      key = calculator.operator ? 'secondValue' : 'firstValue';

      value = calculator.askDecimal
        ? parseFloat(String(calculator[key] + '.' + newNumber.toString()))
        : parseFloat(String(calculator[key] + newNumber.toString()));

      operated = calculator.operated;
    }

    setCalculator({
      ...calculator,
      [key]: value,
      displayValue: value.toString(10),
      operated,
      askDecimal: false,
      highlighOperation: null,
    })
  }

  const addDecimal = () => {
    setCalculator({
      ...calculator,
      displayValue: calculator.displayValue.includes('.') ? calculator.displayValue : calculator.displayValue + '.',
      askDecimal: !calculator.displayValue.includes('.')
    });
  }

  const updateOperation = (operator) => {
    if (!calculator.operator) {
      return;
    }

    const result = calculator.operator === '+'
      ? calculator.firstValue + calculator.secondValue
      : calculator.operator === '-'
      ? calculator.firstValue - calculator.secondValue
      : calculator.operator === '×'
      ? calculator.firstValue * calculator.secondValue
      : calculator.operator === '÷'
      ? calculator.secondValue !== 0
      ? calculator.firstValue / calculator.secondValue
      : 'Error'
      : 0

    setCalculator({
      displayValue: String(result),
      firstValue: result === 'Error' ? 0 : result,
      secondValue: 0,
      operator: operator,
      operated: operator === null,
      highlighOperation: operator,
    });
  }

  const addOperand = (operand) => {
    setCalculator({
      ...calculator,
      operator: operand,
      operated: false,
      highlighOperation: operand
    });
    updateOperation(operand);
  }

  const percentOperation = () => {
    const key = calculator.operator ? 'secondValue' : 'firstValue';

    setCalculator({
     ...calculator,
     [key]: calculator[key] / 100,
     displayValue: String(calculator[key] /100),
    });
  }

  const buttonOperations = {
    AC: resetValues,
    '+/-': invertSign,
    '÷': addOperand,
    '×': addOperand,
    '-': addOperand,
    '+': addOperand,
    '=': updateOperation,
    '%': percentOperation,
    ',': addDecimal,
  }

  const checkOperation = (value) => {
    buttonOperations[value](value);
  }

  return (
    <div className="calculator-container">
      <header>{calculator.displayValue}</header>
      <div className="keyboard-container">
        {
          calculatorButtons.flat().map((button, idx) => (
            button.type === 'special'
              ? <Button key={idx} value={button.label} className={button.class} onClick={() => checkOperation(button.label)} />
              : button.type === 'operator'
                ? <Button
                  key={idx}
                  value={button.label}
                  className={calculator.highlighOperation === button.label ? "selected-operator" : "operator"}
                  onClick={() => checkOperation(button.label)} />
                : button.type === 'number'
                  ? <Button key={idx} value={button.label} onClick={() => numberClick(button.label)} />
                  : button.type === 'decimal'
                    ? <Button key={idx} value="." onClick={() => checkOperation(',')} />
                    : <Button key={idx} value="=" className={button.class} onClick={() => updateOperation(null)} />
          ))
        }
      </div>
    </div>
  );
};

export default Calculator;
