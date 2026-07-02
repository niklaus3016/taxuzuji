/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Footprint } from '../types';

export const sampleFootprints: Footprint[] = [
  {
    id: 'sample_beijing_1',
    cityId: 'beijing_sub',
    cityName: '北京市',
    provinceName: '北京',
    visitDate: '2024-03-12',
    tripType: 'tourism',
    remark: '踏足紫禁城，红墙金瓦，岁月沉淀。在故宫角楼拍下了极美的落日倒影，不虚此行。',
    photos: [],
    createdDate: new Date('2024-03-12').toISOString(),
  },
  {
    id: 'sample_chengdu_1',
    cityId: 'chengdu',
    cityName: '成都市',
    provinceName: '四川',
    visitDate: '2024-08-20',
    tripType: 'tourism',
    remark: '春熙路的繁华，锦里的古韵，还有吃不够的火锅和钵钵鸡。大熊猫真的很治愈！🐼',
    photos: [],
    createdDate: new Date('2024-08-20').toISOString(),
  },
  {
    id: 'sample_shenzhen_1',
    cityId: 'shenzhen',
    cityName: '深圳市',
    provinceName: '广东',
    visitDate: '2025-01-05',
    tripType: 'work',
    remark: '到深圳湾科技园出差，晚上吹了吹深圳湾的海风，感受到了大都市的高端与奋斗活力。',
    photos: [],
    createdDate: new Date('2025-01-05').toISOString(),
  },
  {
    id: 'sample_hangzhou_1',
    cityId: 'hangzhou',
    cityName: '杭州市',
    provinceName: '浙江',
    visitDate: '2025-05-18',
    tripType: 'tourism',
    remark: '“欲把西湖比西子，淡妆浓抹总相宜。” 下午在西湖边骑单车，清风拂面，生活节奏慢了下来。',
    photos: [],
    createdDate: new Date('2025-05-18').toISOString(),
  },
  {
    id: 'sample_shanghai_1',
    cityId: 'shanghai_sub',
    cityName: '上海市',
    provinceName: '上海',
    visitDate: '2025-06-01',
    tripType: 'business',
    remark: '外滩游览，陆家嘴三件套巍然矗立。黄浦江上的游轮和两岸夜景交相辉映，极其震撼。',
    photos: [],
    createdDate: new Date('2025-06-01').toISOString(),
  },
  {
    id: 'sample_shanghai_2',
    cityId: 'shanghai_sub',
    cityName: '上海市',
    provinceName: '上海',
    visitDate: '2026-02-15',
    tripType: 'family',
    remark: '陪家人重新走过上海的老街道，在武康路喝了特色咖啡，岁月静好。',
    photos: [],
    createdDate: new Date('2026-02-15').toISOString(),
  }
];
