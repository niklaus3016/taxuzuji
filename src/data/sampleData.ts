/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Footprint } from '../types';

/**
 * 首次启动的初始足迹数据。
 * 产品要求：用户首次进入应为"空白应用"，不预置任何演示足迹，
 * 因此此处固定返回空数组。如需恢复演示数据可直接在此处追加。
 */
export const sampleFootprints: Footprint[] = [];
