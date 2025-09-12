import React, { useState, useEffect } from 'react';

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
  useParams
} from 'react-router-dom';

import { 
  Menu, X, ArrowRight, ArrowLeft, ChevronDown, Check,
  Calendar, MapPin, Users, Mic, Twitter, 
  Linkedin, Youtube, Star, Award, Cpu, Shield, Server, Wifi, Mail, Coffee, Clock, Phone, Hotel, Truck, Train, Car, ExternalLink, ScreenShare
} from 'lucide-react';

import speakers from "/src/data/speakers.js"; // PAS d’accolades ici




const DigitalNation2030 = () => {

  
  // Palette de couleurs
  const colors = {
    bg: 'bg-[#1A1A1A]',
    card: 'bg-[#252525]',
    text: 'text-[#E0E0E0]',
    textBright: 'text-[#FFFFFF]',
    accent: 'text-[#00FFFF]',
    accentBg: 'bg-[#00FFFF]',
    accentBorder: 'border-[#00FFFF]',
    divider: 'border-[#333333]',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]'
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

  // Programme de la conférence
  const schedule = [
    {
      day: "November 11, 2025",
      events: [
        { time: "08:00 - 09:00", title: "Registration & Breakfast", icon: <Users className="w-5 h-5" /> },
        { time: "09:00 - 10:30", title: "Opening Ceremony", icon: <Award className="w-5 h-5" /> },
        { time: "10:30 - 12:00", title: "Keynote: Africa's Digital Future", icon: <Star className="w-5 h-5" /> }
      ]
    },
    {
      day: "November 12, 2025",
      events: [
        { time: "08:30 - 10:00", title: "Panel: Cybersecurity in Africa", icon: <Shield className="w-5 h-5" /> },
        { time: "10:30 - 12:00", title: "Technical Workshops", icon: <Cpu className="w-5 h-5" /> },
        { time: "14:00 - 15:30", title: "Roundtable: E-Government", icon: <Server className="w-5 h-5" /> }
      ]
    },
    {
      day: "November 13, 2025",
      events: [
        { time: "09:00 - 10:30", title: "Startup Presentations", icon: <Wifi className="w-5 h-5" /> },
        { time: "11:00 - 12:30", title: "Closing Ceremony", icon: <Award className="w-5 h-5" /> }
      ]
    }
  ];

  // Sponsors
  const sponsors = [
    { name: "Google", tier: "Platinum", logo: "/google-logo.png" },
    { name: "MTN", tier: "Gold", logo: "/mtn-logo.png" },
    { name: "Orange", tier: "Gold", logo: "/orange-logo.png" }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  // Composant Navbar
 
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "home" },
    { id: "speakers", label: "speakers" },
    { id: "program", label: "program" },
    { id: "sponsors", label: "sponsors" },
    { id: "location", label: "location" },
    { id: "register", label: "register" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
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
    <nav className="fixed w-full z-50 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          
            <div className="flex items-center space-x-3">
              <Cpu className="h-6 w-6 text-white" />
              <span className="text-2xl font-bold text-white">
                digital nation 2030
              </span>
            </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-bold text-white cursor-pointer transition-colors ${
                  activeSection === item.id ? "text-cyan-400" : "hover:text-cyan-300"
                }`}
              >
                {capitalizeFirstLetter(item.label)}
              </div>
            ))}
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <Menu className="h-8 w-8 text-white" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black">
            <div className="flex flex-col space-y-4 px-4 py-6">
              {navItems.map((item) => (
                <div
                  key={`mobile-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-bold text-white py-2 cursor-pointer ${
                    activeSection === item.id ? "text-cyan-400" : "hover:text-cyan-300"
                  }`}
                >
                  {capitalizeFirstLetter(item.label)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomePage = () => {
  const colors = {
    bg: 'bg-[#1A1A1A]',
    card: 'bg-[#252525]',
    text: 'text-[#E0E0E0]',
    textBright: 'text-[#FFFFFF]',
    accent: 'text-[#00FFFF]',
    accentBg: 'bg-[#00FFFF]',
    accentBorder: 'border-[#00FFFF]',
    divider: 'border-[#333333]',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]'
  };

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
  const [currentMedia, setCurrentMedia] = useState(0);
  
  const mediaItems = [
    {
      type: 'video',
      src: 'landing_media.mp4',
      alt: 'Conference venue',
      text: "Digital Transformation for a Secure and Modern Future"


    },
    {
      type: 'image',
      src: 'hero_leaders.jpeg',
      alt: 'Modern technology',
      text: "In Kinshasa, the annual summit where global leaders meet to forge a secure and modern digital future."
    },
    /* {
      type: 'video', 
      src: 'woman_tech.mov',
      alt: 'Kinshasa skyline'
    }, */
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMedia((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Media défilant */}
      <div className="absolute inset-0">
        {mediaItems.map((item, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentMedia ? 'opacity-100' : 'opacity-0'}`}
          >
            {item.type === 'image' ? (
              <img 
                src={item.src} 
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Badge de date */}
          <div className={`mb-8 ${colors.card} ${colors.text} px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${colors.accentBorder} ${colors.hoverGlow} transform transition-all hover:scale-105`}>
            November 11-13, 2025 • Kinshasa, DRC
          </div>

          {/* Sous-titre dynamique */}
          <p className={`text-xl md:text-2xl ${colors.text} max-w-3xl mx-auto mb-10 transition-opacity duration-500`}>
            <span className={colors.accent}>DIGITAL</span> NATION 2030
            
          </p>

          {/* Titre principal */}
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${colors.textBright} leading-tight`}>
            {mediaItems[currentMedia].text}

          </h1>

          

          

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
            <button
              type="button"
              className={`
                appearance-none
                !bg-[#00FFFF] !text-white
                hover:!bg-[#00FFFF] focus:!bg-[#00FFFF] active:!bg-[#00FFFF] disabled:!bg-[#00FFFF]
                hover:!text-white focus:!text-white active:!text-white disabled:!text-white
                px-8 py-4 rounded-lg font-bold text-lg ${colors.hoverGlow}
                transition-all hover:scale-105
              `}
              style={{ backgroundColor: '#00FFFF', background: '#00FFFF', color: '#FFFFFF' }}
            >
              REGISTER NOW
            </button>
            
            <button
            type="button"
            className={`
              appearance-none border-2 ${colors.accentBorder} ${colors.accent}
              px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105
              !bg-black hover:!bg-black focus:!bg-black active:!bg-black disabled:!bg-black
              `}
              style={{ backgroundColor: '#000', background: '#000' }}
            >
              VIEW PROGRAM
            </button>

          </div>
        </div>
      </div>

      {/* Dégradé en bas */}
      <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent z-20`}></div>
    </section>
  );
};

// En haut du fichier (hors composant) :
// import { speakers } from "./data/speakers"; // ajuste le chemin

const SpeakersSection = () => {
  // Couleurs
  const colors = {
    bg: 'bg-[#1A1A1A]',
    card: 'bg-[#252525]',
    text: 'text-[#E0E0E0]',
    textBright: 'text-[#FFFFFF]',
    accent: 'text-[#00FFFF]',
    accentBg: 'bg-[#00FFFF]',
    accentBorder: 'border-[#00FFFF]',
    divider: 'border-[#333333]',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]'
  };

  // État
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Charger plus
  const loadMoreSpeakers = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 4, speakers.length));
      setIsLoading(false);
    }, 300);
  };

  // Garde-fou si l'import est vide
  const hasSpeakers = Array.isArray(speakers) && speakers.length > 0;

  return (
    <section className={`py-20 ${colors.bg}`} id="speakers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${colors.textBright}`}>
            FEATURED <span className={colors.accent}>SPEAKERS</span>
          </h2>
          <div className={`w-20 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
          <p className={`text-xl ${colors.text} max-w-3xl mx-auto`}>
            World-class experts sharing insights on digital transformation
          </p>
        </div>

        {!hasSpeakers ? (
          <div className="text-center text-gray-400">No speakers available.</div>
        ) : isLoading && visibleCount === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FFFF]"></div>
          </div>
        ) : (
          <>
            {/* Grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {speakers.slice(0, visibleCount).map((speaker) => (
                <div
                  key={speaker.id}
                  className={`${colors.card} p-6 rounded-xl border ${colors.divider} transition-all duration-300 hover:${colors.accentBorder} ${colors.hoverGlow}`}
                >
                  <div className="flex flex-col items-center">
                    {/* Avatar */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white bg-white">
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }}
                      />
                    </div>

                    {/* Nom & titre */}
                    <h3 className={`text-xl font-bold ${colors.textBright} text-center`}>
                      {speaker.name}
                    </h3>
                    <p className={`${colors.accent} text-sm text-center mb-2`}>
                      {speaker.title}
                    </p>
                    <p className={`${colors.text} text-sm text-center italic mb-3`}>
                      "{speaker.topic}"
                    </p>

                    {/* Lien détail */}
                    <Link
                      to={`/speaker/${speaker.id}`}
                      className={`
                        flex items-center text-sm font-medium mb-3 appearance-none
                        !bg-black !text-[#00FFFF]
                        hover:!bg-black focus:!bg-black active:!bg-black disabled:!bg-black
                        hover:!text-[#00FFFF] focus:!text-[#00FFFF] active:!text-[#00FFFF] disabled:!text-[#00FFFF]
                        border-2 border-transparent hover:!border-[#00FFFF]
                        px-4 py-2 rounded-md transition-all
                      `}
                    >
                      <ArrowRight className="w-4 h-4 mr-1" />
                      More details
                    </Link>

                    {/* Réseaux sociaux (avec fallback) */}
                    <div className="flex justify-center space-x-4">
                      {speaker?.social?.twitter && (
                        <a
                          href={speaker.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${colors.text} hover:${colors.accent} transition-colors`}
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {speaker?.social?.linkedin && (
                        <a
                          href={speaker.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${colors.text} hover:${colors.accent} transition-colors`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton Load More */}
            {visibleCount < speakers.length && (
              <div className="text-center">
                <button
                  onClick={loadMoreSpeakers}
                  disabled={isLoading}
                  className={`
                    appearance-none
                    px-6 py-2 rounded-lg font-medium
                    !bg-[#00FFFF] !text-white
                    transition-all duration-200 ease-out
                    hover:scale-105 active:scale-100
                    shadow-lg hover:shadow-[0_0_18px_#00FFFF]
                    border-2 border-transparent hover:!border-transparent active:!border-transparent
                    outline-none focus:outline-none focus-visible:outline-none
                    ring-0 focus:ring-0 focus-visible:ring-0
                    ${isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}
                  `}
                  style={{ backgroundColor: '#00FFFF', color: '#FFFFFF' }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    `Load More Speakers (${speakers.length - visibleCount} available)`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};




  const ProgramSection = () => {
  const schedule = [
  {
    day: "Day 1: Setting the Stage for Transformation",
    date: "",
    events: [
      {
        time: "Morning",
        title: "Registration and Breakfast Networking",
        type: "break"
      },
      {
        time: "Morning",
        title: `Opening Keynote:
"Digital Transformation for a Secure and Modern Future"`,
        type: "keynote",
        speaker: "Desire Cashmir Kologele Eberande | Moderator: Introduction by Wilmot Gibson"
      },
      {
        time: "Morning",
        title: "Break",
        type: "break"
      },
      {
        time: "Morning",
        title: `Executive Panel:
"Leading in the Digital Age"`,
        type: "panel",
        speaker: `Sabune Winkler -health Services; 
Pankaj Chugh-disruptive technologies, 
Mining (Min. Watum )and Energy, 
Congolese Sperkers needed for Banking (Rawbank : Hugues Bosala),  and Fellly Samuna :Industries(Manufacturing, Engineering, etc)
Min Intérieur ( | Moderator: Renowned industry analyst. – Find a Congolese

Bijou Sumbu`
      },
      {
        time: "Afternoon",
        title: "Lunch & Expo Hall Tour",
        type: "networking"
      },
      {
        time: "Late Morning",
        title: "Breakout Sessions (Choose from Tracks A, B, C or D)",
        type: "workshop",
        speaker: "Elizabeth Stevens / Alberto"
      },
      {
        time: "Afternoon",
        title: "Break",
        type: "break"
      },
      {
        time: "Afternoon",
        title: "Breakout Sessions (Choose from Tracks A, B, C or D)",
        type: "workshop"
      },
      {
        time: "Afternoon",
        title: "Break",
        type: "break"
      },
      {
        time: "Afternoon",
        title: "Industry-Specific Sessions",
        type: "session",
        speaker: "Malid (Africell)"
      },
      {
        time: "Afternoon",
        title: "Networking and Exhibit hall",
        type: "networking"
      },
      {
        time: "Evening",
        title: "Keynote Speaker",
        type: "keynote"
      },
      {
        time: "Evening",
        title: "Networking Reception & Welcome Dinner",
        type: "networking",
        speaker: "All attendees"
      }
    ]
  },
  {
    day: "Day 2: Deep Dives & Technical Workshops",
    date: "",
    events: [
      {
        time: "Morning",
        title: "Networking Breakfast",
        type: "break"
      },
      {
        time: "Morning",
        title: `Keynote Session
The Evolving Cyber Threat Landscape"`,
        type: "keynote",
        speaker: `Ainsley Rattray, 
Renowned cybersecurity expert | Moderator: Grace Ngoya`
      },
      {
        time: "Morning",
        title: "Keynote mining",
        type: "keynote",
        speaker: "Jean-Marie Kande Tumba | Moderator: Moderator: Industry analyst or government representative. Norbert Wupona"
      },
      {
        time: "Morning",
        title: "Networking Break",
        type: "break"
      },
      {
        time: "Late Morning",
        title: "Concurrent Workshops & Hands-On Labs (Advanced Track Focus)",
        type: "workshop",
        speaker: "Alberto Urena (SecRails)"
      },
      {
        time: "12:15:00 – 13:30:00",
        title: "Lunch and Exhibit hall",
        type: "networking"
      },
      {
        time: "Afternoon",
        title: "Panel /Breakout Sessions",
        type: "panel"
      },
      {
        time: "Afternoon",
        title: "Networking Break",
        type: "break"
      },
      {
        time: "Evening",
        title: `Fireside Chat: "Securing the Future of Digital Health & Banking"`,
        type: "session",
        speaker: "Aaron Winkler, Ainsley | Moderator: Industry journalist or analyst. TBD"
      },
      {
        time: "Evening",
        title: `Fireside Chat: "Securing the Future of Telecommunications Network and Cyber resiliency`,
        type: "session",
        speaker: "Congolese, Alberto"
      },
      {
        time: "Evening",
        title: "Exhibit hall tour",
        type: "session"
      }
    ]
  },
  {
    day: "Day 3: Future Planning & Collaborative Strategies",
    date: "",
    events: [
      {
        time: "Morning",
        title: `Keynote:
 "Innovation & Emerging Technologies: AI, Blockchain, and Beyond"`,
        type: "keynote",
        speaker: "Technology futurist or innovation leader. TBD"
      },
      {
        time: "Morning",
        title: "Industry-Specific Technical Sessions",
        type: "session",
        speaker: "TBD"
      },
      {
        time: "Morning",
        title: "Networking Break",
        type: "break"
      },
      {
        time: "Late Morning",
        title: "Cross-Industry Collaboration Workshops",
        type: "workshop",
        speaker: "TBD"
      },
      {
        time: "Afternoon",
        title: "Networking Lunch",
        type: "networking"
      },
      {
        time: "Afternoon",
        title: `Leadership Panel: "Sustaining Innovation & Talent in a Rapidly Changing World" TBD`,
        type: "panel",
        speaker: "Executives from diverse industries. Kevin? | Moderator: Barry Williams"
      },
      {
        time: "Afternoon",
        title: `Panel Discussion " The Future of Mining and Energy tecnologies in the DRC"`,
        type: "panel",
        speaker: "Conference chair or organizer. Wilmot Gibson"
      },
      {
        time: "Evening",
        title: `Cybersecurity resilency workshop Topic - TBD"`,
        type: "workshop"
      },
      {
        time: "Evening",
        title: "Additional Elements",
        type: "session"
      },
      {
        time: "Evening",
        title: "1. Expo Hall",
        type: "networking"
      },
      {
        time: "Evening",
        title: "2. Networking & Matchmaking Sessions",
        type: "networking"
      },
      {
        time: "Evening",
        title: "3. Resource Library & On-Demand Access",
        type: "session"
      },
      {
        time: "Evening",
        title: "4. CSR & Sustainability Commitment",
        type: "session"
      }
    ]
  }
];

  const getEventIcon = (type) => {
    const icons = {
      keynote: <Mic className="w-4 h-4" />,
      panel: <Users className="w-4 h-4" />,
      workshop: <Cpu className="w-4 h-4" />,
      networking: <Coffee className="w-4 h-4" />,
      break: <Coffee className="w-4 h-4" />,
      closing: <Award className="w-4 h-4" />
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
      closing: "bg-yellow-500"
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <section id="program" className={`py-20 ${colors.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${colors.textBright}`}>
            CONFERENCE <span className={colors.accent}>PROGRAM</span>
          </h2>
          <div className={`w-24 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
          <p className={`text-xl ${colors.text} max-w-3xl mx-auto leading-relaxed`}>
            Three immersive days of keynotes, panels, workshops, and networking opportunities
          </p>
        </div>

        {/* Program Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex} className="group">
              {/* Day Card */}
              <div className={`${colors.card} p-6 rounded-2xl border ${colors.divider} hover:border-[#00FFFF] transition-all duration-300 hover:shadow-xl`}>
                {/* Day Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.accentBg} text-black font-bold text-lg mb-3`}>
                    {dayIndex + 1}
                  </div>
                  <h3 className={`text-xl font-bold ${colors.textBright} mb-2`}>
                    {day.day.split(' – ')[0]}
                  </h3>
                  <p className={`text-sm ${colors.text} opacity-80`}>
                    {day.date}
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`p-4 rounded-xl border ${colors.divider} hover:border-[#00FFFF] transition-all duration-200 backdrop-blur-sm bg-black/20`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${getEventColor(event.type)} text-white flex-shrink-0`}>
                          {getEventIcon(event.type)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${colors.accent} mb-1`}>
                            {event.time}
                          </p>
                          <h4 className={`text-sm font-bold ${colors.textBright} mb-1 leading-tight`}>
                            {event.title}
                          </h4>
                          {event.speaker && (
                            <p className={`text-xs ${colors.text} opacity-80 leading-tight`}>
                              {event.speaker}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className={`${colors.card} p-8 rounded-2xl border ${colors.divider}`}>
          <h4 className={`text-xl font-bold ${colors.textBright} mb-6 text-center`}>
            Event Legend
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { type: 'keynote', label: 'Keynote', color: 'bg-blue-500' },
              { type: 'panel', label: 'Panel', color: 'bg-purple-500' },
              { type: 'workshop', label: 'Workshop', color: 'bg-green-500' },
              { type: 'networking', label: 'Networking', color: 'bg-orange-500' },
              { type: 'break', label: 'Break', color: 'bg-gray-500' },
              { type: 'closing', label: 'Closing', color: 'bg-yellow-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start">
                <div className={`w-4 h-4 rounded ${item.color} mr-3`}></div>
                <span className={`text-sm ${colors.text}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/conf_schedule.xlsx" // Le chemin d'accès au fichier
            download="Programme-Complet.xlsx" // L'attribut `download` force le téléchargement et permet de renommer le fichier
            className={`${colors.accentBg} text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform ${colors.hoverGlow}`}
          >
            DOWNLOAD FULL PROGRAM
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
      url: "https://www.africell.com"
    },

    {
      name: "Banque Centrale du Congo",
      tier: "Platinum",
      logo: "bcc.png", // Placeholder, replace with actual logo URL
      url: "https://www.bcc.cd"
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
            OUR <span className={colors.accent}>SPONSORS</span>
          </h2>
          <div className={`w-20 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
          <p className={`text-xl ${colors.text} max-w-3xl mx-auto`}>
            Leading organizations supporting digital transformation in Africa
          </p>
        </div>

        <div className="space-y-16">
          {['Platinum', 'Gold', 'Silver'].map((tier) => {
            const tierSponsors = sponsors.filter(s => s.tier === tier);
            if (tierSponsors.length === 0) return null;

            return (
              <div key={tier} className="text-center">
                <h3 className={`text-2xl font-bold mb-12 ${colors.textBright} uppercase tracking-wider`}>
                  {tier} Sponsors
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
                          ${tier === 'Platinum' ? 'h-24' : tier === 'Gold' ? 'h-20' : 'h-16'} 
                          w-auto max-w-[200px] object-contain filter grayscale group-hover:grayscale-0
                          transition-all duration-500
                        `}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x80?text='+sponsor.name;
                        }}
                      />
                      <p className={`mt-2 text-sm ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
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
          CONFERENCE <span className={colors.accent}>LOCATION</span>
        </h2>
        <div className={`w-20 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
        <p className={`text-xl ${colors.text} max-w-3xl mx-auto`}>
          Join us at the prestigious Pullman Kinshasa for Africa's premier digital transformation event
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
                <p className={colors.text}>November 11-13, 2025</p>
                <p className={`text-sm ${colors.text} opacity-80`}>8:00 AM - 6:00 PM daily</p>
              </div>
            </div>

            <div className="flex items-start">
              <Wifi className={`w-5 h-5 mr-3 ${colors.accent} mt-1`} />
              <div>
                <p className={colors.text}>State-of-the-art conference facilities</p>
                <p className={colors.text}>High-speed WiFi & modern amenities</p>
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
              GET DIRECTIONS
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
            style={{border:0}} 
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
  const RegisterSection = () => (
    <section className={`py-20 ${colors.bg}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${colors.textBright}`}>
          READY TO <span className={colors.accent}>JOIN US</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: "Standard",
              price: "$150",
              features: ["3-Day Access", "Conference Materials", "Coffee Breaks"]
            },
            {
              name: "Premium",
              price: "$250",
              features: ["3-Day Access", "Conference Materials", "Lunches", "VIP Access"],
              popular: true
            },
            {
              name: "Student",
              price: "$50",
              features: ["3-Day Access", "Conference Materials"]
            }
          ].map((tier, index) => (
            <div 
              key={index} 
              className={`${colors.card} p-8 rounded-xl border ${tier.popular ? colors.accentBorder : colors.divider} ${tier.popular ? 'transform md:scale-105' : ''}`}
            >
              {tier.popular && (
                <div className={`${colors.accentBg} text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4`}>
                  MOST POPULAR
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${colors.textBright}`}>{tier.name}</h3>
              <p className={`text-3xl font-bold mb-6 ${colors.accent}`}>{tier.price}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className={`flex items-center ${colors.text}`}>
                    <Check className={`w-4 h-4 mr-2 ${colors.accent}`} /> {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-bold ${
                tier.popular 
                  ? `${colors.accentBg} text-black hover:bg-opacity-90`
                  : `border ${colors.accentBorder} ${colors.accent} hover:${colors.accentBg} hover:text-black`
              } transition-all`}>
                REGISTER NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

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

  const colors = {
    bg: 'bg-[#1A1A1A]',
    card: 'bg-[#252525]',
    text: 'text-[#E0E0E0]',
    textBright: 'text-[#FFFFFF]',
    accent: 'text-[#00FFFF]',
    accentBg: 'bg-[#00FFFF]',
    accentBorder: 'border-[#00FFFF]',
    divider: 'border-[#333333]',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]'
  };

  // ✅ utilise la liste importée + évite un state/effet inutile
  const speaker = React.useMemo(
    () => speakers.find(s => s.id === Number(id)) || null,
    [id]
  );

  if (!speaker) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full bg-[#1A1A1A] px-4">
        <div className="text-center">
          <p className="text-white text-xl">Speaker not found</p>
          <Link to="/" className="text-[#00FFFF] hover:underline mt-4 inline-block">
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
          <Link
            to="/"
            className="inline-flex items-center text-[#00FFFF] mb-8 hover:underline"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to speakers
          </Link>

          <div className={`${colors.card} p-6 md:p-8 rounded-xl border ${colors.divider}`}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar + réseaux */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#00FFFF] block"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }}
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
                <h1 className={`text-2xl md:text-3xl font-bold ${colors.textBright} mb-2 break-words`}>
                  {speaker.name}
                </h1>
                <p className={`${colors.accent} text-base md:text-lg mb-4 break-words`}>
                  {speaker.title}
                </p>
                {speaker.topic && (
                  <p className={`text-lg md:text-xl italic mb-6 ${colors.text} break-words`}>
                    "{speaker.topic}"
                  </p>
                )}

                <div className="prose prose-invert max-w-none break-words">
                  <p className={`${colors.text} whitespace-pre-line text-sm md:text-base`}>
                    {speaker.detailedBio || speaker.bio}
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
      <div className=" mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Cpu className={`h-8 w-8 ${colors.accent} mr-3`} />
              <span className={`text-xl font-bold ${colors.textBright}`}>DIGITAL NATION 2030</span>
            </div>
            <p className={`text-sm ${colors.text}`}>
              The premier conference on digital transformation in Africa.
            </p>
          </div>
          
          <div>
            <h3 className={`font-bold ${colors.textBright} mb-4`}>QUICK LINKS</h3>
            <ul className="space-y-2">
              {['Home', 'Speakers', 'Program', 'Venue'].map((item) => (
                <li key={item}>
                  <a href="#" className={`text-sm ${colors.text} hover:${colors.accent} transition-colors`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className={`font-bold ${colors.textBright} mb-4`}>CONTACT</h3>
            <ul className={`space-y-2 text-sm ${colors.text}`}>
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-0.5" />
                contact@ss4d.org
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                8 bis Avenue Marinelle, Kinshasa
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`font-bold ${colors.textBright} mb-4`}>FOLLOW US</h3>
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
        
        <div className={`pt-8 border-t ${colors.divider} text-center text-sm ${colors.text}`}>
          © 2025 Digital Nation 2030. All rights reserved.
        </div>
      </div>
    </footer>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/speaker/:id" element={<SpeakerDetailWrapper />} />
      </Routes>
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