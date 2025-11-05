import React, { useState } from 'react';
import { Users, Star, Leaf } from 'lucide-react';

const membersData = [
  { id: 1, name: "Alice Green", badges: 5, status: "Active", avatar: "", isFollowing: false },
  { id: 2, name: "Bob Eco", badges: 12, status: "Offline", avatar: "", isFollowing: true },
  { id: 3, name: "Charlie Planet", badges: 8, status: "Active", avatar: "", isFollowing: false },
  { id: 4, name: "Diana Leaf", badges: 3, status: "Active", avatar: "", isFollowing: false },
  { id: 5, name: "Ethan Forest", badges: 10, status: "Offline", avatar: "", isFollowing: true },
  { id: 6, name: "Fiona Earth", badges: 7, status: "Active", avatar: "", isFollowing: false }
];

const Community = () => {
  const [members, setMembers] = useState(membersData);
  const [search, setSearch] = useState("");

  const toggleFollow = (id) => {
    setMembers(members.map(m => m.id === id ? { ...m, isFollowing: !m.isFollowing } : m));
  };

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Users className="w-8 h-8 text-green-500" />
            <span>Community</span>
          </h1>
          <div className="text-gray-600">Connect with eco-friendly members!</div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{members.length}</div>
              <div className="text-gray-600 text-sm">Total Members</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{members.filter(m => m.status === "Active").length}</div>
              <div className="text-gray-600 text-sm">Active Members</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{Math.max(...members.map(m => m.badges))}</div>
              <div className="text-gray-600 text-sm">Top Badges</div>
            </div>
          </div>
        </div>

        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl font-bold text-green-600">
                {member.avatar || member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
              <div className="text-gray-600 text-sm mb-4">{member.badges} badges • {member.status}</div>
              <button
                onClick={() => toggleFollow(member.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  member.isFollowing ? 'bg-gray-200 text-gray-700' : 'bg-green-500 text-white'
                } transition-colors`}
              >
                {member.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
