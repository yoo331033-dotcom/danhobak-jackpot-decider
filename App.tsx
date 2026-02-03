
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import JackpotDisplay from './components/JackpotDisplay';
import SlotWindow from './components/SlotWindow';
import SlotMachineBase from './components/SlotMachineBase';
import Lever from './components/Lever';
import Footer from './components/Footer';
import ResultsModal from './components/ResultsModal';
import FloatingStickers from './components/FloatingStickers';

const App: React.FC = () => {
  const [options, setOptions] = useState<string[]>(['라멘', '돈가스', '마라탕']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [allowRepeats, setAllowRepeats] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpin = useCallback(async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // 슬롯 회전 시뮬레이션
    setTimeout(() => {
      const pool = options.filter(o => o.trim() !== "");
      const winner = pool[Math.floor(Math.random() * pool.length)] || '단호박';
      setResult(winner);
      setIsSpinning(false);
      
      // 결과 발표 연출
      setTimeout(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setTimeout(() => setIsModalOpen(true), 400);
      }, 1600);
    }, 2000);
  }, [isSpinning, options]);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className={`min-h-screen flex flex-col font-display selection:bg-hot-pink selection:text-white relative overflow-hidden transition-transform duration-100 ${isShaking ? 'scale-105' : ''}`}>
      <FloatingStickers />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col min-h-screen pt-4 md:pt-6 pb-4 md:pb-6">
        
        {/* 상단 헤더 */}
        <div className="w-full max-w-2xl mx-auto mb-2 md:mb-4">
          <Header />
        </div>
        
        {/* 중앙 슬롯 머신 영역 */}
        <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-4 md:gap-6">
          <div className="w-full">
            <JackpotDisplay />
          </div>
          
          <div className="relative flex justify-center items-center w-full px-4 md:px-12 mt-6 md:mt-10">
            {/* 슬롯 머신 본체 유닛 */}
            <div className="relative w-full max-w-2xl">
              <SlotMachineBase isSpinning={isSpinning}>
                <SlotWindow 
                  options={options} 
                  isSpinning={isSpinning} 
                  result={result}
                  onOptionChange={updateOption}
                  allowRepeats={allowRepeats}
                  onToggleRepeats={() => setAllowRepeats(!allowRepeats)}
                />
              </SlotMachineBase>
              
              {/* 레버: 본체 오른쪽에 밀착 */}
              <div className="absolute left-full top-1/2 -translate-y-[60%] -translate-x-6 md:-translate-x-10 z-[60]">
                <Lever onPull={handleSpin} isSpinning={isSpinning} />
              </div>
            </div>
          </div>
        </main>

        {/* 하단 푸터 */}
        <div className="w-full mt-6 md:mt-8">
          <Footer />
        </div>
      </div>

      {isModalOpen && result && (
        <ResultsModal 
          winner={result} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
