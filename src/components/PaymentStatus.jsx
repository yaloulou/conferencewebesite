import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Clock, Download, Home } from 'lucide-react';
import QRCode from 'qrcode';

const PaymentStatus = ({ type }) => {
  const [searchParams] = useSearchParams();
  const [transactionData, setTransactionData] = useState(null);
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

  useEffect(() => {
    // Extraire les données de l'URL ou générer des données factices pour le succès
    let transactionId = searchParams.get('transactionId') || searchParams.get('reference');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');
    
    // Si c'est une page de succès et qu'il n'y a pas de transactionId, on en génère un
    if (type === 'success' && !transactionId) {
      transactionId = `SS4D_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    }
    
    // Log pour déboguer
    console.log('URL params:', { transactionId, amount, status });
    
    if (transactionId || type === 'success') {
      setTransactionData({
        TransactionID: transactionId,
        amount: amount, // Ne pas mettre de valeur par défaut ici
        status: status || 'success'
      });
    }
  }, [searchParams, type]);

  const downloadQRCodeWithLabel = async (transactionID) => {
    try {
      const qrSize = 300;
      const labelText = "SS4D Digital Nation 2030";
      const fontSize = 20;
      const labelPadding = 12;
      const textHeight = fontSize + labelPadding;

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

      const scale = window.devicePixelRatio || 1;
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = qrSize * scale;
      finalCanvas.height = (qrSize + textHeight) * scale;
      finalCanvas.style.width = `${qrSize}px`;
      finalCanvas.style.height = `${qrSize + textHeight}px`;

      const ctx = finalCanvas.getContext("2d");
      ctx.scale(scale, scale);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, qrSize, qrSize + textHeight);

      ctx.drawImage(tmp, 0, 0, qrSize, qrSize);

      ctx.fillStyle = "#000";
      ctx.font = `${fontSize}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labelText, qrSize / 2, qrSize + textHeight / 2);

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
      console.error("Erreur génération QR:", err);
    }
  };

  const getStatusConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-400" />,
          title: "Paiement Réussi !",
          subtitle: "Votre inscription à Digital Nation 2030 a été confirmée",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500",
          textColor: "text-green-300"
        };
      case 'failure':
        return {
          icon: <XCircle className="w-16 h-16 text-red-400" />,
          title: "Paiement Échoué",
          subtitle: "Une erreur s'est produite lors du traitement de votre paiement",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500",
          textColor: "text-red-300"
        };
      case 'cancel':
        return {
          icon: <AlertCircle className="w-16 h-16 text-yellow-400" />,
          title: "Paiement Annulé",
          subtitle: "Vous avez annulé le processus de paiement",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500",
          textColor: "text-yellow-300"
        };
      case 'notify':
        return {
          icon: <Clock className="w-16 h-16 text-blue-400" />,
          title: "Paiement en Cours",
          subtitle: "Nous traitons votre paiement, veuillez patienter",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500",
          textColor: "text-blue-300"
        };
      default:
        return {
          icon: <AlertCircle className="w-16 h-16 text-gray-400" />,
          title: "Statut Inconnu",
          subtitle: "Impossible de déterminer le statut du paiement",
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500",
          textColor: "text-gray-300"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`min-h-screen ${colors.bg} flex items-center justify-center px-4`}>
      <div className={`max-w-md w-full ${colors.card} rounded-2xl p-8 border ${colors.divider} text-center`}>
        {/* Logo SS4D */}
        <div className="mb-6">
          <img 
            src="/logo-SS4D.png" 
            alt="SS4D Logo" 
            className="h-12 w-auto mx-auto mb-4"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Icône de statut */}
        <div className="flex justify-center mb-6">
          {statusConfig.icon}
        </div>

        {/* Titre et sous-titre */}
        <h1 className={`text-2xl font-bold ${colors.textBright} mb-2`}>
          {statusConfig.title}
        </h1>
        <p className={`${colors.text} mb-6`}>
          {statusConfig.subtitle}
        </p>

        {/* Détails de la transaction */}
        {transactionData && (
          <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-lg p-4 mb-6`}>
            <div className="space-y-2">
              {transactionData.TransactionID && (
                <div className="flex justify-between items-center">
                  <span className={colors.text}>ID Transaction:</span>
                  <span className={`${colors.textBright} font-mono text-sm`}>
                    {transactionData.TransactionID}
                  </span>
                </div>
              )}
              {/* Montant masqué selon la demande */}
              <div className="flex justify-between items-center">
                <span className={colors.text}>Événement:</span>
                <span className={colors.textBright}>Digital Nation 2030</span>
              </div>
            </div>
          </div>
        )}

        {/* Bouton de téléchargement QR (seulement pour succès) */}
        {type === 'success' && transactionData?.TransactionID && (
          <div className="mb-6">
            <button
              onClick={() => downloadQRCodeWithLabel(transactionData.TransactionID)}
              className={`w-full ${colors.accentBg} text-black py-3 px-4 rounded-lg font-bold flex items-center justify-center hover:bg-opacity-90 transition-all`}
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger le QR Code d'Accès
            </button>
            <p className={`text-xs ${colors.text} mt-2 opacity-70`}>
              Présentez ce QR code à l'entrée de la conférence
            </p>
          </div>
        )}

        {/* Messages spécifiques selon le statut */}
        {type === 'success' && (
          <div className={`${colors.card} border ${colors.divider} rounded-lg p-4 mb-6`}>
            <h3 className={`${colors.textBright} font-bold mb-2`}>Prochaines étapes :</h3>
            <ul className={`text-sm ${colors.text} text-left space-y-1`}>
              <li>• Téléchargez votre QR code d'accès</li>
              <li>• Vérifiez votre email pour la confirmation</li>
              <li>• Rejoignez-nous du 11-13 novembre 2025</li>
              <li>• Lieu: Pullman Kinshasa Grand Hotel</li>
            </ul>
          </div>
        )}

        {type === 'failure' && (
          <div className={`${colors.card} border ${colors.divider} rounded-lg p-4 mb-6`}>
            <h3 className={`${colors.textBright} font-bold mb-2`}>Que faire maintenant ?</h3>
            <ul className={`text-sm ${colors.text} text-left space-y-1`}>
              <li>• Vérifiez vos informations de paiement</li>
              <li>• Assurez-vous d'avoir des fonds suffisants</li>
              <li>• Contactez votre banque si nécessaire</li>
              <li>• Réessayez votre inscription</li>
            </ul>
          </div>
        )}

        {type === 'cancel' && (
          <div className={`${colors.card} border ${colors.divider} rounded-lg p-4 mb-6`}>
            <p className={`text-sm ${colors.text}`}>
              Votre inscription n'a pas été finalisée. Vous pouvez recommencer le processus d'inscription à tout moment.
            </p>
          </div>
        )}

        {type === 'notify' && (
          <div className={`${colors.card} border ${colors.divider} rounded-lg p-4 mb-6`}>
            <p className={`text-sm ${colors.text}`}>
              Votre paiement est en cours de traitement. Vous recevrez une confirmation par email dès que le paiement sera validé.
            </p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className={`w-full border-2 ${colors.divider} ${colors.text} py-3 px-4 rounded-lg font-bold hover:border-[#00FFFF] hover:${colors.accent} transition-all flex items-center justify-center`}
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'Accueil
          </button>

          {(type === 'failure' || type === 'cancel') && (
            <button
              onClick={() => navigate('/#register')}
              className={`w-full ${colors.accentBg} text-black py-3 px-4 rounded-lg font-bold hover:bg-opacity-90 transition-all`}
            >
              Réessayer l'Inscription
            </button>
          )}
        </div>

        {/* Contact support */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className={`text-xs ${colors.text} mb-2`}>
            Besoin d'aide ? Contactez notre support :
          </p>
          <a 
            href="mailto:contact@ss4d.org" 
            className={`text-xs ${colors.accent} hover:underline`}
          >
            contact@ss4d.org
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;