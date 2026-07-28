import React, { useState, useEffect, useMemo } from 'react';
import { 
  Coffee, 
  Beer, 
  Dumbbell, 
  Palmtree, 
  Utensils, 
  MapPin, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Languages,
  Info,
  Upload,
  RefreshCw,
  FolderPlus,
  Volume2,
  ShoppingBag,
  HelpCircle,
  Bus
} from 'lucide-react';

const DEFAULT_PHRASE_DATA = [
  // CAFÉ
  { id: 1, category: 'Café', pt: 'Quero comprar um gelado.', en: 'I want to buy an ice cream.', level: 'Easy', verb: 'Comprar', verbEn: 'To buy' },
  { id: 2, category: 'Café', pt: 'Podes dar-me a ementa?', en: 'Can you give me the menu?', level: 'Easy', verb: 'Dar', verbEn: 'To give' },
  { id: 3, category: 'Café', pt: 'Quero comprar um gelado porque está muito calor na praia.', en: 'I want to buy an ice cream because it is very hot at the beach.', level: 'Intermediate', verb: 'Comprar', verbEn: 'To buy' },
  { id: 4, category: 'Café', pt: 'Tens tempo para tomar um café agora ou estás com pressa?', en: 'Do you have time to have a coffee now or are you in a hurry?', level: 'Intermediate', verb: 'Ter', verbEn: 'To have' },
  
  // BEACH
  { id: 5, category: 'Beach', pt: 'Gosto de ouvir o mar.', en: 'I like to hear the sea.', level: 'Easy', verb: 'Ouvir', verbEn: 'To hear' },
  { id: 6, category: 'Beach', pt: 'Queres vir à praia?', en: 'Do you want to come to the beach?', level: 'Easy', verb: 'Vir', verbEn: 'To come' },
  { id: 7, category: 'Beach', pt: 'Vou dar uma caminhada na praia e depois volto.', en: "I'm going to take a walk on the beach and then I'll come back.", level: 'Intermediate', verb: 'Dar', verbEn: 'To give / take' },
  { id: 8, category: 'Beach', pt: 'Consigo ver os surfistas na água a partir daqui.', en: 'I can see the surfers in the water from here.', level: 'Intermediate', verb: 'Ver', verbEn: 'To see' },

  // BAR
  { id: 9, category: 'Bar', pt: 'Quero beber uma imperial.', en: 'I want to drink a draught beer.', level: 'Easy', verb: 'Beber', verbEn: 'To drink' },
  { id: 10, category: 'Bar', pt: 'Quero pedir a conta.', en: 'I want to ask for the bill.', level: 'Easy', verb: 'Pedir', verbEn: 'To ask for / order' },
  { id: 11, category: 'Bar', pt: 'Vou pedir uma imperial e também uma imperial para ti.', en: "I'm going to order a draught beer and also a draught beer for you.", level: 'Intermediate', verb: 'Pedir', verbEn: 'To ask for / order' },
  { id: 12, category: 'Bar', pt: 'Não consigo ouvir nada porque a música no bar está muito alta.', en: "I can't hear anything because the music in the bar is too loud.", level: 'Intermediate', verb: 'Ouvir', verbEn: 'To hear' },

  // RESTAURANT
  { id: 13, category: 'Restaurant', pt: 'Quero comer peixe fresco.', en: 'I want to eat fresh fish.', level: 'Easy', verb: 'Comer', verbEn: 'To eat' },
  { id: 14, category: 'Restaurant', pt: 'Posso sentar-me aqui?', en: 'Can I sit here?', level: 'Easy', verb: 'Poder', verbEn: 'To be able / Can' },
  { id: 15, category: 'Restaurant', pt: 'Posso pagar com multibanco ou tem de ser em dinheiro?', en: 'Can I pay with a debit card or does it have to be in cash?', level: 'Intermediate', verb: 'Pagar', verbEn: 'To pay' },
  { id: 16, category: 'Restaurant', pt: 'Não posso comer glúten, o que é que me recomenda?', en: 'I cannot eat gluten, what do you recommend me?', level: 'Intermediate', verb: 'Poder', verbEn: 'To be able / Can' },

  // GYM
  { id: 17, category: 'Gym', pt: 'Vou andar um pouco.', en: "I'm going to walk a bit.", level: 'Easy', verb: 'Andar', verbEn: 'To walk' },
  { id: 18, category: 'Gym', pt: 'Hoje ando um bocado cansado.', en: "Today I'm a bit tired.", level: 'Easy', verb: 'Andar', verbEn: 'To walk / be' },

  // SOCIAL & GREETINGS
  { id: 19, category: 'Social', pt: 'Como se diz "thank you"?', en: 'How do you say "thank you"?', level: 'Easy', verb: 'Dizer', verbEn: 'To say / tell' },
  { id: 20, category: 'Social', pt: 'Podes falar devagar?', en: 'Can you speak slowly?', level: 'Easy', verb: 'Falar', verbEn: 'To speak' },
  { id: 21, category: 'Social', pt: 'Estou a aprender português e quero praticar em público.', en: 'I am learning Portuguese and I want to practice in public.', level: 'Intermediate', verb: 'Aprender', verbEn: 'To learn' },
  { id: 22, category: 'Social', pt: 'Olá, bom dia! Como estás?', en: 'Hello, good morning! How are you?', level: 'Easy', verb: 'Estar', verbEn: 'To be' },
  { id: 23, category: 'Social', pt: 'Chamo-me Alex, muito prazer!', en: 'My name is Alex, nice to meet you!', level: 'Easy', verb: 'Chamar', verbEn: 'To call / be named' },
  { id: 24, category: 'Social', pt: 'De nada, não tem de quê.', en: "You're welcome, don't mention it.", level: 'Easy', verb: 'Ter', verbEn: 'To have' },
  { id: 25, category: 'Social', pt: 'Com licença, posso passar?', en: 'Excuse me, can I get past?', level: 'Easy', verb: 'Poder', verbEn: 'To be able / Can' },
  { id: 26, category: 'Social', pt: 'Não entendo português muito bem, podes repetir?', en: "I don't understand Portuguese very well, could you repeat?", level: 'Intermediate', verb: 'Entender', verbEn: 'To understand' },

  // TRANSPORT & DIRECTIONS
  { id: 27, category: 'Transport', pt: 'Desculpe, onde fica a casa de banho?', en: 'Excuse me, where is the bathroom?', level: 'Easy', verb: 'Ficar', verbEn: 'To be located / stay' },
  { id: 28, category: 'Transport', pt: 'Preciso de ir para a estação de comboios.', en: 'I need to go to the train station.', level: 'Easy', verb: 'Precisar', verbEn: 'To need' },
  { id: 29, category: 'Transport', pt: 'Onde é a paragem de autocarro mais próxima?', en: 'Where is the nearest bus stop?', level: 'Intermediate', verb: 'Ser', verbEn: 'To be' },
  { id: 30, category: 'Transport', pt: 'Quero comprar um bilhete para Lisboa.', en: 'I want to buy a ticket to Lisbon.', level: 'Easy', verb: 'Comprar', verbEn: 'To buy' },
  { id: 31, category: 'Transport', pt: 'Este autocarro vai para o centro da cidade?', en: 'Does this bus go to the city center?', level: 'Intermediate', verb: 'Ir', verbEn: 'To go' },

  // SHOPPING & SERVICES
  { id: 32, category: 'Shopping', pt: 'Quanto custa isto, por favor?', en: 'How much does this cost, please?', level: 'Easy', verb: 'Custar', verbEn: 'To cost' },
  { id: 33, category: 'Shopping', pt: 'A que horas abre o supermercado?', en: 'What time does the supermarket open?', level: 'Intermediate', verb: 'Abrir', verbEn: 'To open' },
  { id: 34, category: 'Shopping', pt: 'Tem a fatura com o número de contribuinte?', en: 'Do you have the receipt with the tax number?', level: 'Intermediate', verb: 'Ter', verbEn: 'To have' },
  { id: 35, category: 'Shopping', pt: 'Aceitam cartão de crédito ou só dinheiro?', en: 'Do you accept credit card or only cash?', level: 'Intermediate', verb: 'Aceitar', verbEn: 'To accept' },
  { id: 36, category: 'Shopping', pt: 'Queria um sumo de laranja natural, por favor.', en: 'I would like a fresh orange juice, please.', level: 'Easy', verb: 'Querer', verbEn: 'To want' },

  // HELP & EMERGENCIES
  { id: 37, category: 'Help', pt: 'Pode ajudar-me, por favor? Estou perdido.', en: 'Can you help me, please? I am lost.', level: 'Intermediate', verb: 'Ajudar', verbEn: 'To help' },
  { id: 38, category: 'Help', pt: 'Onde fica a farmácia de serviço?', en: 'Where is the on-duty pharmacy?', level: 'Intermediate', verb: 'Ficar', verbEn: 'To be located / stay' },
  { id: 39, category: 'Help', pt: 'Preciso de um médico.', en: 'I need a doctor.', level: 'Easy', verb: 'Precisar', verbEn: 'To need' },
  { id: 40, category: 'Help', pt: 'Perdi a minha carteira.', en: 'I lost my wallet.', level: 'Intermediate', verb: 'Perder', verbEn: 'To lose' },
  { id: 41, category: 'Help', pt: 'Tenho uma reserva em meu nome.', en: 'I have a reservation under my name.', level: 'Intermediate', verb: 'Ter', verbEn: 'To have' }
];

export default function PortuGeezaApp() {
  const [phrases, setPhrases] = useState(() => {
    const saved = localStorage.getItem('portugeeza_phrases');
    return saved ? JSON.parse(saved) : DEFAULT_PHRASE_DATA;
  });

  const [view, setView] = useState('menu'); // 'menu' or 'study'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shakeDetected, setShakeDetected] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Load SheetJS dynamically for Excel parsing
  useEffect(() => {
    if (!window.XLSX) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('portugeeza_phrases', JSON.stringify(phrases));
  }, [phrases]);

  // Text to Speech Function
  const speakPortuguese = (text, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-PT'; // European Portuguese accent
      utterance.rate = 0.85; // Slightly slower for language learners
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle Motion Shake
  useEffect(() => {
    let lastX, lastY, lastZ;
    let moveCounter = 0;

    const handleMotion = (event) => {
      const { x, y, z } = event.accelerationIncludingGravity || {};
      if (!x || !y || !z) return;

      if (!lastX) {
        lastX = x; lastY = y; lastZ = z;
        return;
      }

      const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
      if (delta > 15) {
        moveCounter++;
      } else {
        moveCounter = Math.max(0, moveCounter - 1);
      }

      if (moveCounter > 5) {
        handleRandomize();
        moveCounter = 0;
        setShakeDetected(true);
        setTimeout(() => setShakeDetected(false), 500);
      }

      lastX = x; lastY = y; lastZ = z;
    };

    if (window.DeviceMotionEvent && view === 'study') {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [view, selectedCategory, difficultyFilter, phrases]);

  // Filter Categories dynamically from current phrases
  const categories = useMemo(() => {
    const unique = Array.from(new Set(phrases.map(p => p.category)));
    return unique;
  }, [phrases]);

  const filteredDeck = useMemo(() => {
    let deck = phrases;
    if (selectedCategory !== 'Random') {
      deck = deck.filter(p => p.category === selectedCategory);
    }
    if (difficultyFilter !== 'All') {
      deck = deck.filter(p => p.level === difficultyFilter);
    }
    return deck;
  }, [phrases, selectedCategory, difficultyFilter]);

  const handleRandomize = () => {
    if (filteredDeck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredDeck.length);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (filteredDeck.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredDeck.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    if (filteredDeck.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredDeck.length) % filteredDeck.length);
    setIsFlipped(false);
  };

  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
    setView('study');
  };

  // Process Excel File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        if (!window.XLSX) {
          alert("Excel parser is loading, please try again in 3 seconds.");
          return;
        }
        const wb = window.XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = window.XLSX.utils.sheet_to_json(ws);

        const formatted = data.map((item, index) => {
          let cat = item["Category / Setting"] || item["Category"] || item["category"] || "General";
          if (cat.includes("Café")) cat = "Café";
          else if (cat.includes("Bar")) cat = "Bar";
          else if (cat.includes("Beach")) cat = "Beach";
          else if (cat.includes("Restaurant")) cat = "Restaurant";
          else if (cat.includes("Gym")) cat = "Gym";

          return {
            id: index + 1,
            category: cat,
            verb: item["Verb"] || item["verb"] || "General",
            verbEn: item["Verb English"] || item["Verb (English)"] || item["verbEn"] || "",
            level: item["Level"] || item["level"] || "Easy",
            pt: item["Portuguese Phrase (European)"] || item["Portuguese"] || item["pt"] || "",
            en: item["English Meaning"] || item["English"] || item["en"] || ""
          };
        }).filter(item => item.pt && item.en);

        if (formatted.length > 0) {
          setPhrases(formatted);
          alert(`Success! Imported ${formatted.length} phrases from Excel.`);
        } else {
          alert("Could not find valid Portuguese/English columns in Excel.");
        }
      } catch (err) {
        alert("Error parsing file. Please ensure it is a valid .xlsx or .csv file.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const resetDefaultDeck = () => {
    if (window.confirm("Reset back to default phrases?")) {
      setPhrases(DEFAULT_PHRASE_DATA);
    }
  };

  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900 pb-20">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-teal-600 mb-1">Portu-Geeza Flashcards</h1>
          <p className="text-slate-500 text-sm">European Portuguese Companion ({phrases.length} Phrases)</p>
        </header>

        {/* Category Selector Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat} 
              label={cat} 
              icon={getCategoryIcon(cat)} 
              color={getCategoryColor(cat)} 
              onClick={() => selectCategory(cat)} 
            />
          ))}

          <button 
            onClick={() => selectCategory('Random')}
            className="col-span-2 mt-2 flex items-center justify-center gap-2 bg-teal-600 text-white p-4 rounded-2xl font-bold shadow-md shadow-teal-100 hover:bg-teal-700 transition-all active:scale-98"
          >
            <Shuffle size={20} /> Shuffle All ({phrases.length} Phrases)
          </button>
        </div>

        {/* Custom Excel Upload Section */}
        <div className="mt-8 max-w-md mx-auto bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="flex items-center gap-2 font-bold mb-2 text-slate-800 text-sm">
            <Upload size={18} className="text-teal-600" /> Manage Your Deck (Excel / CSV)
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Upload your custom `.xlsx` or `.csv` file. It will save automatically to your phone.
          </p>
          
          <div className="flex gap-2">
            <label className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl cursor-pointer transition-colors border border-slate-200">
              <FolderPlus size={16} /> Import Excel
              <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" />
            </label>

            <button 
              onClick={resetDefaultDeck}
              className="flex items-center gap-1 bg-rose-50 text-rose-600 font-bold text-xs py-3 px-3 rounded-xl hover:bg-rose-100 border border-rose-100 transition-colors"
              title="Reset to default deck"
            >
              <RefreshCw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-4 max-w-md mx-auto bg-slate-100 p-4 rounded-2xl text-slate-600 text-xs flex items-start gap-2">
          <Info size={16} className="mt-0.5 shrink-0 text-teal-600" />
          <span>Tap the speaker icon on any flashcard to hear authentic European Portuguese audio!</span>
        </div>
      </div>
    );
  }

  const activeCard = filteredDeck[currentIndex];

  return (
    <div className={`min-h-screen p-6 font-sans transition-colors duration-300 ${shakeDetected ? 'bg-teal-100' : 'bg-slate-50'}`}>
      <div className="max-w-md mx-auto flex flex-col h-full min-h-[85vh]">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setView('menu')} className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 active:scale-95 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-800 text-base">{selectedCategory === 'Random' ? 'Global Shuffle' : selectedCategory}</span>
            <span className="text-xs text-slate-400 font-medium">Card {filteredDeck.length > 0 ? currentIndex + 1 : 0} of {filteredDeck.length}</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Difficulty Selector */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl mb-6">
          {['All', 'Easy', 'Intermediate'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => { setDifficultyFilter(lvl); setCurrentIndex(0); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${difficultyFilter === lvl ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Flashcard Component */}
        {filteredDeck.length > 0 ? (
          <div 
            className="flex-grow flex items-center justify-center cursor-pointer perspective-1000 my-auto"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`relative w-full h-80 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* Front: Portuguese */}
              <div className="absolute inset-0 bg-white border-2 border-slate-100 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden">
                <span className="absolute top-5 left-5 text-[10px] font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">Portugal</span>
                
                {/* Text to Speech Button */}
                <button 
                  onClick={(e) => speakPortuguese(activeCard?.pt, e)}
                  className="absolute top-4 right-4 p-2.5 bg-teal-50 text-teal-600 rounded-2xl hover:bg-teal-100 active:scale-90 transition-all shadow-sm"
                  title="Listen to Pronunciation"
                >
                  <Volume2 size={20} />
                </button>

                <Languages className="mb-4 text-teal-300" size={36} />
                <h2 className="text-2xl font-bold text-center text-slate-800 leading-snug px-2">
                  {activeCard?.pt}
                </h2>
                {activeCard?.verb && (
                  <p className="mt-4 text-slate-400 text-xs font-semibold bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    Verb: {activeCard.verb}
                  </p>
                )}
                <span className="absolute bottom-5 text-[11px] text-slate-300 font-medium">Tap card to flip</span>
              </div>

              {/* Back: English */}
              <div className="absolute inset-0 bg-teal-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180">
                <span className="absolute top-5 left-5 text-[10px] font-black uppercase tracking-widest text-teal-200 bg-teal-700/60 px-2.5 py-1 rounded-lg">English</span>
                <h2 className="text-2xl font-medium text-center text-white leading-snug">
                  {activeCard?.en}
                </h2>
                {activeCard?.verb && (
                  <p className="mt-4 text-teal-100 text-xs font-semibold bg-teal-700/60 px-3 py-1 rounded-full border border-teal-500/30">
                    Verb: {activeCard.verb} {activeCard?.verbEn ? `= ${activeCard.verbEn}` : ''}
                  </p>
                )}
                <span className="absolute bottom-5 text-[11px] text-teal-200/80 font-medium">Tap to return</span>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center bg-white rounded-3xl p-8 text-center border border-slate-200">
            <p className="text-slate-500 text-sm font-semibold mb-2">No cards found in this filter.</p>
            <button onClick={() => setDifficultyFilter('All')} className="text-xs bg-teal-50 text-teal-600 font-bold px-4 py-2 rounded-xl">
              Clear Filters
            </button>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button onClick={prevCard} className="flex-1 bg-white p-4 rounded-2xl shadow-sm text-slate-700 flex justify-center border border-slate-200 active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          
          <button onClick={handleRandomize} className="p-4 bg-teal-50 rounded-2xl text-teal-600 border border-teal-100 active:rotate-180 transition-all">
            <RotateCcw size={24} />
          </button>

          <button onClick={nextCard} className="flex-1 bg-white p-4 rounded-2xl shadow-sm text-slate-700 flex justify-center border border-slate-200 active:scale-95 transition-transform">
            <ChevronRight size={24} />
          </button>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

function CategoryCard({ label, icon, color, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-5 rounded-3xl transition-all active:scale-95 hover:shadow-md ${color} border border-transparent`}
    >
      <div className="mb-2">{icon}</div>
      <span className="font-bold text-xs">{label}</span>
    </button>
  );
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'Café': return <Coffee size={24} />;
    case 'Bar': return <Beer size={24} />;
    case 'Beach': return <Palmtree size={24} />;
    case 'Restaurant': return <Utensils size={24} />;
    case 'Gym': return <Dumbbell size={24} />;
    case 'Transport': return <Bus size={24} />;
    case 'Shopping': return <ShoppingBag size={24} />;
    case 'Help': return <HelpCircle size={24} />;
    default: return <MapPin size={24} />;
  }
}

function getCategoryColor(cat) {
  switch (cat) {
    case 'Café': return 'bg-orange-100 text-orange-600';
    case 'Bar': return 'bg-yellow-100 text-yellow-700';
    case 'Beach': return 'bg-blue-100 text-blue-600';
    case 'Restaurant': return 'bg-rose-100 text-rose-600';
    case 'Gym': return 'bg-emerald-100 text-emerald-600';
    case 'Transport': return 'bg-sky-100 text-sky-700';
    case 'Shopping': return 'bg-amber-100 text-amber-700';
    case 'Help': return 'bg-red-100 text-red-600';
    default: return 'bg-purple-100 text-purple-600';
  }
}
