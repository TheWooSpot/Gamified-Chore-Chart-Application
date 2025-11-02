import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaGlobe, FaHeart, FaStar, FaTimes, FaArrowRight, FaCheck } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const EnhancedMarketplace = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReward, setSelectedReward] = useState(null);
  const [userPoints] = useState(1500);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('is_active', true)
        .order('points_cost', { ascending: true });

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (reward.location && reward.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || reward.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const impactProjects = filteredRewards.filter(r => r.type === 'impact_project');
  const regularRewards = filteredRewards.filter(r => r.type === 'regular_reward');

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🌟' },
    { value: 'education', label: 'Education', icon: '📚' },
    { value: 'health', label: 'Health', icon: '🏥' },
    { value: 'water', label: 'Water', icon: '💧' },
    { value: 'housing', label: 'Housing', icon: '🏠' },
    { value: 'energy', label: 'Energy', icon: '⚡' },
    { value: 'food', label: 'Food', icon: '🌾' },
  ];

  const RewardCard = ({ reward, index }) => {
    const isImpact = reward.type === 'impact_project';
    const canAfford = userPoints >= reward.points_cost;
    const fundingPercentage = isImpact && reward.funding_goal
      ? (reward.current_funding / reward.funding_goal) * 100
      : 0;

    return (
      <div
        className="card-impact relative group"
        onClick={() => setSelectedReward(reward)}
      >
        <div className="absolute top-4 right-4 z-10">
          {isImpact ? (
            <div className="bg-success/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaGlobe /> IMPACT
            </div>
          ) : (
            <div className="bg-secondary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaHeart /> REWARD
            </div>
          )}
        </div>

        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
          <img
            src={reward.image_url}
            alt={reward.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {isImpact && reward.location && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-text flex items-center gap-1">
              📍 {reward.location}
            </div>
          )}
        </div>

        <h3 className="font-display text-xl font-bold text-text mb-2 line-clamp-2">
          {reward.title}
        </h3>

        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {reward.description}
        </p>

        {isImpact && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Funding Progress</span>
              <span>{fundingPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-background-dark rounded-full overflow-hidden">
              <div
                style={{ width: `${fundingPercentage}%` }}
                className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-success font-bold">${reward.current_funding?.toLocaleString()}</span>
              <span className="text-text-muted">Goal: ${reward.funding_goal?.toLocaleString()}</span>
            </div>
            {reward.beneficiaries && (
              <p className="text-xs text-text-muted mt-2">
                👥 Helps {reward.beneficiaries} people
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-white/20">
          <div className="flex items-center gap-2">
            <FaStar className="text-accent text-xl" />
            <span className="font-display text-3xl font-bold text-primary">
              {reward.points_cost}
            </span>
            <span className="text-text-muted text-base">points</span>
          </div>

          <button
            className={`px-6 py-3 rounded-xl font-bold text-base transition-all duration-200 flex items-center gap-2 ${
              canAfford
                ? 'bg-gradient-to-r from-primary to-primary-light text-white'
                : 'bg-background-dark text-text-muted cursor-not-allowed'
            }`}
            disabled={!canAfford}
          >
            Redeem
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  };

  const RewardModal = ({ reward, onClose }) => {
    if (!reward) return null;

    const isImpact = reward.type === 'impact_project';
    const canAfford = userPoints >= reward.points_cost;
    const sponsorContribution = reward.points_cost * reward.sponsor_multiplier;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-text"
          >
            <FaTimes />
          </button>

          <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
            <img
              src={reward.image_url}
              alt={reward.title}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4">
              {isImpact ? (
                <div className="bg-success text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <FaGlobe /> GLOBAL IMPACT PROJECT
                </div>
              ) : (
                <div className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <FaHeart /> PERSONAL REWARD
                </div>
              )}
            </div>
          </div>

          <h2 className="font-display text-3xl font-bold text-text mb-4">
            {reward.title}
          </h2>

          {isImpact && reward.location && (
            <p className="text-lg text-text-muted mb-4 flex items-center gap-2">
              📍 <span className="font-semibold">{reward.location}</span>
            </p>
          )}

          <p className="text-text-muted mb-6 text-lg leading-relaxed">
            {reward.description}
          </p>

          {isImpact && (
            <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl p-6 mb-6">
              <h3 className="font-display text-xl font-bold text-text mb-4">Impact Details</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {reward.beneficiaries && (
                  <div className="text-center p-4 bg-white/50 rounded-xl">
                    <div className="text-3xl font-display font-bold text-primary">
                      {reward.beneficiaries}
                    </div>
                    <div className="text-sm text-text-muted">People Helped</div>
                  </div>
                )}
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-3xl font-display font-bold text-success">
                    ${sponsorContribution}
                  </div>
                  <div className="text-sm text-text-muted">Sponsor Match</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Funding Progress</span>
                  <span className="font-bold">
                    ${reward.current_funding?.toLocaleString()} / ${reward.funding_goal?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(reward.current_funding / reward.funding_goal) * 100}%` }}
                    className="h-full bg-gradient-to-r from-success via-primary to-secondary"
                  />
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <p className="text-sm text-text">
                  <strong>How it works:</strong> When you redeem {reward.points_cost} points for this project,
                  our sponsors will contribute <strong>${sponsorContribution}</strong> (${reward.sponsor_multiplier} per point)
                  to make this impact project a reality!
                </p>
              </div>
            </div>
          )}

          {!isImpact && reward.cash_value && (
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-secondary mb-2">
                  ${reward.cash_value}
                </div>
                <div className="text-sm text-text-muted">Approximate Value</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaStar className="text-accent text-2xl" />
                <span className="font-display text-4xl font-bold text-primary">
                  {reward.points_cost}
                </span>
                <span className="text-text-muted">points</span>
              </div>
              <div className="text-sm text-text-muted">
                You have: <span className="font-bold text-text">{userPoints} points</span>
              </div>
            </div>

            <button
              className={`btn ${
                canAfford
                  ? 'btn-primary'
                  : 'bg-background-dark text-text-muted cursor-not-allowed'
              }`}
              disabled={!canAfford}
            >
              {canAfford ? (
                <>
                  <FaCheck className="mr-2" /> Redeem Now
                </>
              ) : (
                <>Need {reward.points_cost - userPoints} more points</>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="mb-12 text-center">
        <h1 className="heading mb-4 animate-float">
          Global Impact Marketplace
        </h1>
        <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
          Redeem your chore points for amazing rewards or fund life-changing projects around the world.
          Every point makes a difference!
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="glass-card px-10 py-5">
            <div className="flex items-center gap-3">
              <FaStar className="text-accent text-3xl" />
              <div className="text-left">
                <div className="text-sm text-text-muted">Your Points</div>
                <div className="font-display text-3xl font-bold text-primary">{userPoints}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card mb-8 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search rewards and impact projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-5 text-lg bg-white/60 border-2 border-white/80 rounded-2xl text-text placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-glow-blue'
                  : 'bg-white/60 text-text-muted hover:bg-white/80'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('impact_project')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedType === 'impact_project'
                  ? 'bg-gradient-to-r from-success to-success-light text-white'
                  : 'bg-white/60 text-text-muted hover:bg-white/80'
              }`}
            >
              <FaGlobe className="inline mr-2" />
              Impact
            </button>
            <button
              onClick={() => setSelectedType('regular_reward')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedType === 'regular_reward'
                  ? 'bg-gradient-to-r from-secondary to-secondary-light text-white shadow-glow-pink'
                  : 'bg-white/60 text-text-muted hover:bg-white/80'
              }`}
            >
              <FaHeart className="inline mr-2" />
              Rewards
            </button>
          </div>
        </div>

        {selectedType !== 'regular_reward' && (
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-white/60 text-text-muted hover:bg-white/80'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-text-muted mt-4">Loading amazing rewards...</p>
        </div>
      ) : (
        <>
          {selectedType !== 'regular_reward' && impactProjects.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <FaGlobe className="text-success text-3xl" />
                <h2 className="section-title">Global Impact Projects</h2>
                <span className="badge badge-success">{impactProjects.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {impactProjects.map((reward, index) => (
                  <RewardCard key={reward.id} reward={reward} index={index} />
                ))}
              </div>
            </div>
          )}

          {selectedType !== 'impact_project' && regularRewards.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaHeart className="text-secondary text-3xl" />
                <h2 className="section-title">Personal Rewards</h2>
                <span className="badge badge-secondary">{regularRewards.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularRewards.map((reward, index) => (
                  <RewardCard key={reward.id} reward={reward} index={index} />
                ))}
              </div>
            </div>
          )}

          {filteredRewards.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-display font-bold text-text mb-2">No results found</h3>
              <p className="text-text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {selectedReward && (
          <RewardModal reward={selectedReward} onClose={() => setSelectedReward(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMarketplace;
