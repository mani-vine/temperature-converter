import TemperatureConverter from './components/TemperatureConverter/TemperatureConverter';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>Temperature Converter</h1>
      <TemperatureConverter />
    </div>
  );
};

export default App;
