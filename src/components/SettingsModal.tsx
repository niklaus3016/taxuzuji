/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Download, Upload, Trash2, Edit3, Save, Palette, Smile, Shield, FileText } from 'lucide-react';
import { Footprint, MapTheme, MapThemeId, AgreementDocType } from '../types';
import { mapThemes } from '../data/themes';
import { AgreementModal } from './PrivacyConsentModal';

interface SettingsModalProps {
  theme: MapTheme;
  onClose: () => void;
  footprints: Footprint[];
  onThemeChange: (themeId: MapThemeId) => void;
  onImportData: (data: Footprint[]) => void;
  onClearData: () => void;
  signature: string;
  onSaveSignature: (sig: string) => void;
  key?: any;
}

export default function SettingsModal({
  theme,
  onClose,
  footprints,
  onThemeChange,
  onImportData,
  onClearData,
  signature,
  onSaveSignature,
}: SettingsModalProps) {
  const [sigText, setSigText] = useState(signature);
  const [isEditingSig, setIsEditingSig] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  /** 设置页打开的协议详情：null=关闭 / 'user_agreement'=用户协议 / 'privacy_policy'=隐私政策 */
  const [showLegalDoc, setShowLegalDoc] = useState<AgreementDocType | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats calculation
  const totalVisited = React.useMemo(() => new Set(footprints.map((f) => f.cityId)).size, [footprints]);
  const tourCount = React.useMemo(() => footprints.filter((f) => f.tripType === 'tourism').length, [footprints]);

  const handleSaveSignature = () => {
    onSaveSignature(sigText);
    setIsEditingSig(false);
    triggerSuccess('旅行签名保存成功！');
  };

  const triggerSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  // 1. One-click JSON data download backup (一键备份)
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(footprints, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `踏序足迹_备份_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      triggerSuccess('足迹数据已成功导出，请妥善保管！');
    } catch (e) {
      console.error('备份失败', e);
    }
  };

  // 2. Clear backup data restoration chooser (恢复备份)
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const parsed = JSON.parse(text);
          // Simple validation
          if (Array.isArray(parsed)) {
            onImportData(parsed);
            triggerSuccess('足迹数据解析导入成功！');
          } else {
            alert('无效的备份文件结构，导入失败');
          }
        }
      } catch (err) {
        alert('文件解析异常，请上传合规的 JSON 备份文件');
      }
    };
    reader.readAsText(file);
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
        <div className="flex items-center gap-2">
          <span className="text-sm">⚙️</span>
          <div>
            <h2 className="text-base font-extrabold tracking-wider bg-clip-text text-transparent bg-linear-to-r from-[#2A7BAA] via-[#1F2937] dark:via-white to-[#FF9A56] select-none">
              足迹空间 & 偏好设置
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold">账户偏好调整与数据备份管理</p>
          </div>
        </div>
      </div>

      {/* Content body with centered max-width layout for beautiful viewport preservation */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-6 sm:py-8 space-y-5" id="settings-scroll-container">
        <div className="max-w-md mx-auto space-y-5">
          {/* Success Alerts bar */}
          <AnimatePresence>
            {successNotice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/25 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Smile className="w-4 h-4 text-emerald-500" />
                <span>{successNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User profile capsule card */}
          <div className={`p-4 rounded-2xl border space-y-3 ${theme.id === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#2A7BAA] to-[#FF9A56] p-0.5 shadow">
                <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center text-lg">
                  👣
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">踏序探索手</h3>
                </div>
                {isEditingSig ? (
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="text"
                      className={`text-xs p-1.5 rounded border outline-none flex-1 max-w-[170px] bg-transparent ${
                        theme.id === 'dark' ? 'border-slate-800' : 'border-slate-200'
                      }`}
                      value={sigText}
                      maxLength={40}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSigText(e.target.value)}
                    />
                    <button
                      onClick={handleSaveSignature}
                      className="p-1 rounded bg-[#2A7BAA] text-white hover:opacity-90 max-w-fit cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-1 cursor-pointer" onClick={() => setIsEditingSig(true)}>
                    <p className="text-xs text-slate-400 font-medium italic line-clamp-1 flex-1">
                      {signature || '去写下一句帅气的旅途签名吧...'}
                    </p>
                    <Edit3 className="w-3 h-3 text-slate-400/80 hover:text-[#2A7BAA]" />
                  </div>
                )}
              </div>
            </div>

            {/* Micro simple info badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
              <div className="text-center p-2 rounded-xl bg-slate-500/5">
                <span className="block text-[9px] text-slate-400">足迹地图范围</span>
                <span className="font-bold text-sm block mt-0.5">{totalVisited} / 340 城镇</span>
              </div>
              <div className="text-center p-2 rounded-xl bg-slate-500/5">
                <span className="block text-[9px] text-slate-400">总计旅游占比</span>
                <span className="font-bold text-sm block mt-0.5">{tourCount} 站地</span>
              </div>
            </div>
          </div>

          {/* Privacy Button block */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              🛡️ 隐私与合规声明
            </span>

            <button
              type="button"
              onClick={() => setShowLegalDoc('privacy_policy')}
              className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-xs font-bold shadow-sm transition-all cursor-pointer ${
                theme.id === 'dark' ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" /> 踏序足迹 · 隐私政策
              </span>
              <span className="text-[10px] text-slate-400">全文查看 ➔</span>
            </button>

            <button
              type="button"
              onClick={() => setShowLegalDoc('user_agreement')}
              className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-xs font-bold shadow-sm transition-all cursor-pointer ${
                theme.id === 'dark' ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0071E3]" /> 踏序足迹 · 用户服务协议
              </span>
              <span className="text-[10px] text-slate-400">全文查看 ➔</span>
            </button>
          </div>

          {/* Map theme panel switcher (浅色治愈, 深色星空, 极极纯白, 复古纸质) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-[#2A7BAA]" /> 专属地图主题切换
            </span>
            <div className="grid grid-cols-2 gap-3">
              {mapThemes.map((m) => {
                const isSelected = theme.id === m.id;
                return (
                  <motion.button
                    key={m.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onThemeChange(m.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-20 relative overflow-hidden transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2A7BAA] ring-1 ring-[#2A7BAA] bg-[#2A7BAA]/5'
                        : `${theme.id === 'dark' ? 'border-slate-800 hover:bg-slate-850 bg-slate-900/60' : 'border-slate-200 hover:bg-slate-100 bg-white'}`
                    }`}
                  >
                    <span className="text-xs font-bold block z-10">{m.name}</span>
                    {/* Visual representative pill dot */}
                    <div className="flex gap-1.5 items-center mt-1 z-10">
                      <div className="w-3 h-3 rounded-full bg-[#2A7BAA] border border-white dark:border-slate-800 shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-[#FF9A56] border border-white dark:border-slate-800 shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-[#E8F4FA] border border-white dark:border-slate-800 shadow-sm" />
                    </div>

                    {/* Faint overlay gradient backdraft preview color */}
                    <div
                      className={`absolute right-0 bottom-0 w-16 h-16 rounded-full opacity-10 filter blur-md -mr-4 -mb-4 ${
                        m.id === 'dark' ? 'bg-indigo-500' : m.id === 'vintage' ? 'bg-amber-600' : m.id === 'minimal' ? 'bg-slate-400' : 'bg-sky-400'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Backup utility section */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              💾 备份与数据持久化管理
            </span>

            {/* Utility grid buttons block */}
            <div className="space-y-2">
              {/* Back up */}
              <button
                type="button"
                onClick={handleExportData}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-xs font-bold shadow-sm transition-all cursor-pointer ${
                  theme.id === 'dark' ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#2A7BAA]" /> 一键本地数据备份 (Export JSON)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">.json</span>
              </button>

              {/* Restore Backup */}
              <button
                type="button"
                onClick={handleImportClick}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-xs font-bold shadow-sm transition-all cursor-pointer ${
                  theme.id === 'dark' ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#FF9A56]" /> 导入并还原足迹备份 (Import JSON)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Select File</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleImportFileChange}
                className="hidden"
              />

              {/* Clear database */}
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="w-full p-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-505 text-rose-500 border border-rose-500/20 flex items-center justify-between text-xs font-bold transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> 永久清空所有记录 (Reset App)
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold">Wipe Data</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Double-Check Clear Confirm pop overlay */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 z-55 flex items-center justify-center p-6"
            >
              <div className="text-center space-y-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-505 text-rose-500 flex items-center justify-center mx-auto">
                  <Trash2 className="w-6 h-6 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">确定要清空全部数据吗？</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    此操作不可撤销！您的所有点亮城市、时光轨迹和本地旅拍照都将灰度置空。建议选择保留或导出备份。
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-850 text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    先留着
                  </button>
                  <button
                    onClick={() => {
                      onClearData();
                      setShowClearConfirm(false);
                      triggerSuccess('数据已全部重设！');
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-rose-650 bg-rose-600 text-white hover:bg-rose-500 shadow-md transition-all cursor-pointer"
                  >
                    确定清空
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* 协议全文弹窗（共用首启 PrivacyConsentModal 中的 AgreementModal + legal.ts 数据源） */}
      <AnimatePresence>
        {showLegalDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-110 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowLegalDoc(null)}
          >
            <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="w-full max-w-3xl flex items-center justify-center">
              <AgreementModal
                docType={showLegalDoc}
                onClose={() => setShowLegalDoc(null)}
                theme={theme}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
