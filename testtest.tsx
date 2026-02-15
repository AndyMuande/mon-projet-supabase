import React from 'react';

interface TestComponentProps {
  title?: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ title = "Test Component" }) => {
  return (
    <div className="test-component">
      <h1>{title}</h1>
      <p>This is a simple test component.</p>
      <p>Another paragraph added to the component.</p>
      <button onClick={() => console.log('Button clicked!')}>
        Click me
      </button>
    </div>
  );
};

export default TestComponent;