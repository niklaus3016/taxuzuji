/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, FileText } from 'lucide-react';
import { AgreementDocType, MapTheme } from '../types';
import { PrivacyPolicyContent, UserAgreementContent } from '../data/legal';

/* ============================================================
 *          1) 首启 — 用户协议与隐私政策 同意弹窗
 * ==========================================================*/
interface PrivacyModalProps {
  onAccept: () => void;
  onDecline: () => void;
  onOpenAgreement: () => void;
  onOpenPrivacy: () => void;
}

function PrivacyModal({ onAccept, onDecline, onOpenAgreement, onOpenPrivacy }: PrivacyModalProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 28, stiffness: 240 }}
      className="bg-white w-full max-w-sm shadow-2xl max-h-[80vh] overflow-y-auto rounded-[28px]"
    >
      <div className="p-6">
        {/* 顶部 Brand 标识 — 复用踏序足迹 logo 风格 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-[20px] bg-linear-to-tr from-[#2A7BAA] to-[#FF9A56] p-[2px] shadow-lg shadow-orange-300/20">
            <div className="w-full h-full rounded-[18px] flex items-center justify-center text-3xl bg-white">
              👣
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#1D1D1F] mt-4 text-center">
            欢迎使用「踏序足迹」
          </h3>
          <p className="text-[12px] text-slate-400 mt-1 text-center tracking-wide">
            请先阅读并同意以下协议，开启您的专属足迹之旅
          </p>
        </div>

        {/* 摘要列表 — 2 条关键提示（参考代码原结构保留） */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-3 p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="w-7 h-7 shrink-0 rounded-lg bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <p className="text-[13px] leading-relaxed text-[#1D1D1F]">
              <strong>《隐私政策》</strong>中关于<strong>个人足迹数据的收集和使用</strong>的说明：
              本应用坚持 100% 本地存储（localStorage），数据不会上传任何服务器。
            </p>
          </div>
          <div className="flex gap-3 p-3 rounded-2xl bg-orange-50/80 border border-orange-100">
            <div className="w-7 h-7 shrink-0 rounded-lg bg-[#FF9A56]/10 text-[#E2711D] flex items-center justify-center font-bold text-xs">
              2
            </div>
            <p className="text-[13px] leading-relaxed text-[#1D1D1F]">
              <strong>《隐私政策》</strong>中与<strong>第三方 SDK 类服务商数据共享</strong>说明：
              本应用无任何第三方统计/广告 SDK，不向任何第三方共享您的足迹数据。
            </p>
          </div>
        </div>

        {/* 完整协议跳转链接段 */}
        <div className="mb-1">
          <p className="text-sm text-[#86868B] mb-2">用户协议和隐私政策说明：</p>
          <p className="text-sm text-[#424245] leading-relaxed">
            阅读完整的
            <span
              onClick={onOpenAgreement}
              className="text-[#0071E3] hover:underline cursor-pointer font-semibold"
            >
              《用户服务协议》
            </span>
            和
            <span
              onClick={onOpenPrivacy}
              className="text-[#0071E3] hover:underline cursor-pointer font-semibold"
            >
              《隐私政策》
            </span>
            了解详细内容。
          </p>
        </div>
      </div>

      {/* 底部操作栏：两列按钮（左右分栏配色） */}
      <div className="flex border-t border-gray-200">
        <button
          onClick={onDecline}
          className="flex-1 py-4 text-base font-medium text-[#1D1D1F] bg-white border-r border-gray-200 rounded-bl-[28px] hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
        >
          不同意
        </button>
        <button
          onClick={onAccept}
          className="flex-1 py-4 text-base font-bold text-white bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#006AD4] rounded-br-[28px] transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          同意并继续
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
 *          2) 拒绝协议 — 二次确认弹窗
 * ==========================================================*/
interface DeclineConfirmProps {
  onCancel: () => void;
  onConfirm: () => void;
  /** AnimatePresence 跟踪进入/退出的稳定 key */
  key?: React.Key;
}

function DeclineConfirmModal({ onCancel, onConfirm }: DeclineConfirmProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 240 }}
      className="bg-white rounded-[28px] w-full max-w-md overflow-hidden shadow-2xl border border-black/5 flex flex-col"
    >
      <div className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
            <X size={22} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold text-[#1D1D1F]">确认拒绝</h2>
        </div>
        <p className="text-gray-600 leading-relaxed text-[14px]">
          您确定要拒绝本<strong>《用户服务协议》与《隐私政策》</strong>吗？
          <br />
          <span className="text-rose-500 font-semibold">拒绝后将无法使用踏序足迹的全部服务。</span>
        </p>
      </div>
      <div className="flex border-t border-black/5">
        <button
          onClick={onCancel}
          className="flex-1 py-4 text-center text-gray-600 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
        >
          取消（返回阅读）
        </button>
        <div className="w-px bg-black/5" />
        <button
          onClick={onConfirm}
          className="flex-1 py-4 text-center text-rose-600 font-semibold hover:bg-rose-50 active:bg-rose-100 transition-colors cursor-pointer"
        >
          确定拒绝
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
 *          3) 协议正文详情查看弹窗
 *             （可切换《用户服务协议》/《隐私政策》）
 * ==========================================================*/
interface AgreementModalProps {
  docType: AgreementDocType;
  onClose: () => void;
  /** 当前主题（与首页保持一致的玻璃态/配色） */
  theme?: MapTheme;
  /** AnimatePresence 跟踪进入/退出的稳定 key */
  key?: React.Key;
}

function AgreementModal({ docType, onClose, theme }: AgreementModalProps) {
  const isDark = theme?.id === 'dark';
  const title = docType === 'user_agreement' ? '用户服务协议' : '隐私政策';
  const Icon = docType === 'user_agreement' ? FileText : ShieldCheck;
  const content =
    docType === 'user_agreement' ? (
      <UserAgreementContent theme={theme} />
    ) : (
      <PrivacyPolicyContent theme={theme} />
    );

  /* 外框卡片：优先复用主题 cardClass，保证与首页导航/底栏玻璃态一致
     在此基础上固定圆角/尺寸/阴影等与当前弹窗角色匹配的属性 */
  const cardClasses = [
    theme?.cardClass ??
      'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl',
    'rounded-[28px]',
    'w-full',
    'max-w-3xl',
    'h-[85vh]',
    'overflow-hidden',
    'shadow-2xl',
    'flex',
    'flex-col',
  ].join(' ');

  const headerClasses = [
    'flex',
    'items-center',
    'justify-between',
    'px-5 sm:px-6',
    'py-4 sm:py-5',
    'border-b',
    isDark ? 'border-slate-700/60' : 'border-slate-200/80',
    'backdrop-blur-md',
    'shrink-0',
  ].join(' ');

  const contentClasses = [
    'flex-1',
    'overflow-y-auto',
    'scrollbar-thin',
    'p-5 sm:p-7 md:p-8',
    theme?.id === 'dark'
      ? 'bg-slate-900/30'
      : theme?.id === 'vintage'
      ? 'bg-[#FDF6E1]/50'
      : theme?.id === 'minimal'
      ? 'bg-white'
      : 'bg-[#F4FAFD]/70',
  ].join(' ');

  const closeBtnClasses = [
    'w-9 h-9',
    'rounded-xl',
    'flex items-center justify-center',
    'active:scale-90 transition-transform cursor-pointer shrink-0',
    'border',
    isDark
      ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600',
  ].join(' ');

  const brandGradientTitle = [
    'bg-linear-to-r',
    'from-[#2A7BAA]',
    isDark ? 'via-white' : 'via-[#1F2937]',
    'to-[#FF9A56]',
    'bg-clip-text',
    'text-transparent',
    'font-extrabold',
    'tracking-wide',
  ].join(' ');

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className={cardClasses}
    >
      {/* 顶栏 —— 与首页 Logo/标题同款品牌渐变色 */}
      <div className={headerClasses}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner bg-linear-to-br from-[#2A7BAA]/15 via-white/40 to-[#FF9A56]/20 border border-white/40 dark:border-slate-700/40">
            <Icon className="w-5 h-5 bg-linear-to-r from-[#2A7BAA] to-[#FF9A56] bg-clip-text text-transparent" style={{ color: '#2A7BAA' }} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className={`text-xl leading-none ${brandGradientTitle}`}>{title}</h2>
            <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>踏序足迹 · 合规文案</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="关闭协议详情"
          className={closeBtnClasses}
        >
          <X size={20} />
        </button>
      </div>
      {/* 正文区：主题匹配背景 + 可滚动 */}
      <div className={contentClasses}>
        {content}
      </div>
    </motion.div>
  );
}

/* ============================================================
 *          组合导出：首启隐私同意弹窗容器
 *
 *  层级：
 *   z-50  — 首启遮罩（最外层，点击蒙层不关闭）
 *   z-110 — 协议详情 / 拒绝二次确认（在首启弹窗之上叠加）
 * ==========================================================*/
export interface PrivacyConsentModalProps {
  /** AnimatePresence 跟踪进入/退出的稳定 key */
  key?: React.Key;
  /** 当前主题（从 App/caller 传入），用于让合规页与首页风格保持一致 */
  theme?: MapTheme;
  /** 协议详情查看：null=不展示，'user_agreement'=查看用户协议，'privacy_policy'=查看隐私政策 */
  openDetail: AgreementDocType | null;
  /** 关闭协议详情（返回首启同意弹窗） */
  onCloseDetail: () => void;
  /** 展示「拒绝」二次确认弹窗 */
  showDeclineModal: boolean;
  /** 取消二次确认（返回首启同意弹窗） */
  onDeclineCancel: () => void;
  /** 确定拒绝（由调用方处理：Web 端提示/禁用、APP 端可退出） */
  onDeclineConfirm: () => void;
  /** 点击《用户服务协议》链接 */
  onOpenAgreement: () => void;
  /** 点击《隐私政策》链接 */
  onOpenPrivacy: () => void;
  /** 点击「同意并继续」（持久化同意状态 → 解锁主界面） */
  onAccept: () => void;
  /** 点击「不同意」→ 调起二次确认 */
  onDecline: () => void;
  /** "确定拒绝"后的提示文案（用于 Web 端不能真退出的兜底提示叠加） */
  declineHintText?: string;
  /** 当前 declineHint 是否展示（供调用方直接透传，这里不需要） */
}

export default function PrivacyConsentModal(props: PrivacyConsentModalProps) {
  const {
    theme,
    openDetail,
    onCloseDetail,
    showDeclineModal,
    onDeclineCancel,
    onDeclineConfirm,
    onOpenAgreement,
    onOpenPrivacy,
    onAccept,
    onDecline,
    declineHintText,
  } = props;

  return (
    <>
      {/* ====== 遮罩 A：首启同意弹窗（最底层，不可点击背景关闭） ====== */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
      >
        <PrivacyModal
          onAccept={onAccept}
          onDecline={onDecline}
          onOpenAgreement={onOpenAgreement}
          onOpenPrivacy={onOpenPrivacy}
        />
      </div>

      {/* ====== 遮罩 B：在上层叠加「协议详情」或「拒绝二次确认」 ====== */}
      <AnimatePresence>
        {(openDetail || showDeclineModal) && (
          <div
            key="detail-overlay"
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-110"
            onClick={openDetail ? onCloseDetail : onDeclineCancel}
          >
            <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="w-full max-w-3xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                {openDetail && (
                  <AgreementModal
                    key={`doc-${openDetail}`}
                    docType={openDetail}
                    onClose={onCloseDetail}
                    theme={theme}
                  />
                )}
                {!openDetail && showDeclineModal && (
                  <DeclineConfirmModal
                    key="decline-confirm"
                    onCancel={onDeclineCancel}
                    onConfirm={onDeclineConfirm}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ====== 遮罩 C：确定拒绝后 Web 端的「无法退出」友好提示（可选叠加） ====== */}
      <AnimatePresence>
        {declineHintText && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed z-120 bottom-28 left-1/2 -translate-x-1/2 max-w-md w-[90%] px-5 py-4 rounded-2xl bg-rose-600/95 text-white text-center text-sm shadow-2xl backdrop-blur-xl border border-rose-400/40"
          >
            {declineHintText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* 也可单独导出设置页中直接使用的协议详情小包装组件 */
export { AgreementModal, PrivacyModal, DeclineConfirmModal, PrivacyPolicyContent, UserAgreementContent };
