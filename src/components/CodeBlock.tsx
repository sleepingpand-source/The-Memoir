"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CodeBlock() {
  const [isHovered, setIsHovered] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const targetOutput = "Love = Infinity.\nCompiling lifelong memories... Success!";

  const runCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalOutput("");
    
    let i = 0;
    const interval = setInterval(() => {
      setTerminalOutput((prev) => prev + targetOutput[i]);
      i++;
      if (i >= targetOutput.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 50); // Speed of typing output
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4 md:px-0 z-10 relative">
      <div className="absolute top-1/2 left-0 w-full h-[80%] bg-[var(--surface-container-low)]/50 z-0 -skew-y-3"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Text Side */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <h2 className="font-headline text-4xl md:text-5xl text-[var(--on-background)] mb-6 leading-tight">
            Compiled with <br/><span className="italic text-[var(--primary)]">Infinite Love</span>
          </h2>
          <p className="font-body text-lg text-[var(--on-surface-variant)] mb-8 leading-relaxed">
            Behind every shared laugh and silent understanding, there's an unbreakable algorithm that keeps our bond running smoothly.
          </p>
        </div>

        {/* Right Code Editor Side */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-[#1e1e1e] dark:bg-[var(--on-primary-fixed)] rounded-xl overflow-hidden shadow-2xl shadow-[var(--primary)]/10 border border-[var(--surface-variant)]/10">
            {/* Editor Header */}
            <div className="bg-black/30 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              <span className="ml-4 font-body text-xs text-white/50 font-mono tracking-wider">sister_love.py</span>
            </div>

            <div className="p-6 font-body text-sm md:text-base overflow-x-auto text-white !leading-[1.8] tracking-wide relative z-10 opacity-90">
              <pre>
                <code className="language-python">
<span className="text-gray-400 italic font-light"># Remember to stay hydrated during late-night debugging!</span>{'\n'}
<span className="text-pink-400 font-medium">class</span> <span className="text-purple-400 font-semibold cursor-pointer border-b border-transparent hover:border-purple-400 transition-colors">Sister</span>:{'\n'}
{'    '}<span className="text-pink-400 font-medium">def</span> <span className="text-blue-400 font-semibold cursor-pointer border-b border-transparent hover:border-blue-400 transition-colors">__init__</span>(<span className="text-orange-400 font-medium">self</span>, name):{'\n'}
{'        '}<span className="text-orange-400 font-medium">self</span>.name = name{'\n'}
{'        '}<span className="text-orange-400 font-medium">self</span>.bond = <span className="text-teal-400">"unbreakable"</span>{'\n'}
{'\n'}
{'    '}<span className="text-gray-400 italic font-light"># We always figure it out together</span>{'\n'}
{'    '}<span className="text-pink-400 font-medium">def</span> <span className="text-blue-400 font-semibold cursor-pointer border-b border-transparent hover:border-blue-400 transition-colors">calculate_love</span>(<span className="text-orange-400 font-medium">self</span>):{'\n'}
{'        '}<span className="text-pink-400 font-medium">return</span> <span className="text-purple-400 font-medium hover:text-pink-500 transition-colors cursor-pointer">float</span>(<span className="text-teal-400">"inf"</span>){'\n'}
{'\n'}
<span className="text-purple-400 font-semibold">aleena</span> = <span className="text-purple-400 font-semibold">Sister</span>(<span className="text-teal-400">"Aleena"</span>){'\n'}
<span className="text-blue-400 font-medium hover:text-pink-400 transition-colors cursor-pointer">print</span>(<span className="text-teal-400">f"Love =</span> <span className="text-orange-400">{'{'}aleena</span>.<span className="text-blue-400">calculate_love</span>()<span className="text-orange-400">{'}'}</span><span className="text-teal-400">"</span>)
                </code>
              </pre>
            </div>
            
            <div className="px-6 pb-6 pt-2">
              <button 
                onClick={runCode}
                disabled={isRunning}
                className="px-6 py-2 bg-[var(--primary)] text-white rounded-md font-body text-sm font-semibold hover:bg-[var(--primary-dim)] transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> 
                {isRunning ? "Executing..." : ">> Run Code"}
              </button>
              
              {terminalOutput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 bg-[#0a0a0a] rounded-md p-4 border border-white/10"
                >
                  <div className="font-mono text-green-400 text-sm whitespace-pre-wrap">
                    <span className="text-gray-500">$ python sister_love.py</span>
                    <br />
                    {terminalOutput}
                    {!isRunning && <span className="animate-pulse inline-block ml-1 w-2 h-4 bg-green-400 translate-y-1"></span>}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
