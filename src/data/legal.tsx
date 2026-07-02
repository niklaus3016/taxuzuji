/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import type { MapTheme } from '../types';

/* ========================================================================
 *  踏序足迹 — 合规协议正文数据源
 *
 *  重要合规约束（按用户要求）：
 *   - 开发运营主体、联系邮箱、管辖法院、版权落款：严格保留参考代码中的
 *     「光年跃迁（温州）科技有限公司」/「Jp112022@163.com」
 *   - 应用名：由参考代码「轻序计分」统一改为「踏序足迹」
 *   - 信息收集/存储/共享/服务内容：基于踏序足迹真实情况表述
 *     （纯本地存储、无后端、无账号、无第三方 SDK）
 * ======================================================================*/

/* ---------- 四主题配色 helper（与 themes.ts 保持一致） ---------- */
interface ThemeTokens {
  /** 主标题色 h1/h2 */
  heading: string;
  /** 品牌强调色（和 Logo 蓝→橙渐变一致，用作首段卡片左侧边框、标题图标） */
  accent: string;
  accentSoftBg: string;
  accentSoftBorder: string;
  /** 正文文字色 p/li */
  body: string;
  /** 次级文字色（生效日期、感谢语、版权小字等） */
  muted: string;
  /** h2 标题底部分隔线 */
  sectionDivider: string;
  /** 尾部分隔线 */
  footerDivider: string;
  /** 信息块卡片（如联系方式、信息摘要） */
  panelBg: string;
  panelBorder: string;
  /** 加粗文字色（<strong>） */
  strong: string;
}

function resolveTokens(theme?: MapTheme): ThemeTokens {
  switch (theme?.id) {
    case 'dark':
      return {
        heading: 'text-slate-100',
        accent: 'text-[#2A7BAA]',
        accentSoftBg: 'bg-[#2A7BAA]/10',
        accentSoftBorder: 'border-l-[#2A7BAA]',
        body: 'text-slate-300',
        muted: 'text-slate-500',
        sectionDivider: 'border-b-slate-700/60',
        footerDivider: 'border-t-slate-700/60',
        panelBg: 'bg-slate-800/60',
        panelBorder: 'border-slate-700/70',
        strong: 'text-slate-100',
      };
    case 'vintage':
      return {
        heading: 'text-[#4A3E3D]',
        accent: 'text-[#A64B2A]',
        accentSoftBg: 'bg-gradient-to-r from-[#F7F2E8] to-[#EFE2C6]',
        accentSoftBorder: 'border-l-[#A64B2A]',
        body: 'text-[#4A3E3D]',
        muted: 'text-[#8B7D60]',
        sectionDivider: 'border-b-[#D5CBA8]',
        footerDivider: 'border-t-[#D5CBA8]',
        panelBg: 'bg-[#FDF6E1]',
        panelBorder: 'border-[#D5CBA8]',
        strong: 'text-[#4A3E3D]',
      };
    case 'minimal':
      return {
        heading: 'text-slate-800',
        accent: 'text-[#2A7BAA]',
        accentSoftBg: 'bg-slate-50',
        accentSoftBorder: 'border-l-[#2A7BAA]',
        body: 'text-slate-700',
        muted: 'text-slate-400',
        sectionDivider: 'border-b-slate-100',
        footerDivider: 'border-t-slate-100',
        panelBg: 'bg-white',
        panelBorder: 'border-slate-100',
        strong: 'text-slate-800',
      };
    case 'light':
    default:
      return {
        heading: 'text-[#1F2937]',
        accent: 'text-[#2A7BAA]',
        accentSoftBg: 'bg-gradient-to-r from-blue-50 to-[#D4EBF7]',
        accentSoftBorder: 'border-l-[#2A7BAA]',
        body: 'text-slate-700',
        muted: 'text-slate-500',
        sectionDivider: 'border-b-slate-200',
        footerDivider: 'border-t-slate-200',
        panelBg: 'bg-slate-50',
        panelBorder: 'border-slate-200',
        strong: 'text-[#1F2937]',
      };
  }
}

/* ==================================================================
 *                        隐私政策正文
 * ==================================================================*/
interface ContentProps {
  /** 当前主题（可选，未传则默认浅色） */
  theme?: MapTheme;
}

export function PrivacyPolicyContent({ theme }: ContentProps) {
  const t = resolveTokens(theme);

  return (
    <div className="max-w-none leading-relaxed">
      {/* 顶部标题 */}
      <h1
        className={`text-2xl sm:text-[26px] font-extrabold ${t.heading} text-center mb-2 tracking-wide`}
      >
        🔒 隐私政策
      </h1>
      <p className={`text-center ${t.muted} mb-6 text-[13px]`}>
        <strong className={t.strong}>生效日期</strong>：2026年07月02日
      </p>

      {/* 首段欢迎卡片（左色条 + 浅渐变背景，与踏序足迹 Logo 品牌蓝呼应） */}
      <div
        className={`p-5 sm:p-6 rounded-xl border-l-4 ${t.accentSoftBorder} ${t.accentSoftBg} mb-6`}
      >
        <p className={`${t.body} leading-relaxed`}>
          欢迎使用「<strong className={t.strong}>踏序足迹</strong>」（以下简称&quot;本应用&quot;）。
          本应用由
          <strong className={t.strong}> 光年跃迁（温州）科技有限公司 </strong>
          （以下简称&quot;我们&quot;）开发并运营。我们深知个人信息对您的重要性，将严格遵守
          《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。
        </p>
      </div>

      <p className={`mb-6 ${t.body}`}>
        本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本应用过程中提供的个人信息，
        以及您对这些信息所享有的权利。请您在使用本应用前仔细阅读并充分理解本政策的全部内容，
        尤其是加粗的条款。如您对本政策有任何疑问、意见或建议，可通过本政策末尾提供的联系方式与我们联系。
      </p>

      {/* ───── 一、我们收集的信息 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        一、我们收集的信息
      </h2>
      <p className={`mb-4 ${t.body}`}>
        在您使用本应用的过程中，我们会收集以下信息，以提供、维护和改进我们的服务：
      </p>
      <ol className={`list-decimal pl-6 mb-6 space-y-3 ${t.body}`}>
        <li>
          <strong className={t.strong}>足迹数据</strong>：
          您在使用本应用过程中<strong className={t.strong}>主动录入</strong>的所有
          <strong className={t.strong}>
            到访城市、出行日期、出行类型、旅途感悟文字、旅行照片（Base64 本地存储）、
            个性化旅行签名，以及由上述数据衍生出的地图点亮轨迹与统计数据
          </strong>
          。这些数据是本应用的核心功能内容，用于为您提供城市点亮可视化、
          数据看板、时光轴浏览、纪念明信片生成等服务。
        </li>
        <li>
          <strong className={t.strong}>偏好设置数据</strong>：
          您选择的<strong className={t.strong}>地图主题（浅色/深色/极简/复古）</strong>
          与个性化旅行签名，用于为您提供一致的个性化视觉体验。
        </li>
        <li>
          <strong className={t.strong}>关于设备信息的说明</strong>：
          本应用<strong className={t.strong}>不主动收集</strong>任何
          设备型号、操作系统版本、IMEI/Android_ID/IDFA、IP 地址等设备识别信息。
          应用运行过程中仅使用浏览器/Capacitor WebView 自带的
          <strong className={t.strong}>本地存储（localStorage / IndexedDB）</strong>
          保存您主动录入的足迹与偏好数据，<strong className={t.strong}>
            不会将任何数据上传至服务器
          </strong>。
        </li>
      </ol>

      {/* ───── 二、我们如何使用信息 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        二、我们如何使用收集的信息
      </h2>
      <p className={`mb-4 ${t.body}`}>
        我们仅会在以下<strong className={t.strong}>合法、正当、必要</strong>的范围内使用您的个人信息：
      </p>
      <ol className={`list-decimal pl-6 mb-6 space-y-3 ${t.body}`}>
        <li>
          <strong className={t.strong}>提供和改进核心服务</strong>：
          使用您的足迹数据实现「到访城市地图点亮」「出行类型可视化」「数据看板统计」
          「时光轴浏览」「城市纪念明信片生成」等核心功能；通过本应用自身的更新迭代持续改进产品体验。
        </li>
        <li>
          <strong className={t.strong}>本地匿名化统计</strong>：
          在对您的个人信息进行<strong className={t.strong}>纯本地去标识化</strong>处理后，
          用于应用内的可视化看板（如饼图出行分布、Top5 常造访城市排行）。
          该类统计仅在您当前设备内完成，不对外发送，不用于商业决策或对外报告。
        </li>
        <li>
          <strong className={t.strong}>协议升级与合规提示</strong>：
          当《用户服务协议》《隐私政策》发生重大内容更新时，
          使用您本地存储的「同意协议版本号」判断是否需要重新弹出同意提示，
          以确保您对新协议内容的<strong className={t.strong}>知情权与选择权</strong>。
        </li>
      </ol>

      {/* ───── 三、共享、转让和公开披露 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        三、我们如何共享、转让和公开披露信息
      </h2>
      <p className={`mb-4 ${t.body}`}>
        我们郑重承诺，严格保护您的个人信息，
        <strong className={t.strong}> 不会在以下情形之外 向任何第三方共享、转让或公开披露 </strong>
        您的信息：
      </p>
      <ol className={`list-decimal pl-6 mb-6 space-y-3 ${t.body}`}>
        <li>
          <strong className={t.strong}>法定情形</strong>：
          根据法律法规的规定、行政或司法机关的强制性要求，我们可能会向有关部门披露您的相关信息。
        </li>
        <li>
          <strong className={t.strong}>获得您的明确同意</strong>：
          在获得您的明确书面同意后，我们才会向第三方共享您的个人信息。
        </li>
        <li>
          <strong className={t.strong}>关于第三方 SDK 的特别说明</strong>：
          本应用<strong className={t.strong}>不嵌入任何</strong>
          第三方统计 SDK、广告 SDK、推送 SDK、地图 SDK 或支付 SDK，
          亦不通过任何合作伙伴的技术手段收集您的信息。
          您的足迹数据<strong className={t.strong}>仅保存在您当前设备的本地存储中</strong>，
          除非您主动通过「JSON 导出备份」功能手动导出并自行发送，
          否则不会流出您的设备。
        </li>
      </ol>

      {/* ───── 四、存储和保护 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        四、我们如何存储和保护信息
      </h2>
      <ol className={`list-decimal pl-6 mb-6 space-y-3 ${t.body}`}>
        <li>
          <strong className={t.strong}>存储地点与方式</strong>：
          您的所有足迹与偏好数据<strong className={t.strong}>仅存储于您自己的设备本地</strong>
          （Web 端为浏览器 <code>localStorage</code>，Android/App 端为 Capacitor WebView
          本地存储），不传输至中华人民共和国境内外任何服务器。
        </li>
        <li>
          <strong className={t.strong}>存储期限</strong>：
          我们会在实现本政策所述目的所必需的最短时间内保留您的信息；
          超出此期限后您可通过<strong className={t.strong}>应用内「清空所有记录」</strong>一键删除，
          或在浏览器/App 设置中清空站点数据即可立即移除。
        </li>
        <li>
          <strong className={t.strong}>安全措施</strong>：
          我们采用符合行业标准的<strong className={t.strong}>纯本地隔离存储</strong>模型，
          因数据不跨网络传输，避免了传统&quot;服务器—客户端&quot;架构常见的传输泄漏风险；
          同时建议您妥善保管设备锁屏密码，避免未经授权的物理访问导致数据泄露。
        </li>
      </ol>

      {/* ───── 五、您的权利 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        五、您的权利
      </h2>
      <p className={`mb-4 ${t.body}`}>
        根据相关法律法规，您对您的个人信息享有以下权利：
      </p>
      <ol className={`list-decimal pl-6 mb-6 space-y-3 ${t.body}`}>
        <li>
          <strong className={t.strong}>访问权</strong>：
          您可以随时在本应用的<strong className={t.strong}>「时光轴」</strong>与
          <strong className={t.strong}>「数据看板」</strong>中查看、
          管理您的全部足迹数据与统计结果。
        </li>
        <li>
          <strong className={t.strong}>更正权</strong>：
          如您发现单条足迹的城市、日期、出行类型或旅途感悟存在错误，
          您可以通过<strong className={t.strong}>城市详情页的「编辑」</strong>入口随时修改更正。
        </li>
        <li>
          <strong className={t.strong}>删除权</strong>：
          您可以随时删除<strong className={t.strong}>单条足迹记录</strong>，
          也可以在「设置—清空所有记录」中<strong className={t.strong}>一键清空全部数据</strong>，
          应用将立即从本地存储中删除相关数据。
        </li>
        <li>
          <strong className={t.strong}>数据导出权</strong>：
          本应用提供<strong className={t.strong}>「一键本地数据备份」</strong>功能，
          您可将全部足迹以 JSON 文件的形式导出到设备本地任意位置保存；
          也可在更换设备后通过「导入并还原足迹备份」恢复完整数据。
        </li>
        <li>
          <strong className={t.strong}>撤回同意权</strong>：
          您对《用户服务协议》《隐私政策》的同意为一次性的启动授权，
          如需撤回同意，可通过<strong className={t.strong}>「设置—清空所有记录」</strong>
          删除所有数据并卸载本应用即视为撤回同意；
          我们不会因此前的同意行为而延续使用信息。
        </li>
      </ol>

      {/* ───── 六、未成年人保护 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        六、未成年人保护
      </h2>
      <p className={`mb-6 ${t.body}`}>
        我们非常重视对未成年人个人信息的保护。如您是<strong className={t.strong}>未满 14 周岁</strong>的未成年人，
        在使用本应用前，应在监护人的指导下仔细阅读本政策，并征得监护人的同意。
        如我们发现自己在未事先获得监护人可验证同意的情况下收集了未成年人的个人信息，
        将<strong className={t.strong}>立即删除</strong>相关数据。
      </p>

      {/* ───── 七、政策的更新 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        七、本政策的更新
      </h2>
      <p className={`mb-6 ${t.body}`}>
        我们可能会根据法律法规的更新、业务的调整或技术的发展，适时对本隐私政策进行修订。
        修订后的政策将在本应用内<strong className={t.strong}>显著位置（设置页 &amp; 首启弹窗）</strong>公示，
        并在生效前通过合理方式通知您。<strong className={t.strong}>
          重大内容变更时，我们会通过「首启弹窗重新征求同意」的方式再次确认您的授权
        </strong>；如您继续使用本应用，即表示您同意接受修订后的政策。
      </p>

      {/* ───── 八、联系我们 ───── */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        八、联系我们
      </h2>
      <p className={`mb-4 ${t.body}`}>
        如您对本隐私政策有任何疑问、意见或建议，或需要行使您的相关权利，请通过以下方式与我们联系：
      </p>
      <div className={`p-4 sm:p-5 rounded-xl border ${t.panelBg} ${t.panelBorder} mb-6 space-y-2`}>
        <p className={t.body}>
          <strong className={t.strong}>运营主体</strong>：光年跃迁（温州）科技有限公司
        </p>
        <p className={t.body}>
          <strong className={t.strong}>电子邮箱</strong>：Jp112022@163.com
        </p>
      </div>

      {/* 底部感谢语 + 版权 */}
      <div className={`mt-8 pt-6 border-t ${t.footerDivider} text-center space-y-2`}>
        <p className={`${t.muted} text-sm`}>感谢您使用踏序足迹！</p>
        <p className={`${t.muted} text-sm`}>我们致力于为您提供安全、美好的专属足迹记录体验。</p>
        <p className={`text-xs mt-4 ${t.muted}`}>© 2026 光年跃迁（温州）科技有限公司 版权所有</p>
      </div>
    </div>
  );
}

/* ==================================================================
 *                      用户服务协议正文
 * ==================================================================*/
export function UserAgreementContent({ theme }: ContentProps) {
  const t = resolveTokens(theme);

  return (
    <div className={`max-w-none leading-relaxed space-y-4 ${t.body}`}>
      <h1
        className={`text-2xl sm:text-[26px] font-extrabold ${t.heading} text-center mb-4 tracking-wide`}
      >
        📄 用户服务协议
      </h1>
      <p className={`text-center ${t.muted} mb-8 text-[13px]`}>更新日期：2026年07月02日</p>

      {/* 1. 协议的接受 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        1. 协议的接受
      </h2>
      <p>
        欢迎使用「<strong className={t.strong}>踏序足迹</strong>」应用（以下简称「本应用」）。
      </p>
      <p>
        本协议是您与
        <strong className={t.strong}> 光年跃迁（温州）科技有限公司 </strong>
        （以下简称「我们」）之间关于使用本应用的法律协议。
      </p>
      <p>
        通过<strong className={t.strong}>下载、安装或使用</strong>本应用，您表示同意接受本协议的全部条款和条件。
      </p>

      {/* 2. 服务内容 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        2. 服务内容
      </h2>
      <p>本应用提供以下服务：</p>
      <ul className={`list-disc pl-6 space-y-2`}>
        <li>创建和管理<strong className={t.strong}>城市足迹记录</strong>（到访城市、出行日期、出行类型、旅途感悟等）</li>
        <li><strong className={t.strong}>中国地图城市点亮</strong>与轨迹连线可视化展示</li>
        <li>多维度<strong className={t.strong}>数据看板统计</strong>（到访城市/省份、出行类型分布、Top 榜单）</li>
        <li>按时间序列浏览的<strong className={t.strong}>足迹时光轴</strong></li>
        <li><strong className={t.strong}>城市纪念明信片</strong>（Canvas 合成 + PNG 下载）</li>
        <li>足迹数据<strong className={t.strong}>JSON 格式导入/导出</strong>与本地备份</li>
        <li>四套<strong className={t.strong}>专属地图主题</strong>（浅色治愈、深色星空、极简纯白、复古纸质）切换</li>
        <li>个性化<strong className={t.strong}>旅行签名</strong>设置</li>
      </ul>

      {/* 3. 用户义务 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        3. 用户义务
      </h2>
      <p>作为本应用的用户，您同意：</p>
      <ul className={`list-disc pl-6 space-y-2`}>
        <li>遵守本协议的所有条款</li>
        <li>不使用本应用进行任何<strong className={t.strong}>非法活动</strong></li>
        <li>不干扰本应用的正常运行</li>
        <li>保护您的<strong className={t.strong}>设备安全</strong>，防止未授权访问</li>
        <li>
          您录入的足迹内容（含文字与图片）不得违反法律法规、公序良俗，
          亦不得侵害任何第三方的合法权益；否则由此引起的<strong className={t.strong}>
            法律责任由您自行承担
          </strong>。
        </li>
      </ul>

      {/* 4. 知识产权 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        4. 知识产权
      </h2>
      <p>
        本应用的所有内容，包括但不限于<strong className={t.strong}>
          文字、图像、图标、UI 设计、中国地图 SVG 轮廓、算法逻辑、软件代码
        </strong>等，均受知识产权法律保护。
      </p>
      <p>
        未经我们的<strong className={t.strong}>书面许可</strong>，您不得复制、修改、分发或商业使用本应用的任何内容。
      </p>

      {/* 5. 免责声明 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        5. 免责声明
      </h2>
      <p>本应用按<strong className={t.strong}>「原样」</strong>提供，不做任何形式的保证。</p>
      <p>我们不保证：</p>
      <ul className={`list-disc pl-6 space-y-2`}>
        <li>本应用将<strong className={t.strong}>符合您的要求</strong></li>
        <li>本应用将<strong className={t.strong}>无中断、及时、安全或无错误</strong>地运行</li>
        <li>本应用的使用结果将<strong className={t.strong}>准确或可靠</strong></li>
      </ul>
      <p className={`pt-2`}>
        因您的<strong className={t.strong}>设备存储空间不足、手动清空浏览器/WebView 数据、
        刷机、恢复出厂设置</strong>等非本应用技术缺陷原因导致的足迹数据丢失，
        我们不承担责任；<strong className={t.strong}>
          请您养成定期通过「JSON 导出备份」保存数据的良好习惯
        </strong>。
      </p>

      {/* 6. 终止 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        6. 终止
      </h2>
      <p>
        我们有权在任何时候，出于任何原因，
        <strong className={t.strong}>终止或暂停</strong>您对本应用的访问。
      </p>
      <p>您也可以随时停止使用本应用。</p>

      {/* 7. 适用法律 */}
      <h2
        className={`text-lg sm:text-xl font-bold ${t.heading} mt-8 mb-4 pb-2 border-b-2 ${t.sectionDivider}`}
      >
        7. 适用法律
      </h2>
      <p>
        本协议受<strong className={t.strong}>中华人民共和国法律</strong>管辖。
      </p>
      <p>
        任何与本协议相关的争议，应通过友好协商解决；协商不成的，应提交至
        <strong className={t.strong}>温州市有管辖权的人民法院</strong>诉讼解决。
      </p>

      {/* 底部落款 */}
      <div className={`mt-10 pt-6 border-t ${t.footerDivider} text-center space-y-2`}>
        <p className={t.muted}>
          — 本协议最终解释权归 <strong className={t.strong}>光年跃迁（温州）科技有限公司</strong> 所有 —
        </p>
        <p className={`text-xs mt-2 ${t.muted}`}>© 2026 光年跃迁（温州）科技有限公司 版权所有</p>
      </div>
    </div>
  );
}
