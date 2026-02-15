=import React from 'react';

interface TestFinalProps {
  title?: string;
}

const TestFinal: React.FC<TestFinalProps> = ({ title = "Composant TestFinal" }) => {
  return (
    <div className="test-final-component">
      <h2>{title}</h2>
      <p>Ce composant a été créé avec succès !</p>
      <div className="test-final-content">
        <span>✅ Fonctionnel</span>
        <span>📦 Réutilisable</span>
        <span>🎨 Stylé avec CSS</span>
      </div>
    </div>
  );
};

export default TestFinal;