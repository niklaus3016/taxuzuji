/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Tag, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { Province, City, TripType, Footprint, MapTheme } from '../types';
import { provincesData } from '../data/chinaProvinces';

interface AddFootprintModalProps {
  theme: MapTheme;
  onClose: () => void;
  onSave: (data: Omit<Footprint, 'id' | 'createdDate'> & { id?: string }) => void;
  initialFootprint?: Footprint;
  key?: any;
}

const TRIP_TYPES: { type: TripType; label: string; emoji: string; color: string }[] = [
  { type: 'tourism', label: '旅游', emoji: '🌴', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20' },
  { type: 'work', label: '工作', emoji: '💻', color: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20' },
  { type: 'business', label: '出差', emoji: '💼', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20' },
  { type: 'family', label: '探亲', emoji: '🏡', color: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-500/20' },
  { type: 'study', label: '求学', emoji: '🎓', color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20' },
  { type: 'other', label: '其他', emoji: '✨', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20' },
];

export default function AddFootprintModal({ theme, onClose, onSave, initialFootprint }: AddFootprintModalProps) {
  // Try to find province & city from initialFootprint to seed edits
  const initialProvince = React.useMemo(() => {
    if (!initialFootprint) return null;
    return provincesData.find((p) => p.name === initialFootprint.provinceName) || null;
  }, [initialFootprint]);

  const [selectedProvinceId, setSelectedProvinceId] = useState<string>(initialProvince?.id || '');
  const [selectedCityId, setSelectedCityId] = useState<string>(initialFootprint?.cityId || '');
  const [visitDate, setVisitDate] = useState<string>(initialFootprint?.visitDate || new Date().toISOString().split('T')[0]);
  const [tripType, setTripType] = useState<TripType>(initialFootprint?.tripType || 'tourism');
  const [remark, setRemark] = useState<string>(initialFootprint?.remark || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedProvince = provincesData.find((p) => p.id === selectedProvinceId);

  const handleSave = () => {
    if (!selectedProvinceId) {
      setErrorMsg('请选择省份');
      return;
    }
    if (!selectedCityId) {
      setErrorMsg('请选择地级市');
      return;
    }

    const cityObj = selectedProvince?.cities.find((c) => c.id === selectedCityId);
    if (!cityObj || !selectedProvince) {
      setErrorMsg('选择的数据不合法');
      return;
    }

    onSave({
      id: initialFootprint?.id,
      cityId: cityObj.id,
      cityName: cityObj.name,
      provinceName: selectedProvince.name,
      visitDate,
      tripType,
      remark: remark.trim(),
      photos: initialFootprint?.photos || [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`w-full max-w-lg max-h-[92vh] rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden ${theme.cardClass} ${theme.textColorClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-3" />

        {/* Modal Title */}
        <div className="flex items-center justify-between px-6 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
              {initialFootprint ? '编辑历史足迹' : '记录新足迹'} <Sparkles className="w-5 h-5 text-amber-500" />
            </h2>
            <p className="text-xs text-slate-400">
              {initialFootprint ? '编辑这一站的故事印记' : '点亮你走过的一砖一瓦'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Body content (scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-6 py-4 space-y-5" id="add-footprint-scroll">
          {/* Error notice */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 text-sm bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Location Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#2A7BAA]" /> 城市定位
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Province */}
              <div className="relative">
                <select
                  value={selectedProvinceId}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    setSelectedCityId('');
                    setErrorMsg(null);
                  }}
                  className={`w-full p-3 rounded-xl border appearance-none outline-none focus:ring-2 focus:ring-[#2A7BAA] select-arrow bg-transparent text-sm transition-all ${
                    theme.id === 'dark' ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <option value="" className="dark:bg-slate-900 text-slate-400">选择省份/直辖市</option>
                  {provincesData.map((p) => (
                    <option key={p.id} value={p.id} className="dark:bg-slate-900">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prefectural Level City */}
              <div className="relative">
                <select
                  value={selectedCityId}
                  disabled={!selectedProvinceId}
                  onChange={(e) => {
                    setSelectedCityId(e.target.value);
                    setErrorMsg(null);
                  }}
                  className={`w-full p-3 rounded-xl border appearance-none outline-none focus:ring-2 focus:ring-[#2A7BAA] select-arrow bg-transparent text-sm transition-all disabled:opacity-40 ${
                    theme.id === 'dark' ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <option value="" className="dark:bg-slate-900 text-slate-400">选择城市</option>
                  {selectedProvince?.cities.map((c) => (
                    <option key={c.id} value={c.id} className="dark:bg-slate-900">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Outing date */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#2A7BAA]" /> 记录时间
            </label>
            <input
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#2A7BAA] text-sm transition-all bg-transparent ${
                theme.id === 'dark' ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            />
          </div>

          {/* Outing Type Tag selectors (旅游 / 工作 / 出差 / 探亲) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#2A7BAA]" /> 出行方式
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TRIP_TYPES.map((t) => {
                const isSelected = tripType === t.type;
                return (
                  <motion.button
                    key={t.type}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTripType(t.type)}
                    className={`flex items-center justify-center gap-1 p-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2A7BAA] bg-[#2A7BAA]/10 text-[#2A7BAA] ring-1 ring-[#2A7BAA]'
                        : `${theme.id === 'dark' ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-600'}`
                    }`}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Story Remark stories text area */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#2A7BAA]" /> 故事感悟
            </label>
            <textarea
              placeholder="分享一路上有趣的见闻、惊叹的美食、奇特的人，让这段回忆流淌下来..."
              rows={4}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-[#2A7BAA] text-sm resize-none transition-all bg-transparent ${
                theme.id === 'dark' ? 'border-slate-800 bg-slate-950 placeholder-slate-600 text-white' : 'border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Sticky Submit section */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`flex-1 p-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center border ${
              theme.id === 'dark' ? 'border-slate-850 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
            }`}
          >
            取消
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex-1 p-3.5 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-[#2A7BAA] to-[#FF9A56] hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center"
          >
            保存并高亮
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
