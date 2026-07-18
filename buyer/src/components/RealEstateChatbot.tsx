"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, CheckCircle, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface Property {
  id: string;
  propertyName: string;
  address: string;
  price: number;
  bhkType: string;
  imageUrl: string | null;
  locality: string;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  properties?: Property[];
}

const IMMOBILIER_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80";

export default function RealEstateChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedText, setDisplayedText] = useState<{ [key: string]: string }>({});
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const triggerGreeting = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: "Hello", history: [] }),
        });
        const data = await res.json();
        if (data.success) {
          const newId = "init-greet";
          setMessages([{ id: newId, sender: "bot", text: data.reply }]);
          streamTextEffect(newId, data.reply);
        }
      } catch {
        const fId = "fallback-id";
        const msg = "Welcome to KMA! May I know your name please?";
        setMessages([{ id: fId, sender: "bot", text: msg }]);
        streamTextEffect(fId, msg);
      } finally {
        setLoading(false);
      }
    };
    triggerGreeting();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, displayedText]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const streamTextEffect = (id: string, fullText: string) => {
    setDisplayedText((prev) => ({ ...prev, [id]: "" }));
    const words = fullText.split(" ");
    let currentWordIndex = 0;
    let accumulatedText = "";

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        accumulatedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
        setDisplayedText((prev) => ({ ...prev, [id]: accumulatedText }));
        currentWordIndex++;
      } else {
        clearInterval(interval);
      }
    }, 45);
  };

  const scrollSlider = (msgId: string, direction: "left" | "right") => {
    const container = sliderRefs.current[msgId];
    if (container) {
      const scrollAmount = direction === "left" ? -240 : 240;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const formatPrice = (priceVal: any) => {
    const numPrice = Number(priceVal);
    if (!numPrice || isNaN(numPrice)) return "Price on Request";
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lakh`;
    }
    return `₹${numPrice.toLocaleString("en-IN")}`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userText = inputValue.trim();
    setInputValue("");

    const currentHistory = [...messages];
    const userMsgId = Math.random().toString();
    
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: userText }]);
    setDisplayedText((prev) => ({ ...prev, [userMsgId]: userText }));
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userText, history: currentHistory }),
      });

      const data = await res.json();

      if (data.success) {
        const botMsgId = Math.random().toString();
        let cleanReply = data.reply;
        let matchedProps: Property[] = [];

        if (cleanReply.includes("[WHATSAPP_CITY_FALLBACK:")) {
          const match = cleanReply.match(/\[WHATSAPP_CITY_FALLBACK:(.*?)\]/);
          const targetCity = match ? match[1] : userText;
          const redirectNotice = `We are expanding our footprint across Delhi NCR. Let me securely transfer your request for properties in ${targetCity} to our live helpdesk specialist. Connecting you on WhatsApp in 4 seconds...`;
          
          setMessages((prev) => [...prev, { id: botMsgId, sender: "bot", text: redirectNotice }]);
          streamTextEffect(botMsgId, redirectNotice);
          
          setTimeout(() => {
            window.open(`https://wa.me/919289977646?text=${encodeURIComponent(`Exploring property in ${targetCity}`)}`, "_blank");
          }, 4000);
          return;
        }

        if (data.properties && data.properties.length > 0) {
          matchedProps = data.properties;
        }

        if (data.reply.includes("[TRIGGER_WHATSAPP_REDIRECT]")) {
          const fallbackId = Math.random().toString();
          const genericNotice = "I am redirecting your specific custom requirement parameter to our executive desk. Opening WhatsApp in 4 seconds...";
          
          setMessages((prev) => [...prev, { id: fallbackId, sender: "bot", text: genericNotice }]);
          streamTextEffect(fallbackId, genericNotice);
          
          setTimeout(() => {
            window.open(`https://wa.me/919289977646?text=${encodeURIComponent(`Hi KMA, I have a query: "${userText}"`)}`, "_blank");
          }, 4000);
          return;
        }

        setMessages((prev) => [...prev, { id: botMsgId, sender: "bot", text: cleanReply, properties: matchedProps }]);
        streamTextEffect(botMsgId, cleanReply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };  

  const handlePropertyCardClick = (prop: Property) => {
    const finalPriceStr = formatPrice(prop.price);
    const messageText = `Hi KMA Global Property, I am interested in this specific property option:\n\n🏢 *Name:* ${prop.propertyName}\n📍 *Address:* ${prop.address}\n🛏️ *Configuration:* ${prop.bhkType}\n💰 *Price:* ${finalPriceStr}`;
    window.open(`https://wa.me/919289977646?text=${encodeURIComponent(messageText)}`, "_blank");
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-xs transition-all duration-300 z-[9998] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
      />

      <div className="fixed bottom-20 right-6 z-[9999] flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:bg-blue-700 active:scale-95 transition-all duration-300 cursor-pointer animate-[bounce_3s_infinite] hover:animate-none"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}

          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white shadow-sm ring-2 ring-white animate-pulse">
              1
            </span>
          )}
          
          <span className="absolute right-16 scale-0 group-hover:scale-100 rounded-xl bg-slate-900/95 backdrop-blur-xs px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-all duration-200 whitespace-nowrap tracking-wide border border-slate-800">
            Ask KMA AI
          </span>
        </button>
      </div>

      <div className={`fixed bottom-22 right-4  w-[350px] md:w-[400px] sm:w-[400px] h-[400px] md:h-[550px] bg-white rounded-[24px] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[9999] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
        isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"
      }`}>
        
        {/* Header Bar */}
        <div className="bg-blue px-5 py-4 flex items-center gap-3 text-white">
          <div className="h-9 w-9 rounded-xl bg-blue-700 flex items-center justify-center border border-blue-500 shadow-inner">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex justify-between w-full items-center">
            <div>
            <h3 className="font-semibold text-sm tracking-wide">KMA AI Assistant</h3>
            <p className="text-[10px] text-blue-200 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Always Active
            </p>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
             <X className="h-6 w-6 text-white bg-white/30 rounded-full" /> 
            </button>
          </div>
        </div>

        {/* Message Logs display track */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-none">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col space-y-2 w-full">
              <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-2 relative group/msg`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm border ${
                    msg.sender === "user" 
                      ? "bg-blue border-blue-700 text-white font-medium rounded-tr-none" 
                      : "bg-white border-slate-200 text-slate-800 rounded-tl-none"
                  }`}>
                    {displayedText[msg.id] || ""}
                  </div>
                </div>
              </div>

              {msg.sender === "bot" && msg.properties && msg.properties.length > 0 && (
                <div className="relative w-full group/slider px-1">
                  <button
                    onClick={() => scrollSlider(msg.id, "left")}
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/95 border border-slate-200 hover:bg-slate-50 text-slate-700 h-8 w-8 rounded-full flex items-center justify-center z-10 shadow-md transition-opacity opacity-0 group-hover/slider:opacity-100 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div
                    ref={(el) => { sliderRefs.current[msg.id] = el; }}
                    className="w-full overflow-x-auto flex gap-3 py-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
                  >
                    {msg.properties.map((prop) => (
                      <div
                        key={prop.id}
                        onClick={() => handlePropertyCardClick(prop)}
                        className="min-w-[230px] max-w-[230px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-500 cursor-pointer transition-all snap-start"
                      >
                        <div className="h-28 w-full bg-slate-100 relative overflow-hidden">
                          <img 
                            src={prop.imageUrl && prop.imageUrl.trim() !== "" ? prop.imageUrl : IMMOBILIER_FALLBACK_IMAGE} 
                            alt={prop.propertyName} 
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = IMMOBILIER_FALLBACK_IMAGE;
                            }}
                          />
                          <span className="absolute top-2 left-2 bg-blue-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow">
                            <CheckCircle className="w-2.5 h-2.5" /> Verified
                          </span>
                          <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white font-semibold text-[10px] px-2 py-0.5 rounded">
                            {prop.bhkType}
                          </span>
                        </div>

                        <div className="p-3 space-y-1">
                          <h4 className="font-bold text-xs text-slate-800 truncate">{prop.propertyName}</h4>
                          <p className="text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400" /> {prop.address}
                          </p>
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-extrabold text-blue-600">
                              {formatPrice(prop.price)}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                              WhatsApp Query
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollSlider(msg.id, "right")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/95 border border-slate-200 hover:bg-slate-50 text-slate-700 h-8 w-8 rounded-full flex items-center justify-center z-10 shadow-md transition-opacity opacity-0 group-hover/slider:opacity-100 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                <div className="w-2 h-2 bg-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-blue rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form Tray */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="p-2.5 rounded-xl bg-blue hover:bg-blue-700 text-white transition-all active:scale-95 disabled:opacity-40 flex items-center justify-center cursor-pointer shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </>
  );
}