import { SyntheticEvent, useState } from 'react';
import { convertTemperature } from '../../utils';
import styles from './TemperatureConverter.module.scss';

const TemperatureConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('Celsius');
  const [convertedValue, setConvertedValue] = useState<string | null>(null);
  const [isHotter, setIsHotter] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
  };

  const handleSwap = () => {
    setSelectedUnit(selectedUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  const handleConvertTemperature = (e: SyntheticEvent) => {
    e.preventDefault();
    const inputValueNumber = parseFloat(inputValue);
    if (!isNaN(inputValueNumber)) {
      const convertedValue = convertTemperature(inputValueNumber, selectedUnit);
      if (selectedUnit === 'Celsius') {
        setConvertedValue(`${convertedValue.toFixed(2)} °F`);
        setIsHotter(convertedValue >= 95);
      } else {
        setConvertedValue(`${convertedValue.toFixed(2)} °C`);
        setIsHotter(convertedValue >= 35);
      }
    } else {
      setConvertedValue('Invalid input');
      setIsHotter(null);
    }
  };

  // Dynamically compute label and unit based on the selected unit
  const label = selectedUnit === 'Celsius' ? 'Celsius' : 'Fahrenheit';
  const unit = selectedUnit === 'Celsius' ? '°C' : '°F';

  return (
    <form className={styles.container} onSubmit={handleConvertTemperature}>
      <div className={styles.unitContainer}>
        <label>
          <input
            type='radio'
            value='Celsius'
            checked={selectedUnit === 'Celsius'}
            onChange={() => handleUnitChange('Celsius')}
          />
          Celsius
        </label>
        <label>
          <input
            type='radio'
            value='Fahrenheit'
            checked={selectedUnit === 'Fahrenheit'}
            onChange={() => handleUnitChange('Fahrenheit')}
          />
          Fahrenheit
        </label>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.unitLabel}>{label}:</label>
        <input
          data-testid='input-field'
          type='number'
          value={inputValue}
          onChange={handleInputChange}
          required
        />
        {unit}
      </div>
      <div className={styles.actionContainer}>
        <button type='submit'>Convert</button>
        <button className='secondary' onClick={handleSwap}>
          Swap
        </button>
      </div>
      {convertedValue && (
        <p
          className={`${styles.result} ${
            isHotter !== null && (isHotter ? styles.hot : styles.cold)
          }`}
        >
          Converted Temperature: {convertedValue}
        </p>
      )}
    </form>
  );
};

export default TemperatureConverter;
