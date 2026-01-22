import { motion } from 'framer-motion';
import { Trophy, Target, Lock } from 'lucide-react';
import { getUnlockedBadges, getNextBadges, getAllObjectivesProgress } from '../utils/achievements';

export const BadgesAndObjectives = ({ stats }) => {
  const unlockedBadges = getUnlockedBadges(stats);
  const nextBadges = getNextBadges(stats);
  const objectives = getAllObjectivesProgress(stats);

  return (
    <div className="space-y-4">
      {/* Objectives Section */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Objectifs</h3>
        </div>
        <div className="space-y-3">
          {objectives.map((objective) => (
            <ObjectiveCard key={objective.id} objective={objective} />
          ))}
        </div>
      </div>

      {/* Unlocked Badges Section */}
      {unlockedBadges.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">
              Badges débloqués ({unlockedBadges.length})
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {unlockedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} unlocked={true} />
            ))}
          </div>
        </div>
      )}

      {/* Next Badges Section */}
      {nextBadges.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-300">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
              Prochains badges
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {nextBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} unlocked={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ObjectiveCard = ({ objective }) => {
  const { progress } = objective;
  const isCompleted = progress.completed;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-3 rounded-xl border-2 transition-all ${
        isCompleted
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-2xl flex-shrink-0 ${isCompleted ? 'animate-bounce' : ''}`}>
          {objective.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-semibold text-sm text-gray-800 truncate">
              {objective.name}
            </div>
            {isCompleted && (
              <div className="flex-shrink-0 ml-2 text-green-600 font-bold text-xs">
                ✓ Complété
              </div>
            )}
          </div>
          <div className="text-xs text-gray-600 mb-2">
            {objective.description}
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${objective.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <div className="text-xs font-medium text-gray-600">
              {progress.current} / {progress.target}
            </div>
            <div className="text-xs font-bold text-indigo-600">
              {progress.percentage}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BadgeCard = ({ badge, unlocked }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: unlocked ? 1.05 : 1 }}
      whileTap={{ scale: unlocked ? 0.95 : 1 }}
      className={`relative p-3 rounded-xl text-center transition-all ${
        unlocked
          ? `bg-gradient-to-br ${badge.color} shadow-md`
          : 'bg-gray-200 opacity-50'
      }`}
    >
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl">
          <Lock className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div className={`text-3xl mb-1 ${unlocked ? '' : 'filter grayscale'}`}>
        {badge.icon}
      </div>
      
      <div className={`text-xs font-bold mb-0.5 ${
        unlocked ? 'text-white' : 'text-gray-600'
      }`}>
        {badge.name}
      </div>
      
      <div className={`text-[10px] leading-tight ${
        unlocked ? 'text-white text-opacity-90' : 'text-gray-500'
      }`}>
        {badge.description}
      </div>
    </motion.div>
  );
};
