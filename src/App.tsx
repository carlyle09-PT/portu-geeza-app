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
  Bus,
  PlusCircle,
  Sparkles,
  History,
  Clock,
  X,
  Download,
  BookOpen,
  Check
} from 'lucide-react';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const NOW = Date.now();

const DEFAULT_PHRASE_DATA = [
  // PP LESSONS (PRACTICE PORTUGUESE) EXAMPLES
  { id: 101, category: 'PP Lessons', pt: 'Estou a fazer progresso todos os dias.', en: 'I am making progress every day.', level: 'Intermediate', verb: 'Fazer', verbEn: 'To make / do', createdAt: NOW - (1 * ONE_DAY_MS) },
  { id: 102, category: 'PP Lessons', pt: 'Preciso de praticar a pronúncia europeia.', en: 'I need to practice European pronunciation.', level: 'Intermediate', verb: 'Precisar', verbEn: 'To need', createdAt: NOW - (3 * ONE_DAY_MS) },
  { id: 103, category: 'PP Lessons', pt: 'Como se conjuga este verbo no presente?', en: 'How do you conjugate this verb in the present tense?', level: 'Intermediate', verb: 'Conjugar', verbEn: 'To conjugate', createdAt: NOW - (10 * ONE_DAY_MS) },

  // CAFÉ
  { id: 1, category: 'Café', pt: 'Quero comprar um gelado.', en: 'I want to buy an ice cream.', level: 'Easy', verb: 'Comprar', verbEn: 'To buy', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 2, category: 'Café', pt: 'Podes dar-me a ementa?', en: 'Can you give me the menu?', level: 'Easy', verb: 'Dar', verbEn: 'To give', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 3, category: 'Café', pt: 'Quero comprar um gelado porque está muito calor na praia.', en: 'I want to buy an ice cream because it is very hot at the beach.', level: 'Intermediate', verb: 'Comprar', verbEn: 'To buy', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 4, category: 'Café', pt: 'Tens tempo para tomar um café agora ou estás com pressa?', en: 'Do you have time to have a coffee now or are you in a hurry?', level: 'Intermediate', verb: 'Ter', verbEn: 'To have', createdAt: NOW - (30 * ONE_DAY_MS) },
  
  // BEACH
  { id: 5, category: 'Beach', pt: 'Gosto de ouvir o mar.', en: 'I like to hear the sea.', level: 'Easy', verb: 'Ouvir', verbEn: 'To hear', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 6, category: 'Beach', pt: 'Queres vir à praia?', en: 'Do you want to come to the beach?', level: 'Easy', verb: 'Vir', verbEn: 'To come', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 7, category: 'Beach', pt: 'Vou dar uma caminhada na praia e depois volto.', en: "I'm going to take a walk on the beach and then I'll come back.", level: 'Intermediate', verb: 'Dar', verbEn: 'To give / take', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 8, category: 'Beach', pt: 'Consigo ver os surfistas na água a partir daqui.', en: 'I can see the surfers in the water from here.', level: 'Intermediate', verb: 'Ver', verbEn: 'To see', createdAt: NOW - (30 * ONE_DAY_MS) },

  // BAR
  { id: 9, category: 'Bar', pt: 'Quero beber uma imperial.', en: 'I want to drink a draught beer.', level: 'Easy', verb: 'Beber', verbEn: 'To drink', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 10, category: 'Bar', pt: 'Quero pedir a conta.', en: 'I want to ask for the bill.', level: 'Easy', verb: 'Pedir', verbEn: 'To ask for / order', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 11, category: 'Bar', pt: 'Vou pedir uma imperial e também uma imperial para ti.', en: "I'm going to order a draught beer and also a draught beer for you.", level: 'Intermediate', verb: 'Pedir', verbEn: 'To ask for / order', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 12, category: 'Bar', pt: 'Não consigo ouvir nada porque a música no bar está muito alta.', en: "I can't hear anything because the music in the bar is too loud.", level: 'Intermediate', verb: 'Ouvir', verbEn: 'To hear', createdAt: NOW - (30 * ONE_DAY_MS) },

  // RESTAURANT
  { id: 13, category: 'Restaurant', pt: 'Quero comer peixe fresco.', en: 'I want to eat fresh fish.', level: 'Easy', verb: 'Comer', verbEn: 'To eat', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 14, category: 'Restaurant', pt: 'Posso sentar-me aqui?', en: 'Can I sit here?', level: 'Easy', verb: 'Poder', verbEn: 'To be able / Can', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 15, category: 'Restaurant', pt: 'Posso pagar com multibanco ou tem de ser em dinheiro?', en: 'Can I pay with a debit card or does it have to be in cash?', level: 'Intermediate', verb: 'Pagar', verbEn: 'To pay', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 16, category: 'Restaurant', pt: 'Não posso comer glúten, o que é que me recomenda?', en: 'I cannot eat gluten, what do you recommend me?', level: 'Intermediate', verb: 'Poder', verbEn: 'To be able / Can', createdAt: NOW - (30 * ONE_DAY_MS) },

  // GYM
  { id: 17, category: 'Gym', pt: 'Vou andar um pouco.', en: "I'm going to walk a bit.", level: 'Easy', verb: 'Andar', verbEn: 'To walk', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 18, category: 'Gym', pt: 'Hoje ando um bocado cansado.', en: "Today I'm a bit tired.", level: 'Easy', verb: 'Andar', verbEn: 'To walk / be', createdAt: NOW - (30 * ONE_DAY_MS) },

  // SOCIAL & GREETINGS
  { id: 19, category: 'Social', pt: 'Como se diz "thank you"?', en: 'How do you say "thank you"?', level: 'Easy', verb: 'Dizer', verbEn: 'To say / tell', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 20, category: 'Social', pt: 'Podes falar devagar?', en: 'Can you speak slowly?', level: 'Easy', verb: 'Falar', verbEn: 'To speak', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 21, category: 'Social', pt: 'Estou a aprender português e quero praticar em público.', en: 'I am learning Portuguese and I want to practice in public.', level: 'Intermediate', verb: 'Aprender', verbEn: 'To learn', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 22, category: 'Social', pt: 'Olá, bom dia! Como estás?', en: 'Hello, good morning! How are you?', level: 'Easy', verb: 'Estar', verbEn: 'To be', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 23, category: 'Social', pt: 'Chamo-me Alex, muito prazer!', en: 'My name is Alex, nice to meet you!', level: 'Easy', verb: 'Chamar', verbEn: 'To call / be named', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 24, category: 'Social', pt: 'De nada, não tem de quê.', en: "You're welcome, don't mention it.", level: 'Easy', verb: 'Ter', verbEn: 'To have', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 25, category: 'Social', pt: 'Com licença, posso passar?', en: 'Excuse me, can I get past?', level: 'Easy', verb: 'Poder', verbEn: 'To be able / Can', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 26, category: 'Social', pt: 'Não entendo português muito bem, podes repetir?', en: "I don't understand Portuguese very well, could you repeat?", level: 'Intermediate', verb: 'Entender', verbEn: 'To understand', createdAt: NOW - (30 * ONE_DAY_MS) },

  // TRANSPORT & DIRECTIONS
  { id: 27, category: 'Transport', pt: 'Desculpe, onde fica a casa de banho?', en: 'Excuse me, where is the bathroom?', level: 'Easy', verb: 'Ficar', verbEn: 'To be located / stay', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 28, category: 'Transport', pt: 'Preciso de ir para a estação de comboios.', en: 'I need to go to the train station.', level: 'Easy', verb: 'Precisar', verbEn: 'To need', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 29, category: 'Transport', pt: 'Onde é a paragem de autocarro mais próxima?', en: 'Where is the nearest bus stop?', level: 'Intermediate', verb: 'Ser', verbEn: 'To be', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 30, category: 'Transport', pt: 'Quero comprar um bilhete para Lisboa.', en: 'I want to buy a ticket to Lisbon.', level: 'Easy', verb: 'Comprar', verbEn: 'To buy', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 31, category: 'Transport', pt: 'Este autocarro vai para o centro da cidade?', en: 'Does this bus go to the city center?', level: 'Intermediate', verb: 'Ir', verbEn: 'To go', createdAt: NOW - (30 * ONE_DAY_MS) },

  // SHOPPING & SERVICES
  { id: 32, category: 'Shopping', pt: 'Quanto custa isto, por favor?', en: 'How much does this cost, please?', level: 'Easy', verb: 'Custar', verbEn: 'To cost', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 33, category: 'Shopping', pt: 'A que horas abre o supermercado?', en: 'What time does the supermarket open?', level: 'Intermediate', verb: 'Abrir', verbEn: 'To open', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 34, category: 'Shopping', pt: 'Tem a fatura com o número de contribuinte?', en: 'Do you have the receipt with the tax number?', level: 'Intermediate', verb: 'Ter', verbEn: 'To have', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 35, category: 'Shopping', pt: 'Aceitam cartão de crédito ou só dinheiro?', en: 'Do you accept credit card or only cash?', level: 'Intermediate', verb: 'Aceitar', verbEn: 'To accept', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 36, category: 'Shopping', pt: 'Queria um sumo de laranja natural, por favor.', en: 'I would like a fresh orange juice, please.', level: 'Easy', verb: 'Querer', verbEn: 'To want', createdAt: NOW - (30 * ONE_DAY_MS) },

  // HELP & EMERGENCIES
  { id: 37, category: 'Help', pt: 'Pode ajudar-me, por favor? Estou perdido.', en: 'Can you help me, please? I am lost.', level: 'Intermediate', verb: 'Ajudar', verbEn: 'To help', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 38, category: 'Help', pt: 'Onde fica a farmácia de serviço?', en: 'Where is the on-duty pharmacy?', level: 'Intermediate', verb: 'Ficar', verbEn: 'To be located / stay', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 39, category: 'Help', pt: 'Preciso de um médico.', en: 'I need a doctor.', level: 'Easy', verb: 'Precisar', verbEn: 'To need', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 40, category: 'Help', pt: 'Perdi a minha carteira.', en: 'I lost my wallet.', level: 'Intermediate', verb: 'Perder', verbEn: 'To lose', createdAt: NOW - (30 * ONE_DAY_MS) },
  { id: 41, category: 'Help', pt: 'Tenho uma reserva em meu nome.', en: 'I have a reservation under my name.', level: 'Intermediate', verb: 'Ter', verbEn: 'To have', createdAt: NOW - (30 * ONE_DAY_MS) }
];

export default function PortuGeezaApp() {
  const [phrases, setPhrases] = useState(() => {
    const saved = localStorage.getItem('portugeeza_phrases');
    if (!saved) return DEFAULT_PHRASE_DATA;
    try {
      const parsed = JSON.parse(saved);
      
      // Merge missing default phrases/categories into saved storage
      const existingIds = new Set(parsed.map(item => item.id));
      const newDefaults = DEFAULT_PHRASE_DATA.filter(item => !existingIds.has(item.id));

      return [
        ...parsed.map(item => ({
          ...item,
          createdAt: item.createdAt || NOW - (30 * ONE_DAY_MS)
        })),
        ...newDefaults
      ];
    } catch (e) {
      return DEFAULT_PHRASE_DATA;
    }
  });

  const [view, setView] = useState('menu'); // 'menu' or 'study'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ppTimeFilter, setPpTimeFilter] = useState('fresh'); // 'fresh' (last 7 days) or 'history' (all)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shakeDetected, setShakeDetected] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  
  // Modal for adding a new phrase from the front end
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPt, setNewPt] = useState('');
  const [newEn, setNewEn] = useState('');
  const [newVerb, setNewVerb] = useState('');
  const [newVerbEn, setNewVerbEn] = useState('');
  const [newCategory, setNewCategory] = useState('PP Lessons');
  const [newLevel, setNewLevel] = useState('Intermediate');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

  const categories = useMemo(() => {
    const unique = Array.from(new Set(phrases.map(p => p.category)));
    // Make sure 'PP Lessons' is listed first if present
    if (unique.includes('PP Lessons')) {
      return ['PP Lessons', ...unique.filter(c => c !== 'PP Lessons')];
    }
    return unique;
  }, [phrases]);

  const freshPpCount = useMemo(() => {
    const sevenDaysAgo = Date.now() - (7 * ONE_DAY_MS);
    return phrases.filter(p => p.category === 'PP Lessons' && p.createdAt >= sevenDaysAgo).length;
  }, [phrases]);

  const filteredDeck = useMemo(() => {
    let deck = phrases;

    if (selectedCategory !== 'Random') {
      deck = deck.filter(p => p.category === selectedCategory);
    }

    // Special logic for PP Lessons Fresh vs Historical filter
    if (selectedCategory === 'PP Lessons') {
      const sevenDaysAgo = Date.now() - (7 * ONE_DAY_MS);
      if (ppTimeFilter === 'fresh') {
        deck = deck.filter(p => p.createdAt >= sevenDaysAgo);
      }
      // 'history' includes all PP Lessons
    }

    if (difficultyFilter !== 'All') {
      deck = deck.filter(p => p.level === difficultyFilter);
    }

    return deck;
  }, [phrases, selectedCategory, ppTimeFilter, difficultyFilter]);

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

  const handleAddPhrase = (e) => {
    e.preventDefault();
    if (!newPt.trim() || !newEn.trim()) return;

    const createdItem = {
      id: Date.now(),
      category: newCategory.trim() || 'PP Lessons',
      pt: newPt.trim(),
      en: newEn.trim(),
      verb: newVerb.trim(),
      verbEn: newVerbEn.trim(),
      level: newLevel,
      createdAt: Date.now() // Timestamps phrase as Fresh right now!
    };

    setPhrases((prev) => [createdItem, ...prev]);

    // Reset form fields
    setNewPt('');
    setNewEn('');
    setNewVerb('');
    setNewVerbEn('');
    setIsAddModalOpen(false);

    // Show toast message
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

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
          if (cat.toLowerCase().includes("pp") || cat.toLowerCase().includes("practice")) cat = "PP Lessons";
          else if (cat.includes("Café")) cat = "Café";
          else if (cat.includes("Bar")) cat = "Bar";
          else if (cat.includes("Beach")) cat = "Beach";
          else if (cat.includes("Restaurant")) cat = "Restaurant";

          return {
            id: index + 1,
            category: cat,
            verb: item["Verb"] || item["verb"] || "",
            verbEn: item["Verb English"] || item["Verb (English)"] || item["verbEn"] || "",
            level: item["Level"] || item["level"] || "Easy",
            pt: item["Portuguese Phrase (European)"] || item["Portuguese"] || item["pt"] || "",
            en: item["English Meaning"] || item["English"] || item["en"] || "",
            createdAt: Date.now() // Imported cards start fresh
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
      <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900 pb-24 relative">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-teal-600 mb-1 flex items-center justify-center gap-2">
            <Languages className="text-teal-600" /> Portu-Geeza
          </h1>
          <p className="text-slate-500 text-sm">European Portuguese Companion ({phrases.length} Phrases)</p>
        </header>

        {/* Floating Quick-Add Button for Phone */}
        <div className="max-w-md mx-auto mb-5">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-teal-100 hover:from-teal-600 hover:to-emerald-700 transition-all active:scale-98"
          >
            <PlusCircle size={22} /> Add New Practice Phrase
          </button>
        </div>

        {/* Category Selector Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat} 
              label={cat} 
              badge={cat === 'PP Lessons' ? `${freshPpCount} Fresh` : null}
              icon={getCategoryIcon(cat)} 
              color={getCategoryColor(cat)} 
              onClick={() => selectCategory(cat)} 
            />
          ))}

          <button 
            onClick={() => selectCategory('Random')}
            className="col-span-2 mt-2 flex items-center justify-center gap-2 bg-slate-800 text-white p-4 rounded-2xl font-bold shadow-md hover:bg-slate-900 transition-all active:scale-98"
          >
            <Shuffle size={20} /> Shuffle All ({phrases.length} Phrases)
          </button>
        </div>

        {/* Custom Excel Upload & Deck Management */}
        <div className="mt-8 max-w-md mx-auto bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="flex items-center gap-2 font-bold mb-2 text-slate-800 text-sm">
            <Upload size={18} className="text-teal-600" /> Manage Deck (Excel / CSV)
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Import an Excel sheet or reset your default phrases. Your phrases stay saved in your phone browser!
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
        <div className="mt-4 max-w-md mx-auto bg-teal-50/80 border border-teal-100 p-4 rounded-2xl text-teal-800 text-xs flex items-start gap-2.5">
          <Info size={18} className="mt-0.5 shrink-0 text-teal-600" />
          <span>Tap <strong>"+ Add New Practice Phrase"</strong> whenever you learn a new sentence on Practice Portuguese to build your custom deck!</span>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce z-50">
            <Check size={16} /> Added phrase to PP Lessons!
          </div>
        )}

        {}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <PlusCircle size={20} className="text-teal-600" /> Add Practice Phrase
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddPhrase} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Portuguese Phrase (European)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quero pedir a conta, por favor."
                    value={newPt}
                    onChange={(e) => setNewPt(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">English Meaning</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. I want to ask for the bill, please."
                    value={newEn}
                    onChange={(e) => setNewEn(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Verb (Portuguese)</label>
                    <input
                      type="text"
                      placeholder="e.g. Pedir"
                      value={newVerb}
                      onChange={(e) => setNewVerb(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Verb (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. To ask for"
                      value={newVerbEn}
                      onChange={(e) => setNewVerbEn(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="PP Lessons">PP Lessons</option>
                      <option value="Café">Café</option>
                      <option value="Bar">Bar</option>
                      <option value="Beach">Beach</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Gym">Gym</option>
                      <option value="Social">Social</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Help">Help</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Difficulty</label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Intermediate">Intermediate</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-teal-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-teal-700"
                  >
                    Save Phrase
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
            <span className="font-bold text-slate-800 text-base flex items-center gap-1.5">
              {selectedCategory === 'PP Lessons' && <Sparkles size={16} className="text-purple-600" />}
              {selectedCategory === 'Random' ? 'Global Shuffle' : selectedCategory}
            </span>
            <span className="text-xs text-slate-400 font-medium">Card {filteredDeck.length > 0 ? currentIndex + 1 : 0} of {filteredDeck.length}</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Special PP Lessons Time Filter Tabs (Fresh vs Historical) */}
        {selectedCategory === 'PP Lessons' && (
          <div className="flex bg-purple-100/70 p-1 rounded-2xl mb-4 border border-purple-200/50">
            <button
              onClick={() => { setPpTimeFilter('fresh'); setCurrentIndex(0); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${ppTimeFilter === 'fresh' ? 'bg-white shadow-sm text-purple-700' : 'text-purple-500'}`}
            >
              <Sparkles size={14} /> Fresh (Last 7 Days)
            </button>
            <button
              onClick={() => { setPpTimeFilter('history'); setCurrentIndex(0); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${ppTimeFilter === 'history' ? 'bg-white shadow-sm text-purple-700' : 'text-purple-500'}`}
            >
              <History size={14} /> Historical (All)
            </button>
          </div>
        )}

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
                
                {/* Audio Pronunciation Button */}
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
            <p className="text-slate-600 text-sm font-semibold mb-2">No phrases found in this filter.</p>
            {selectedCategory === 'PP Lessons' && ppTimeFilter === 'fresh' ? (
              <p className="text-xs text-slate-400 mb-4">No new phrases added in the last 7 days.</p>
            ) : null}
            <button onClick={() => { setDifficultyFilter('All'); setPpTimeFilter('history'); }} className="text-xs bg-teal-50 text-teal-600 font-bold px-4 py-2 rounded-xl">
              Show All Historical Phrases
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

function CategoryCard({ label, badge, icon, color, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-5 rounded-3xl transition-all active:scale-95 hover:shadow-md ${color} border border-transparent`}
    >
      {badge && (
        <span className="absolute top-2.5 right-2.5 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
          {badge}
        </span>
      )}
      <div className="mb-2">{icon}</div>
      <span className="font-bold text-xs">{label}</span>
    </button>
  );
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'PP Lessons': return <Sparkles size={24} />;
    case 'Café': return <Coffee size={24} />;
    case 'Bar': return <Beer size={24} />;
    case 'Beach': return <Palmtree size={24} />;
    case 'Restaurant': return <Utensils size={24} />;
    case 'Gym': return <Dumbbell size={24} />;
    case 'Transport': return <Bus size={24} />;
    case 'Shopping': return <ShoppingBag size={24} />;
    case 'Help': return <HelpCircle size={24} />;
    default: return <BookOpen size={24} />;
  }
}

function getCategoryColor(cat) {
  switch (cat) {
    case 'PP Lessons': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Café': return 'bg-orange-100 text-orange-600';
    case 'Bar': return 'bg-yellow-100 text-yellow-700';
    case 'Beach': return 'bg-blue-100 text-blue-600';
    case 'Restaurant': return 'bg-rose-100 text-rose-600';
    case 'Gym': return 'bg-emerald-100 text-emerald-600';
    case 'Transport': return 'bg-sky-100 text-sky-700';
    case 'Shopping': return 'bg-amber-100 text-amber-700';
    case 'Help': return 'bg-red-100 text-red-600';
    default: return 'bg-teal-100 text-teal-700';
  }
}
