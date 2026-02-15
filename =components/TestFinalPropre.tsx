=import React from 'react';

interface TestFinalPropreProps {
  title?: string;
}

const TestFinalPropre: React.FC<TestFinalPropreProps> = ({
  title = "Composant Final Propre"
}) => {
  return (
    <div className="test-final-propre-component">
      <h2>{title}</h2>
      <p>Ceci est un composant simple et propre.</p>
      <button className="test-button">Cliquez ici</button>
    </div>
  );
};

export default TestFinalPropre;