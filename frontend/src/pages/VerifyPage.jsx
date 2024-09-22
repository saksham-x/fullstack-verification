import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../config";

const VerifyPage = () => {
  //initialize empty arr
  const emptyArr = new Array(6).fill("");
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  //set input to empty at default and change accordingly
  const [inputs, setInputs] = useState(emptyArr);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleChange = (e, i) => {
    //value from form
    const val = e.target.value;
    //check if number or not
    if (isNaN(val)) {
      return;
    }
    //copy value from inputs and add value in to the index of copy index and update state
    const copyInput = [...inputs];
    copyInput[i] = val;
    setInputs(copyInput);

    if (i < inputs.length - 1) {
      refs[i + 1].current.focus();
    }

    if (message && (val || val == "")) {
      setMessage("");
    }
  };

  const handleKeyDown = (e, i) => {
    //if key pressed is backspace remove value on its index and shift focus to before
    if (e.key === "Backspace") {
      e.preventDefault();
      //asyncronous so we copy the data and then update state
      const copyInput = [...inputs];
      copyInput[i] = "";
      setInputs(copyInput);
      if (i > 0) {
        refs[i - 1].current.focus();
      }
    }
    if (e.key === "ArrowRight" && i < inputs.length - 1) {
      e.preventDefault();
      refs[i + 1].current.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      refs[i - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    //get data from clipboard in text format
    const data = e.clipboardData.getData("text");
    console.log(data.length, inputs.length);
    //check if it is not number or length doesnot match
    if (isNaN(data) || data.length !== inputs.length) return;
    //split data and update state
    const pastedData = data.split("");
    setInputs(pastedData);
    refs[inputs.length - 1].current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    //combine input array
    const code = inputs.join("");
    if (!code) {
      setMessage("Please enter a verification code.");
      return;
    }
    try {
      //post data
      const response = await axios.post(
        `${API}/verify`,
        { code },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInputs(emptyArr);
      setMessage(response.data.message);
      navigate("/success");
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <>
      <div className="otp-container">
        <h1>Verification Code</h1>
        <div className="otp-inputs">
          {emptyArr.map((item, i) => {
            return (
              <input
                type="text"
                ref={refs[i]}
                value={inputs[i]}
                key={i}
                name="code"
                onPaste={handlePaste}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="otp-input"
                maxLength={1}
                autoComplete="off"
              />
            );
          })}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        {message && <div className="error">{message}</div>}
      </div>
    </>
  );
};

export default VerifyPage;
