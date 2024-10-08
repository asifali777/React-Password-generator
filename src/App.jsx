import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLenght] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [Password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");


  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); 
    // passwordRef.current?.setSelectionRange()
    window.navigator.clipboard.writeText(Password);

  }, [Password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (specialCharacter) str += "!@#$%^&*(){}[]:;`~|=+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setPasswordStrength(PasswordStrength(pass))
  }, [length, numberAllow, specialCharacter, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, specialCharacter, passwordGenerator]);

  const PasswordStrength = (pass)=>{

    if (pass.length <= 6) return "weak"
    if (pass.length <= 12) return "Medium"
    if (pass.length <= 24) return "Strong"
    if (pass.length > 24) return "Ultra Strong"

  }
  


  return (
    <div className=" p-8 w-full h-screen bg-slate-100">
      <h1 className=" text-center  text-4xl">Password Generator</h1>

      <div className=" h-fit w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-4 bg-white">
        <div className="mb-2 w-full flex gap-2">
          <input
            className=" w-full rounded-md outline-none border-none p-2"
            type="text"
            value={Password}
            placeholder="generate password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className=" bg-blue-700 hover:bg-blue-600 px-4 rounded-md text-white"
          >
            Copy
          </button>
        </div>

        <div className=" flex items-center gap-x-2">
          <input
            className="cursor-pointer"
            type="range"
            min={6}
            max={48}
            value={length}
            onChange={(e) => {
              setLenght(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className=" flex items-center gap-x-2">
          <input
            className="cursor-pointer"
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={() => {
              setNumberAllow((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>
        <div className=" flex items-center gap-x-2">
          <input
            className="cursor-pointer"
            type="checkbox"
            defaultChecked={specialCharacter}
            id="numberInput"
            onChange={() => {
              setSpecialCharacter((prev) => !prev);
            }}
          />
          <label>specialCharacter</label>
        </div>
          

        <button
          onClick={passwordGenerator}
          className=" hover:bg-green-600 mt-4 bg-green-700 w-full py-2 rounded-md font-semibold text-white"
        >
          Generate Password
        </button>
  
      </div>
      <div className=' fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
           <a href="https://github.com/asifali777/react-password-generator" target="_blank">Visit Repo</a>
      </div>
        <div className={`mb-4 text-center text-lg font-semibold ${
        passwordStrength === "Strong" ? "text-green-600" 
        : passwordStrength === "Medium" ? "text-yellow-500" 
        : passwordStrength === "Ultra Strong" ? "text-violet-900"
        :"text-red-500" }`}>
          Strength: {passwordStrength}
        </div>
    </div>
  );
}

export default App;
