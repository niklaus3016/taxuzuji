/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TripType = 'tourism' | 'work' | 'business' | 'family' | 'study' | 'other';

export interface Footprint {
  id: string;
  cityId: string;
  cityName: string;
  provinceName: string;
  visitDate: string;
  tripType: TripType;
  remark: string;
  photos: string[]; // Base64 image strings or placeholders
  createdDate: string;
}

export interface City {
  id: string;
  name: string;
  x: number; // 0-1000 grid coordinate
  y: number; // 0-780 grid coordinate
}

export interface Province {
  id: string;
  name: string;
  capitalX: number;
  capitalY: number;
  cities: City[];
  path: string; // SVG path representing province outline
}

export type MapThemeId = 'light' | 'dark' | 'minimal' | 'vintage';

export interface MapTheme {
  id: MapThemeId;
  name: string;
  bgClass: string;
  cardClass: string;
  textColorClass: string;
  provinceStroke: string;
  provinceFillDefault: string;
  provinceFillHighlight: string;
  unlockedCityGlow: string;
  gridColor: string;
}

/** 隐私政策 / 用户协议 同意状态 */
export interface PrivacyConsent {
  agreed: boolean;
  declined?: boolean;
  policyVersion: string; // 例如 "1.0" — 用于协议升级时强制重新弹窗
  agreedAt?: string;     // ISO 时间戳
}

/** 协议详情弹窗展示的文档类型 */
export type AgreementDocType = 'user_agreement' | 'privacy_policy';
