import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp, Calendar, Clock } from 'lucide-react';
import visitCounter from '../utils/visitCounter';

const VisitStats = ({ isAdmin = false, compact = false }) => {
  const [stats, setStats] = useState({
    total: '0',
    today: '0',
    lastVisit: 'Jamais',
    firstVisit: 'Jamais'
  });
  
  const [weeklyData, setWeeklyData] = useState({});

  const colors = {
    bg: "bg-[#1A1A1A]",
    card: "bg-[#252525]",
    text: "text-[#E0E0E0]",
    textBright: "text-[#FFFFFF]",
    accent: "text-[#00FFFF]",
    accentBg: "bg-[#00FFFF]",
    divider: "border-[#333333]",
  };

  useEffect(() => {
    // Fonction pour mettre à jour les stats
    const updateStats = () => {
      const formattedStats = visitCounter.getFormattedStats();
      const weekly = visitCounter.getWeeklyVisits();
      
      setStats(formattedStats);
      setWeeklyData(weekly);
    };

    // Mise à jour initiale
    updateStats();

    // Écouter les événements de mise à jour
    const handleVisitUpdate = (event) => {
      updateStats();
    };

    window.addEventListener('visitCountUpdated', handleVisitUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('visitCountUpdated', handleVisitUpdate);
    };
  }, []);

  const resetStats = () => {
    if (isAdmin && window.confirm('Êtes-vous sûr de vouloir réinitialiser les statistiques ?')) {
      visitCounter.resetCounter();
      setStats({
        total: '0',
        today: '0',
        lastVisit: 'Jamais',
        firstVisit: 'Jamais'
      });
      setWeeklyData({});
    }
  };

  const exportStats = () => {
    const exportData = visitCounter.exportData();
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digital-nation-2030-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (compact) {
    return (
      <div className={`${colors.card} rounded-lg p-3 border ${colors.divider}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-[#00FFFF]" />
            <span className={`text-sm ${colors.text}`}>Visites</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`text-sm font-bold ${colors.textBright}`}>{stats.total}</div>
              <div className={`text-xs ${colors.text}`}>Total</div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold text-[#00FFFF]`}>{stats.today}</div>
              <div className={`text-xs ${colors.text}`}>Aujourd'hui</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.card} rounded-xl p-6 border ${colors.divider}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold ${colors.textBright} flex items-center`}>
          <TrendingUp className="w-6 h-6 mr-2 text-[#00FFFF]" />
          Statistiques de Visite
        </h3>
        {isAdmin && (
          <div className="flex space-x-2">
            <button
              onClick={exportStats}
              className="px-3 py-1 bg-[#00FFFF] text-black rounded text-sm font-medium hover:bg-opacity-90 transition-all"
            >
              Exporter
            </button>
            <button
              onClick={resetStats}
              className="px-3 py-1 border border-red-500 text-red-400 rounded text-sm font-medium hover:bg-red-500 hover:text-white transition-all"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`${colors.bg} rounded-lg p-4 text-center`}>
          <Eye className="w-8 h-8 text-[#00FFFF] mx-auto mb-2" />
          <div className={`text-2xl font-bold ${colors.textBright} mb-1`}>{stats.total}</div>
          <div className={`text-sm ${colors.text}`}>Total Visites</div>
        </div>
        
        <div className={`${colors.bg} rounded-lg p-4 text-center`}>
          <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className={`text-2xl font-bold text-green-400 mb-1`}>{stats.today}</div>
          <div className={`text-sm ${colors.text}`}>Aujourd'hui</div>
        </div>
        
        <div className={`${colors.bg} rounded-lg p-4 text-center`}>
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className={`text-xs ${colors.textBright} mb-1`}>{stats.lastVisit.split(' ')[1] || 'N/A'}</div>
          <div className={`text-sm ${colors.text}`}>Dernière Visite</div>
        </div>
        
        <div className={`${colors.bg} rounded-lg p-4 text-center`}>
          <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className={`text-xs ${colors.textBright} mb-1`}>{stats.firstVisit.split(' ')[1] || 'N/A'}</div>
          <div className={`text-sm ${colors.text}`}>Première Visite</div>
        </div>
      </div>

      {/* Graphique des 7 derniers jours */}
      <div className="mb-4">
        <h4 className={`text-lg font-semibold ${colors.textBright} mb-3`}>Visites des 7 derniers jours</h4>
        <div className="flex items-end justify-between space-x-1 h-24">
          {Object.entries(weeklyData).map(([date, visits], index) => {
            const maxVisits = Math.max(...Object.values(weeklyData), 1);
            const height = Math.max((visits / maxVisits) * 100, 5);
            const dayName = new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' });
            
            return (
              <div key={date} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-[#00FFFF] rounded-t"
                  style={{ height: `${height}%` }}
                  title={`${dayName}: ${visits} visites`}
                />
                <div className={`text-xs ${colors.text} mt-1`}>{dayName}</div>
                <div className={`text-xs ${colors.textBright} font-medium`}>{visits}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Informations additionnelles */}
      <div className={`text-xs ${colors.text} pt-4 border-t ${colors.divider}`}>
        <p>📊 Les données sont stockées localement dans votre navigateur</p>
        <p>🔄 Les statistiques se mettent à jour automatiquement</p>
      </div>
    </div>
  );
};

export default VisitStats;