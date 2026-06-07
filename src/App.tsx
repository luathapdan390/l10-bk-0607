import { useState, useEffect, useRef } from 'react';
import { questions, Question } from './questions';
import {
  Sparkles,
  Flame,
  Trophy,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  ListOrdered,
  Layers,
  Check,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Persistence state
  const [selectedPart, setSelectedPart] = useState<string>("ALL");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Completed tracking loaded from localStorage
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, { isCorrect: boolean; answer: string }>>(() => {
    const saved = localStorage.getItem('gt10_submitted');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('gt10_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('gt10_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  // AI states
  const [explanationMap, setExplanationMap] = useState<Record<number, string>>({});
  const [loadingAiId, setLoadingAiId] = useState<number | null>(null);

  // Particle effects
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);
  const [slangPopup, setSlangPopup] = useState<{ text: string; isCorrect: boolean } | null>(null);

  // Sidebar list overlay
  const [showQuestionListModal, setShowQuestionListModal] = useState<boolean>(false);

  // Synchronize storage
  useEffect(() => {
    localStorage.setItem('gt10_submitted', JSON.stringify(submittedAnswers));
  }, [submittedAnswers]);

  useEffect(() => {
    localStorage.setItem('gt10_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('gt10_xp', xp.toString());
  }, [xp]);

  // Audio Context synthesizer for frictionless audio effects
  const playWebAudio = (type: 'correct' | 'wrong' | 'celebrate') => {
    if (!soundOn) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === 'correct') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(523.25 * 1.5, ctx.currentTime); 
        osc2.frequency.setValueAtTime(659.25 * 1.5, ctx.currentTime + 0.1); 
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.25);
        osc2.stop(ctx.currentTime + 0.25);
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(85, ctx.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'celebrate') {
        const playTone = (freq: number, start: number, duration: number) => {
          const oscNode = ctx.createOscillator();
          const gainNode = ctx.createGain();
          oscNode.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          oscNode.type = 'sine';
          oscNode.frequency.setValueAtTime(freq, ctx.currentTime + start);
          
          gainNode.gain.setValueAtTime(0, ctx.currentTime + start);
          gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + start + 0.02);
          gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + start + duration);
          
          oscNode.start(ctx.currentTime + start);
          oscNode.stop(ctx.currentTime + start + duration);
        };
        playTone(523.25, 0, 0.15); // C5
        playTone(659.25, 0.08, 0.15); // E5
        playTone(783.99, 0.16, 0.15); // G5
        playTone(1046.50, 0.24, 0.4); // C6
      }
    } catch (e) {
      console.warn("Audio system blocked by browser auto-play policy yet:", e);
    }
  };

  // Helper arrays
  const filteredQuestions = selectedPart === "ALL" 
    ? questions 
    : questions.filter(q => q.part === selectedPart);

  // Current Question Safe Pointer
  const activeQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  // Monitor index boundaries
  useEffect(() => {
    if (activeQuestion) {
      const submitted = submittedAnswers[activeQuestion.id];
      setUserInput(submitted ? submitted.answer : "");
      setShowHint(false);
    }
  }, [currentQuestionIndex, selectedPart]);

  // Particle creation for gorgeous visual pop ups
  const triggerCelebrationParticles = () => {
    const burst: Array<{ id: number; x: number; y: number; color: string; size: number }> = [];
    const colors = ['#A3E635', '#22D3EE', '#F43F5E', '#FBBF24', '#10B981'];
    for (let i = 0; i < 40; i++) {
      burst.push({
        id: Math.random() + i,
        x: Math.random() * 100, // percentage layout
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4
      });
    }
    setParticles(burst);
    setTimeout(() => {
      setParticles([]);
    }, 1800);
  };

  const checkAnswer = () => {
    if (!activeQuestion) return;
    const cleanInput = userInput.trim().toLowerCase().replace(/[.,!?;:]/g, "");
    if (!cleanInput) return;

    const isCorrect = activeQuestion.acceptedAnswers.some(
      ans => ans.toLowerCase() === cleanInput
    );

    const matchSlang = isCorrect 
      ? [
          "MƯỜI ĐIỂM KHÔNG CÓ NHƯNG!",
          "KEO LÌ ĐEN ĐÉT! 😘",
          "SLAYYY CHƯA CẬU ƠI! 🔥",
          "ĐỈNH CHÓP LỐ CÁI NÓC! 💅",
          "GÉT GÔ CỰC MẠNH! 🚀"
        ]
      : [
          "ÉT O ÉT! SAI MẤT TIÊU! 😭",
          "SỤM NỤ LUÔN Á! 💔",
          "ỦA ALO? THOÁT NGỮ PHÁP À? 😂",
          "HƠI VÔ TRI NHẸ NHA NÀNG! 🤔",
          "KHÓC THÉT RỒI! CỐ LÊN NÈ! 😢"
        ];
    
    const chosenSlang = matchSlang[Math.floor(Math.random() * matchSlang.length)];
    setSlangPopup({ text: chosenSlang, isCorrect });

    // Update statistics
    const newSubmitted = {
      ...submittedAnswers,
      [activeQuestion.id]: { isCorrect, answer: userInput.trim() }
    };
    setSubmittedAnswers(newSubmitted);

    if (isCorrect) {
      playWebAudio('correct');
      triggerCelebrationParticles();
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Calculate XP: 10 base + streak bonus (up to +15 max)
      const bonus = Math.min((newStreak - 1) * 5, 15);
      setXp(pxv => pxv + 10 + bonus);
    } else {
      playWebAudio('wrong');
      setStreak(0);
    }

    setTimeout(() => {
      setSlangPopup(null);
    }, 2500);
  };

  // Skip question helper
  const handleSkip = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // wrap around or do nothing
      setCurrentQuestionIndex(0);
    }
  };

  // Previous Question helper
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Next Question helper
  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Get AI detailed explanation
  const fetchAiExplanation = async (question: Question) => {
    if (explanationMap[question.id]) {
      // Already cached
      return;
    }

    const stateObj = submittedAnswers[question.id];
    setLoadingAiId(question.id);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sentence: question.sentence,
          baseWord: question.baseWord,
          correctAnswer: question.correctAnswer,
          userAnswer: stateObj ? stateObj.answer : undefined
        })
      });

      const data = await response.json();
      if (data.explanation) {
        setExplanationMap(prev => ({
          ...prev,
          [question.id]: data.explanation
        }));
      }
    } catch (error) {
      console.error("AI call timed out or failed:", error);
      setExplanationMap(prev => ({
        ...prev,
        [question.id]: `Úi giời ơi, AI đang bận tí rồi! Nhưng câu này đáp án là "${question.correctAnswer}" nhé! Từ loại cần ở đây là do cấu trúc ngữ pháp đứng sau vị trí đó nha!`
      }));
    } finally {
      setLoadingAiId(null);
    }
  };

  // Reset entire score/answers progress with prompt
  const resetAllProgress = () => {
    if (window.confirm("Bạn có chắc chắn muốn làm mới toàn bộ tiến trình học tập? Toàn bộ XP và Streak sẽ quay về 0.")) {
      setSubmittedAnswers({});
      setStreak(0);
      setXp(0);
      setCurrentQuestionIndex(0);
      setUserInput("");
      setExplanationMap({});
      localStorage.removeItem('gt10_submitted');
      localStorage.removeItem('gt10_streak');
      localStorage.removeItem('gt10_xp');
      playWebAudio('celebrate');
    }
  };

  // Render correct/incorrect counts
  const correctCount = (Object.values(submittedAnswers) as { isCorrect: boolean; answer: string }[]).filter(s => s.isCorrect).length;
  const incorrectCount = (Object.values(submittedAnswers) as { isCorrect: boolean; answer: string }[]).filter(s => !s.isCorrect).length;
  const totalCompleted = correctCount + incorrectCount;

  // Parts description array for tabs
  const partsList = [
    { key: "ALL", name: "Tất cả 40 câu" },
    { key: "Phần 1", name: "P1: Từ cơ bản" },
    { key: "Phần 2", name: "P2: Tiền/Hậu tố" },
    { key: "Phần 3", name: "P3: Môi trường" },
    { key: "Phần 4", name: "P4: Giáo dục" },
    { key: "Phần 5", name: "P5: Tổng hợp" },
  ];

  // Helper: Format Sentence correctly for display
  const renderSentenceWithBlank = (sentenceStr: string, currentVal: string, isCorrectLayout: boolean | null) => {
    const partsOfSentence = sentenceStr.split("________");
    return (
      <span className="leading-relaxed">
        {partsOfSentence[0]}
        <span
          className={`mx-2 px-4 py-1.5 inline-block text-xl md:text-2xl font-black uppercase rounded-lg border-b-4 transition-all duration-300 ${
            isCorrectLayout === true
              ? "bg-lime-950/40 text-lime-400 border-lime-400 text-glow"
              : isCorrectLayout === false
              ? "bg-rose-950/40 text-rose-500 border-rose-500 text-glow-red"
              : "bg-neutral-900 border-dashed border-lime-400/40 text-neutral-300"
          }`}
        >
          {currentVal || "........"}
        </span>
        {partsOfSentence[1]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col relative overflow-x-hidden select-none p-4 md:p-8">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      {/* Floating Spark Burst Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-50 animate-bounce"
          style={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: `0 0 10px ${p.color}`,
            transition: 'all 1.5s ease-out'
          }}
        />
      ))}

      {/* Header Panel */}
      <header id="app-header" className="max-w-7xl w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-neutral-900 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 text-[10px] bg-lime-400 text-black font-black uppercase tracking-widest rounded-md">GEN Z EDITION</span>
            <span className="text-neutral-500 text-xs font-bold tracking-wider">HỌC LÀ PHẢI SLAY!</span>
          </div>
          <h1 className="display-font text-4xl md:text-6xl leading-none mt-1.5 tracking-tighter">
            Word Form <span className="gradient-text">Tiếng Anh Lớp 10</span>
          </h1>
          <p className="text-neutral-500 mt-2 font-medium tracking-wide text-xs md:text-sm">
            Bài tập trọn bộ 40 câu chất chơi • Sát sườn SGK lớp 10 chương trình mới THPT
          </p>
        </div>

        {/* Stats Container */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Sound Toggle */}
          <button
            id="toggle-sound-btn"
            onClick={() => setSoundOn(!soundOn)}
            className="h-14 w-14 glass-card flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            title={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}
          >
            {soundOn ? <Volume2 className="h-5 w-5 text-lime-400" /> : <VolumeX className="h-5 w-5" />}
          </button>

          {/* Reset Progress */}
          <button
            id="reset-progress-btn"
            onClick={resetAllProgress}
            className="h-14 w-14 glass-card flex items-center justify-center text-neutral-400 hover:text-red-400 transition-colors"
            title="Làm mới tiến trình"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Streak Indicator */}
          <div className="glass-card px-5 py-2.5 flex items-center gap-3 h-14">
            <div className={`p-1.5 rounded-lg bg-orange-500/10 ${streak > 0 ? "animate-pulse" : ""}`}>
              <Flame className={`h-5 w-5 ${streak > 0 ? "text-orange-500" : "text-neutral-600"}`} />
            </div>
            <div>
              <span className="block text-[9px] text-neutral-500 uppercase font-black tracking-widest leading-none">Streak</span>
              <span className="font-bold text-lg leading-snug">{streak} 🔥</span>
            </div>
          </div>

          {/* XP Tally */}
          <div className="glass-card px-5 py-2.5 flex items-center gap-3 h-14">
            <div className="p-1.5 rounded-lg bg-cyan-500/10">
              <Trophy className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <span className="block text-[9px] text-neutral-500 uppercase font-black tracking-widest leading-none">XP Points</span>
              <span className="font-bold text-lg leading-snug text-cyan-400">{xp}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Part Filtering Tabs */}
      <section className="max-w-7xl w-full mx-auto mb-8 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max pb-2">
          {partsList.map((part) => (
            <button
              key={part.key}
              onClick={() => {
                setSelectedPart(part.key);
                setCurrentQuestionIndex(0);
              }}
              className={`px-5 py-3 rounded-xl border text-xs md:text-sm font-bold uppercase transition-all duration-300 ${
                selectedPart === part.key
                  ? "bg-lime-400 text-black border-lime-400 shadow-lg shadow-lime-400/10 font-black scale-[1.02]"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {part.name}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Slang Feedback pop-up */}
      <AnimatePresence>
        {slangPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -40 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-full font-black text-lg md:text-2xl tracking-wider text-center flex items-center gap-3 shadow-2xl ${
              slangPopup.isCorrect
                ? "bg-lime-400 text-black neon-border"
                : "bg-rose-600 text-white neon-border-red"
            }`}
          >
            {slangPopup.isCorrect ? <Sparkles className="h-6 w-6 animate-spin" /> : <XCircle className="h-6 w-6" />}
            {slangPopup.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Column */}
      <main className="max-w-7xl w-full mx-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
        
        {/* Left Side: Dynamic Info Panel */}
        <section className="lg:col-span-4 space-y-6">
          <div id="stats-summary-card" className="glass-card p-6 border border-neutral-800/60">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-extrabold mb-4 flex items-center justify-between">
              <span>TIẾN TRÌNH LUYỆN TẬP</span>
              <span className="text-lime-400">{correctCount}/40 câu</span>
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-900">
                <span className="block text-[10px] text-neutral-500 font-bold uppercase">ĐÚNG</span>
                <span className="text-xl font-bold text-lime-400">{correctCount}</span>
              </div>
              <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-900">
                <span className="block text-[10px] text-neutral-500 font-bold uppercase">SAI</span>
                <span className="text-xl font-bold text-rose-500">{incorrectCount}</span>
              </div>
              <button
                onClick={() => setShowQuestionListModal(true)}
                className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-900 hover:border-lime-400-hover cursor-pointer transition-all hover:bg-neutral-900"
              >
                <span className="block text-[10px] text-neutral-400 font-bold uppercase flex items-center justify-center gap-1">
                  XEM CHI TIẾT
                </span>
                <span className="text-xs font-black text-lime-400 flex items-center justify-center gap-1 mt-1">
                  <ListOrdered className="h-3 w-3" /> LIST
                </span>
              </button>
            </div>

            {/* Quick progress percent bar */}
            <div className="mt-5">
              <div className="flex justify-between text-neutral-400 text-[10px] uppercase font-bold mb-1.5">
                <span>Hoàn thành</span>
                <span>{Math.round((totalCompleted / 40) * 100)}%</span>
              </div>
              <div className="h-2 bg-neutral-950 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-lime-400 to-cyan-400 h-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(totalCompleted / 40) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Explainer for Wordform concept */}
          <div id="wordform-cheatsheet-card" className="glass-card p-6 space-y-4 border border-neutral-800/40 relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
              <Layers className="h-16 w-16 text-lime-400" />
            </div>
            <h4 className="display-font text-lg text-lime-400 tracking-wider">MẸO KHÔI PHỤC TỪ LOẠI</h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex gap-2">
                <span className="text-lime-400 font-black">Noun (Danh từ):</span>
                <span>Đứng sau mạo từ (the/a/an), tính từ sở hữu, giới từ (of, in, into...), tính từ thường.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-black">Adj (Tính từ):</span>
                <span>Đứng trước Danh từ, đứng sau động từ nối (be, feel, look, get, become...).</span>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-400 font-black">Verb (Động từ):</span>
                <span>Sau chủ ngữ, đứng sau trợ động từ khuyết thiếu (must, should, need to...). Lưu ý chia thì quá khứ/hiện tại!</span>
              </div>
              <div className="flex gap-2">
                <span className="text-pink-400 font-black">Adv (Trạng từ):</span>
                <span>Đứng trước Tính từ, đứng sau/trước động từ thường để bổ nghĩa.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Primary Active Question Panel */}
        <section className="lg:col-span-8">
          {activeQuestion ? (
            <div id="question-interactive-card" className="glass-card p-6 md:p-10 relative overflow-hidden border border-neutral-800">
              
              {/* Massive styled background visual "SLAY" */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.02] select-none pointer-events-none">
                <span className="text-[120px] md:text-[160px] display-font">SLAY</span>
              </div>

              {/* Tag and Index Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-black uppercase rounded bg-lime-400 text-black leading-none">
                    {activeQuestion.part}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                    {currentQuestionIndex + 1} / {filteredQuestions.length}
                  </span>
                </div>
                
                <span className="text-xs text-neutral-500 font-bold italic tracking-wide hidden sm:inline-block">
                  {activeQuestion.partDesc}
                </span>
              </div>

              {/* Interactive Sentence Blank */}
              <div className="my-8">
                <h2 className="text-xl md:text-3xl font-medium leading-relaxed tracking-wide text-neutral-100">
                  {renderSentenceWithBlank(
                    activeQuestion.sentence,
                    submittedAnswers[activeQuestion.id]?.answer || userInput,
                    submittedAnswers[activeQuestion.id] ? submittedAnswers[activeQuestion.id].isCorrect : null
                  )}
                </h2>
              </div>

              {/* Clues and Input box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mt-10">
                {/* Word clue */}
                <div>
                  <span className="block text-[10px] uppercase text-neutral-500 font-black mb-1 tracking-wider">TỪ GỐC GỢI Ý (ROOT WORD)</span>
                  <div className="text-3xl md:text-4xl display-font tracking-widest text-lime-400 text-glow">
                    ({activeQuestion.baseWord})
                  </div>
                </div>

                {/* Text entry field */}
                <div>
                  <span className="block text-[10px] uppercase text-neutral-500 font-black mb-1.5 tracking-wider">NHẬP ĐÁP ÁN CỦA BẠN</span>
                  <div className="relative">
                    <input
                      id="answer-input-field"
                      type="text"
                      value={userInput}
                      onChange={(e) => {
                        if (!submittedAnswers[activeQuestion.id]) {
                          setUserInput(e.target.value);
                        }
                      }}
                      disabled={!!submittedAnswers[activeQuestion.id]}
                      placeholder="Type word form here..."
                      className={`w-full bg-neutral-950 p-4 rounded-xl border font-bold text-lg focus:outline-none transition-all ${
                        submittedAnswers[activeQuestion.id]
                          ? submittedAnswers[activeQuestion.id].isCorrect
                            ? "border-lime-500 text-lime-400 bg-lime-950/20"
                            : "border-rose-500 text-rose-500 bg-rose-950/20"
                          : "border-neutral-800 focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !submittedAnswers[activeQuestion.id]) {
                          checkAnswer();
                        }
                      }}
                    />
                    
                    {submittedAnswers[activeQuestion.id] && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {submittedAnswers[activeQuestion.id].isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-lime-400" />
                        ) : (
                          <XCircle className="h-6 w-6 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle Grammar Clue / Hint */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  id="toggle-hint-btn"
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2.5 rounded-xl text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors text-xs font-bold uppercase flex items-center gap-2 border border-neutral-800"
                >
                  <HelpCircle className="h-4 w-4 text-lime-400" />
                  {showHint ? "ẨN GỢI Ý" : "HIỆN GỢI Ý NGỮ PHÁP"}
                </button>
                
                {submittedAnswers[activeQuestion.id] && (
                  <button
                    id="ask-ai-explain-btn"
                    onClick={() => fetchAiExplanation(activeQuestion)}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors text-xs font-black uppercase flex items-center gap-2 border border-cyan-500/30 shadow-lg shadow-cyan-500/5 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 animate-pulse-glow" />
                    AI GIẢI THÍCH (GEN Z STYLE)
                  </button>
                )}
              </div>

              {/* Expandable Clue / Hint box */}
              {showHint && (
                <div id="hint-display-box" className="mt-4 p-4 bg-lime-950/20 border border-lime-400/20 rounded-xl text-xs md:text-sm text-lime-300">
                  <div className="flex gap-2 items-center font-black mb-1 uppercase tracking-wide text-lime-400">
                    <Info className="h-4 w-4" />
                    BÍ KÍP VƯỢT ẢI:
                  </div>
                  {activeQuestion.hint}
                </div>
              )}

              {/* AI explanation bubble container */}
              {loadingAiId === activeQuestion.id && (
                <div className="mt-6 p-6 bg-cyan-950/20 border border-cyan-400/20 rounded-xl animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">AI đang bốc quẻ, bình tĩnh xi xíu nhé cậu ơi...</span>
                  </div>
                </div>
              )}

              {explanationMap[activeQuestion.id] && (
                <div id="ai-response-box" className="mt-6 p-6 bg-cyan-950/10 border border-cyan-400/20 rounded-xl relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-cyan-500/10 display-font text-5xl font-black select-none pointer-events-none">
                    AI TUTOR
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-xs mb-2 tracking-widest">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    GIA SƯ AI SIÊU MƯỢT GIẢI THÍCH:
                  </div>
                  <p className="text-xs md:text-sm text-neutral-200 leading-relaxed italic font-medium">
                    "{explanationMap[activeQuestion.id]}"
                  </p>
                </div>
              )}

              {/* Response feedback overlay (Wrong answer reveal) */}
              {submittedAnswers[activeQuestion.id] && !submittedAnswers[activeQuestion.id].isCorrect && (
                <div className="mt-6 p-4 bg-rose-950/30 border border-rose-500/20 rounded-xl flex items-start gap-3">
                  <div className="bg-rose-500/10 p-2 rounded-lg text-rose-500">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-extrabold text-rose-400">ĐÁP ÁN ĐÚNG CHUẨN:</span>
                    <span className="text-lg font-black text-rose-300 uppercase block tracking-widest mt-0.5">
                      {activeQuestion.correctAnswer}
                    </span>
                  </div>
                </div>
              )}

              {/* Footer navigation triggers */}
              <div className="mt-10 pt-8 border-t border-neutral-900 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  {!submittedAnswers[activeQuestion.id] ? (
                    <button
                      id="submit-answer-btn"
                      onClick={checkAnswer}
                      disabled={!userInput.trim()}
                      className={`px-8 py-4 rounded-xl font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        userInput.trim()
                          ? "bg-lime-400 text-black hover:scale-105 shadow-lg shadow-lime-400/15 cursor-pointer display-font text-xl"
                          : "bg-neutral-900 text-neutral-600 border border-neutral-800 cursor-not-allowed text-sm"
                      }`}
                    >
                      <Check className="h-5 w-5" /> Check Answer
                    </button>
                  ) : (
                    <span className="text-xs font-black uppercase text-lime-400/80 bg-lime-400/10 border border-lime-400/30 px-3 py-2 rounded-lg">
                      ĐÃ HOÀN THÀNH CÂU NÀY MÀU CHẤT!
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    id="prev-question-btn"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="h-12 px-4 glass-card flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    title="Về câu trước"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    id="skip-question-btn"
                    onClick={handleSkip}
                    className="h-12 px-6 glass-card flex items-center justify-center text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all border border-neutral-800"
                    title="Bỏ qua câu này"
                  >
                    SKIP QUESTION
                  </button>

                  <button
                    id="next-question-btn"
                    onClick={handleNext}
                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                    className="h-12 px-4 glass-card flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    title="Sang câu tiếp theo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-card p-12 text-center border border-neutral-800">
              <Sparkles className="h-12 w-12 text-lime-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold">Không tìm thấy câu hỏi nào!</h2>
              <p className="text-neutral-500 mt-2">Vui lòng chọn bộ đề khác xem sao nha.</p>
            </div>
          )}
        </section>

      </main>

      {/* Progress Footer */}
      <footer className="max-w-7xl w-full mx-auto mt-auto pt-6 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-bold">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
          <span>Lớp 10 THPT THỰC CHIẾN - Bài Tập Word Form</span>
        </div>
        <div>
          <span>Thiết kế bởi Thay Truong IELTS & Gemini AI Agent ✨</span>
        </div>
      </footer>

      {/* Dynamic List modal overlay */}
      {showQuestionListModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-filter backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-neutral-950 border border-neutral-800 p-6 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto z-50 shadow-2xl relative"
          >
            {/* Close button */}
            <button
              onClick={() => setShowQuestionListModal(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-white h-10 w-10 bg-neutral-900 rounded-full flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="display-font text-3xl mb-1 tracking-wider text-lime-400">
              DANH SÁCH 40 CÂU WORD FORM
            </h2>
            <p className="text-neutral-400 text-xs mb-6">
              Bấm trực tiếp vào từng câu hỏi bên dưới để học và giải đáp nhé!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {questions.map((q, idx) => {
                const answerState = submittedAnswers[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      // find this question inside the current filtered selection if applicable, or switch filter
                      const inFilterIdx = filteredQuestions.findIndex(fq => fq.id === q.id);
                      if (inFilterIdx !== -1) {
                        setCurrentQuestionIndex(inFilterIdx);
                      } else {
                        setSelectedPart("ALL");
                        const allIdx = questions.findIndex(fq => fq.id === q.id);
                        setCurrentQuestionIndex(allIdx !== -1 ? allIdx : 0);
                      }
                      setShowQuestionListModal(false);
                    }}
                    className={`p-4 rounded-xl text-left transition-all border outline-none ${
                      answerState
                        ? answerState.isCorrect
                          ? "bg-lime-950/20 border-lime-500/40 hover:border-lime-400"
                          : "bg-rose-950/20 border-rose-500/40 hover:border-rose-400"
                        : "bg-neutral-900 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 text-[10px] text-neutral-500 font-extrabold">
                      <span>{q.part}</span>
                      {answerState && (
                        <span className={answerState.isCorrect ? "text-lime-400" : "text-rose-500"}>
                          {answerState.isCorrect ? "ĐÚNG" : "SAI"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 line-clamp-1 font-bold">
                      {idx + 1}. {q.sentence.replace("________", `(${q.baseWord})`)}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowQuestionListModal(false)}
                className="px-6 py-3 bg-lime-400 text-black font-black text-xs uppercase rounded-xl hover:bg-lime-300"
              >
                ĐÓNG DANH SÁCH
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
