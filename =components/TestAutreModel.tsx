=import React from 'react';

interface TestAutreModelProps {
  message?: string;
}

const TestAutreModel: React.FC<TestAutreModelProps> = ({
  message = "Ceci est un autre modèle de composant."
}) => {
  return (
    <div className="test-autre-model-component">
      <h3>{message}</h3>
      <p>Ce composant est un exemple simple.</p>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
        <li>Point 3</li>
      </ul>
    </div>
  );
};

export default TestAutreModel;