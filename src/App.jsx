import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef=useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_{}-+=~";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed,setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numbersAllowed, passwordGenerator])

  const copyPassword = useCallback(()=> {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  })
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center">Password Generator</h1>

        <div className="flex">
          <input
            type="text"
            value={password}
            className="outline-none border border-white w-full px-3 py-2 my-2"
            placeholder="password"
            readOnly
            ref={passwordRef}
          >
          </input>
          <button
            onClick={copyPassword}
            className="bg-orange-500 text-white px-3 py-2 my-2"
          >
            Copy
          </button>
        </div>


        <label>
          <input

            type='range'
            onChange={(e) => setLength(Number(e.target.value))}
            max='20'
            min='8'
            value={length}
          ></input>
          Length {length}
        </label>


        <label>
          <input
            type='checkbox'
            className="mx-2"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          >
          </input>
          Characters</label>


        <label>
          <input
            type='checkbox'
            className="mx-2"
            checked={numbersAllowed}
            onChange={(e) => setNumbersAllowed(e.target.checked)}
          >
          </input>
          Numbers</label>
      </div>
    </>
  )
}

export default App
