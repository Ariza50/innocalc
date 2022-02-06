import './Calculator.css';
import {useState} from 'react';
import Button from './components/Button/Button';

const Calculator = () => {
  let [calculator, setCalculator] = useState({
    displayValue: 0,
    firstValue: 0,
    secondValue: 0,
    operator: null,
    operated: false,
  })

  const resetValues = () => {
    setCalculator({
      displayValue: 0,
      firstValue: 0,
      secondValue: 0,
      operator: null,
    });
  }

  const invertSign = () => {
    setCalculator({
      ...calculator,
      displayValue: calculator.displayValue * -1
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
      value = parseFloat(String(calculator[key]) + newNumber);
      operated = calculator.operated;
    }

    setCalculator({
      ...calculator,
      [key]: value,
      displayValue: value.toString(10),
      operated
    })
  }

  const updateOperation = () => {
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
      ? calculator.firstValue / calculator.secondValue
      : 0

    setCalculator({
      displayValue: String(result),
      firstValue: result,
      secondValue: 0,
      operator: null,
      operated: true,
    });
  }

  const addOperand = (operand) => {
    console.log('addOperand ', operand);
    setCalculator({
      ...calculator,
      operator: operand
    });
    // updateOperation();
  }

  const buttonValues = {
    AC: resetValues,
    '+/-': invertSign,
    '÷': addOperand,
    '×': addOperand,
    '-': addOperand,
    '+': addOperand,
    '=': updateOperation,
  }

  const checkButton = (value) => {
    buttonValues[value]();
  }
  console.log('calculator ', calculator);
  return (
    <div className="calculator-container">
      <header>{calculator.displayValue}</header>
      {/*<input type="text" value={0} />*/}
      <div className="keyboard-container">
        <Button value="AC" className="special" onClick={() => checkButton('AC')} />
        {/*<button className="special">AC</button>*/}
        <Button value="+/-" className="special" onClick={() => checkButton('+/-')} />
        {/*<button className="special">+/-</button>*/}
        <Button value="%" className="special" onClick={() => checkButton('%')} />
        {/*<button className="special">%</button>*/}
        <Button value="÷" className="operator" onClick={() => addOperand('÷')} />
        {/*<button className="operator">÷</button>*/}
        <Button value="7" onClick={() => numberClick('7')} />
        {/*<button>7</button>*/}
        <Button value="8" onClick={() => numberClick('8')} />
        {/*<button>8</button>*/}
        <Button value="9" onClick={() => numberClick('9')} />
        {/*<button>9</button>*/}
        <Button value="×" className="operator" onClick={() => addOperand('×')} />
        {/*<button className="operator">×</button>*/}
        <Button value="4" onClick={() => numberClick('4')} />
        {/*<button>4</button>*/}
        <Button value="5" onClick={() => numberClick('5')} />
        {/*<button>5</button>*/}
        <Button value="6" onClick={() => numberClick('6')} />
        {/*<button>6</button>*/}
        <Button value="-" className="operator" onClick={() => addOperand('-')} />
        {/*<button className="operator">-</button>*/}
        <Button value="1" onClick={() => numberClick('1')} />
        {/*<button>1</button>*/}
        <Button value="2" onClick={() => numberClick('2')} />
        {/*<button>2</button>*/}
        <Button value="3" onClick={() => numberClick('3')} />
        {/*<button>3</button>*/}
        <Button value="+" className="operator" onClick={() => addOperand('+')} />
        {/*<button className="operator">+</button>*/}
        <Button value="0" onClick={() => numberClick('0')} />
        {/*<button>0</button>*/}
        <Button value="," onClick={() => checkButton(',')} />
        {/*<button>,</button>*/}
        <Button value="=" className="operator extra" onClick={() => updateOperation()} />
      </div>
    </div>
  );
};

export default Calculator;
