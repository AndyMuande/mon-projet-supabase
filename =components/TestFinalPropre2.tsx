=import React from 'react';

interface TestFinalPropre2Props {
  content?: string;
}

const TestFinalPropre2: React.FC<TestFinalPropre2Props> = ({
  content = "Contenu par défaut du composant 2"
}) => {
  return (
    <div className="test-final-propre2-component">
      <h3>{content}</h3>
      <p>Ceci est un deuxième composant simple.</p>
      <ul>
        <li>Élément 1</li>
        <li>Élément 2</li>
        <li>Élément 3</li>
      </ul>
    </div>
  );
};

export default TestFinalPropre2;