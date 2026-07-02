/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapTheme } from '../types';

export const mapThemes: MapTheme[] = [
  {
    id: 'light',
    name: '浅色治愈 (Minimalism)',
    bgClass: 'bg-gradient-to-br from-[#E8F4FA] via-[#F3FAFC] to-[#D4EBF7]',
    cardClass: 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-[#2A7BAA]/5',
    textColorClass: 'text-[#1F2937]',
    provinceStroke: 'stroke-[#2A7BAA]/30',
    provinceFillDefault: 'fill-[#2B84B5]/8',
    provinceFillHighlight: 'fill-gradient', // Custom handling
    unlockedCityGlow: 'bg-[#FF9A56]',
    gridColor: 'rgba(42, 123, 170, 0.04)'
  },
  {
    id: 'dark',
    name: '深色星空',
    bgClass: 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#010816]',
    cardClass: 'bg-slate-900/80 backdrop-blur-md border border-slate-700/50',
    textColorClass: 'text-slate-200',
    provinceStroke: 'stroke-slate-600/50',
    provinceFillDefault: 'fill-slate-800/30',
    provinceFillHighlight: 'fill-[#10B981]',
    unlockedCityGlow: 'bg-[#FF9A56]',
    gridColor: 'rgba(255, 255, 255, 0.03)'
  },
  {
    id: 'minimal',
    name: '极简纯白',
    bgClass: 'bg-[#F9FCFF]',
    cardClass: 'bg-white border border-slate-100 shadow-sm',
    textColorClass: 'text-slate-700',
    provinceStroke: 'stroke-slate-200',
    provinceFillDefault: 'fill-slate-50',
    provinceFillHighlight: 'fill-[#2A7BAA]',
    unlockedCityGlow: 'bg-[#2A7BAA]',
    gridColor: 'rgba(0, 0, 0, 0.01)'
  },
  {
    id: 'vintage',
    name: '复古纸质',
    bgClass: 'bg-gradient-to-br from-[#F7F2E8] via-[#EFE9DB] to-[#E5DCB9]',
    cardClass: 'bg-[#FCFAF2]/95 border border-[#D5CBA8]',
    textColorClass: 'text-[#4A3E3D]',
    provinceStroke: 'stroke-[#C8BFA2]',
    provinceFillDefault: 'fill-[#E2DABF]/50',
    provinceFillHighlight: 'fill-[#A64B2A]',
    unlockedCityGlow: 'bg-[#D97706]',
    gridColor: 'rgba(166, 75, 42, 0.03)'
  }
];
