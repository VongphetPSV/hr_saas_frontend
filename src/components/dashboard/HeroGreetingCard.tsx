import React from 'react';

interface HeroGreetingCardProps {
  name: string;
  role?: string;
}

const HeroGreetingCard: React.FC<HeroGreetingCardProps> = ({ name, role }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="w-full bg-purple-600 rounded-xl p-6 md:p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {getGreeting()}, {name}! 👋
        </h1>
        {role && (
          <p className="text-purple-200 text-sm md:text-base">
            {role}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroGreetingCard;
