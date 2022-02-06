import './Calculator.css';

const Calculator = () => {

  return (
    <div className="calculator-container">
      <header>0</header>
      {/*<input type="text" value={0} />*/}
      <div className="keyboard-container">
        <button className="special">AC</button>
        <button className="special">+/-</button>
        <button className="special">%</button>
        <button className="operator">÷</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="operator">×</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className="operator">-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className="operator">+</button>
        <button>0</button>
        <button>,</button>
        <button className="operator extra">=</button>
      </div>
    </div>
  );
};

export default Calculator;
