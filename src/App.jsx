import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, ChevronDown, Check,
  Calendar, MapPin, Users, Mic, Twitter, 
  Linkedin, Youtube, Star, Award, Cpu, Shield, Server, Wifi, Mail
} from 'lucide-react';

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
  const speakers = [
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
  ];

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

  // Composant Hero
const HeroSection = () => {
  const [currentMedia, setCurrentMedia] = useState(0);
  
  const mediaItems = [
    {
      type: 'video',
      src: 'landing_media_1.webm',
      alt: 'Conference venue',
      text: "Digital Transformation for a Secure and Modern Future"


    },
    /* {
      type: 'image',
      src: 'conference1.jpeg',
      alt: 'Modern technology',
      text: "Kinshasa: Where African Innovation Meets Global Technology"
    }, */
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
            <button className={`${colors.accentBg} text-black px-8 py-4 rounded-lg font-bold text-lg ${colors.hoverGlow} transition-all hover:scale-105`}>
              REGISTER NOW
            </button>
            <button className={`border-2 ${colors.accentBorder} ${colors.accent} px-8 py-4 rounded-lg font-bold text-lg hover:${colors.accentBg} hover:text-black transition-all hover:scale-105`}>
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

const SpeakersSection = () => {
  // Configuration des couleurs
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

  // Données des intervenants
  const speakersData = [
    {
      id: 10,
      name: "Wilmot Gibson",
      title: "Transformational Business Executive (Global)",
      topic: "Driving Business Transformation Through Strategy, Technology, and Leadership",
      bio: "Fondateur d'une société de cybersécurité rachetée par Palo Alto Networks, chercheur en cybermenaces émergentes.",
      avatar: "/intervenants/Wilmot Gibson.png",
      social: {
        twitter: "https://twitter.com/mohamedali",
        linkedin: "https://linkedin.com/in/mohamedali"
      }
    },
    {
      id: 1,
      name: "Aaron Winkler",
      title: "To be completed",
      topic: "To be completed",
      bio: "Pionnière dans le développement d'IA responsables, auteure de plusieurs livres sur l'éthique technologique et consultante pour l'UNESCO.",
      avatar: "/intervenants/Aaron Winkler.png",
      social: {
        twitter: "https://twitter.com/sophiemartin",
        linkedin: "https://linkedin.com/in/sophiemartin"
      }
    },
    {
      id: 2,
      name: "Ainsley Rattray",
      title: "To be completed",
      topic: "To be completed",
      bio: "Expert en architectures décentralisées, fondateur de deux startups blockchain et contributeur majeur à Ethereum.",
      avatar: "/intervenants/Ainsley Rattray.png",
      social: {
        twitter: "https://twitter.com/thomasdubois",
        linkedin: "https://linkedin.com/in/thomasdubois"
      }
    },
    {
      id: 3,
      name: "Alberto",
      title: "To be completed",
      topic: "To be completed",
      bio: "Professeur au MIT, spécialiste des architectures sécurisées pour le cloud et lauréate du prix Turing 2022.",
      avatar: "/intervenants/Alberto.png",
      social: {
        twitter: "https://twitter.com/elenarodriguez",
        linkedin: "https://linkedin.com/in/elenarodriguez"
      }
    },
    {
      id: 4,
      name: "Barry Williams",
      title: "Former Executive Director, Comcast Business (USA)",
      topic: "Leadership, Sales Strategy, and Building Sustainable Partnerships in the Technology Sector",
      bio: "15 ans d'expérience chez Google Cloud et AWS, architecte de solutions pour Fortune 500 companies.",
      avatar: "/intervenants/Barry Williams.png",
      social: {
        twitter: "https://twitter.com/marclefevre",
        linkedin: "https://linkedin.com/in/marclefevre"
      }
    },
    {
      id: 5,
      name: "Elizabeth Stephens",
      title: "CEO, DBS Cyber LLC (Nashville, USA)",
      topic: "Building a Resilient Digital Future: Cybersecurity, Leadership, and Protecting Families in the Digital Age",
      bio: "Docteure en informatique urbaine, elle dirige les projets IoT pour des métropoles européennes et asiatiques.",
      avatar: "/intervenants/Elizabeth Stephens.png",
      social: {
        twitter: "https://twitter.com/aminabah",
        linkedin: "https://linkedin.com/in/aminabah"
      }
    },
    {
      id: 6,
      name: "Omar Fahnbulleh",
      title: "To be completed",
      topic: "To be completed",
      bio: "Créateur d'outils open-source utilisés par des millions de développeurs, evangeliste des pratiques DevOps.",
      avatar: "/intervenants/Omar Fahnbulleh.png",
      social: {
        twitter: "https://twitter.com/pierremoreau",
        linkedin: "https://linkedin.com/in/pierremoreau"
      }
    },
    {
      id: 7,
      name: "Pankaj Chugh",
      title: "AI Leader and Strategist",
      topic: "Artificial General Intelligence and the Future of Knowledge Work",
      bio: "Ancienne de Netflix et Spotify, spécialiste du déploiement de modèles ML à grande échelle.",
      avatar: "/intervenants/Pankaj Chugh.png",
      social: {
        twitter: "https://twitter.com/laurakim",
        linkedin: "https://linkedin.com/in/laurakim"
      }
    },
    {
      id: 8,
      name: "Sabune Winkler",
      title: "To be completed",
      topic: "To be completed",
      bio: "Accompagne les entreprises du CAC40 dans leur transformation digitale depuis 15 ans, auteur à succès.",
      avatar: "/intervenants/Sabune Winkler.png",
      social: {
        twitter: "https://twitter.com/jacquespetit",
        linkedin: "https://linkedin.com/in/jacquespetit"
      }
    },
    {
      id: 9,
      name: "Shanam Kapoor",
      title: "Strategic Culture & Well-being Leader (USA)",
      topic: "Conscious Leadership and the Future of Workplace Well-being",
      bio: "Pionnière des méthodes de recherche UX appliquées aux produits digitaux complexes, formatrice internationale.",
      avatar: "/intervenants/Shanam Kapoor.png",
      social: {
        twitter: "https://twitter.com/clairedubois",
        linkedin: "https://linkedin.com/in/clairedubois"
      }
    },
  ];

  // État des speakers
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSpeaker, setExpandedSpeaker] = useState(null);

  // Fonction pour afficher/réduire les détails d'un speaker
  const toggleSpeakerDetails = (id) => {
    setExpandedSpeaker(expandedSpeaker === id ? null : id);
  };

  // Fonction pour charger plus de speakers
  const loadMoreSpeakers = () => {
    setIsLoading(true);
    // Simuler un léger délai pour l'expérience utilisateur
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 4, speakersData.length));
      setIsLoading(false);
    }, 300);
  };

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

        {/* Grille des speakers */}
        {isLoading && visibleCount === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FFFF]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {speakersData.slice(0, visibleCount).map((speaker) => (
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
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    </div>

                    {/* Nom et titre */}
                    <h3 className={`text-xl font-bold ${colors.textBright} text-center`}>
                      {speaker.name}
                    </h3>
                    <p className={`${colors.accent} text-sm text-center mb-2`}>
                      {speaker.title}
                    </p>
                    <p className={`${colors.text} text-sm text-center italic mb-3`}>
                      "{speaker.topic}"
                    </p>

                    {/* Bouton pour voir plus */}
                    <button
                      onClick={() => toggleSpeakerDetails(speaker.id)}
                      className={`flex items-center ${colors.accent} text-sm font-medium mb-3`}
                    >
                      {expandedSpeaker === speaker.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Less details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          More details
                        </>
                      )}
                    </button>

                    {/* Détails supplémentaires */}
                    {expandedSpeaker === speaker.id && (
                      <div className={`mt-3 pt-3 border-t ${colors.divider} w-full animate-fadeIn`}>
                        <p className={`${colors.text} text-sm mb-3`}>
                          {speaker.bio}
                        </p>
                        <div className="flex justify-center space-x-4">
                          <a 
                            href={speaker.social.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`${colors.text} hover:${colors.accent} transition-colors`}
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a 
                            href={speaker.social.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`${colors.text} hover:${colors.accent} transition-colors`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton Load More */}
            {visibleCount < speakersData.length && (
              <div className="text-center">
                <button
                  onClick={loadMoreSpeakers}
                  disabled={isLoading}
                  className={`border ${colors.accentBorder} ${colors.accent} px-6 py-2 rounded-lg font-medium hover:${colors.accentBg} hover:text-black transition-colors ${isLoading ? 'opacity-50' : ''}`}
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
                    `Load More Speakers (${speakersData.length - visibleCount} available)`
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



  // Composant Program
  const ProgramSection = () => (
    <section id ="program" className={`py-20 ${colors.card}`}>
      <div className=" mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${colors.textBright}`}>
            CONFERENCE <span className={colors.accent}>PROGRAM</span>
          </h2>
          <div className={`w-20 h-1 ${colors.accentBg} mx-auto mb-6`}></div>
          <p className={`text-lg ${colors.text} max-w-2xl mx-auto`}>
            Three days of inspiring keynotes, panels and networking
          </p>
        </div>
        
        <div className="space-y-12">
          {schedule.map((day, index) => (
            <div key={index} className={`${colors.bg} p-8 rounded-xl border ${colors.divider}`}>
              <h3 className={`text-2xl font-bold mb-6 ${colors.textBright} flex items-center`}>
                <Calendar className={`w-6 h-6 mr-3 ${colors.accent}`} />
                {day.day}
              </h3>
              
              <div className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className={`${colors.card} p-6 rounded-lg border ${colors.divider} hover:border-[#00FFFF] transition-colors`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-4 ${colors.accentBg} text-black`}>
                        {event.icon}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${colors.text}`}>{event.time}</p>
                        <h4 className={`text-lg font-bold ${colors.textBright} mt-1`}>{event.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Composant Sponsors
  const SponsorsSection = () => {
  // Liste des sponsors avec leurs vrais logos
  const sponsors = [
    {
      name: "Visa",
      tier: "Platinum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      url: "https://www.visa.com"
    },
   /*  {
      name: "MTN",
      tier: "Platinum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/MTN_Logo.svg/1280px-MTN_Logo.svg.png",
      url: "https://www.mtn.com"
    }, */
    {
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
    },
    {
      name: "Africell",
      tier: "Silver",
      logo: "logo_africell.png", // Placeholder, replace with actual logo URL
      url: "https://www.africell.com"
    }/* ,
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
        <div className={`mt-20 p-8 rounded-xl ${colors.card} border ${colors.divider} text-center`}>
          <h3 className={`text-2xl font-bold mb-4 ${colors.textBright}`}>
            Want to become a sponsor?
          </h3>
          <p className={`${colors.text} max-w-2xl mx-auto mb-6`}>
            Join industry leaders in supporting Africa's premier digital transformation event.
          </p>
          <button className={`${colors.accentBg} text-black px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all ${colors.hoverGlow}`}>
            CONTACT OUR PARTNERSHIP TEAM
          </button>
        </div>
      </div>
    </section>
  );
};

  // Composant Location
  const LocationSection = () => (
    <section id ="location" className={`py-20 ${colors.card}`}>
      <div className=" mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${colors.textBright}`}>
              CONFERENCE <span className={colors.accent}>VENUE</span>
            </h2>
            <div className={`w-20 h-1 ${colors.accentBg} mb-8`}></div>
            
            <p className={`text-lg ${colors.text} mb-8`}>
              The People's Palace in Kinshasa will host this major event on Africa's digital transformation.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className={`w-6 h-6 mr-4 ${colors.accent}`} />
                <div>
                  <h3 className={`font-bold ${colors.textBright}`}>PEOPLE'S PALACE</h3>
                  <p className={colors.text}>Boulevard du 30 Juin, Kinshasa, DRC</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className={`w-6 h-6 mr-4 ${colors.accent}`} />
                <div>
                  <h3 className={`font-bold ${colors.textBright}`}>NOVEMBER 11-13, 2025</h3>
                  <p className={colors.text}>8:00 AM - 6:00 PM daily</p>
                </div>
              </div>
            </div>
            
            <button className={`${colors.accentBg} text-black px-8 py-3 rounded-lg font-bold ${colors.hoverGlow}`}>
              GET DIRECTIONS
            </button>
          </div>
          
          <div className="h-96 rounded-xl overflow-hidden border-2 border-[#333333]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.527315559349!2d15.300789315329986!3d-4.317879145735933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3135e3b5a9a7%3A0x1a0d3b9a3a3b5a9a7!2sPalais%20du%20Peuple%2C%20Kinshasa!5e0!3m2!1sfr!2scd!4v1620000000000!5m2!1sfr!2scd" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy"
              className="opacity-90 hover:opacity-100 transition-opacity"
            ></iframe>
          </div>
        </div>
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
                info@digitalnation2030.cd
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                People's Palace, Kinshasa
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

export default DigitalNation2030;