import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const QA_LIST = [
  {
    id: 'q1',
    q: "هل يوجد مكان للأطفال؟",
    a: "نعم بالتأكيد! نوفر منطقة هادئة ومناسبة للعائلات لضمان راحة الجميع 👨‍👩‍👧‍👦✨"
  },
  {
    id: 'q2',
    q: "هل الموقع قريب من النافورة؟",
    a: "نعم، نحن نقع مباشرة في منطقة الـ Village بإطلالة ساحرة على النافورة الراقصة ⛲😍"
  },
  {
    id: 'q3',
    q: "ما هي طرق الدفع؟",
    a: "نقبل الدفع نقداً (كاش)، بالإضافة إلى جميع أنواع البطاقات الائتمانية لراحتكم 💳💵"
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', text: 'أهلاً بك في مطعم جولياز كيتشن! كيف يمكنني مساعدتك اليوم؟ 😊', sender: 'bot' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleQuestionClick = (qa: typeof QA_LIST[0]) => {
    // Add user question
    setMessages(prev => [...prev, { id: Date.now().toString(), text: qa.q, sender: 'user' }]);
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: qa.a, sender: 'bot' }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" dir="rtl">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 border border-gray-100 overflow-hidden flex flex-col h-[500px] max-h-[80vh] animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-yellow-500 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">المساعد الذكي</h3>
                <p className="text-xs text-yellow-100">متصل الآن</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-yellow-500 text-white rounded-tl-sm' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-4 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 text-center font-medium">اختر سؤالاً من القائمة 👇</p>
            <div className="flex flex-col gap-2">
              {QA_LIST.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => handleQuestionClick(qa)}
                  className="text-right text-sm bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border border-yellow-200 p-3 rounded-xl transition-colors font-medium"
                >
                  {qa.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-800 hover:bg-gray-900' : 'bg-yellow-500 hover:bg-yellow-600'} text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center`}
        aria-label="Chat with us"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
