import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const OTPInput = ({ length = 4, onOtpChange, inputStyle, containerStyle }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [length]); // Re-focus on first input if length changes

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move back if deleting in the middle
    }
    if (onOtpChange) {
      onOtpChange(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5em", ...containerStyle }}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={{
            width: "2em",
            textAlign: "center",
            ...inputStyle,
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
