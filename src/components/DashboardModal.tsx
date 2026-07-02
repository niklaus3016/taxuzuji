/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, BarChart3, TrendingUp, PieChart as PieIcon, MapPin, Navigation, Calendar } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Footprint, MapTheme, TripType } from '../types';

interface DashboardModalProps {
  theme: MapTheme;
  onClose: () => void;
  footprints: Footprint[];
  key?: any;
}

const TRIP_TYPE_MAP: Record<TripType, { label: string; color: string; emoji: string }> = {
  tourism: { label: '旅游', color: '#10B981', emoji: '🌴' }, // Emerald
  work: { label: '工作', color: '#0EA5E9', emoji: '💻' }, // Sky
  business: { label: '出差', color: '#6366F1', emoji: '💼' }, // Indigo
  family: { label: '探亲', color: '#EC4899', emoji: '🏡' }, // Pink
  study: { label: '求学', color: '#8B5CF6', emoji: '🎓' }, // Purple
  other: { label: '其他', color: '#F59E0B', emoji: '✨' }, // Amber
};

export default function DashboardModal({ theme, onClose, footprints }: DashboardModalProps) {
  // 1. Calculations
  const totalTrips = footprints.length;

  // Track unique cities visited
  const uniqueCities = React.useMemo(() => {
    return Array.from(new Set(footprints.map((f) => f.cityId)));
  }, [footprints]);

  // Track unique provinces visited
  const uniqueProvinces = React.useMemo(() => {
    return Array.from(new Set(footprints.map((f) => f.provinceName)));
  }, [footprints]);

  const currentYearTrips = React.useMemo(() => {
    const cy = new Date().getFullYear().toString();
    return footprints.filter((f) => f.visitDate.startsWith(cy)).length;
  }, [footprints]);

  // Frequently visited cities leaderboards
  const frequentCities = React.useMemo(() => {
    const map: Record<string, { name: string; prov: string; count: number }> = {};
    footprints.forEach((f) => {
      if (!map[f.cityId]) {
        map[f.cityId] = { name: f.cityName, prov: f.provinceName, count: 0 };
      }
      map[f.cityId].count += 1;
    });

    return Object.values(map)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [footprints]);

  // Travel Type shares data (Pie chart)
  const pieData = React.useMemo(() => {
    const map: Record<TripType, number> = {
      tourism: 0,
      work: 0,
      business: 0,
      family: 0,
      study: 0,
      other: 0,
    };

    footprints.forEach((f) => {
      map[f.tripType] = (map[f.tripType] || 0) + 1;
    });

    return Object.entries(map)
      .map(([type, value]) => ({
        name: TRIP_TYPE_MAP[type as TripType].label,
        value,
        color: TRIP_TYPE_MAP[type as TripType].color,
        emoji: TRIP_TYPE_MAP[type as TripType].emoji,
      }))
      .filter((item) => item.value > 0);
  }, [footprints]);

  // Annual Trends trend line (Area Chart)
  const areaData = React.useMemo(() => {
    const map: Record<string, number> = {};
    footprints.forEach((f) => {
      const year = f.visitDate.substring(0, 4);
      if (year) {
        map[year] = (map[year] || 0) + 1;
      }
    });

    // Ensure we sort years chronologically
    return Object.entries(map)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [footprints]);

  return (
    <motion.div
      initial={{ x: '100vw', opacity: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100vw', opacity: 0.8 }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className={`fixed inset-0 z-55 flex flex-col w-screen h-screen overflow-hidden ${theme.bgClass} ${theme.textColorClass}`}
    >
      {/* Premium secondary Header bar with styled back navigation button */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-250/20 dark:border-slate-800/85 backdrop-blur-xl bg-blend-normal">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-250/50 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer border border-slate-200/40 dark:border-slate-700/40"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        </motion.button>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-[#2A7BAA]">
            <BarChart3 className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#2A7BAA] via-[#1F2937] dark:via-white to-[#FF9A56] select-none">
              足迹数据看板
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">足迹数据实时解析统计</p>
          </div>
        </div>
      </div>

      {/* Content body with centered max-width layout for beautiful viewport preservation */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-6 sm:py-8 space-y-6 sm:space-y-8" id="dashboard-scrollable">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Quick Stats Grid bento layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Box 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm border ${
                theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">总到访城市</span>
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#FF9A56]">
                  {uniqueCities.length} <span className="text-xs font-semibold text-slate-400">个</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">占比全国地级市 {( (uniqueCities.length / 340) * 100 ).toFixed(1)}%</p>
              </div>
            </motion.div>

            {/* Stat Box 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm border ${
                theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">到达省份/直辖市</span>
                <div className="w-7.5 h-7.5 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#2A7BAA]">
                  {uniqueProvinces.length} <span className="text-xs font-semibold text-slate-400">个</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">占比全国行政区 {( (uniqueProvinces.length / 34) * 100 ).toFixed(1)}%</p>
              </div>
            </motion.div>

            {/* Stat Box 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm border ${
                theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">总出行次数</span>
                <div className="w-7.5 h-7.5 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                  {totalTrips} <span className="text-xs font-semibold text-slate-400">次</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">行万里路，用记忆点亮旅程</p>
              </div>
            </motion.div>

            {/* Stat Box 4 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm border ${
                theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">本年出行轨迹</span>
                <div className="w-7.5 h-7.5 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                  {currentYearTrips} <span className="text-xs font-semibold text-slate-400">次</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">今年度新增足迹数量</p>
              </div>
            </motion.div>
          </div>

          {/* Visual Charts Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Travel Type Share Chart (Pie) */}
            <div className={`p-5 sm:p-6 rounded-3xl border ${
              theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                  <PieIcon className="w-4 h-4 text-[#2A7BAA]" /> 探游方式分布比例
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <div className="w-full h-48 select-none sm:h-56">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={48}
                          outerRadius={68}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      暂无数据比例
                    </div>
                  )}
                </div>
                {/* Custom legends list */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {pieData.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{entry.emoji}</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{entry.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{entry.value}次</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Cities Leaderboards scoreboard list */}
          <div className={`p-5 sm:p-6 rounded-3xl border ${
            theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'
          }`}>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-5 leading-none">
              <Trophy className="w-4 h-4 text-amber-500" /> 最常造访城市排行榜
            </h3>
            <div className="space-y-3">
              {frequentCities.length > 0 ? (
                frequentCities.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-[#2A7BAA] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10' :
                        index === 1 ? 'bg-slate-200 text-slate-800 dark:bg-slate-200/10' :
                        index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/10' :
                        'bg-slate-100 text-slate-400 dark:bg-slate-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{item.prov}省</span>
                      </div>
                    </div>
                    {/* Progress Bar visual indicator */}
                    <div className="flex items-center gap-3 w-1/3">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                           className="h-full bg-gradient-to-r from-[#2A7BAA] to-[#FF9A56] rounded-full"
                          style={{
                            width: `${(item.count / frequentCities[0].count) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold shrink-0">{item.count}次记载</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  尚未记录足迹，快去添加点亮第一个城市吧！
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
