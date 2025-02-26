"use client";

import React from "react";
import { Button } from "@r-cz/ui";

interface TokenInputProps {
  token: string;
  setToken: (token: string) => void;
  onDecode: () => void;
}

export function TokenInput({ token, setToken, onDecode }: TokenInputProps) {
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setToken(clipboardText.trim());
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      alert("Unable to access clipboard. Please paste the token manually.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setToken(content.trim());
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    setToken("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium">
          OIDC Token
        </label>
        <div className="flex space-x-2">
          <button
            onClick={handlePaste}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Paste from Clipboard
          </button>
          <label className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
            Upload File
            <input
              type="file"
              className="hidden"
              accept=".txt,.jwt,.json"
              onChange={handleFileUpload}
            />
          </label>
          <button
            onClick={handleClear}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Clear
          </button>
        </div>
      </div>
      
      <textarea
        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={onDecode}
          disabled={!token}
          className={!token ? 'opacity-50' : ''}
        >
          Inspect Token
        </Button>
      </div>
    </div>
  );
}
