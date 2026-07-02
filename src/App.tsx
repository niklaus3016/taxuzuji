/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Tag, Filter, SlidersHorizontal, RefreshCw, Milestone, MapPin, Compass } from 'lucide-react';

import { Footprint, MapTheme, MapThemeId, Province, City, TripType, PrivacyConsent, AgreementDocType } from './types';
import { provincesData } from './data/chinaProvinces';
import { mapThemes } from './data/themes';

// import Subcomponents
import ActiveMap from './components/ActiveMap';
import FooterTabs from './components/FooterTabs';
import AddFootprintModal from './components/AddFootprintModal';
import DashboardModal from './components/DashboardModal';
import TimelineModal from './components/TimelineModal';
import CityDetailsModal from './components/CityDetailsModal';
import SettingsModal from './components/SettingsModal';
import PrivacyConsentModal from './components/PrivacyConsentModal';

const TRIP_TYPE_NAMES: Record<TripType | '全部', string> = {
  全部: '全部出行方式',
  tourism: '🌴 旅游',
  work: '💻 工作',
  business: '💼 出差',
  family: '🏡 探亲',
  study: '🎓 求学',
  other: '✨ 其他',
};

const safeStorage = {
  memory: {} as Record<string, string>,
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage is not accessible. Falling back to in-memory storage.', e);
      return this.memory[key] || null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage is not accessible. Falling back to in-memory storage.', e);
      this.memory[key] = value;
    }
  },
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage is not accessible. Falling back to in-memory storage.', e);
      delete this.memory[key];
    }
  }
};

export default function App() {
  // 1. Core local storage states
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [themeId, setThemeId] = useState<MapThemeId>('dark');
  const [signature, setSignature] = useState<string>('踏序而行，足迹所至皆是风景。');

  // 2. Navigation / UI filters states
  const [filterYear, setFilterYear] = useState<string>('全部');
  const [filterType, setFilterType] = useState<string>('全部');
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  // 3. Modals states
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDashboardModal, setShowDashboardModal] = useState<boolean>(false);
  const [showTimelineModal, setShowTimelineModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [selectedCityPair, setSelectedCityPair] = useState<{ city: City; province: Province } | null>(null);
  const [editingFootprint, setEditingFootprint] = useState<Footprint | null>(null);

  // 4. Success feedback toast alerts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 5. 隐私政策 / 用户协议 首启同意状态机（合规闸门）
  const [consent, setConsent] = useState<PrivacyConsent | null>(null);
  const [consentOpenDetail, setConsentOpenDetail] = useState<AgreementDocType | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false);
  const [declineHintText, setDeclineHintText] = useState<string | null>(null);

  // 当前协议版本：升级时改变此值可强制重新弹同意窗
  const CURRENT_POLICY_VERSION = '1.0';

  // Core theme mapping solver
  const currentThemeObj = mapThemes.find((t) => t.id === themeId) || mapThemes[0];

  // 6. Initial state seeding（先读同意状态 → 合规：已同意后才允许加载/注入足迹数据）
  useEffect(() => {
    // A. 读取同意状态（首启闸门）
    const storedConsentRaw = safeStorage.getItem('shuxu_consent_v1');
    let parsedConsent: PrivacyConsent | null = null;
    if (storedConsentRaw) {
      try {
        const raw = JSON.parse(storedConsentRaw);
        if (raw && typeof raw === 'object') {
          parsedConsent = {
            agreed: !!raw.agreed,
            policyVersion: typeof raw.policyVersion === 'string' ? raw.policyVersion : CURRENT_POLICY_VERSION,
            declined: !!raw.declined,
            agreedAt: typeof raw.agreedAt === 'string' ? raw.agreedAt : undefined,
          };
          // 协议版本升级：强制重新弹同意窗
          if (parsedConsent.policyVersion !== CURRENT_POLICY_VERSION) {
            parsedConsent = { agreed: false, policyVersion: CURRENT_POLICY_VERSION };
          }
        }
      } catch { /* ignore json parse error */ }
    }
    setConsent(parsedConsent ?? { agreed: false, policyVersion: CURRENT_POLICY_VERSION });

    // B. 偏好（theme/signature 无隐私问题，可直接加载）
    const storedTheme = safeStorage.getItem('shuxu_theme');
    const storedSignature = safeStorage.getItem('shuxu_sig');
    if (storedTheme) setThemeId(storedTheme as MapThemeId);
    if (storedSignature) setSignature(storedSignature);

    // C. 足迹数据：只有已同意协议时才加载；首次启动为空应用（不预置任何演示数据）
    if (parsedConsent?.agreed) {
      const storedFootprints = safeStorage.getItem('shuxu_footprints');
      if (storedFootprints) {
        setFootprints(JSON.parse(storedFootprints));
      } else {
        setFootprints([]);
        safeStorage.setItem('shuxu_footprints', JSON.stringify([]));
      }
    }
    // 未同意：footprints 保持 []，直到用户点「同意并继续」再注入
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 6b. 首次同意后，立即加载用户已有备份；如为空则保持空应用（不注入演示数据）
  const seedFootprintsAfterConsent = () => {
    const storedFootprints = safeStorage.getItem('shuxu_footprints');
    if (storedFootprints) {
      setFootprints(JSON.parse(storedFootprints));
    } else {
      setFootprints([]);
      safeStorage.setItem('shuxu_footprints', JSON.stringify([]));
    }
  };

  /* =========================================================
   *  隐私合规闸门 — 首启同意状态交互
   * =======================================================*/
  const handleConsentAccept = () => {
    const newConsent: PrivacyConsent = {
      agreed: true,
      policyVersion: CURRENT_POLICY_VERSION,
      agreedAt: new Date().toISOString(),
    };
    safeStorage.setItem('shuxu_consent_v1', JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowDeclineModal(false);
    setConsentOpenDetail(null);
    setDeclineHintText(null);
    // 首次同意 → 保持空应用，提示用户添加第一条足迹
    seedFootprintsAfterConsent();
    triggerToast('欢迎加入踏序足迹！点击右上角 ＋ 记录你的第一次足迹吧 ✨');
  };

  const handleConsentDecline = () => setShowDeclineModal(true);
  const handleDeclineCancel = () => setShowDeclineModal(false);
  const handleDeclineConfirm = () => {
    setShowDeclineModal(false);
    // Web 端不能真正"退出应用"：写入 declined 状态 + 4.5s 后再次重置为未同意状态，
    // 让用户只能选「同意并继续」或在阅读详情后同意
    const declinedState: PrivacyConsent = {
      agreed: false,
      declined: true,
      policyVersion: CURRENT_POLICY_VERSION,
    };
    safeStorage.setItem('shuxu_consent_v1', JSON.stringify(declinedState));
    setConsent(declinedState);
    setDeclineHintText('踏序足迹需要您同意《用户服务协议》与《隐私政策》后方可使用，请点击「同意并继续」进入应用。');
    setTimeout(() => {
      setDeclineHintText(null);
      // 清空 declined 状态，回到首启选择界面
      safeStorage.removeItem('shuxu_consent_v1');
      setConsent({ agreed: false, policyVersion: CURRENT_POLICY_VERSION });
    }, 5000);
  };
  const handleOpenAgreement = () => setConsentOpenDetail('user_agreement');
  const handleOpenPrivacy = () => setConsentOpenDetail('privacy_policy');
  const handleCloseDetail = () => setConsentOpenDetail(null);

  const toastTimerRef = useRef<any>(null);

  const triggerToast = (msg: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2500);
  };

  // Helper updater callbacks
  const saveFootprintsToLocal = (newFootprints: Footprint[]) => {
    setFootprints(newFootprints);
    safeStorage.setItem('shuxu_footprints', JSON.stringify(newFootprints));
  };

  const handleThemeChange = (newThemeId: MapThemeId) => {
    setThemeId(newThemeId);
    safeStorage.setItem('shuxu_theme', newThemeId);
  };

  const handleSaveSignature = (sig: string) => {
    setSignature(sig);
    safeStorage.setItem('shuxu_sig', sig);
  };

  const handleClearData = () => {
    saveFootprintsToLocal([]);
    safeStorage.removeItem('shuxu_footprints');
    setSelectedCityPair(null);
    triggerToast('所有足迹数据已被清空');
  };

  const handleImportData = (importedList: Footprint[]) => {
    saveFootprintsToLocal(importedList);
    triggerToast(`成功导入 ${importedList.length} 条足迹记录！`);
  };

  // Create or Update footprint
  const handleSaveFootprint = (data: Omit<Footprint, 'id' | 'createdDate'> & { id?: string }) => {
    if (data.id) {
      // Edit Mode
      const updated = footprints.map((f) =>
        f.id === data.id
          ? {
              ...f,
              ...data,
              id: data.id, // preserve ID
              createdDate: f.createdDate, // preserve date
            }
          : f
      );
      saveFootprintsToLocal(updated);
      triggerToast('足迹历史记录修改成功 ✨');
    } else {
      // Creation Mode
      const newEntry: Footprint = {
        ...data,
        id: `fp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdDate: new Date().toISOString(),
      };
      saveFootprintsToLocal([newEntry, ...footprints]);
      
      // Clear filters so the user immediately witnesses their active highlighting!
      setFilterYear('全部');
      setFilterType('全部');

      triggerToast('新足迹记录成功！已点亮你的城市 🌟');
    }
    setShowAddModal(false);
    setEditingFootprint(null);
  };

  const handleDeleteFootprint = (id: string) => {
    const remaining = footprints.filter((f) => f.id !== id);
    saveFootprintsToLocal(remaining);

    // If deleting emptied the currently viewed city detail, close details popup
    const viewedCityRemaining = remaining.filter((f) => f.cityId === selectedCityPair?.city.id);
    if (viewedCityRemaining.length === 0) {
      setSelectedCityPair(null);
    }
    triggerToast('历史足迹已成功移除');
  };

  const handleStartEdit = (footprint: Footprint) => {
    setEditingFootprint(footprint);
    setSelectedCityPair(null); // dismiss detail view
    setShowAddModal(true); // present edit form
  };

  // Compile active years dynamically from footprint list for dropdown filters
  const yearsList = React.useMemo(() => {
    const years = new Set<string>();
    footprints.forEach((f) => {
      const yr = f.visitDate.substring(0, 4);
      if (yr) years.add(yr);
    });
    return ['全部', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [footprints]);

  // Combined state filters
  const filteredFootprints = React.useMemo(() => {
    return footprints.filter((f) => {
      const matchYear = filterYear === '全部' || f.visitDate.startsWith(filterYear);
      const matchType = filterType === '全部' || f.tripType === filterType;
      return matchYear && matchType;
    });
  }, [footprints, filterYear, filterType]);

  // Statistics calculation for overlay display
  const totalVisitedCities = React.useMemo(() => new Set(footprints.map((f) => f.cityId)).size, [footprints]);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between ${currentThemeObj.bgClass} ${currentThemeObj.textColorClass} transition-colors duration-500`}
    >
      {/* Dynamic light flow ambient background glow */}
      <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-sky-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-orange-400/10 blur-[120px] pointer-events-none" />

      {/* 2. PREMIUM STYLED FROSTED HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative mx-auto mt-4 w-[92%] max-w-4xl h-16 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-800/40 backdrop-blur-xl shadow-lg flex items-center justify-between px-5 z-40 transition-all duration-300"
      >
        {/* Brand identity block */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#2A7BAA] to-[#FF9A56] p-[1.5px] shadow-sm select-none">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center text-sm font-bold bg-white dark:bg-[#1E293B]`}>
              👣
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-extrabold tracking-wider bg-clip-text text-transparent bg-linear-to-r from-[#2A7BAA] via-[#1F2937] dark:via-white to-[#FF9A56] select-none">
              踏序足迹
            </h1>
            <span className="text-[9px] font-mono font-semibold text-slate-400 dark:text-slate-500 scale-95 origin-left tracking-wide">
              STEPTRACE V1.0
            </span>
          </div>
        </div>

        {/* Dynamic score summary overlay on header */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/5 border border-slate-500/10 text-xs font-bold leading-none select-none">
          <span className="text-[#2A7BAA]">● 已到访</span>
          <span className="font-mono text-[#FF9A56] text-sm font-extrabold">{totalVisitedCities}</span>
          <span className="text-slate-400">城市</span>
        </div>

        {/* Toolbar switches (Settings toggler & filter drop triggers) */}
        <div className="flex items-center gap-2.5">
          {/* Filters Toggler */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
              showFilterPanel
                ? 'border-[#2A7BAA] bg-[#2A7BAA]/10 text-[#2A7BAA]'
                : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-500/5'
            }`}
          >
            <Filter className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.header>

      {/* Pull-down Hidden Filter panels (筛选功能) */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative mx-auto mt-2 w-[92%] max-w-4xl rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/80 backdrop-blur-xl shadow-md p-4.5 z-30 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Year list filters */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                  <Calendar className="w-3.5 h-3.5 text-[#2A7BAA]" /> 探游年份筛选
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {yearsList.map((yr) => {
                    const isSelected = filterYear === yr;
                    return (
                      <button
                        key={yr}
                        onClick={() => setFilterYear(yr)}
                        className={`text-[10px] font-semibold py-1 px-3 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-linear-to-r from-[#2A7BAA] to-[#FF9A56] text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300'
                        }`}
                      >
                        {yr} {yr !== '全部' && '年'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trip Types Tag filters */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                  <Tag className="w-3.5 h-3.5 text-[#FF9A56]" /> 出行类型筛选
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['全部', 'tourism', 'work', 'business', 'family', 'study', 'other'] as const).map((type) => {
                    const isSelected = filterType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`text-[10px] font-semibold py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2A7BAA] text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300'
                        }`}
                      >
                        {TRIP_TYPE_NAMES[type]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clear Filters indicator banner if active */}
            {(filterYear !== '全部' || filterType !== '全部') && (
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>当前已过滤：仅展示符合条件的城市</span>
                <button
                  onClick={() => {
                    setFilterYear('全部');
                    setFilterType('全部');
                  }}
                  className="font-bold text-[#FF9A56] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} /> 重置过滤条件
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE GEOGRAPHY MAP CANVAS CONTAINER */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center relative overflow-hidden px-4 md:px-6">
        <ActiveMap
          theme={currentThemeObj}
          footprints={footprints}
          filteredFootprints={filteredFootprints}
          onSelectCity={(city, prov) => setSelectedCityPair({ city, province: prov })}
          filterType={filterType}
          filterYear={filterYear}
        />
      </main>

      {/* 4. TACTILE BOTTOM TABS AND FLOATING HUB */}
      <FooterTabs
        onOpenAdd={() => {
          setEditingFootprint(null);
          setShowAddModal(true);
        }}
        onOpenDashboard={() => setShowDashboardModal(true)}
        onOpenTimeline={() => setShowTimelineModal(true)}
        onOpenProfile={() => setShowSettingsModal(true)}
      />

      {/* 5. GENTLE NOTIFICATION ALERTS TOAST Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-full bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 border border-slate-800/80 dark:border-slate-100 backdrop-blur-xl shadow-2xl z-55 flex items-center gap-2 max-w-md font-semibold text-xs leading-none"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. MODALS POPUP COMPULSORY RENDER LAYERS */}
      <AnimatePresence mode="wait">
        {/* Add / Edit Footprint drawer */}
        {showAddModal && (
          <AddFootprintModal
            key="add-modal"
            theme={currentThemeObj}
            onClose={() => {
              setShowAddModal(false);
              setEditingFootprint(null);
            }}
            onSave={handleSaveFootprint}
            initialFootprint={editingFootprint || undefined}
          />
        )}

        {/* Statistics Dashboard Drawer */}
        {showDashboardModal && (
          <DashboardModal
            key="dashboard-modal"
            theme={currentThemeObj}
            footprints={footprints}
            onClose={() => setShowDashboardModal(false)}
          />
        )}

        {/* Timelines sequential chronos list modal */}
        {showTimelineModal && (
          <TimelineModal
            key="timeline-modal"
            theme={currentThemeObj}
            footprints={footprints}
            onSelectCity={(city, prov) => {
              setSelectedCityPair({ city, province: prov });
              setShowTimelineModal(false); // swap modal focus cleanly
            }}
            onClose={() => setShowTimelineModal(false)}
          />
        )}

        {/* Settings & Profile modal */}
        {showSettingsModal && (
          <SettingsModal
            key="settings-modal"
            theme={currentThemeObj}
            footprints={footprints}
            onThemeChange={handleThemeChange}
            onImportData={handleImportData}
            onClearData={handleClearData}
            signature={signature}
            onSaveSignature={handleSaveSignature}
            onClose={() => setShowSettingsModal(false)}
          />
        )}

        {/* Clicked City Detail records list / Postcard Creator overlay drawer */}
        {selectedCityPair && (
          <CityDetailsModal
            key="city-details"
            theme={currentThemeObj}
            city={selectedCityPair.city}
            province={selectedCityPair.province}
            footprints={footprints}
            onDeleteFootprint={handleDeleteFootprint}
            onEditFootprint={handleStartEdit}
            onClose={() => setSelectedCityPair(null)}
          />
        )}
      </AnimatePresence>

      {/* 7. 首启合规闸门：隐私/用户协议同意弹窗（未同意时整屏拦截） */}
      <AnimatePresence>
        {consent && !consent.agreed && (
          <PrivacyConsentModal
            key="consent-gate"
            theme={currentThemeObj}
            openDetail={consentOpenDetail}
            onCloseDetail={handleCloseDetail}
            showDeclineModal={showDeclineModal}
            onDeclineCancel={handleDeclineCancel}
            onDeclineConfirm={handleDeclineConfirm}
            onOpenAgreement={handleOpenAgreement}
            onOpenPrivacy={handleOpenPrivacy}
            onAccept={handleConsentAccept}
            onDecline={handleConsentDecline}
            declineHintText={declineHintText ?? undefined}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
