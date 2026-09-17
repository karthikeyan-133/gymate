import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, ArrowLeft, Bot } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Button } from '../common/Button.tsx';

export interface AdvisorChatScreenProps {
  onClose: () => void;
}

export const AdvisorChatScreen: React.FC<AdvisorChatScreenProps> = ({ onClose }) => {
  const {
    advisorMessages,
    isAdvisorTyping,
    sendAdvisorMessage,
    remainingCalories,
    remainingProtein,
    profile,
  } = useFitness();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What should I eat for dinner?',
    'How can I increase my protein?',
    'Give me a 500 calorie breakfast',
    'What should I eat after workout?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [advisorMessages, isAdvisorTyping]);

  const handleSend = async (textToSend?: string) => {
    const message = textToSend || input.trim();
    if (!message) return;
    setInput('');
    await sendAdvisorMessage(message);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F8F4] flex flex-col justify-between max-w-md mx-auto sm:border-x sm:border-[#E8ECE9]">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E8ECE9] px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F2F5F3] flex items-center justify-center text-[#202522] hover:bg-[#E8EDE9] cursor-pointer"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#202522]">
                FITLY Advisor
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#6FAF8A]" />
            </div>
            <p className="text-[11px] text-[#858B87]">
              Tailored to your {profile.fitnessGoal.replace('_', ' ')} plan
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#858B87] hover:bg-[#F2F5F3] cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Daily Target Context Banner */}
      <div className="bg-[#EBF3EE] px-4 py-2 border-b border-[#DBE7DF] flex items-center justify-between text-xs text-[#416952]">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles size={13} className="text-[#6FAF8A]" />
          <span>Remaining today:</span>
        </div>
        <div className="font-semibold space-x-2">
          <span>{remainingCalories} kcal</span>
          <span>·</span>
          <span>{remainingProtein}g protein</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {advisorMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#6FAF8A] text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-[#202522] border border-[#E8ECE9] rounded-bl-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>
              <span className="text-[10px] text-[#858B87] mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isAdvisorTyping && (
          <div className="flex items-center gap-2 bg-white border border-[#E8ECE9] p-3.5 rounded-3xl rounded-bl-xs w-28 text-xs text-[#858B87]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FAF8A] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FAF8A] animate-bounce delay-150" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FAF8A] animate-bounce delay-300" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-xs border-t border-[#E8ECE9]/60">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#858B87] block mb-1.5">
          Suggested questions
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-[#E0E6E2] text-[#426E54] hover:bg-[#EBF3EE] transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-white border-t border-[#E8ECE9] pb-safe">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about meals, recipes, macros..."
            className="flex-1 bg-[#F7F8F4] border border-[#E8ECE9] rounded-2xl px-4 py-3 text-sm text-[#202522] focus:border-[#6FAF8A] focus:ring-1 focus:ring-[#6FAF8A] outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl bg-[#6FAF8A] text-white flex items-center justify-center hover:bg-[#5E9E7A] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
