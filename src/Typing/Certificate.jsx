import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Certificate({
  generateCertificate,
  wpm = 10,
  accuracy = 20,
  selectedTime,
}) {
  const userName = "Abhishek Ojha";
  return (
    <>
      <div
        id="certificate"
        style={{
          width: "890px",
          height: "595px",
          position: "relative",
          backgroundImage:
            "url('/Gold Black Luxury Completion Certificate.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          fontFamily: "serif",
        }}
      >
        {/* User Name */}
        <div
          style={{
            position: "absolute",
            top: "305px",
            width: "100%",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {userName || "Your Name"}
        </div>
      </div>

      <button onClick={generateCertificate}>Download Certificate</button>
    </>
  );
}

export default Certificate;
