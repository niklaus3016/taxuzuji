/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Tag, Trash2, Edit2, Share2, Award, Sparkles, Navigation } from 'lucide-react';
import { Province, City, Footprint, MapTheme, TripType } from '../types';

interface CityDetailsModalProps {
  theme: MapTheme;
  city: City;
  province: Province;
  onClose: () => void;
  footprints: Footprint[];
  onDeleteFootprint: (id: string) => void;
  onEditFootprint: (footprint: Footprint) => void;
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

export default function CityDetailsModal({
  theme,
  city,
  province,
  onClose,
  footprints,
  onDeleteFootprint,
  onEditFootprint,
}: CityDetailsModalProps) {
  // Filter footprints corresponding to this city
  const cityFootprints = React.useMemo(() => {
    return footprints
      .filter((fp) => fp.cityId === city.id)
      .sort((a, b) => b.visitDate.localeCompare(a.visitDate));
  }, [footprints, city]);

  // Aggregate visiting years
  const availableYears = React.useMemo(() => {
    const yearsSet = new Set<string>();
    cityFootprints.forEach((f) => {
      const yr = f.visitDate.substring(0, 4);
      if (yr) yearsSet.add(yr);
    });
    return ['全部', ...Array.from(yearsSet).sort((a, b) => b.localeCompare(a))];
  }, [cityFootprints]);

  const [selectedYear, setSelectedYear] = useState<string>('全部');
  const [createdPosterUrl, setCreatedPosterUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Filter current displayed list based on year tab selections
  const displayedFootprints = React.useMemo(() => {
    if (selectedYear === '全部') return cityFootprints;
    return cityFootprints.filter((f) => f.visitDate.startsWith(selectedYear));
  }, [cityFootprints, selectedYear]);

  // Basic stats
  const totalVisits = cityFootprints.length;
  const firstVisit = cityFootprints[cityFootprints.length - 1]?.visitDate || '-';
  const lastVisit = cityFootprints[0]?.visitDate || '-';

  // Programmatic custom Poster Drawer via HTML Canvas
  const handleGeneratePoster = () => {
    setIsGenerating(true);
    setCreatedPosterUrl(null);

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsGenerating(false);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsGenerating(false);
        return;
      }

      // 1. Draw elegant background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 700);
      grad.addColorStop(0, '#1E293B'); // slate dark colors
      grad.addColorStop(0.5, '#0F172A');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 500, 700);

      // 2. Draw outer aesthetic framing borders
      ctx.strokeStyle = 'rgba(255, 154, 86, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, 20, 460, 660);

      ctx.strokeStyle = 'rgba(42, 123, 170, 0.3)';
      ctx.strokeRect(25, 25, 450, 650);

      // 3. Header Stamp logo details
      ctx.fillStyle = '#FFA07A';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText('踏序足迹 · PERSONAL FOOTPRINTS', 45, 60);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(45, 75, 410, 1.2);

      // 4. Main Big title (City Name)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px System-UI, sans-serif';
      ctx.fillText(city.name, 45, 135);

      ctx.fillStyle = '#FF9A56';
      ctx.font = 'bold 12px Mono, sans-serif';
      ctx.fillText(`PROVINCE: ${province.name.toUpperCase()}`, 45, 160);

      // 5. Statistics Boxes
      // Box backdrop
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(45, 185, 410, 110);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeRect(45, 185, 410, 110);

      ctx.fillStyle = '#2A7BAA';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('累计到访次数', 65, 215);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.fillText(`${totalVisits} 次`, 65, 250);

      ctx.fillStyle = '#FF9A56';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('首次探及时间', 210, 215);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.fillText(firstVisit, 210, 245);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('最后停留时间', 335, 215);
      ctx.fillStyle = '#E2E8F0';
      ctx.font = 'bold 15px Inter, sans-serif';
      ctx.fillText(lastVisit, 335, 245);

      // 6. Draw User Travel Story Content
      const activeTrip = cityFootprints[0];
      if (activeTrip) {
        ctx.fillStyle = '#FF9A56';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('🌱 旅途瞬间记载', 45, 335);

        ctx.fillStyle = '#CBD5E1';
        ctx.font = '13px Inter, sans-serif';

        // Word wrap helper
        const remarkString = activeTrip.remark || '没有写下备注，只留下了一个明亮的足迹印记。';
        const words = remarkString.split('');
        let line = '';
        let yCoord = 365;
        const lineLimit = 380;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > lineLimit && n > 0) {
            ctx.fillText(line, 45, yCoord);
            line = words[n];
            yCoord += 22;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 45, yCoord);

        // Render trip image preview mockup in canvas if photo exists
        if (activeTrip.photos && activeTrip.photos.length > 0) {
          const imageObj = new Image();
          imageObj.src = activeTrip.photos[0];
          imageObj.onload = () => {
            // Calculate ratios
            ctx.filter = 'none';
            ctx.drawImage(imageObj, 45, 480, 410, 150);
            drawCardFooter();
          };
          imageObj.onerror = () => {
            drawFallbackPlaceholder();
          };
        } else {
          drawFallbackPlaceholder();
        }
      } else {
        drawCardFooter();
      }

      function drawFallbackPlaceholder() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(45, 460, 410, 155);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeRect(45, 460, 410, 155);

        ctx.fillStyle = '#64748B';
        ctx.font = 'italic 11px Inter, sans-serif';
        ctx.fillText('“行止皆是风景，心中皆有故事”', 160, 540);
        drawCardFooter();
      }

      function drawCardFooter() {
        // App logo watermark at the bottom center
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText('踏序足迹 APP 存储于安卓设备本地 | 100% 隐私零上传', 130, 655);

        // Set finished state
        const dataUrl = canvas.toDataURL('image/png');
        setCreatedPosterUrl(dataUrl);
        setIsGenerating(false);
      }
    }, 450);
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
            <Navigation className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#2A7BAA] via-[#1F2937] dark:via-white to-[#FF9A56] select-none">
                {city.name}
              </h2>
              <span className="text-[9px] bg-sky-500/10 dark:bg-sky-500/20 px-1.5 py-0.5 rounded font-mono font-extrabold text-sky-600 dark:text-sky-400">
                {province.name}省
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium font-semibold">点击年份切换足迹卡片列表</p>
          </div>
        </div>
      </div>

      {/* Floating Poster Generation canvas (Hidden by default but loads internally) */}
      <canvas ref={canvasRef} width="500" height="700" className="hidden" />

      {/* Poster Viewer Popup overlay */}
      <AnimatePresence>
        {createdPosterUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/95 z-55 flex flex-col items-center justify-center p-6 space-y-4"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> 出行纪念明信片已渲染成功！
            </h3>
            <div className="w-full max-w-[290px] aspect-[5/7] rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-900 flex items-center justify-center">
              <img src={createdPosterUrl} alt="Footprints Poster Card" className="w-full h-full object-contain" />
            </div>
            <p className="text-[9px] text-slate-500 text-center">长按图片（部分机型）或点击下方按钮直接下载到手机本地相册</p>
            <div className="flex gap-3 w-full max-w-[290px]">
              <button
                onClick={() => setCreatedPosterUrl(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              >
                关闭
              </button>
              <a
                href={createdPosterUrl}
                download={`踏序足迹_${city.name}_纪念海报.png`}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-gradient-to-tr from-[#2A7BAA] to-[#FF9A56] text-white text-center shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" /> 保存到本地
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content body with centered max-width layout for beautiful viewport preservation */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-6 sm:py-8 space-y-6" id="city-details-scrollable">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Quick summary statistics */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border ${theme.id === 'dark' ? 'bg-slate-950/30 border-slate-850' : 'bg-white border-slate-100'}`}>
              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">累计到访</span>
              <span className="text-base font-extrabold text-[#2A7BAA] block mt-0.5">{totalVisits} 次</span>
            </div>
            <div className={`p-4 rounded-2xl border ${theme.id === 'dark' ? 'bg-slate-950/30 border-slate-850' : 'bg-white border-slate-100'}`}>
              <span className="text-[10px] text-slate-400">首次到访</span>
              <span className="text-xs font-mono font-bold block mt-1">{firstVisit}</span>
            </div>
            <div className={`p-4 rounded-2xl border ${theme.id === 'dark' ? 'bg-slate-950/30 border-slate-850' : 'bg-white border-slate-100'}`}>
              <span className="text-[10px] text-slate-400">最近到访</span>
              <span className="text-xs font-mono font-bold block mt-1">{lastVisit}</span>
            </div>
          </div>

          {/* Horizontal scroll year tag bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200/20 dark:border-slate-800/80 scrollbar-none">
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`py-1.5 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2A7BAA] to-[#FF9A56] text-white shadow-sm'
                      : `${theme.id === 'dark' ? 'bg-slate-850 hover:bg-slate-800 text-slate-300' : 'bg-slate-200/50 hover:bg-slate-200 text-slate-600'}`
                  }`}
                >
                  {yr} {yr !== '全部' && '年'}
                </button>
              );
            })}
          </div>

          {/* Vertical footprints list items for this city */}
          <div className="space-y-4" id="city-footprints-container">
            <AnimatePresence mode="popLayout">
              {displayedFootprints.length > 0 ? (
                displayedFootprints.map((fp, idx) => {
                  const tagDetails = TRIP_TYPE_NAMES[fp.tripType];

                  return (
                    <motion.div
                      key={fp.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-5 rounded-2xl shadow-sm border space-y-3 relative group ${
                        theme.id === 'dark' ? 'bg-slate-950/70 border-slate-850' : 'bg-white border-slate-100'
                      }`}
                    >
                      {/* Top line detail tags */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {fp.visitDate}
                        </span>

                        {/* Right side Tag badge */}
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${tagDetails.bg} ${tagDetails.text}`}>
                          <span>{tagDetails.emoji}</span>
                          <span>{tagDetails.label}</span>
                        </span>
                      </div>

                      {/* Story Text narration content */}
                      {fp.remark ? (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-wrap">
                          {fp.remark}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 dark:text-slate-500 italic">尚未填写这一站的随喜心得...</p>
                      )}

                      {/* Operational control buttons: Edit / Delete single entry */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                        <button
                          onClick={() => onEditFootprint(fp)}
                          className="text-[10px] font-semibold text-[#2A7BAA] p-1.5 rounded-lg hover:bg-[#2A7BAA]/10 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> 编辑
                        </button>
                        <button
                          onClick={() => onDeleteFootprint(fp.id)}
                          className="text-[10px] font-semibold text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> 删除
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  该年份暂无任何足迹记录
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Shared poster output postcard action footer trigger */}
          <div className="pt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleGeneratePoster}
              disabled={isGenerating || totalVisits === 0}
              className="w-full p-4 rounded-xl text-white bg-gradient-to-r from-[#2A7BAA] to-[#FF9A56] hover:opacity-90 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-55"
            >
              <Share2 className="w-4 h-4" /> {isGenerating ? '正在为你制作明信片...' : '生成出行纪念明信片'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
