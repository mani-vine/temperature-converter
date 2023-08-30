export const convertTemperature = (value: number, selectedUnit: string): number => {
  if (!isNaN(value)) {
    if (selectedUnit === 'Celsius') {
      return (value * 9) / 5 + 32; //Formula for fahrenheit conversion
    } else {
      return ((value - 32) * 5) / 9; //Formula for Celsius conversion
    }
  } else {
    return 0;
  }
};
