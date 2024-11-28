import React, { useState } from 'react';
import './ScientificCalculator.css';

function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (number) => {
    if (newNumber) {
      setDisplay(String(number));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(number) : display + number);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setPrevValue(result);
      setDisplay(String(result));
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      case '%': return a % b;
      default: return b;
    }
  };

  const handleEqual = () => {
    const current = parseFloat(display);
    if (operation && prevValue !== null) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="keypad">
        <button className="special" onClick={handleClear}>C</button>
        <button className="special" onClick={handleBackspace}>⌫</button>
        <button className="operator" onClick={() => handleOperator('%')}>%</button>
        <button className="operator" onClick={() => handleOperator('÷')}>÷</button>

        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button className="operator" onClick={() => handleOperator('×')}>×</button>

        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button className="operator" onClick={() => handleOperator('-')}>-</button>

        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>

        <button onClick={() => handleNumber(0)}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="equal" onClick={handleEqual} style={{ gridColumn: 'span 2' }}>=</button>
      </div>
    </div>
  );
}

export default ScientificCalculator; 