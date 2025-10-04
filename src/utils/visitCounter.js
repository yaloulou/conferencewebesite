// Système de comptage des visites pour Digital Nation 2030
// Utilise localStorage pour conserver les données côté client

class VisitCounter {
  constructor() {
    this.storageKey = 'digitalNation2030_visits';
    this.sessionKey = 'digitalNation2030_session';
    this.initCounter();
  }

  // Initialiser le compteur
  initCounter() {
    const now = new Date();
    const today = now.toDateString();
    
    // Vérifier si c'est une nouvelle session
    const lastSession = sessionStorage.getItem(this.sessionKey);
    const isNewSession = !lastSession || lastSession !== today;
    
    if (isNewSession) {
      this.incrementVisit();
      sessionStorage.setItem(this.sessionKey, today);
    }
  }

  // Incrémenter le compteur de visites
  incrementVisit() {
    const visits = this.getVisits();
    const now = new Date();
    const today = now.toDateString();
    
    // Structure des données de visite
    const visitData = {
      totalVisits: visits.totalVisits + 1,
      dailyVisits: {
        ...visits.dailyVisits,
        [today]: (visits.dailyVisits[today] || 0) + 1
      },
      lastVisit: now.toISOString(),
      firstVisit: visits.firstVisit || now.toISOString()
    };
    
    localStorage.setItem(this.storageKey, JSON.stringify(visitData));
    
    // Envoyer l'événement pour mettre à jour l'UI
    window.dispatchEvent(new CustomEvent('visitCountUpdated', { 
      detail: visitData 
    }));
    
    return visitData;
  }

  // Récupérer les données de visite
  getVisits() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erreur lecture données de visite:', error);
    }
    
    // Données par défaut
    return {
      totalVisits: 0,
      dailyVisits: {},
      lastVisit: null,
      firstVisit: null
    };
  }

  // Obtenir les visites du jour
  getTodayVisits() {
    const visits = this.getVisits();
    const today = new Date().toDateString();
    return visits.dailyVisits[today] || 0;
  }

  // Obtenir les visites des 7 derniers jours
  getWeeklyVisits() {
    const visits = this.getVisits();
    const weekData = {};
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      weekData[dateStr] = visits.dailyVisits[dateStr] || 0;
    }
    
    return weekData;
  }

  // Réinitialiser le compteur (admin seulement)
  resetCounter() {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.sessionKey);
    return this.getVisits();
  }

  // Exporter les données (pour analytics)
  exportData() {
    const visits = this.getVisits();
    const weeklyData = this.getWeeklyVisits();
    
    return {
      ...visits,
      todayVisits: this.getTodayVisits(),
      weeklyVisits: weeklyData,
      exportDate: new Date().toISOString()
    };
  }

  // Obtenir des statistiques formatées
  getFormattedStats() {
    const visits = this.getVisits();
    const today = this.getTodayVisits();
    
    return {
      total: this.formatNumber(visits.totalVisits),
      today: this.formatNumber(today),
      lastVisit: visits.lastVisit ? new Date(visits.lastVisit).toLocaleString('fr-FR') : 'Jamais',
      firstVisit: visits.firstVisit ? new Date(visits.firstVisit).toLocaleString('fr-FR') : 'Jamais'
    };
  }

  // Formater les nombres
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

// Instance singleton
const visitCounter = new VisitCounter();

export default visitCounter;