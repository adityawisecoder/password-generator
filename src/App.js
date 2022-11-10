import './styles/passwordGenerator.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [passwordLength, setPasswordLength] = useState(20)
  const [lowerCheckbox, setLowerCheckbox] = useState(true)
  const [upperCheckbox, setUpperCheckbox] = useState(true)
  const [digitsCheckbox, setDigitsCheckbox] = useState(true)
  const [symbolsCheckbox, setSymbolsCheckbox] = useState(true)
  const [result, setResult] = useState('')
  const [copiedMessage, setCopiedMessage] = useState(false)

  const generatePassword = () => {
    const upperCaseArray = lowerCheckbox ? 'abcdefghijklmnopqrstuvwxyz' : ''
    const lowerCaseArray = upperCheckbox ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''
    const digitArray = digitsCheckbox ? '0123456789' : ''
    const symbolArray = symbolsCheckbox ? '!@#$%^&*=,./ ' : ''
    const bigArray = lowerCaseArray + upperCaseArray + digitArray + symbolArray

    var newPassword = ''
    if (bigArray.length > 0)
      for (var i = 0; i < passwordLength; i++)
        newPassword += bigArray[Math.floor(Math.random() * bigArray.length)]

    setResult(newPassword)
  }

  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="container">
      <h2>PASSWORD GENERATOR</h2>

      <div id="resultBox">
        <span id="result">{result}</span>
        <button
          id="copyButton"
          onClick={() => {
            navigator.clipboard.writeText(result)
            setCopiedMessage(true)
            setTimeout(() => {
              console.log('show')
              setCopiedMessage(false)
            }, 1000)
          }}
        >
          COPY
        </button>
      </div>

      <div className="details">
        <div className="setting">
          <label htmlFor="passwordLength">Password length</label>
          <input
            type="number"
            id="passwordLength"
            min="4"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="setting">
          <label htmlFor="lowercase">Include Lowercase Letters</label>
          <input
            type="checkbox"
            id="lowercase"
            checked={lowerCheckbox}
            onChange={(e) => setLowerCheckbox(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label htmlFor="uppercase">Include Uppercase Letters</label>
          <input
            type="checkbox"
            id="uppercase"
            checked={upperCheckbox}
            onChange={(e) => setUpperCheckbox(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label htmlFor="digits">Include Digits</label>
          <input
            type="checkbox"
            id="digits"
            checked={digitsCheckbox}
            onChange={(e) => setDigitsCheckbox(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label htmlFor="symbols">Include Symbols</label>
          <input
            type="checkbox"
            id="symbols"
            checked={symbolsCheckbox}
            onChange={(e) => setSymbolsCheckbox(e.target.checked)}
          />
        </div>
      </div>

      <div className="divForGenerateButton">
        <button id="generateButton" onClick={() => generatePassword()}>
          Generate Password
        </button>
      </div>

      <div id="copiedMessage" className={copiedMessage ? 'show' : 'hide'}>
        Password copied!
      </div>
    </div>
  )
}

export default App
