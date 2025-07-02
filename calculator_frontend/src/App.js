import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

// Calculator button layout
const buttonsLayout = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch calculation history on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleButtonClick = (value) => {
    if (value === '=') {
      if (input === '') return;
      try {
        // Basic arithmetic, no eval security for this simple app
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult);

        // Save to Supabase
        saveCalculation(input, evalResult);
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + value);
    }
  };

  // PUBLIC_INTERFACE
  async function saveCalculation(expression, resultValue) {
    setLoading(true);
    // Insert calculation to Supabase
    const { error } = await supabase.from('calculations').insert([
      { expression: expression, result: String(resultValue) },
    ]);
    setLoading(false);
    if (!error) {
      fetchHistory();
    }
  }

  // PUBLIC_INTERFACE
  async function fetchHistory() {
    setLoading(true);
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    setLoading(false);
    if (!error && data) setHistory(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div
          style={{
            margin: '0 auto',
            width: '320px',
            background: 'var(--bg-secondary)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{marginBottom: 0}}>Simple Calculator</h2>
          <div
            style={{
              width: '100%',
              background: 'var(--bg-primary)',
              minHeight: '60px',
              borderRadius: '8px',
              margin: '18px 0 10px 0',
              padding: '14px',
              boxSizing: 'border-box',
              textAlign: 'right',
              fontSize: '1.6rem',
              border: '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                height: '20px',
                overflowX: 'auto',
              }}
            >
              {input || ''}
            </div>
            <div style={{ fontWeight: 700, marginTop: '4px', minHeight: '26px' }}>
              {result !== '' ? '= ' + result : ''}
            </div>
          </div>
          <div style={{ width: '100%', margin: '8px 0' }}>
            {/* Button grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {buttonsLayout.flat().map((btn) => (
                <button
                  key={btn}
                  style={{
                    background: btn === '=' ? '#1976d2' : 'var(--button-bg)',
                    color: 'var(--button-text)',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1.2rem',
                    height: '45px',
                    cursor: 'pointer',
                    fontWeight: btn === '=' ? 700 : 600,
                  }}
                  onClick={() => handleButtonClick(btn)}
                  aria-label={btn}
                >
                  {btn}
                </button>
              ))}
              {/* Add clear and backspace */}
              <button
                key="C"
                style={{
                  background: '#E57373',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1.2rem',
                  gridColumn: 'span 2',
                  height: '45px',
                  marginTop: '6px',
                  fontWeight: 700,
                }}
                onClick={() => handleButtonClick('C')}
                aria-label="Clear"
              >
                C
              </button>
              <button
                key="⌫"
                style={{
                  background: '#FFD54F',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1.2rem',
                  gridColumn: 'span 2',
                  height: '45px',
                  marginTop: '6px',
                  fontWeight: 700,
                }}
                onClick={() => handleButtonClick('⌫')}
                aria-label="Backspace"
              >
                ⌫
              </button>
            </div>
          </div>
          <div style={{ marginTop: 26, width: '100%' }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Calculation History</div>
            {loading && <div style={{ fontSize: '0.95rem' }}>Loading...</div>}
            <ul style={{ listStyle: 'none', paddingLeft: 0, maxHeight: '220px', overflowY: 'auto' }}>
              {history.length === 0 && !loading && (
                <li style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>No recent calculations.</li>
              )}
              {history.map((item) => (
                <li
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    padding: '6px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1rem',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{item.expression}</span>
                  <span style={{ fontWeight: 600, marginLeft: 14 }}>= {item.result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
