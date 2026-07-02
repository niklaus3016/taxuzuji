/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Compass, ArrowRight, MapPin } from 'lucide-react';
import { Footprint, MapTheme, TripType, Province, City } from '../types';
import { provincesData } from '../data/chinaProvinces';

interface TimelineModalProps {
  theme: MapTheme;
  onClose: () => void;
  footprints: Footprint[];
  onSelectCity: (city: City, province: Province) => void;
  key?: any;
}

const TRIP_TYPE_NAMES: Record<TripType, { label: string; bg: string; text: string; emoji: string }> = {
  tourism: { label: '旅游', bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-300', emoji: '🌴' },
  work: { label: '工作', bg: 'bg-sky-50 dark:bg-sky-500/10', text: 'text-sky-700 dark:text-sky-300', emoji: '💻' },
  business: { label: '出差', bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-300', emoji: '💼' },
  family: { label: '探亲', bg: 'bg-pink-50 dark:bg-pink-500/10', text: 'text-pink-700 dark:text-pink-300', emoji: '🏡' },
  study: { label: '求学', bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-700 dark:text-purple-300', emoji: '🎓' },
  other: { label: '其他', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-300', emoji: '✨' },
};

export default function TimelineModal({
  theme,
  onClose,
  footprints,
  onSelectCity,
}: TimelineModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Sort footprints by date from newest to oldest
  const sortedFootprints = React.useMemo(() => {
    return [...footprints].sort((a, b) => b.visitDate.localeCompare(a.visitDate));
  }, [footprints]);

  // Handle scrolling status to populate timeline vertical indicators
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const totalScroll = el.scrollHeight - el.clientHeight;
    if (totalScroll <= 0) return;
    const currentScrollPercent = (el.scrollTop / totalScroll) * 100;
    setScrollPercent(currentScrollPercent);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Run once initially to check values
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [footprints]);

  const handleCityClick = (cityId: string, provinceName: string) => {
    // Look up City & Province
    let foundCity: City | undefined;
    let foundProv: Province | undefined;

    provincesData.forEach((prov) => {
      const c = prov.cities.find((city) => city.id === cityId);
      if (c && prov.name === provinceName) {
        foundCity = c;
        foundProv = prov;
      }
    });

    if (foundCity && foundProv) {
      onSelectCity(foundCity, foundProv);
    }
  };

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
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF9A56]">
            <Compass className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#2A7BAA] via-[#1F2937] dark:via-white to-[#FF9A56] select-none">
              足迹时光轴
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">时间流沙中的每一步重现</p>
          </div>
        </div>
      </div>

      {/* Centered timeline container with full-height fluid layout */}
      <div className="flex-1 w-full max-w-xl mx-auto relative overflow-hidden flex">
          {/* Scrollable container with vertical timeline side panel */}
          {sortedFootprints.length > 0 ? (
            <>
              {/* Left sidebar space serving as the timeline progress bar bar */}
              <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 pointer-events-none">
                {/* Dynamically expanding progress level highlight */}
                <div
                  className="w-full bg-gradient-to-b from-[#2A7BAA] to-[#FF9A56] rounded-full transition-all duration-100 ease-out"
                  style={{ height: `${scrollPercent}%` }}
                />
              </div>

              {/* Infinite Chrono records container */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-none"
                style={{ scrollBehavior: 'smooth' }}
                id="timeline-scroller"
              >
                {sortedFootprints.map((fp, idx) => {
                  const tagDetails = TRIP_TYPE_NAMES[fp.tripType];

                  return (
                    <motion.div
                      key={fp.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                      className="relative pl-8 flex flex-col group"
                    >
                      {/* Interactive Time Stamp Node */}
                      <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-white dark:bg-slate-900 border-2 border-[#2A7BAA] group-hover:scale-125 group-hover:border-[#FF9A56] z-10 transition-all duration-300" />

                      {/* Content Round Card */}
                      <motion.div
                        whileHover={{ y: -3, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleCityClick(fp.cityId, fp.provinceName)}
                        className={`p-4 rounded-2xl shadow-sm border text-left cursor-pointer transition-all ${
                          theme.id === 'dark'
                            ? 'bg-slate-950/70 hover:bg-slate-950 border-slate-850 hover:border-slate-700'
                            : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        {/* Title details */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {fp.visitDate}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">· {fp.provinceName}</span>
                          </div>

                          {/* Mode/trip type micro badges */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border ${tagDetails.bg} ${tagDetails.text}`}>
                            <span>{tagDetails.emoji}</span>
                            <span>{tagDetails.label}</span>
                          </span>
                        </div>

                        {/* City Details indicator */}
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            {fp.cityName}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-0.5 group-hover:text-[#2A7BAA] transition-colors">
                            查看足迹卡片 <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Story remarks */}
                        {fp.remark && (
                          <p className="mt-2 text-xs text-slate-500 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {fp.remark}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '60s' }} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">时光轴中还没有足迹</p>
                <p className="text-xs text-slate-400">轻按地图或下方添加按钮，开始记录您的生活轨迹</p>
              </div>
            </div>
          )}
      </div>
    </motion.div>
  );
}
