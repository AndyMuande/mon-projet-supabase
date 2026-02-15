=import React from 'react';

interface BotProps {
  name?: string;
  status?: 'online' | 'offline' | 'busy';
}

const Bot: React.FC<BotProps> = ({ 
  name = "Assistant IA", 
  status = "online" 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'En ligne';
      case 'offline': return 'Hors ligne';
      case 'busy': return 'Occupé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="bot-component">
      <div className="bot-header">
        <div className={`status-dot ${getStatusColor(status)}`}></div>
        <h3 className="bot-name">{name}</h3>
      </div>
      <div className="bot-content">
        <p className="bot-status">{getStatusText(status)}</p>
        <div className="bot-actions">
          <button className="bot-button primary">Parler</button>
          <button className="bot-button secondary">Configurer</button>
        </div>
      </div>
      <div className="bot-footer">
        <span>🤖 Assistant intelligent</span>
      </div>
    </div>
  );
};

export default Bot;