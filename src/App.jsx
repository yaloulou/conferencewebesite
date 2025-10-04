import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode"; // Import de la bibliothèque QRCode
import { Analytics } from '@vercel/analytics/react';
import { translations } from "/src/translations.js";
import PaymentStatus from "/src/components/PaymentStatus.jsx";
import AdminDashboard from "/src/components/AdminDashboard.jsx";
import visitCounter from "/src/utils/visitCounter.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Import des drapeaux SVG
import rdcFlag from '/rdc_flag.svg';
import usaFlag from '/usa_flag.svg';

import {
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Check,
  Calendar,
  MapPin,
  Users,
  Mic,
  Twitter,
  Linkedin,
  Youtube,
  Star,
  Award,
  Cpu,
  Shield,
  Server,
  Wifi,
  Mail,
  Coffee,
  Clock,
  Phone,
  Hotel,
  Truck,
  Train,
  Car,
  ExternalLink,
  ScreenShare,
} from "lucide-react";

import speakers from "/src/data/speakers.js"; // PAS d’accolades ici
import speakersExecutif from "/src/data/speakers_executif";
import congoleseVisionnary from "/src/data/congolese_visionnary";


const DigitalNation2030 = () => {
  // States for speaker modal
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Language state
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Get current translations
  const t = translations[currentLanguage];
  
  // Language toggle function
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  // Function to translate speaker titles
  const translateTitle = (title) => {
    if (currentLanguage === 'fr' && t.speakers.titleTranslations[title]) {
      return t.speakers.titleTranslations[title];
    }
    return title;
  };

  // Function to translate speaker bios using bioKey
  const translateBio = (speaker) => {
    if (currentLanguage === 'fr' && t.speakers.bioTranslations && speaker.bioKey && t.speakers.bioTranslations[speaker.bioKey]) {
      return t.speakers.bioTranslations[speaker.bioKey];
    }
    return speaker.detailedBio;
  };

  // Function to translate speaker topics
  const translateTopic = (topic) => {
    if (currentLanguage === 'fr' && t.speakers.topicTranslations && t.speakers.topicTranslations[topic]) {
      return t.speakers.topicTranslations[topic];
    }
    return topic;
  };

  // Palette de couleurs
  const colors = {
    bg: "bg-[#1A1A1A]",
    card: "bg-[#252525]",
    text: "text-[#E0E0E0]",
    textBright: "text-[#FFFFFF]",
    accent: "text-[#00FFFF]",
    accentBg: "bg-[#00FFFF]",
    accentBorder: "border-[#00FFFF]",
    divider: "border-[#333333]",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]",
  };

  // Speaker Modal Component
  const SpeakerModal = ({ speaker, isOpen, onClose }) => {
    if (!isOpen || !speaker) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className={`relative ${colors.card} rounded-xl sm:rounded-2xl border ${colors.accentBorder} max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl ${colors.hoverGlow}`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full ${colors.text} hover:${colors.accent} transition-colors z-10 touch-manipulation`}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Speaker Content */}
          <div className="p-4 sm:p-6 md:p-8 pt-12 sm:pt-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Speaker Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-white mx-auto">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/128";
                    }}
                  />
                </div>
              </div>

              {/* Speaker Info */}
              <div className="flex-1 text-center">
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.textBright} mb-2`}>
                  {speaker.name}
                </h2>
                <p className={`text-lg sm:text-xl ${colors.accent} mb-3 sm:mb-4 font-semibold`}>
                  {speaker.title}
                </p>
                <div className={`${colors.card} p-3 sm:p-4 rounded-lg border ${colors.divider} mb-4 sm:mb-6`}>
                  <h3 className={`text-base sm:text-lg font-semibold ${colors.textBright} mb-2`}>
                    {t.modal.speakingTopic}
                  </h3>
                  <p className={`${colors.text} italic text-sm sm:text-base md:text-lg leading-relaxed`}>
                    "{translateTopic(speaker.topic)}"
                  </p>
                </div>

                {/* Social Links */}
                {(speaker.social?.twitter || speaker.social?.linkedin) && (
                  <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {speaker.social?.twitter && (
                      <a
                        href={speaker.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 sm:p-3 rounded-full border ${colors.divider} ${colors.text} hover:${colors.accent} hover:border-[#00FFFF] transition-all touch-manipulation`}
                      >
                        <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                    {speaker.social?.linkedin && (
                      <a
                        href={speaker.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 sm:p-3 rounded-full border ${colors.divider} ${colors.text} hover:${colors.accent} hover:border-[#00FFFF] transition-all touch-manipulation`}
                      >
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                  </div>
                )}

                {/* Additional Info */}
                {speaker.detailedBio && (
                  <div className={`${colors.card} p-3 sm:p-4 rounded-lg border ${colors.divider} text-left`}>
                    <h3 className={`text-base sm:text-lg font-semibold ${colors.textBright} mb-2`}>
                      {t.modal.biography}
                    </h3>
                    <div className={`${colors.text} text-sm sm:text-base leading-relaxed whitespace-pre-line`}>
                      {translateBio(speaker)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SpeakerGrid = ({ speakers, gridLabel, speakerType }) => {
  const INITIAL_VISIBLE = 8;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const canLoadMore = visibleCount < speakers.length;
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, speakers.length));
  };

  // Fonction pour déterminer le code pays selon le type de speaker
  const getFlag = (type, isSuspense = false) => {
    if (isSuspense) return null; // Pas de code pays pour les cartes de suspens
    switch(type) {
      case 'executif':
      case 'visionnaires':
        return "CD"; // République Démocratique du Congo
      case 'principaux':
        return "US"; // États-Unis
      default:
        return null;
    }
  };

  // Logique spéciale pour Executive Panel
  const isExecutivePanel = speakerType === 'executif';
  const firstThree = isExecutivePanel ? speakers.slice(0, 3) : [];
  const remaining = isExecutivePanel ? speakers.slice(3, visibleCount) : speakers.slice(0, visibleCount);

  const renderSpeakerCard = (speaker, isKeynote = false, isHost = false) => (
    <div
      key={speaker.id}
      className={`
        ${speaker.isSuspense ? 
          'bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-dashed border-2 border-[#00FFFF]' : 
          'bg-[#252525] border border-[#333333]'
        } flex flex-col items-center relative
        transition-all duration-300 hover:border-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]
        rounded-xl
        min-h-[340px] sm:min-h-[360px] h-[364px] sm:h-[384px] max-w-[280px] sm:max-w-[294px] w-full mx-auto
        px-4 sm:px-5 py-5 sm:py-6
      `}
    >
      {/* Code pays en haut à droite */}
      <div className="absolute top-3 right-3 z-10">
        {getFlag(speakerType, speaker.isSuspense)}
      </div>

      {/* Badge Keynote Speaker pour les 3 premiers de l'exec panel */}
      {isKeynote && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`${isHost ? 'bg-yellow-500 text-black' : 'bg-[#00FFFF] text-black'} text-xs font-bold px-2 py-1 rounded`}>
            {t.speakers.executiveKeynote}
          </span>
        </div>
      )}
      
      <div className={`relative ${isHost ? 'w-32 h-32' : 'w-24 h-24'} rounded-full overflow-hidden mb-4 border-4 border-white bg-white`}>
        <img
          src={speaker.avatar}
          alt={speaker.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/120";
          }}
        />
      </div>
      <h4 className="text-lg font-bold text-[#FFFFFF] text-center">{speaker.name}</h4>
      <p className="text-[#00FFFF] text-sm text-center mb-1">{translateTitle(speaker.title)}</p>
      <p className="text-[#E0E0E0] text-sm text-center italic mb-2">"{translateTopic(speaker.topic)}"</p>
      <div className="flex justify-center space-x-2 mb-2">
        {speaker?.social?.twitter && (
          <a
            href={speaker.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E0E0E0] hover:text-[#00FFFF] transition-colors"
          >
            {/* Twitter SVG */}
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.93 4.93 0 0 0 2.16-2.72c-.95.56-2 .97-3.13 1.19A4.92 4.92 0 0 0 16.67 3c-2.72 0-4.93 2.2-4.93 4.93 0 .39.04.77.12 1.13C7.72 8.89 4.1 6.92 1.67 3.91c-.43.75-.68 1.62-.68 2.55 0 1.76.89 3.32 2.26 4.23-.82-.03-1.59-.25-2.26-.62v.06c0 2.47 1.76 4.53 4.09 5-.43.12-.89.18-1.36.18-.33 0-.65-.03-.96-.09.65 2.01 2.53 3.47 4.76 3.51A9.86 9.86 0 0 1 0 19.54a13.89 13.89 0 0 0 7.56 2.22c9.07 0 14.04-7.52 14.04-14.04 0-.22 0-.43-.02-.65A10.03 10.03 0 0 0 24 4.56z"/></svg>
          </a>
        )}
        {speaker?.social?.linkedin && (
          <a
            href={speaker.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E0E0E0] hover:text-[#00FFFF] transition-colors"
          >
            {/* Linkedin SVG */}
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm14.5 11.3h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97v5.69h-3v-10h2.87v1.36h.04c.4-.76 1.36-1.56 2.8-1.56 3 0 3.56 1.97 3.56 4.53v5.67z"/></svg>
          </a>
        )}
      </div>
      {/* Bouton More Details ou Coming Soon */}
      {speaker.isSuspense ? (
        <div className="
          mt-auto mb-1 px-5 py-3 rounded-md text-base font-medium
          bg-gray-600 text-gray-300
          border-2 border-dashed border-gray-500
          flex items-center justify-center
          cursor-not-allowed
        ">
          <span className="mr-1">⏳</span>
          {t.speakers.comingSoon}
        </div>
      ) : (
        <button
          onClick={() => {
            setSelectedSpeaker(speaker);
            setIsModalOpen(true);
          }}
          className="
            mt-auto mb-1 px-5 py-3 rounded-md text-base font-medium
            bg-black text-[#00FFFF]
            border-2 border-transparent hover:border-[#00FFFF]
            transition-all duration-200
            hover:scale-105
            flex items-center justify-center
            cursor-pointer
          "
          style={{ backgroundColor: "#000", color: "#00FFFF" }}
        >
          <span className="mr-1">→</span>
          {t.speakers.viewDetails}
        </button>
      )}
    </div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-2 text-center text-[#FFFFFF]">{gridLabel}</h3>
      <div className="w-16 h-1 bg-[#00FFFF] mx-auto mb-4"></div>
      
      {/* Executive Panel : Première ligne avec 3 keynote speakers */}
      {isExecutivePanel && firstThree.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 justify-items-center mb-3 px-4 mt-12">
          {firstThree.map((speaker, index) => {
            // La deuxième carte (index 1) est l'hôte de l'événement - photo plus grande seulement
            const isHost = index === 1;
            return (
              <div key={speaker.id}>
                {renderSpeakerCard(speaker, true, isHost)}
              </div>
            );
          })}
        </div>
      )}

      {/* Grille normale : responsive pour mobile */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${isExecutivePanel ? 'lg:grid-cols-4 xl:grid-cols-4' : 'lg:grid-cols-4 xl:grid-cols-4'} gap-x-3 gap-y-4 px-2`}>
        {(isExecutivePanel ? remaining : speakers.slice(0, visibleCount)).map((speaker) => 
          renderSpeakerCard(speaker, false)
        )}
      </div>
      {canLoadMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className={`
              px-6 py-3 rounded-lg text-base font-medium bg-[#00FFFF] text-white
              transition-all duration-200 hover:scale-105 shadow-lg
              border-2 border-transparent hover:border-[#00FFFF]
              outline-none
            `}
          >
            {t.speakers.loadMore} ({speakers.length - visibleCount} available)
          </button>
        </div>
      )}
    </div>
  );
};
  /* const colors = {
    // Ancien: bg-[#1A1A1A]
    bg: 'bg-white', 
    // Ancien: bg-[#252525]
    card: 'bg-gray-100', 
    // Ancien: text-[#E0E0E0]
    text: 'text-gray-700', 
    // Ancien: text-[#FFFFFF]
    textBright: 'text-gray-900', 
    // L'accent reste la même, ce qui est parfait
    accent: 'text-[#00FFFF]', 
    accentBg: 'bg-[#00FFFF]',
    // La bordure d'accent sera toujours visible
    accentBorder: 'border-[#00FFFF]', 
    // Les diviseurs deviennent plus clairs
    divider: 'border-gray-300', 
    // L'effet de survol (glow) peut être ajusté pour être plus subtil
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]'
}; */

  // Données des speakers
  /* const speakers = [
    {
      name: "Dr. Sarah Mbuyi",
      title: "Minister of Digital Economy, DRC",
      topic: "National digital transformation strategy",
      avatar: "/avatar1.png"
    },
    {
      name: "Jean Kaseya",
      title: "Africa Director, Google",
      topic: "AI for African development",
      avatar: "/avatar2.png"
    },
    {
      name: "Prof. Léon Tshilolo",
      title: "Rector, University of Kinshasa",
      topic: "Digital skills education",
      avatar: "/avatar3.png"
    },
    {
      name: "Amina Soudi",
      title: "CEO, TechAfrique",
      topic: "Fintech and financial inclusion",
      avatar: "/avatar4.png"
    }
  ]; */

  // Conference Program
  const schedule = [
    {
      day: "November 11, 2025",
      events: [
        {
          time: "08:00 - 09:00",
          title: "Registration & Breakfast",
          icon: <Users className="w-5 h-5" />,
        },
        {
          time: "09:00 - 10:30",
          title: "Opening Ceremony",
          icon: <Award className="w-5 h-5" />,
        },
        {
          time: "10:30 - 12:00",
          title: "Keynote: Africa's Digital Future",
          icon: <Star className="w-5 h-5" />,
        },
      ],
    },
    {
      day: "November 12, 2025",
      events: [
        {
          time: "08:30 - 10:00",
          title: "Panel: Cybersecurity in Africa",
          icon: <Shield className="w-5 h-5" />,
        },
        {
          time: "10:30 - 12:00",
          title: "Technical Workshops",
          icon: <Cpu className="w-5 h-5" />,
        },
        {
          time: "14:00 - 15:30",
          title: "Roundtable: E-Government",
          icon: <Server className="w-5 h-5" />,
        },
      ],
    },
    {
      day: "November 13, 2025",
      events: [
        {
          time: "09:00 - 10:30",
          title: "Startup Presentations",
          icon: <Wifi className="w-5 h-5" />,
        },
        {
          time: "11:00 - 12:30",
          title: "Closing Ceremony",
          icon: <Award className="w-5 h-5" />,
        },
      ],
    },
  ];

  // Sponsors
  const sponsors = [
    { name: "Google", tier: "Platinum", logo: "/google-logo.png" },
    { name: "MTN", tier: "Gold", logo: "/mtn-logo.png" },
    { name: "Orange", tier: "Gold", logo: "/orange-logo.png" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  // Composant Navbar

  const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
      { id: "home", label: "home" },
      { id: "speakers", label: "speakers" },
      { id: "program", label: "program" },
      { id: "sponsors", label: "sponsors" },
      { id: "location", label: "location" },
      { id: "register", label: "register" },
    ];

    const scrollToSection = (sectionId) => {
      // Si nous sommes sur la page d'accueil, faire un scroll normal
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(sectionId);
          setMobileMenuOpen(false);
        }
      } else {
        // Si nous sommes sur une autre page, naviguer vers la page d'accueil avec l'ancre
        navigate(`/#${sectionId}`);
        setMobileMenuOpen(false);
        // Attendre un peu puis faire le scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSection(sectionId);
          }
        }, 100);
      }
    };

    useEffect(() => {
      const handleScroll = () => {
        const sections = navItems.map((item) =>
          document.getElementById(item.id)
        );
        sections.forEach((section) => {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section.id);
            }
          }
        });
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <nav className="fixed w-full z-50 bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                digital nation 2030
              </span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-bold text-sm lg:text-base text-white cursor-pointer transition-colors ${
                    activeSection === item.id
                      ? "text-cyan-400"
                      : "hover:text-cyan-300"
                  }`}
                >
                  {capitalizeFirstLetter(t.nav[item.id] || item.label)}
                </div>
              ))}
              
              {/* Language Selector */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
              >
                <span className="text-sm">{currentLanguage.toUpperCase()}</span>
                <span className="text-xs opacity-70">|</span>
                <span className="text-xs opacity-70">{currentLanguage === 'en' ? 'FR' : 'EN'}</span>
              </button>
            </div>

            {/* Menu Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              )}
            </button>
          </div>

          {/* Menu Mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black border-t border-gray-800">
              <div className="flex flex-col px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <div
                    key={`mobile-${item.id}`}
                    onClick={() => {
                      scrollToSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`font-bold text-white py-3 px-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-cyan-400 bg-cyan-900/20"
                        : "hover:text-cyan-300 hover:bg-gray-800"
                    }`}
                  >
                    {capitalizeFirstLetter(t.nav[item.id] || item.label)}
                  </div>
                ))}
                
                {/* Language Selector Mobile */}
                <div className="pt-2 border-t border-gray-700 mt-2">
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-3 px-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold transition-colors"
                  >
                    <span>Language / Langue</span>
                    <span className="text-sm">{currentLanguage.toUpperCase()} → {currentLanguage === 'en' ? 'FR' : 'EN'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  const HomePage = () => {
    const location = useLocation();
    
    const colors = {
      bg: "bg-[#1A1A1A]",
      card: "bg-[#252525]",
      text: "text-[#E0E0E0]",
      textBright: "text-[#FFFFFF]",
      accent: "text-[#00FFFF]",
      accentBg: "bg-[#00FFFF]",
      accentBorder: "border-[#00FFFF]",
      divider: "border-[#333333]",
      hoverGlow: "hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]",
    };

    // Gérer le scroll vers la section lors du chargement de la page avec une ancre
    useEffect(() => {
      if (location.hash) {
        const sectionId = location.hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 500); // Délai pour laisser le temps à la page de se charger
      }
    }, [location.hash]);

    return (
      <div className={`${colors.bg} ${colors.text} min-h-screen`}>
        <Navbar />
        <main>
          <HeroSection />
          <SpeakersSection />
          <ProgramSection />
          <SponsorsSection />
          <LocationSection />
          <RegisterSection />
        </main>
        <Footer />
      </div>
    );
  };

  // Composant Hero
  const HeroSection = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const videoRef = useRef(null);
    
    const videos = [
      "landing_media.mp4",
      "landing_media2.mp4"
    ];

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleVideoEnd = () => {
        // Commencer la transition rapide
        setIsTransitioning(true);
        
        // Après 300ms de transition, changer la vidéo
        setTimeout(() => {
          setCurrentVideo(prev => (prev + 1) % videos.length);
          setIsTransitioning(false);
        }, 300);
      };

      // Écouter l'événement 'ended' pour chaque changement de vidéo
      video.addEventListener('ended', handleVideoEnd);
      
      // Nettoyer l'événement
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }, [currentVideo, videos.length]);

    useEffect(() => {
      // Quand currentVideo change, charger et jouer la nouvelle vidéo
      const video = videoRef.current;
      if (video) {
        video.load();
        video.play().catch(console.error);
      }
    }, [currentVideo]);

    return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Vidéos de fond avec transition rapide */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            key={currentVideo}
          >
            <source src={videos[currentVideo]} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Badge de date et lieu */}
            <div
              className={`mb-6 md:mb-8 ${colors.card} ${colors.text} px-4 md:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${colors.accentBorder} ${colors.hoverGlow} transform transition-all hover:scale-105`}
            >
              <span className="hidden sm:inline">{t.hero.date} • {t.hero.location}</span>
              <span className="sm:hidden">{t.hero.date} • Kinshasa</span>
            </div>

            {/* Hook accrocheur centré RDC */}
            <p
              className={`text-base md:text-lg lg:text-xl ${colors.accent} font-semibold mb-3 md:mb-4 uppercase tracking-wider`}
            >
              DRC's Premier Digital Summit
            </p>

            {/* Sous-titre principal */}
            <p
              className={`text-xl md:text-2xl lg:text-3xl ${colors.text} max-w-4xl mb-4 md:mb-6 font-medium px-4`}
            >
              <span className={colors.accent}>DIGITAL</span> NATION 2030
            </p>

            {/* Titre principal */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 ${colors.textBright} leading-tight max-w-5xl px-4 text-center`}
            >
              {t.hero.title}
            </h1>

            {/* Sous-texte descriptif */}
            {/* <p
              className={`text-xl md:text-2xl ${colors.text} max-w-4xl mb-10 leading-relaxed opacity-90`}
            >
              Where <span className={colors.accent}>Global Experts</span>, <span className={colors.accent}>Local Visionaries</span> & <span className={colors.accent}>Decision Makers</span> Unite to Transform Central Africa's <span className={colors.accent}>200M+ Market</span>
            </p> */}

            {/* Statistiques rapides */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 md:mb-10 text-sm px-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />
                <span className={colors.text}>{t.hero.stats.days}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />
                <span className={colors.text}>{t.hero.stats.speakers}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFFF]" />
                <span className={colors.text}>{t.hero.stats.attendees}</span>
              </div>
            </div>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4 px-4">
              <button
                type="button"
                onClick={() => {
                  const registerSection = document.getElementById("register");
                  if (registerSection) {
                    registerSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`
                appearance-none
                !bg-[#00FFFF] !text-white
                hover:!bg-[#00FFFF] focus:!bg-[#00FFFF] active:!bg-[#00FFFF] disabled:!bg-[#00FFFF]
                hover:!text-white focus:!text-white active:!text-white disabled:!text-white
                px-6 py-3 rounded-lg font-bold text-lg ${colors.hoverGlow}
                transition-all hover:scale-105 shadow-2xl
              `}
                style={{
                  backgroundColor: "#00FFFF",
                  background: "#00FFFF",
                  color: "#FFFFFF",
                }}
              >
                {t.hero.registerBtn}
              </button>

              <button
                type="button"
                className={`
                appearance-none border-2 ${colors.accentBorder} ${colors.accent}
                px-6 py-3 rounded-lg font-bold text-lg transition-all hover:scale-105
                !bg-black hover:!bg-black focus:!bg-black active:!bg-black disabled:!bg-black
                shadow-2xl
              `}
                style={{ backgroundColor: "#000", background: "#000" }}
                onClick={() => {
                  const programSection = document.getElementById("program");
                  if (programSection) {
                    programSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {t.hero.viewProgramBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Dégradé en bas */}
        <div
          className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent z-20`}
        ></div>
      </section>
    );
  };

  // En haut du fichier (hors composant) :
  // import { speakers } from "./data/speakers"; // ajuste le chemin

const SpeakersSection = () => {
  return (
    <section className="py-12 bg-[#1A1A1A]" id="speakers">
      <div className="max-w-6xl mx-auto px-6"> {/* plus de padding à gauche/droite */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 text-[#FFFFFF]">
            <span className="text-[#00FFFF]">{t.speakers.title}</span>
          </h2>
          <div className="w-20 h-1 bg-[#00FFFF] mx-auto mb-4"></div>
          <p className="text-lg text-[#E0E0E0] max-w-3xl mx-auto">
          {t.speakers.subtitle}
          </p>
        </div>
        <SpeakerGrid speakers={speakersExecutif} gridLabel={t.speakers.executivePanel} speakerType="executif" />
        <SpeakerGrid speakers={speakers} gridLabel={t.speakers.globalExperts} speakerType="principaux" />
        <SpeakerGrid speakers={congoleseVisionnary} gridLabel={t.speakers.congoleseVisionaries} speakerType="visionnaires" />
      </div>
    </section>
  );
};


const ProgramSection = () => {
    // State pour gérer les jours ouverts/fermés
    const [openDays, setOpenDays] = useState({
      0: false, // Day 1
      1: false, // Day 2  
      2: false  // Day 3
    });

    // Fonction pour basculer l'état d'un jour
    const toggleDay = (dayIndex) => {
      setOpenDays(prev => ({
        ...prev,
        [dayIndex]: !prev[dayIndex]
      }));
    };

    const schedule = [
      {
        day: "day1",
        date: "",
        events: [
          {
            time: "07:30 - 08:15",
            title: "registration_breakfast",
            type: "break",
          },
          {
            time: "08:30 - 09:00",
            title: "opening_keynote",
            type: "keynote",
            speaker: "Desire Cashmir Kologele Eberande | Moderator: Introduction by Wilmot Gibson",
          },
          {
            time: "09:00 - 09:30",
            title: "ambassador_speech_us",
            type: "keynote",
          },
          {
            time: "09:30 - 10:15",
            title: "strategic_banking",
            type: "keynote",
            speaker: "André Wameso | Moderator: Lucien B",
          },
          {
            time: "10:15 - 10:30",
            title: "ambassador_speech_uk",
            type: "keynote",
          },
          {
            time: "10:30 - 11:15",
            title: "drc_investment",
            type: "keynote",
            speaker: "JOE DUMBI KABANGU | Moderator: Antoine Kayisu",
          },
          {
            time: "11:15 - 11:30",
            title: "break_morning",
            type: "break",
          },
          {
            time: "11:30 - 12:30",
            title: "executive_panel",
            type: "panel",
            speaker: `Sabune Winkler (Health Services); Pankaj Chugh (Disruptive Technologies); Min. Louis Watum Kabamba (Mining and Energy); Min. Intérieur Jacquemain Shabani; Hugues Bosala (Rawbank); Fellly Samuna (Industries) | Moderator: Bijou Nsumbu`,
          },
          {
            time: "12:30 - 13:30",
            title: "lunch_expo",
            type: "networking",
          },
          {
            time: "13:30 - 14:30",
            title: "breakout_morning",
            type: "workshop",
            tracks: [
              "cybersecurity_fundamentals",
              "legacy_infrastructure", 
              "future_talent",
              "digital_identity"
            ]
          },
          {
            time: "14:30 - 14:45",
            title: "break_afternoon",
            type: "break",
          },
          {
            time: "14:45 - 15:30",
            title: "breakout_afternoon",
            type: "workshop",
            tracks: [
              "mobile_money",
              "vaccine_development",
              "digital_security",
              "telecom_future"
            ]
          },
          {
            time: "15:30 - 15:45",
            title: "break_afternoon",
            type: "break",
          },
          {
            time: "15:45 - 16:30",
            title: "industry_sessions",
            type: "session",
            tracks: [
              "telecom_modernization",
              "financial_security",
              "satellite_observation"
            ]
          },
          {
            time: "16:30 - 17:30",
            title: "networking_exhibits",
            type: "networking",
          },
          {
            time: "18:00 - 18:15",
            title: "evening_keynote",
            type: "keynote",
            speaker: "Inspirational leader or technology innovator",
          },
          {
            time: "18:00 - 19:30",
            title: "welcome_dinner",
            type: "networking",
            speaker: "All attendees",
          },
        ],
      },
      {
        day: "day2",
        date: "",
        events: [
          {
            time: "07:30 - 08:15",
            title: "breakfast_networking",
            type: "break",
          },
          {
            time: "08:30 - 09:15",
            title: "cyber_threats",
            type: "keynote",
            speaker: `Ainsley Rattray | Moderator: Grace Ngoya`,
          },
          {
            time: "09:30 - 10:15",
            title: "mining_energy",
            type: "keynote",
            speaker: "Jean-Marie Kande Tumba | Moderator: Norbert Wupona",
          },
          {
            time: "10:30 - 11:15",
            title: "tech_healthcare",
            type: "keynote",
            speaker: "Aaron Winkler | Moderator: Sabune W.",
          },
          {
            time: "11:15 - 11:30",
            title: "networking_break",
            type: "break",
          },
          {
            time: "11:30 - 12:15",
            title: "advanced_workshops",
            type: "workshop",
            tracks: [
              "zero_trust",
              "cloud_solutions",
              "telemedicine",
              "mining_cadastre"
            ]
          },
          {
            time: "12:15 - 13:30",
            title: "lunch_exhibits",
            type: "networking",
          },
          {
            time: "13:30 - 14:15",
            title: "panel_breakout",
            type: "panel",
            tracks: [
              "fintech_innovations",
              "microservices",
              "it_certifications",
              "cybersecurity_panel"
            ]
          },
          {
            time: "14:15 - 14:30",
            title: "networking_break",
            type: "break",
          },
          {
            time: "14:30 - 15:15",
            title: "fireside_health",
            type: "session",
            speaker: "Aaron Winkler, Ainsley | Moderator: Industry journalist or analyst TBD",
          },
          {
            time: "14:30 - 15:15",
            title: "fireside_telecom",
            type: "session",
            speaker: "Congolese, Alberto",
          },
          {
            time: "15:15 - 15:30",
            title: "break_afternoon",
            type: "break",
          },
          {
            time: "15:30 - 16:15",
            title: "panel_sessions",
            type: "panel",
            tracks: [
              "digital_nation_security",
              "agritech",
              "cyber_panel",
              "large_scale_training"
            ]
          },
          {
            time: "16:15 - 17:30",
            title: "exhibit_tour",
            type: "networking",
          },
        ],
      },
      {
        day: "day3",
        date: "",
        events: [
          {
            time: "08:00 - 09:30",
            title: "innovation_keynote",
            type: "keynote",
            speaker: "Benjamin Katabuka (KoBold)",
          },
          {
            time: "09:30 - 09:48",
            title: "mining_analytics",
            type: "session",
            speaker: "Prof Nzuru (Ivanoe)",
          },
          {
            time: "09:48 - 10:06",
            title: "health_telemedicine",
            type: "session",
            speaker: "Sabune Turner",
          },
          {
            time: "10:06 - 10:24",
            title: "banking_digital",
            type: "session",
            speaker: "Ainsley Rattray",
          },
          {
            time: "10:24 - 10:42",
            title: "smart_cities",
            type: "session",
            speaker: "Wilmot Gibson",
          },
          {
            time: "10:42 - 11:00",
            title: "telecom_5g",
            type: "session",
            speaker: "Omar Fahnbullah",
          },
          {
            time: "11:00 - 11:15",
            title: "networking_break",
            type: "break",
          },
          {
            time: "11:15 - 12:00",
            title: "collaboration_workshop",
            type: "workshop",
            speaker: "Eragy Bashonga Alpha",
          },
          {
            time: "12:00 - 12:45",
            title: "policy_discussion",
            type: "workshop",
            speaker: "TBD",
          },
          {
            time: "13:00 - 13:45",
            title: "networking_lunch",
            type: "networking",
          },
          {
            time: "13:00 - 13:45",
            title: "leadership_panel",
            type: "panel",
            speaker: "Barry Williams, Pankaj Chugh",
          },
          {
            time: "13:00 - 13:45",
            title: "mining_panel",
            type: "panel",
            speaker: "Prof Nzuru (Ivanoe) | Moderator: Wilmot Gibson",
          },
          {
            time: "13:00 - 13:45",
            title: "cybersecurity_workshop",
            type: "workshop",
          },
          {
            time: "15:45 - 17:00",
            title: "expo_open",
            type: "networking",
          },
        ],
      },
    ];

    const getEventIcon = (type) => {
      const icons = {
        keynote: <Mic className="w-4 h-4" />,
        panel: <Users className="w-4 h-4" />,
        workshop: <Cpu className="w-4 h-4" />,
        networking: <Coffee className="w-4 h-4" />,
        break: <Coffee className="w-4 h-4" />,
        closing: <Award className="w-4 h-4" />,
        session: <Cpu className="w-4 h-4" />,
      };
      return icons[type] || <Clock className="w-4 h-4" />;
    };

    const getEventColor = (type) => {
      const colors = {
        keynote: "bg-blue-500",
        panel: "bg-purple-500",
        workshop: "bg-green-500",
        networking: "bg-orange-500",
        break: "bg-gray-500",
        closing: "bg-yellow-500",
        session: "bg-indigo-500",
      };
      return colors[type] || "bg-gray-500";
    };

    return (
      <section id="program" className={`py-12 sm:py-16 md:py-20 ${colors.bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${colors.textBright}`}
            >
              {t.program.title}
            </h2>
            <div className={`w-16 sm:w-20 md:w-24 h-1 ${colors.accentBg} mx-auto mb-4 sm:mb-6`}></div>
            <p
              className={`text-base sm:text-lg md:text-xl ${colors.text} max-w-3xl mx-auto leading-relaxed px-4`}
            >
              {t.program.subtitle}
            </p>
          </div>

          {/* Program Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
            {schedule.map((day, dayIndex) => (
              <div key={dayIndex} className="group">
                {/* Day Card */}
                <div
                  className={`${colors.card} rounded-xl sm:rounded-2xl border ${colors.divider} hover:border-[#00FFFF] transition-all duration-300 hover:shadow-xl overflow-hidden`}
                >
                  {/* Day Header - Cliquable */}
                  <button
                    onClick={() => toggleDay(dayIndex)}
                    className="w-full p-4 sm:p-5 md:p-6 text-center hover:bg-black/20 transition-all duration-200 focus:outline-none touch-manipulation"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colors.accentBg} text-black font-bold text-base sm:text-lg mb-2 sm:mb-3`}
                    >
                      {dayIndex + 1}
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-bold ${colors.textBright} mb-1 sm:mb-2`}
                    >
                      {t.program.days[day.day]}
                    </h3>
                    <p className={`text-xs sm:text-sm ${colors.text} opacity-80 mb-2 sm:mb-3`}>
                      {day.date}
                    </p>
                    
                    {/* Chevron indicator */}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.accent} transition-transform duration-300 ${
                          openDays[dayIndex] ? 'transform rotate-180' : ''
                        }`}
                      />
                      <span className={`ml-2 text-xs sm:text-sm ${colors.accent} font-medium`}>
                        {openDays[dayIndex] ? t.program.hideSchedule : t.program.viewSchedule}
                      </span>
                    </div>
                  </button>

                  {/* Timeline - Collapsible */}
                  {openDays[dayIndex] && (
                    <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6 space-y-2 sm:space-y-3 animate-in slide-in-from-top-2 duration-300">
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${colors.divider} hover:border-[#00FFFF] transition-all duration-200 backdrop-blur-sm bg-black/20`}
                      >
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          {/* Icon */}
                          <div
                            className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${getEventColor(
                              event.type
                            )} text-white flex-shrink-0`}
                          >
                            <div className="w-3 h-3 sm:w-4 sm:h-4">
                              {getEventIcon(event.type)}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs font-semibold ${colors.accent} mb-1`}
                            >
                              {event.time}
                            </p>
                            <h4
                              className={`text-xs sm:text-sm font-bold ${colors.textBright} mb-1 leading-tight`}
                            >
                              {t.program.events[event.title]}
                            </h4>
                            {event.speaker && (
                              <p
                                className={`text-xs ${colors.text} opacity-80 leading-tight`}
                              >
                                {event.speaker}
                              </p>
                            )}
                            {event.tracks && (
                              <div className="mt-1 sm:mt-2">
                                {event.tracks.map((track, index) => (
                                  <p
                                    key={index}
                                    className={`text-xs ${colors.text} opacity-70 leading-tight mt-1`}
                                  >
                                    • {t.program.tracks[track]}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className={`${colors.card} p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border ${colors.divider}`}
          >
            <h4
              className={`text-lg sm:text-xl font-bold ${colors.textBright} mb-4 sm:mb-6 text-center`}
            >
              {t.program.eventLegend}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {[
                { type: "keynote", label: t.program.eventTypes.keynote, color: "bg-blue-500" },
                { type: "panel", label: t.program.eventTypes.panel, color: "bg-purple-500" },
                { type: "workshop", label: t.program.eventTypes.workshop, color: "bg-green-500" },
                { type: "session", label: t.program.eventTypes.session, color: "bg-indigo-500" },
                {
                  type: "networking",
                  label: t.program.eventTypes.networking,
                  color: "bg-orange-500",
                },
                { type: "break", label: t.program.eventTypes.break, color: "bg-gray-500" },
                { type: "closing", label: t.program.eventTypes.closing, color: "bg-yellow-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center sm:justify-start"
                >
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${item.color} mr-2 sm:mr-3 flex-shrink-0`}></div>
                  <span className={`text-xs sm:text-sm ${colors.text}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
            <a
              href="/conf_schedule.xlsx"
              download="Digital-Nation-2030-Conference-Schedule.xlsx"
              className={`${colors.accentBg} text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:scale-105 transition-transform ${colors.hoverGlow} inline-block w-full sm:w-auto text-center touch-manipulation`}
            >
              {t.program.downloadProgram}
            </a>
          </div>
        </div>
      </section>
    );
  };

  // Composant Sponsors
  const SponsorsSection = () => {
    // Liste des sponsors avec leurs vrais logos
    const sponsors = [
      {
        name: "Africell",
        tier: "Platinum",
        logo: "logo_africell.png", // Placeholder, replace with actual logo URL
        url: "https://www.africell.com",
      },

      {
        name: "Banque Centrale du Congo",
        tier: "Platinum",
        logo: "bcc.png", // Placeholder, replace with actual logo URL
        url: "https://www.bcc.cd",
      },

      /*  {
      name: "Visa",
      tier: "Platinum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      url: "https://www.visa.com"
    }, */
      /*  {
      name: "MTN",
      tier: "Platinum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/MTN_Logo.svg/1280px-MTN_Logo.svg.png",
      url: "https://www.mtn.com"
    }, */
      /* {
      name: "Orange",
      tier: "Gold",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1280px-Orange_logo.svg.png",
      url: "https://www.orange.com"
    },
    {
      name: "Microsoft",
      tier: "Gold",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png",
      url: "https://www.microsoft.com"
    },
    {
      name: "Airtel",
      tier: "Silver",
      logo: "logo_airtel.png", // Placeholder, replace with actual logo URL
      url: "https://www.airtel.com"
    }, */
      /* ,
    {
      name: "Ecobank",
      tier: "Silver",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ecobank_logo.svg/1280px-Ecobank_logo.svg.png",
      url: "https://www.ecobank.com"
    } */
    ];

    return (
      <section className={`py-20 ${colors.bg}`} id="sponsors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${colors.textBright}`}>
              {t.sponsors.title}
            </h2>
            <div className={`w-20 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
            <p className={`text-xl ${colors.text} max-w-3xl mx-auto`}>
              {t.sponsors.subtitle}
            </p>
          </div>

          {/* Organisateur Principal */}
          <div className="text-center mb-20">
            <h3 className={`text-3xl font-bold mb-8 ${colors.textBright}`}>
              {t.sponsors.organizedBy}
            </h3>
            <div className="flex justify-center">
              <div className={`${colors.card} p-8 rounded-2xl border-2 ${colors.accentBorder} bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-2xl max-w-md`}>
                <img
                  src="/logo-SS4D.png"
                  alt="SS4D - Organisateur Principal"
                  className="h-20 w-auto mx-auto mb-4 filter brightness-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/200x80?text=SS4D";
                  }}
                />
                {/* <h4 className={`text-xl font-bold ${colors.accent} mb-2`}>
                  SS4D
                </h4> */}
                <p className={`text-sm ${colors.text} opacity-80`}>
                  {t.sponsors.organizerDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {["Platinum", "Gold", "Silver"].map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;

              return (
                <div key={tier} className="text-center">
                  <h3
                    className={`text-2xl font-bold mb-12 ${colors.textBright} uppercase tracking-wider`}
                  >
                    {tier === "Platinum" ? t.sponsors.platinumSponsors : 
                     tier === "Gold" ? t.sponsors.goldSponsors :
                     t.sponsors.silverSponsors}
                  </h3>
                  <div className="flex flex-wrap justify-center items-center gap-12">
                    {tierSponsors.map((sponsor, index) => (
                      <a
                        key={index}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-4 transition-all duration-300 hover:scale-105 ${colors.hoverGlow}`}
                      >
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className={`
                          ${
                            tier === "Platinum"
                              ? "h-24"
                              : tier === "Gold"
                              ? "h-20"
                              : "h-16"
                          } 
                          w-auto max-w-[200px] object-contain filter grayscale group-hover:grayscale-0
                          transition-all duration-500
                        `}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/200x80?text=" +
                              sponsor.name;
                          }}
                        />
                        <p
                          className={`mt-2 text-sm ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                        >
                          {sponsor.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Devenir Sponsor */}
          {/* <div className={`mt-20 p-8 rounded-xl ${colors.card} border ${colors.divider} text-center`}>
          <h3 className={`text-2xl font-bold mb-4 ${colors.textBright}`}>
            Want to become a sponsor?
          </h3>
          <p className={`${colors.text} max-w-2xl mx-auto mb-6`}>
            Join industry leaders in supporting Africa's premier digital transformation event.
          </p>
          <button className={`${colors.accentBg} text-black px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all ${colors.hoverGlow}`}>
            CONTACT OUR PARTNERSHIP TEAM
          </button>
        </div> */}
        </div>
      </section>
    );
  };

  // Composant Location
  const LocationSection = () => (
    <section id="location" className={`py-20 ${colors.card}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${colors.textBright}`}>
            {t.location.title}
          </h2>
          <div className={`w-20 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
          <p className={`text-xl ${colors.text} max-w-3xl mx-auto`}>
            {t.location.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className={`text-2xl font-bold mb-6 ${colors.textBright}`}>
              Pullman Kinshasa
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className={`w-5 h-5 mr-3 ${colors.accent} mt-1`} />
                <div>
                  <p className={colors.text}>Avenue du Port No. 1</p>
                  <p className={colors.text}>Gombe, Kinshasa</p>
                  <p className={colors.text}>Democratic Republic of Congo</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className={`w-5 h-5 mr-3 ${colors.accent} mt-1`} />
                <div>
                  <p className={colors.text}>{t.hero.date}</p>
                  <p className={`text-sm ${colors.text} opacity-80`}>
                    8:00 AM - 6:00 PM daily
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Wifi className={`w-5 h-5 mr-3 ${colors.accent} mt-1`} />
                <div>
                  <p className={colors.text}>
                    State-of-the-art conference facilities
                  </p>
                  <p className={colors.text}>
                    High-speed WiFi & modern amenities
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Pullman+Kinshasa+Gombe"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colors.accentBg} text-black px-6 py-3 rounded-lg font-bold ${colors.hoverGlow} transition-all flex items-center`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {t.location.getDirections}
              </a>
              {/* <a
              href="https://www.accorhotels.com/hotel/B79-pullman-kinshasa/index.en.shtml"
              target="_blank"
              rel="noopener noreferrer"
              className={`border-2 ${colors.accentBorder} ${colors.accent} px-6 py-3 rounded-lg font-bold hover:${colors.accentBg} hover:text-black transition-all flex items-center`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              VISIT WEBSITE
            </a> */}
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className="h-96 rounded-xl overflow-hidden border-2 border-[#333333] shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.456789012345!2d15.298765432109!3d-4.305678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3123456789ab%3A0x1a0d3b9a3a3b5a9a7!2sPullman%20Kinshasa!5e0!3m2!1sfr!2scd!4v1620000000000!5m2!1sfr!2scd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="opacity-90 hover:opacity-100 transition-opacity"
              title="Pullman Kinshasa Conference Location"
            ></iframe>
          </div>
        </div>

        {/* Informations pratiques */}
        {/* <div className={`mt-16 p-8 rounded-xl ${colors.bg} border ${colors.divider} text-center`}>
        <h3 className={`text-2xl font-bold ${colors.textBright} mb-6`}>
          CONFERENCE VENUE FEATURES
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className={`w-12 h-12 ${colors.accentBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <ScreenShare className="w-6 h-6 text-black" />
            </div>
            <p className={colors.text}>Modern AV Equipment</p>
          </div>
          <div>
            <div className={`w-12 h-12 ${colors.accentBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Users className="w-6 h-6 text-black" />
            </div>
            <p className={colors.text}>1000+ Capacity</p>
          </div>
          <div>
            <div className={`w-12 h-12 ${colors.accentBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Coffee className="w-6 h-6 text-black" />
            </div>
            <p className={colors.text}>Catering Services</p>
          </div>
          <div>
            <div className={`w-12 h-12 ${colors.accentBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Shield className="w-6 h-6 text-black" />
            </div>
            <p className={colors.text}>Secure Environment</p>
          </div>
        </div>
      </div> */}
      </div>
    </section>
  );
  // Composant Register
  const RegisterSection = () => {
    const [selectedTier, setSelectedTier] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("mobile");
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
      amount: "150",
      reference: `REF_${Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()}`,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [transactionData, setTransactionData] = useState(null);

    const tiers = [
      {
        name: "standard",
        price: "$150",
        amount: "150",
        features: t.register.tiers.standard.features,
        displayName: t.register.tiers.standard.name,
      },
      {
        name: "premium",
        price: "$250",
        amount: "250",
        features: t.register.tiers.premium.features,
        displayName: t.register.tiers.premium.name,
        popular: true,
      },
      {
        name: "student",
        price: "$50",
        amount: "50",
        features: t.register.tiers.student.features,
        displayName: t.register.tiers.student.name,
      },
    ];

    async function downloadQRCodeWithLabel_viaCanvas(transactionID) {
      try {
        const qrSize = 300;
        const labelText = "SS4D Conference";
        const fontSize = 20;
        const labelPadding = 12; // espace autour du texte
        const textHeight = fontSize + labelPadding;

        // 1) créer un canvas temporaire et y dessiner le QR (QRCode.toCanvas écrit directement)
        const tmp = document.createElement("canvas");
        tmp.width = qrSize;
        tmp.height = qrSize;
        await new Promise((resolve, reject) => {
          QRCode.toCanvas(
            tmp,
            transactionID,
            {
              width: qrSize,
              margin: 2,
              color: { dark: "#000000", light: "#FFFFFF" },
            },
            (err) => (err ? reject(err) : resolve())
          );
        });

        // 2) créer canvas final en support HiDPI
        const scale = window.devicePixelRatio || 1;
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = qrSize * scale;
        finalCanvas.height = (qrSize + textHeight) * scale;
        finalCanvas.style.width = `${qrSize}px`;
        finalCanvas.style.height = `${qrSize + textHeight}px`;

        const ctx = finalCanvas.getContext("2d");
        ctx.scale(scale, scale);

        // fond blanc (important si fond transparent)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, qrSize, qrSize + textHeight);

        // dessiner le QR du canvas temporaire
        ctx.drawImage(tmp, 0, 0, qrSize, qrSize);

        // dessiner le texte centré en dessous
        ctx.fillStyle = "#000";
        ctx.font = `${fontSize}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labelText, qrSize / 2, qrSize + textHeight / 2);

        // exporter en blob et forcer téléchargement
        const blob = await new Promise((res) =>
          finalCanvas.toBlob(res, "image/png")
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `SS4D_QR_${transactionID}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Erreur génération QR (canvas):", err);
      }
    }

    const downloadButtonRef = useRef(null);

    useEffect(() => {
      if (paymentStatus === "success" && downloadButtonRef.current) {
        // Petit délai pour s'assurer que le bouton est rendu
        setTimeout(() => {
          downloadButtonRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      }
    }, [paymentStatus]);

    // Fonction pour générer et télécharger le QR code
    const downloadQRCode = async (transactionID) => {
      try {
        // Générer le QR code avec uniquement transactionID
        const qrData = transactionID;

        // Générer le QR code sous forme DataURL
        const qrUrl = await QRCode.toDataURL(qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        // Charger l'image QR dans un objet Image()
        const qrImage = new Image();
        qrImage.src = qrUrl;

        qrImage.onload = () => {
          const qrSize = 300;
          const textHeight = 40;

          // Créer un canvas pour fusionner QR + texte
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = qrSize;
          canvas.height = qrSize + textHeight;

          // Dessiner le QR
          ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);

          // Ajouter le texte en dessous
          ctx.font = "20px Arial";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.fillText("SS4D Conference", qrSize / 2, qrSize + 25);

          // Convertir en image PNG finale
          const finalUrl = canvas.toDataURL("image/png");

          // Créer un lien de téléchargement
          const link = document.createElement("a");
          link.download = `SS4D_QR_${transactionID}.png`;
          link.href = finalUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      } catch (err) {
        console.error("Erreur lors de la génération du QR code:", err);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleTierSelect = (tierName, amount) => {
      setSelectedTier(tierName);
      setFormData((prev) => ({
        ...prev,
        amount: amount,
      }));
    };

    const handlePayment = async (e) => {
      e.preventDefault();
      setIsProcessing(true);
      setPaymentStatus(null);

      // Fonction pour déterminer le PayType et formater le numéro de téléphone
      const getPayTypeAndFormatTelephone = (tel) => {
        let payType = null;
        let formattedTel = tel.replace(/[^0-9]/g, ""); // Supprime tout ce qui n'est pas un chiffre

        if (formattedTel.startsWith("0")) {
          formattedTel = "243" + formattedTel.substring(1);
        } else if (
          formattedTel.startsWith("243") &&
          formattedTel.length === 12
        ) {
          // Le numéro est déjà au bon format
        } else {
          // Gère d'autres formats non standard si nécessaire
          formattedTel = "243" + formattedTel; // Fallback par défaut
        }

        // Détection de l'opérateur en fonction des préfixes
        if (
          formattedTel.startsWith("24381") ||
          formattedTel.startsWith("24382") ||
          formattedTel.startsWith("24383") ||
          formattedTel.startsWith("24386")
        ) {
          payType = 2; // Vodacom
        } else if (
          formattedTel.startsWith("24397") ||
          formattedTel.startsWith("24399") ||
          formattedTel.startsWith("24398") ||
          formattedTel.startsWith("24396")
        ) {
          payType = 1; // Airtel
        } else if (
          formattedTel.startsWith("24385") ||
          formattedTel.startsWith("24389") ||
          formattedTel.startsWith("24384") ||
          formattedTel.startsWith("24380")
        ) {
          payType = 3; // Orange
        } else {
          // Fallback si l'opérateur n'est pas reconnu.
          // Vous pouvez choisir un PayType par défaut ou gérer une erreur.
          console.warn("Opérateur non reconnu pour le numéro :", formattedTel);
        }

        return { payType, formattedTel };
      };

      try {
        let endpoint, payload;

        if (paymentMethod === "mobile") {
          // Paiement Mobile Money
          const { payType, formattedTel } = getPayTypeAndFormatTelephone(
            formData.telephone
          );

          if (payType === null) {
            setPaymentStatus("error");
            console.error("Erreur : Opérateur mobile non reconnu.");
            setIsProcessing(false);
            return;
          }

          endpoint =
            "https://maxi-cash-proxy-sc2gs.ondigitalocean.app/pay/mobile";
          payload = {
            RequestData: {
              Amount: formData.amount,
              Reference: formData.reference,
              Telephone: formattedTel, // Utilise le numéro formaté
            },
            PayType: payType, // Utilise le PayType détecté
            CurrencyCode: "USD",
          };
        } else {
          // Paiement Carte Bancaire (pas de changement ici)
          endpoint =
            "https://maxi-cash-proxy-sc2gs.ondigitalocean.app/pay/card";
          payload = {
            PayType: "MaxiCash",
            Amount: formData.amount,
            Currency: "USD",
            Telephone: formData.telephone,
            Language: "en",
            Reference: formData.reference,
            SuccessURL: "https://www.drcdigitalnation.org/success",
            FailureURL: "https://www.drcdigitalnation.org/failure",
            CancelURL: "https://www.drcdigitalnation.org/cancel",
            NotifyURL: "https://www.drcdigitalnation.org/notify",
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Email: formData.email,
            cData: {
              cDate: "a",
              cNumber: "a",
              vCVV: "a",
            },
          };
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.ResponseStatus === "Success") {
          if (paymentMethod === "card" && data.ResponseData) {
            // Pour carte: NE PAS remettre isProcessing à false, la redirection va avoir lieu
            window.location.href = data.ResponseData;
            // On quitte la fonction, inutile de continuer
            return;
          } else {
            setPaymentStatus("success");
            setTransactionData(data);
            setIsProcessing(false); // Pour mobile, on arrête le processing
          }
        } else {
          setPaymentStatus("error");
          setIsProcessing(false);
          console.error("Payment error:", data);
        }
      } catch (error) {
        setPaymentStatus("error");
        setIsProcessing(false);
        console.error("Payment processing error:", error);
      }
    };

    // Fonction séparée pour gérer le clic sur le bouton de téléchargement
    const handleDownloadQRCode = (e) => {
      e.preventDefault(); // Empêche la soumission du formulaire
      if (transactionData && transactionData.TransactionID) {
        //downloadQRCode(transactionData.TransactionID);
        downloadQRCodeWithLabel_viaCanvas(transactionData.TransactionID);
      }
    };

    return (
      <section id="register" className={`py-20 ${colors.bg}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${colors.textBright}`}
            >
              {t.register.detailsTitle}
            </h2>
            <p className={`${colors.text} max-w-2xl mx-auto`}>
              Choose your registration tier and secure your spot
            </p>
          </div>

          {/* Sélection du forfait */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`${colors.card} p-6 rounded-xl border ${
                  selectedTier === tier.name
                    ? colors.accentBorder
                    : colors.divider
                } ${
                  tier.popular ? "transform md:scale-105" : ""
                } cursor-pointer transition-all`}
                onClick={() => handleTierSelect(tier.name, tier.amount)}
              >
                {tier.popular && (
                  <div
                    className={`${colors.accentBg} text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4`}
                  >
                    {t.register.badges.mostPopular}
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${colors.textBright}`}>
                  {tier.displayName}
                </h3>
                <p className={`text-3xl font-bold mb-6 ${colors.accent}`}>
                  {tier.price}
                </p>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className={`flex items-center ${colors.text}`}>
                      <Check className={`w-4 h-4 mr-2 ${colors.accent}`} />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>

                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedTier === tier.name
                      ? colors.accentBg + " border-transparent"
                      : colors.divider
                  } flex items-center justify-center mx-auto`}
                >
                  {selectedTier === tier.name && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire de paiement */}
          <div
            className={`${colors.card} p-8 rounded-xl border ${colors.divider}`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${colors.textBright}`}>
              Registration Details
            </h3>

            <form onSubmit={handlePayment}>
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${colors.text}`}
                  >
                    {t.register.form.firstName}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${colors.divider} ${colors.bg} ${colors.text} focus:${colors.accentBorder} focus:outline-none`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${colors.text}`}
                  >
                    {t.register.form.lastName}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${colors.divider} ${colors.bg} ${colors.text} focus:${colors.accentBorder} focus:outline-none`}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-2 ${colors.text}`}
                >
                  {t.register.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${colors.divider} ${colors.bg} ${colors.text} focus:${colors.accentBorder} focus:outline-none`}
                />
              </div>

              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-2 ${colors.text}`}
                >
                  {t.register.form.phone}
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  placeholder="243850292020"
                  className={`w-full px-4 py-3 rounded-lg border ${colors.divider} ${colors.bg} ${colors.text} focus:${colors.accentBorder} focus:outline-none`}
                />
              </div>

              {/* Méthode de paiement */}
              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-4 ${colors.text}`}
                >
                  {t.register.form.paymentMethod}
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      paymentMethod === "mobile"
                        ? `${colors.accentBg} text-black`
                        : `border ${colors.divider} ${colors.text}`
                    }`}
                  >
                    {t.register.form.mobileMoney}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      paymentMethod === "card"
                        ? `${colors.accentBg} text-black`
                        : `border ${colors.divider} ${colors.text}`
                    }`}
                  >
                    {t.register.form.creditCard}
                  </button>
                </div>
              </div>

              {/* Détails de la carte (affichés seulement si carte sélectionnée) */}
              {paymentMethod === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"></div>
              )}

              {/* Montant et référence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${colors.text}`}
                  >
                    {t.register.form.amount}
                  </label>
                  <input
                    type="text"
                    value={`$${formData.amount}`}
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border ${colors.divider} ${colors.bg} ${colors.text} opacity-70`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${colors.text}`}
                  >
                    {t.register.form.reference}
                  </label>
                  <input
                    type="text"
                    value={formData.reference}
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border ${colors.divider} ${colors.bg} ${colors.text} opacity-70`}
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-lg font-bold text-lg ${
                  isProcessing
                    ? "bg-gray-500 cursor-not-allowed"
                    : `${colors.accentBg} text-black hover:bg-opacity-90 ${colors.hoverGlow}`
                } transition-all flex items-center justify-center`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.register.buttons.processing}
                  </>
                ) : (
                  `${t.register.buttons.payNow} - $${formData.amount}`
                )}
              </button>

              {/* Message de statut */}
              {paymentStatus === "success" && (
                <div className="mt-4">
                  <div
                    className={`p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-300 mb-4`}
                  >
                    {t.register.messages.success}
                  </div>
                  {transactionData && transactionData.TransactionID && (
                    <div className="text-center" ref={downloadButtonRef}>
                      <p className={`${colors.text} mb-2`}>
                        {t.register.messages.accessId} {transactionData.TransactionID}
                      </p>
                      <button
                        type="button" // Important: type="button" pour éviter de soumettre le formulaire
                        onClick={handleDownloadQRCode}
                        className={`px-4 py-2 rounded-lg ${colors.accentBg} text-black font-medium`}
                      >
                        {t.register.buttons.downloadQR}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {paymentStatus === "error" && (
                <div
                  className={`mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500 text-red-300`}
                >
                  {t.register.messages.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    );
  };

  const SpeakerDetailWrapper = () => {
    return (
      <div className="min-h-screen bg-[#1A1A1A] w-full overflow-x-hidden">
        <Navbar />
        <SpeakerDetail />
      </div>
    );
  };

  // Composant de détail du speaker
  // tout en haut du fichier (hors composant) :
  const SpeakerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const colors = {
      bg: "bg-[#1A1A1A]",
      card: "bg-[#252525]",
      text: "text-[#E0E0E0]",
      textBright: "text-[#FFFFFF]",
      accent: "text-[#00FFFF]",
      accentBg: "bg-[#00FFFF]",
      accentBorder: "border-[#00FFFF]",
      divider: "border-[#333333]",
      hoverGlow: "hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]",
    };

    // ✅ Search through all speaker arrays
    const speaker = React.useMemo(() => {
      const allSpeakers = [
        ...speakers,
        ...speakersExecutif,
        ...congoleseVisionnary
      ];
      return allSpeakers.find((s) => s.id === Number(id)) || null;
    }, [id]);

    if (!speaker) {
      return (
        <div className="min-h-screen flex items-center justify-center w-full bg-[#1A1A1A] px-4">
          <div className="text-center">
            <p className="text-white text-xl">Speaker not found</p>
            <Link
              to="/"
              className="text-[#00FFFF] hover:underline mt-4 inline-block"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${colors.bg} w-full overflow-x-clip`}>
        <div className="w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <button
              onClick={() => navigate('/#speakers')}
              className="inline-flex items-center text-[#00FFFF] mb-8 hover:underline"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to speakers
            </button>

            <div
              className={`${colors.card} p-6 md:p-8 rounded-xl border ${colors.divider}`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar + réseaux */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#00FFFF] block"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />

                  <div className="flex justify-center mt-4 space-x-4">
                    {speaker?.social?.twitter && (
                      <a
                        href={speaker.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${colors.text} hover:${colors.accent} transition-colors`}
                      >
                        <Twitter className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                    )}
                    {speaker?.social?.linkedin && (
                      <a
                        href={speaker.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${colors.text} hover:${colors.accent} transition-colors`}
                      >
                        <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Texte */}
                <div className="flex-1 min-w-0">
                  <h1
                    className={`text-2xl md:text-3xl font-bold ${colors.textBright} mb-2 break-words`}
                  >
                    {speaker.name}
                  </h1>
                  <p
                    className={`${colors.accent} text-base md:text-lg mb-4 break-words`}
                  >
                    {speaker.title}
                  </p>
                  {speaker.topic && (
                    <p
                      className={`text-lg md:text-xl italic mb-6 ${colors.text} break-words`}
                    >
                      "{speaker.topic}"
                    </p>
                  )}

                  <div className="prose prose-invert max-w-none break-words">
                    <p
                      className={`${colors.text} whitespace-pre-line text-sm md:text-base`}
                    >
                      {translateBio(speaker)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /Carte de détail */}
          </div>
        </div>
      </div>
    );
  };

  // Composant Footer
  const Footer = () => (
    <footer className={`py-12 ${colors.card} border-t ${colors.divider}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className={`text-xl font-bold ${colors.textBright} mb-6 block`}>
              {t.footer.title}
            </span>
            <p className={`text-sm ${colors.text} mb-6`}>
              {t.footer.description}
            </p>
            
            {/* Section Organisé par */}
            <div className="mt-6">
              <p className={`text-sm font-semibold ${colors.accent} mb-3`}>
                {t.footer.organizedBy}
              </p>
              <div className="flex items-center">
                <img 
                  src="/logo-SS4D.png" 
                  alt="SS4D Logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    // Fallback to CPU icon if image fails to load
                    const fallback = document.createElement('div');
                    fallback.className = `h-12 w-12 ${colors.accent} flex items-center justify-center border border-current rounded`;
                    fallback.innerHTML = '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path></svg>';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className={`font-bold ${colors.textBright} mb-4`}>
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {Object.entries(t.footer.links).map(([key, value]) => (
                <li key={key}>
                  <a
                    href={`#${key === 'venue' ? 'location' : key === 'home' ? '' : key}`}
                    className={`text-sm ${colors.text} hover:${colors.accent} transition-colors cursor-pointer`}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = key === 'venue' ? 'location' : key === 'home' ? 'home' : key;
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`font-bold ${colors.textBright} mb-4`}>{t.footer.contact}</h3>
            <ul className={`space-y-2 text-sm ${colors.text}`}>
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-0.5" />
                contact@ss4d.org
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />8 bis Avenue
                Marinelle, Kinshasa
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`font-bold ${colors.textBright} mb-4`}>{t.footer.followUs}</h3>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`${colors.text} hover:${colors.accent} transition-colors`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`pt-8 text-center text-sm ${colors.text}`}
        >
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/speaker/:id" element={<SpeakerDetailWrapper />} />
        <Route path="/success" element={<PaymentStatus type="success" />} />
        <Route path="/failure" element={<PaymentStatus type="failure" />} />
        <Route path="/cancel" element={<PaymentStatus type="cancel" />} />
        <Route path="/notify" element={<PaymentStatus type="notify" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      
      {/* Speaker Modal */}
      <SpeakerModal 
        speaker={selectedSpeaker} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSpeaker(null);
        }} 
      />
      
      {/* Vercel Analytics */}
      <Analytics />
    </Router>
  );

  /* return (
    <div className={`${colors.bg} ${colors.text} min-h-screen`}>
      <Navbar />
      <main>
        <HeroSection />
        <SpeakersSection />
        <ProgramSection />
        <SponsorsSection />
        <LocationSection />
        <RegisterSection />
      </main>
      <Footer />
    </div>
  ); */
};

export default DigitalNation2030;
