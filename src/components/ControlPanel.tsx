import React from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { translations } from '../utils/translations';
import './ControlPanel.css';

export const ControlPanel: React.FC = () => {
  const {
    currentExperiment,
    language,
    magnetStrength,
    temperature,
    current,
    frequency,
    setCurrentExperiment,
    setLanguage,
    setMagnetStrength,
    setTemperature,
    setCurrent,
    setFrequency,
  } = useSimulationStore();

  const t = translations[language];
  const experimentKeys = Object.keys(t.experiments) as Array<keyof typeof t.experiments>;

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="control-panel" dir={dir}>
      <div className="header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <button
          className="lang-toggle"
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
        >
          {language === 'ar' ? 'EN' : 'AR'}
        </button>
      </div>

      <div className="experiments-section">
        <h3>{language === 'ar' ? 'اختر التجربة' : 'Select Experiment'}</h3>
        <div className="experiments-grid">
          {experimentKeys.map((key) => (
            <button
              key={key}
              className={`experiment-btn ${currentExperiment === key ? 'active' : ''}`}
              onClick={() => setCurrentExperiment(key)}
              title={t.descriptions[key]}
            >
              {t.experiments[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h3>{language === 'ar' ? 'التحكم' : 'Controls'}</h3>

        <div className="control-group">
          <label>
            {t.controls['magnet-strength']}: {magnetStrength.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={magnetStrength}
            onChange={(e) => setMagnetStrength(parseFloat(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label>
            {t.controls['temperature']}: {temperature}°C
          </label>
          <input
            type="range"
            min="-50"
            max="500"
            step="10"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label>
            {t.controls['current']}: {current.toFixed(2)}A
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={current}
            onChange={(e) => setCurrent(parseFloat(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label>
            {t.controls['frequency']}: {frequency}Hz
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="description-section">
        <h4>{language === 'ar' ? 'الوصف' : 'Description'}</h4>
        <p>{t.descriptions[currentExperiment as keyof typeof t.descriptions]}</p>
      </div>
    </div>
  );
};
