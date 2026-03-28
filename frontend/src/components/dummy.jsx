function dummy() {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-2xl font-semibold mb-1">Total Achievements</h1>
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-gray-600"></p>
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
          <div className="flex space-x-1 overflow-x-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Earned Badges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
                  >
                    <div className="absolute top-4 right-4">
                      {/* <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityColor(badge.rarity)}`}>
                    {getRarityBadgeText(badge.rarity)}
                  </span> */}
                    </div>
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 `}
                    >
                      {badge.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {badge.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {badge.description}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {badge.points} points
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
