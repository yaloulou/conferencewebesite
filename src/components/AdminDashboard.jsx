import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, TrendingUp, BarChart3, Globe } from 'lucide-react';
import VisitStats from './VisitStats';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const colors = {
    bg: "bg-[#1A1A1A]",
    card: "bg-[#252525]",
    text: "text-[#E0E0E0]",
    textBright: "text-[#FFFFFF]",
    accent: "text-[#00FFFF]",
    accentBg: "bg-[#00FFFF]",
    divider: "border-[#333333]",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password protection (in production, use proper authentication)
    if (password === 'SS4D2030Admin') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${colors.bg} flex items-center justify-center px-4`}>
        <div className={`max-w-md w-full ${colors.card} rounded-2xl p-8 border ${colors.divider}`}>
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-[#00FFFF] mx-auto mb-4" />
            <h1 className={`text-2xl font-bold ${colors.textBright} mb-2`}>
              Admin Dashboard
            </h1>
            <p className={colors.text}>
              Accès réservé aux administrateurs
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 ${colors.bg} border ${colors.divider} rounded-lg ${colors.textBright} focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent`}
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full ${colors.accentBg} text-black py-3 px-4 rounded-lg font-bold hover:bg-opacity-90 transition-all`}
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className={`text-sm ${colors.accent} hover:underline flex items-center justify-center`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour au site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colors.bg}`}>
      {/* Header */}
      <div className={`${colors.card} border-b ${colors.divider} px-6 py-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-[#00FFFF] mr-3" />
            <div>
              <h1 className={`text-2xl font-bold ${colors.textBright}`}>
                Digital Nation 2030 - Admin
              </h1>
              <p className={colors.text}>Tableau de bord des statistiques</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className={`flex items-center px-4 py-2 border ${colors.divider} rounded-lg ${colors.text} hover:border-[#00FFFF] hover:${colors.accent} transition-all`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au site
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Statistiques principales */}
          <div>
            <h2 className={`text-xl font-bold ${colors.textBright} mb-6`}>
              Statistiques de Visites
            </h2>
            <VisitStats isAdmin={true} compact={false} />
          </div>

          {/* Informations système */}
          <div className={`${colors.card} rounded-xl p-6 border ${colors.divider}`}>
            <h3 className={`text-lg font-semibold ${colors.textBright} mb-4`}>
              Informations Système
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${colors.text} mb-1`}>Version du site</p>
                <p className={`font-medium ${colors.textBright}`}>1.0.0</p>
              </div>
              <div>
                <p className={`text-sm ${colors.text} mb-1`}>Dernière mise à jour</p>
                <p className={`font-medium ${colors.textBright}`}>
                  {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className={`text-sm ${colors.text} mb-1`}>Stockage utilisé</p>
                <p className={`font-medium ${colors.textBright}`}>
                  {JSON.stringify(localStorage).length} bytes
                </p>
              </div>
              <div>
                <p className={`text-sm ${colors.text} mb-1`}>Navigateur</p>
                <p className={`font-medium ${colors.textBright}`}>
                  {navigator.userAgent.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {/* Vercel Analytics Info */}
          <div className={`${colors.card} rounded-xl p-6 border ${colors.divider} mb-6`}>
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-[#00FFFF] mr-3" />
              <h3 className={`text-lg font-semibold ${colors.textBright}`}>
                Vercel Analytics (Production)
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-green-400 mr-2" />
                  <span className={colors.textBright}>Analytics Global Intégré</span>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  Actif
                </span>
              </div>
              <div className={`text-sm ${colors.text} space-y-2`}>
                <p>• <strong>Comptage réel</strong> des visiteurs uniques</p>
                <p>• <strong>Géolocalisation</strong> et données démographiques</p>
                <p>• <strong>Performance</strong> et vitesse de chargement</p>
                <p>• <strong>Sources de trafic</strong> et conversions</p>
              </div>
              <div className="pt-3 border-t border-gray-600">
                <p className={`text-xs ${colors.text}`}>
                  📊 <strong>Dashboard Vercel :</strong> Connectez-vous à votre compte Vercel pour voir les analytics détaillées
                </p>
              </div>
            </div>
          </div>

          <div className={`${colors.card} rounded-xl p-6 border ${colors.divider}`}>
            <h3 className={`text-lg font-semibold ${colors.textBright} mb-4`}>
              Instructions d'Utilisation (Local)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="w-6 h-6 bg-[#00FFFF] text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <div>
                  <p className={`font-medium ${colors.textBright}`}>Données locales</p>
                  <p className={`text-sm ${colors.text}`}>Les compteurs ci-dessus sont pour le développement local uniquement</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-[#00FFFF] text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <div>
                  <p className={`font-medium ${colors.textBright}`}>Analytics production</p>
                  <p className={`text-sm ${colors.text}`}>Sur Vercel, utilisez le dashboard Analytics pour les vraies statistiques</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-[#00FFFF] text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <div>
                  <p className={`font-medium ${colors.textBright}`}>Double tracking</p>
                  <p className={`text-sm ${colors.text}`}>Vercel Analytics + données locales offrent une vue complète</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;