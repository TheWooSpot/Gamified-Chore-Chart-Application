import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaHeart, FaDollarSign, FaUsers, FaChartLine, FaTrophy } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const SponsorDashboard = () => {
  const [stats, setStats] = useState({
    totalDonated: 0,
    projectsFunded: 0,
    peopleBenefited: 0,
    childrenHelped: 0,
  });
  const [impactProjects, setImpactProjects] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: projects, error: projectsError } = await supabase
        .from('rewards')
        .select('*')
        .eq('type', 'impact_project')
        .eq('is_active', true)
        .order('current_funding', { ascending: false })
        .limit(10);

      if (projectsError) throw projectsError;

      setImpactProjects(projects || []);

      const totalBeneficiaries = projects?.reduce((sum, p) => sum + (p.beneficiaries || 0), 0) || 0;
      const totalFunding = projects?.reduce((sum, p) => sum + (p.current_funding || 0), 0) || 0;

      setStats({
        totalDonated: totalFunding,
        projectsFunded: projects?.filter(p => p.current_funding > 0).length || 0,
        peopleBenefited: totalBeneficiaries,
        childrenHelped: 156,
      });

      const { data: activity, error: activityError } = await supabase
        .from('activity_feed')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!activityError) {
        setRecentActivity(activity || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 hover:scale-105 transition-transform"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
        <Icon className="text-white text-2xl" />
      </div>
      <h3 className="text-text-muted text-sm font-semibold mb-1">{title}</h3>
      <div className="font-display text-4xl font-bold text-text mb-1">{value}</div>
      {subtitle && <p className="text-text-muted text-xs">{subtitle}</p>}
    </motion.div>
  );

  const ImpactProjectCard = ({ project }) => {
    const progress = project.funding_goal
      ? (project.current_funding / project.funding_goal) * 100
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 hover:bg-white/80 transition-all"
      >
        <div className="flex gap-4">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-text text-lg truncate">{project.title}</h4>
                <p className="text-sm text-text-muted truncate">{project.location}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-success/20 text-success-dark whitespace-nowrap ml-2">
                {project.category}
              </span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Progress</span>
                <span className="font-bold">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-background-dark rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs">
                <div>
                  <span className="text-text-muted">Raised:</span>
                  <span className="font-bold text-success ml-1">
                    ${project.current_funding?.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Goal:</span>
                  <span className="font-bold text-text ml-1">
                    ${project.funding_goal?.toLocaleString()}
                  </span>
                </div>
              </div>
              {project.beneficiaries && (
                <div className="text-xs text-text-muted flex items-center gap-1">
                  <FaUsers className="text-primary" />
                  {project.beneficiaries}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <FaHeart className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="heading text-4xl">Sponsor Dashboard</h1>
            <p className="text-xl text-text-muted">Track your impact and change lives</p>
          </div>
        </div>

        <div className="glass-card p-6 bg-gradient-to-r from-success/10 to-primary/10">
          <p className="text-text leading-relaxed">
            Welcome to the Chore Champions Sponsor Portal! Your generous contributions convert children's chore
            points into real-world impact. Every dollar you donate funds life-changing projects around the globe,
            while teaching children the value of hard work and global citizenship.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={FaDollarSign}
          title="Total Donated"
          value={`$${stats.totalDonated.toLocaleString()}`}
          subtitle="All-time contributions"
          gradient="from-success to-success-dark"
        />
        <StatCard
          icon={FaGlobe}
          title="Projects Funded"
          value={stats.projectsFunded}
          subtitle="Active impact projects"
          gradient="from-primary to-primary-dark"
        />
        <StatCard
          icon={FaUsers}
          title="People Benefited"
          value={stats.peopleBenefited.toLocaleString()}
          subtitle="Lives changed worldwide"
          gradient="from-secondary to-secondary-dark"
        />
        <StatCard
          icon={FaTrophy}
          title="Children Helped"
          value={stats.childrenHelped}
          subtitle="Kids learning & earning"
          gradient="from-accent to-accent-dark"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-primary text-3xl" />
              <h2 className="section-title">Active Impact Projects</h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {impactProjects.map(project => (
                  <ImpactProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="section-title mb-6">How Sponsorship Works</h2>

            <div className="space-y-4">
              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-display text-xl font-bold mb-3">
                  1
                </div>
                <h3 className="font-bold text-text mb-2">Children Earn Points</h3>
                <p className="text-sm text-text-muted">
                  Kids complete household chores and earn points based on difficulty and time.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-white flex items-center justify-center font-display text-xl font-bold mb-3">
                  2
                </div>
                <h3 className="font-bold text-text mb-2">Points for Impact</h3>
                <p className="text-sm text-text-muted">
                  Children redeem points for impact projects instead of personal rewards.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-success-dark text-white flex items-center justify-center font-display text-xl font-bold mb-3">
                  3
                </div>
                <h3 className="font-bold text-text mb-2">Sponsors Match</h3>
                <p className="text-sm text-text-muted">
                  Your contribution (typically $10 per point) converts points into real funding.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center font-display text-xl font-bold mb-3">
                  4
                </div>
                <h3 className="font-bold text-text mb-2">Global Impact</h3>
                <p className="text-sm text-text-muted">
                  Funds are used to build schools, provide clean water, and change lives.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 mt-6 bg-gradient-to-r from-primary/20 to-secondary/20">
              <h3 className="font-display text-xl font-bold text-text mb-3">Become a Sponsor</h3>
              <p className="text-sm text-text-muted mb-4">
                Join our community of sponsors making a difference. Set your own contribution level and
                watch your impact grow.
              </p>
              <button className="btn-primary w-full">
                Start Sponsoring
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-8 bg-gradient-to-r from-success/10 via-primary/10 to-secondary/10"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-text mb-4">
            Every Contribution Matters
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            You're not just funding projects—you're teaching children about global citizenship, empathy,
            and the power of their actions. Together, we're building a generation that works hard and
            gives back.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SponsorDashboard;
