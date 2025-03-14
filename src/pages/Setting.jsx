import { useState } from 'react';

function LanguageToggle({ language, initialState = true, onToggle }) {
  const [isActive, setIsActive] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsActive(!isActive);

    if (onToggle) {
      onToggle(language.id, !isActive);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-800">{language.name}</span>
        <span className="ml-2 text-xs text-gray-400">({language.code})</span>
      </div>

      <button
        onClick={handleToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
          isActive ? 'bg-primary' : 'bg-gray-300'
        }`}
        aria-pressed={isActive}
        aria-label={`${isActive ? 'Disable' : 'Enable'} ${language.name} language`}
      >
        <span className="sr-only">{isActive ? 'Active' : 'Inactive'}</span>
        <span
          className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${
            isActive ? 'translate-x-6' : 'translate-x-0'
          } ${isAnimating ? 'scale-90' : 'scale-100'}`}
        />
      </button>
    </div>
  );
}

// Example usage component
function LanguageSettings() {
  const [languages, setLanguages] = useState([
    { id: 1, name: 'English', code: 'en', isActive: true },
    { id: 2, name: 'Amharic', code: 'am', isActive: true },
    { id: 3, name: 'Arabic', code: 'ar', isActive: true },
    { id: 3, name: 'French', code: 'fr', isActive: false },
    { id: 4, name: 'German', code: 'de', isActive: true },
    { id: 5, name: 'Japanese', code: 'ja', isActive: false },
  ]);

  const handleToggle = (id, newState) => {
    const updatedLanguages = languages.map(lang =>
      lang.id === id ? { ...lang, isActive: newState } : lang
    );
    setLanguages(updatedLanguages);

    console.log(`Language ${id} toggled to ${newState ? 'active' : 'inactive'}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Language Settings</h1>
      <p className="text-sm text-gray-600 mb-6">Toggle languages on or off for your application</p>

      <div className="space-y-2">
        {languages.map(language => (
          <LanguageToggle
            key={language.id}
            language={language}
            initialState={language.isActive}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default LanguageSettings;
