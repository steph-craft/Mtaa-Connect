import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


function App() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#205C45]">
          Welcome to MtaaConnect
        </h1>

        <p className="mt-4 text-gray-600">
          Find local. Connect easily. Support your community.
        </p>

        <button className="mt-6 rounded-lg bg-[#205C45] px-6 py-3 text-white hover:bg-[#174633]">
          Explore Services
        </button>
      </div>
    </main>
  );
}

export default App;

