import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb", // dashboard light background
      }}
    >
      <ScaleLoader
        visible={true}
        height={100}
        width={10}
        color="#2563eb" // dashboard accent blue
        ariaLabel="loading"
      />
      <h1
        style={{
          marginTop: "15px",
          fontSize: "1.5rem",
          fontWeight: "700",
          background: "linear-gradient(to right, #eab308, #9333ea)", // yellow + purple gradient
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1px",
        }}
      >
        
      </h1>
    </div>
  );
}
