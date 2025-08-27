// components/Logo.js
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Sparkles className="w-8 h-8 text-purple-600" />
      <h1
        className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
      >
        Mindverse
      </h1>
    </div>
  );
}
