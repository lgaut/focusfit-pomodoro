import { useState } from 'react';
import { Copy, Check, Download, Upload } from 'lucide-react';
import { getUserIdForSharing, importUserData } from '../services/cloudSync';

export const UserIdDisplay = () => {
  const [copied, setCopied] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importId, setImportId] = useState('');
  
  const userId = getUserIdForSharing();

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    if (importId.trim()) {
      if (confirm('Cela va remplacer tes données actuelles par celles de cet ID. Continuer ?')) {
        importUserData(importId.trim());
      }
    }
  };

  return (
    <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-indigo-900">Synchronisation cloud</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-3 mb-3">
        <div className="text-xs text-gray-600 mb-1">Ton ID utilisateur</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 font-mono text-sm text-indigo-600 break-all">
            {userId}
          </div>
          <button
            onClick={handleCopy}
            className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>
      </div>

      <div className="text-xs text-indigo-700 mb-3">
        💡 Utilise cet ID sur tes autres appareils pour synchroniser tes données
      </div>

      {!showImport ? (
        <button
          onClick={() => setShowImport(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition-colors text-sm"
        >
          <Upload className="w-4 h-4" />
          Importer un ID
        </button>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={importId}
            onChange={(e) => setImportId(e.target.value)}
            placeholder="Colle ton ID ici"
            className="w-full px-3 py-2 bg-white border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none text-sm font-mono"
          />
          <div className="flex gap-2">
            <button
              onClick={handleImport}
              disabled={!importId.trim()}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Importer
            </button>
            <button
              onClick={() => {
                setShowImport(false);
                setImportId('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
