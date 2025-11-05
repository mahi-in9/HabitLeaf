import React, { useState } from 'react';
import { Trophy, Star, Calendar, Droplets, Users, Zap, Leaf, Bus, Award, Target, Flame, Globe } from 'lucide-react';
import share from "../assets/share1.svg";

const Achievements = () => {
  const [activeTab, setActiveTab] = useState('all-badges');

  const stats = {
    badgesEarned: 4,
    totalPoints: 500,
    completionRate: 40,
    globalRank: 47
  };

  const earnedBadges = [
    { id: 1, name: "First Step", description: "Complete your first eco-friendly habit", points: 50, icon: <Award className="w-6 h-6" />, earnedDate: "1/15/2024", rarity: "common", type: 'habit' },
    { id: 2, name: "7-Day Streak", description: "Maintain a habit streak for 7 consecutive days", points: 100, icon: <Calendar className="w-6 h-6" />, earnedDate: "1/22/2024", rarity: "common", type: 'streak' },
    { id: 3, name: "Water Saver", description: "Complete 30 water conservation habits", points: 200, icon: <Droplets className="w-6 h-6" />, earnedDate: "2/1/2024", rarity: "uncommon", type: 'milestone' },
    { id: 4, name: "Energy Efficient", description: "Complete 25 energy saving habits", points: 150, icon: <Zap className="w-6 h-6" />, earnedDate: "2/10/2024", rarity: "uncommon", type: 'milestone' }
  ];

  const progressBadges = [
    { id: 5, name: "30-Day Streak", description: "Maintain a habit streak for 30 consecutive days", points: 500, icon: <Flame className="w-6 h-6" />, progress: 7, total: 30, rarity: "rare", type: 'streak' },
    { id: 6, name: "Eco Champion", description: "Complete 100 habits across all categories", points: 1000, icon: <Trophy className="w-6 h-6" />, progress: 65, total: 100, rarity: "legendary", type: 'milestone' },
    { id: 7, name: "Community Leader", description: "Help 10 friends join EcoGoals", points: 750, icon: <Users className="w-6 h-6" />, progress: 2, total: 10, rarity: "epic", type: 'social' },
    { id: 8, name: "Planet Guardian", description: "Save 10kg of CO₂ through your habits", points: 800, icon: <Globe className="w-6 h-6" />, progress: 7.8, total: 10, rarity: "epic", type: 'impact' },
    { id: 9, name: "Plastic-Free Week", description: "Avoid single-use plastics for 7 consecutive days", points: 300, icon: <Leaf className="w-6 h-6" />, progress: 4, total: 7, rarity: "rare", type: 'habit' },
    { id: 10, name: "Green Transport Hero", description: "Use eco-friendly transport for 50 trips", points: 250, icon: <Bus className="w-6 h-6" />, progress: 18, total: 50, rarity: "uncommon", type: 'habit' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'uncommon': return 'bg-green-100 text-green-800 border-green-200';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRarityBadgeText = (rarity) => rarity.charAt(0).toUpperCase() + rarity.slice(1);

  const tabs = [
    { id: 'all-badges', name: 'All Badges', icon: <Award className="w-4 h-4" /> },
    { id: 'milestones', name: 'Milestones', icon: <Target className="w-4 h-4" />, type: 'milestone' },
    { id: 'streaks', name: 'Streaks', icon: <Flame className="w-4 h-4" />, type: 'streak' },
    { id: 'habits', name: 'Habits', icon: <Calendar className="w-4 h-4" />, type: 'habit' },
    { id: 'challenges', name: 'Challenges', icon: <Star className="w-4 h-4" />, type: 'challenge' },
    { id: 'social', name: 'Social', icon: <Users className="w-4 h-4" />, type: 'social' },
    { id: 'impact', name: 'Impact', icon: <Globe className="w-4 h-4" />, type: 'impact' }
  ];

  // Filter badges based on active tab
  const filterBadges = (badges) => {
    if (activeTab === 'all-badges') return badges;
    const tab = tabs.find(t => t.id === activeTab);
    return badges.filter(b => b.type === tab.type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-semibold mb-1">Your Achievements</h1>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-600">Celebrate your eco-friendly milestones and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.badgesEarned}</div>
            <div className="text-gray-600 text-sm">Badges Earned</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalPoints}</div>
            <div className="text-gray-600 text-sm">Total Points</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.completionRate}%</div>
            <div className="text-gray-600 text-sm">Completion Rate</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.globalRank}</div>
            <div className="text-gray-600 text-sm">Global Rank</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                    activeTab === tab.id ? 'bg-green-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Earned Badges */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterBadges(earnedBadges).map(badge => (
              <div key={badge.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityColor(badge.rarity)}`}>
                    {getRarityBadgeText(badge.rarity)}
                  </span>
                </div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${getRarityColor(badge.rarity).split(' ')[0]}`}>
                  {badge.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{badge.points} points</span>
                </div>
                <div className="mt-3 text-xs text-green-600">✓ Earned on {badge.earnedDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Badges */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterBadges(progressBadges).map(badge => (
              <div key={badge.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityColor(badge.rarity)}`}>
                    {getRarityBadgeText(badge.rarity)}
                  </span>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">{badge.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {badge.progress}/{badge.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((badge.progress / badge.total) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{badge.points} points</span>
                </div>
                
              </div>
              
            ))}
          </div>
          <div className="mt-8 rounded-2xl shadow-md p-8 bg-gradient-to-r from-green-500 to-green-700 flex flex-col md:flex-row items-center justify-between text-white">
      <div>
        <h2 className="text-2xl font-bold mb-2">Keep Going! 🌟</h2>
        <p className="text-green-100 max-w-md">
          You're making incredible progress on your eco journey. Every habit counts
          towards a more sustainable future!
        </p>
        <div className="flex gap-12 mt-6 text-center">
          <div>
            <p className="text-3xl font-bold">6</p>
            <p className="text-green-100 text-sm">Badges to unlock</p>
          </div>
          <div>
            <p className="text-3xl font-bold">3,600</p>
            <p className="text-green-100 text-sm">Points available</p>
          </div>
        </div>
      </div>
      <button className="mt-6 md:mt-0 px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-gray-100 flex items-center space-x-2">
       <img src={share} alt="" className="w-7 h-7" />
        <span>Share Achievements</span>
      </button>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
