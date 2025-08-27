// components/Logo.js
import { Sparkles } from "lucide-react";


export default function Logo({ className = "" }) {
  return (
    <div className="logoContainer">
      <Sparkles className="icon" />
      <h1 className="logoText">Mindverse</h1>
    </div>
  );
}
