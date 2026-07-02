/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, BarChart3, Clock, User } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterTabsProps {
  onOpenAdd: () => void;
  onOpenDashboard: () => void;
  onOpenTimeline: () => void;
  onOpenProfile: () => void;
}

export default function FooterTabs({
  onOpenAdd,
  onOpenDashboard,
  onOpenTimeline,
  onOpenProfile,
}: FooterTabsProps) {
  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md h-18 bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex items-center justify-around px-4 z-40"
    >
      {/* Dashboard */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenDashboard}
        className="flex flex-col items-center justify-center w-12 h-12 text-slate-600 dark:text-slate-300 hover:text-[#2A7BAA] dark:hover:text-[#FF9A56] transition-colors"
        id="btn-dashboard"
      >
        <BarChart3 className="w-5.5 h-5.5" />
        <span className="text-[10px] font-medium mt-0.5">看板</span>
      </motion.button>

      {/* Timeline */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenTimeline}
        className="flex flex-col items-center justify-center w-12 h-12 text-slate-600 dark:text-slate-300 hover:text-[#2A7BAA] dark:hover:text-[#FF9A56] transition-colors"
        id="btn-timeline"
      >
        <Clock className="w-5.5 h-5.5" />
        <span className="text-[10px] font-medium mt-0.5">时光轴</span>
      </motion.button>

      {/* Main Add Button (Pulsing Center Icon) */}
      <div className="relative -top-5">
        <div className="absolute -inset-1.5 bg-linear-to-tr from-[#2A7BAA] to-[#FF9A56] rounded-full blur-md opacity-75 animate-pulse" />
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenAdd}
          className="relative w-15 h-15 bg-linear-to-tr from-[#2A7BAA] to-[#FF9A56] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          id="btn-add-footprint"
        >
          <Plus className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Me Profile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenProfile}
        className="flex flex-col items-center justify-center w-12 h-12 text-slate-600 dark:text-slate-300 hover:text-[#2A7BAA] dark:hover:text-[#FF9A56] transition-colors"
        id="btn-profile"
      >
        <User className="w-5.5 h-5.5" />
        <span className="text-[10px] font-medium mt-0.5">我的</span>
      </motion.button>
    </motion.div>
  );
}
