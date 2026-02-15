import React from 'react';

interface TestFinalPropreProps {
  message?: string;
}

const TestFinalPropre: React.FC<TestFinalPropreProps> = ({ message = "Composant final propre" }) => {
  return (
    <div className="test-final-propre">
      <h1>{message}</h1>
      <p>Ce composant est créé dans le dossier components/ comme il se doit.</p>
      <button onClick={() => console.log('Composant final propre cliqué!')}>
        Cliquez-moi
      </button>
    </div>
  );
};

export default TestFinalPropre;