/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Province } from '../types';

export const provincesData: Province[] = [
  {
    id: 'beijing',
    name: '北京',
    capitalX: 730,
    capitalY: 290,
    path: 'M 720,280 L 740,280 L 745,295 L 730,305 L 718,295 Z',
    cities: [
      { id: 'beijing_sub', name: '北京市', x: 730, y: 290 }
    ]
  },
  {
    id: 'tianjin',
    name: '天津',
    capitalX: 745,
    capitalY: 305,
    path: 'M 740,298 L 752,298 L 755,310 L 745,315 L 738,308 Z',
    cities: [
      { id: 'tianjin_sub', name: '天津市', x: 745, y: 305 }
    ]
  },
  {
    id: 'shanghai',
    name: '上海',
    capitalX: 835,
    capitalY: 460,
    path: 'M 832,455 L 842,455 L 842,465 L 832,465 Z',
    cities: [
      { id: 'shanghai_sub', name: '上海市', x: 835, y: 460 }
    ]
  },
  {
    id: 'chongqing',
    name: '重庆',
    capitalX: 590,
    capitalY: 520,
    path: 'M 570,495 L 585,485 L 595,502 L 610,515 L 612,535 L 595,545 L 575,530 Z',
    cities: [
      { id: 'chongqing_sub', name: '重庆市', x: 590, y: 520 }
    ]
  },
  {
    id: 'hebei',
    name: '河北',
    capitalX: 710,
    capitalY: 325,
    path: 'M 698,265 L 735,300 L 740,298 L 752,298 L 758,310 L 740,330 L 720,338 L 705,325 L 700,315 L 695,295 Z',
    cities: [
      { id: 'shijiazhuang', name: '石家庄市', x: 705, y: 325 },
      { id: 'tangshan', name: '唐山市', x: 755, y: 295 },
      { id: 'qinhuangdao', name: '秦皇岛市', x: 775, y: 285 },
      { id: 'handan', name: '邯郸市', x: 700, y: 360 },
      { id: 'xingtai', name: '邢台市', x: 702, y: 348 },
      { id: 'baoding', name: '保定市', x: 712, y: 310 },
      { id: 'zhangjiakou', name: '张家口市', x: 698, y: 265 },
      { id: 'chengde', name: '承德市', x: 738, y: 255 },
      { id: 'cangzhou', name: '沧州市', x: 740, y: 330 },
      { id: 'langfang', name: '廊坊市', x: 735, y: 300 },
      { id: 'hengshui', name: '衡水市', x: 720, y: 338 }
    ]
  },
  {
    id: 'shanxi',
    name: '山西',
    capitalX: 670,
    capitalY: 332,
    path: 'M 655,290 L 685,285 L 685,340 L 678,382 L 640,395 L 648,340 Z',
    cities: [
      { id: 'taiyuan', name: '太原市', x: 670, y: 332 },
      { id: 'datong', name: '大同市', x: 678, y: 275 },
      { id: 'yangquan', name: '阳泉市', x: 686, y: 325 },
      { id: 'changzhi', name: '长治市', x: 680, y: 368 },
      { id: 'jincheng', name: '晋城市', x: 675, y: 382 },
      { id: 'shuozhou', name: '朔州市', x: 660, y: 290 },
      { id: 'jinzhong', name: '晋中市', x: 675, y: 345 },
      { id: 'yuncheng', name: '运城市', x: 642, y: 398 },
      { id: 'xinzhou', name: '忻州市', x: 668, y: 305 },
      { id: 'linfen', name: '临汾市', x: 652, y: 375 },
      { id: 'lvliang', name: '吕梁市', x: 648, y: 335 }
    ]
  },
  {
    id: 'liaoning',
    name: '辽宁',
    capitalX: 800,
    capitalY: 240,
    path: 'M 785,270 L 780,245 L 810,230 L 835,215 L 845,235 L 815,260 Z',
    cities: [
      { id: 'shenyang', name: '沈阳市', x: 800, y: 240 },
      { id: 'dalian', name: '大连市', x: 810, y: 280 },
      { id: 'anshan', name: '鞍山市', x: 805, y: 248 },
      { id: 'fushun', name: '抚顺市', x: 815, y: 236 },
      { id: 'benxi', name: '本溪市', x: 818, y: 243 },
      { id: 'dandong', name: '丹东市', x: 828, y: 254 },
      { id: 'jinzhou', name: '锦州市', x: 780, y: 250 },
      { id: 'yingkou', name: '营口市', x: 796, y: 260 },
      { id: 'fuxin', name: '阜新市', x: 788, y: 232 },
      { id: 'liaoyang', name: '辽阳市', x: 806, y: 245 },
      { id: 'panjin', name: '盘锦市', x: 788, y: 255 },
      { id: 'tieling', name: '铁岭市', x: 814, y: 228 },
      { id: 'chaoyang', name: '朝阳市', x: 765, y: 240 },
      { id: 'huludao', name: '葫芦岛市', x: 768, y: 258 }
    ]
  },
  {
    id: 'jilin',
    name: '吉林',
    capitalX: 850,
    capitalY: 180,
    path: 'M 855,225 L 825,210 L 840,180 L 870,165 L 905,185 L 890,215 Z',
    cities: [
      { id: 'changchun', name: '长春市', x: 845, y: 180 },
      { id: 'jilin_city', name: '吉林市', x: 865, y: 185 },
      { id: 'siping', name: '四平市', x: 830, y: 198 },
      { id: 'liaoyuan', name: '辽源市', x: 842, y: 202 },
      { id: 'tonghua', name: '通化市', x: 858, y: 220 },
      { id: 'baishan', name: '白山市', x: 870, y: 215 },
      { id: 'songyuan', name: '松原市', x: 830, y: 165 },
      { id: 'baicheng', name: '白城市', x: 808, y: 148 },
      { id: 'yanbian', name: '延边朝鲜族自治州', x: 910, y: 190 }
    ]
  },
  {
    id: 'heilongjiang',
    name: '黑龙江',
    capitalX: 870,
    capitalY: 110,
    path: 'M 825,150 L 800,140 L 845,90 L 855,40 L 930,60 L 960,110 L 900,160 Z',
    cities: [
      { id: 'harbin', name: '哈尔滨市', x: 870, y: 130 },
      { id: 'qiqihaer', name: '齐齐哈尔市', x: 820, y: 105 },
      { id: 'jixi', name: '鸡西市', x: 935, y: 130 },
      { id: 'hegang', name: '鹤岗市', x: 915, y: 88 },
      { id: 'shuangyashan', name: '双鸭山市', x: 935, y: 105 },
      { id: 'daqing', name: '大庆市', x: 838, y: 120 },
      { id: 'yichun', name: '伊春市', x: 885, y: 85 },
      { id: 'jiamusi', name: '佳木斯市', x: 925, y: 100 },
      { id: 'qitaihe', name: '七台he市', x: 928, y: 118 },
      { id: 'mudanjiang', name: '牡丹江市', x: 910, y: 155 },
      { id: 'heihe', name: '黑河市', x: 860, y: 65 },
      { id: 'suihua', name: '绥化市', x: 865, y: 115 },
      { id: 'daxinganling', name: '大兴安岭地区', x: 810, y: 40 }
    ]
  },
  {
    id: 'jiangsu',
    name: '江苏',
    capitalX: 810,
    capitalY: 410,
    path: 'M 775,395 L 780,365 L 815,365 L 830,390 L 840,435 L 815,445 L 790,442 Z',
    cities: [
      { id: 'nanjing', name: '南京市', x: 795, y: 430 },
      { id: 'wuxi', name: '无锡市', x: 822, y: 442 },
      { id: 'xuzhou', name: '徐州市', x: 765, y: 382 },
      { id: 'changzhou', name: '常州市', x: 815, y: 442 },
      { id: 'suzhou', name: '苏州市', x: 830, y: 448 },
      { id: 'nantong', name: '南通市', x: 838, y: 432 },
      { id: 'lianyungang', name: '连云港市', x: 792, y: 375 },
      { id: 'huaian', name: '淮安市', x: 792, y: 402 },
      { id: 'yancheng', name: '盐城市', x: 818, y: 402 },
      { id: 'yangzhou', name: '扬州市', x: 802, y: 425 },
      { id: 'zhenjiang', name: '镇江市', x: 805, y: 435 },
      { id: 'taizhou_js', name: '泰州市', x: 812, y: 425 },
      { id: 'suqian', name: '宿迁市', x: 778, y: 392 }
    ]
  },
  {
    id: 'zhejiang',
    name: '浙江',
    capitalX: 820,
    capitalY: 480,
    path: 'M 790,480 L 795,465 L 825,455 L 835,475 L 842,505 L 820,530 L 805,515 Z',
    cities: [
      { id: 'hangzhou', name: '杭州市', x: 808, y: 475 },
      { id: 'ningbo', name: '宁波市', x: 838, y: 488 },
      { id: 'wenzhou', name: '温州市', x: 828, y: 528 },
      { id: 'jiaxing', name: '嘉兴市', x: 824, y: 465 },
      { id: 'huzhou', name: '湖州市', x: 810, y: 465 },
      { id: 'shaoxing', name: '绍兴市', x: 822, y: 485 },
      { id: 'jinhua', name: '金华市', x: 812, y: 505 },
      { id: 'quzhou', name: '衢州市', x: 795, y: 510 },
      { id: 'zhoushan', name: '舟山市', x: 852, y: 480 },
      { id: 'taizhou_zj', name: '台州市', x: 835, y: 512 },
      { id: 'lishui', name: '丽水市', x: 808, y: 525 }
    ]
  },
  {
    id: 'anhui',
    name: '安徽',
    capitalX: 780,
    capitalY: 450,
    path: 'M 748,458 L 750,420 L 755,405 L 785,395 L 798,418 L 790,455 L 765,478 Z',
    cities: [
      { id: 'hefei', name: '合肥市', x: 772, y: 442 },
      { id: 'wuhu', name: '芜湖市', x: 788, y: 454 },
      { id: 'bengbu', name: '蚌埠市', x: 775, y: 418 },
      { id: 'huainan', name: '淮南市', x: 768, y: 428 },
      { id: 'maanshan', name: '马鞍山市', x: 790, y: 446 },
      { id: 'huaibei', name: '淮北市', x: 766, y: 395 },
      { id: 'tongling', name: '铜陵市', x: 782, y: 458 },
      { id: 'anqing', name: '安庆市', x: 762, y: 472 },
      { id: 'huangshan', name: '黄山市', x: 780, y: 494 },
      { id: 'chuzhou', name: '滁州市', x: 788, y: 428 },
      { id: 'fuyang', name: '阜阳市', x: 746, y: 425 },
      { id: 'suzhou_ah', name: '宿州市', x: 772, y: 402 },
      { id: 'luand_ah', name: '六安市', x: 755, y: 448 },
      { id: 'bozhou', name: '亳州市', x: 748, y: 405 },
      { id: 'chizhou', name: '池州市', x: 772, y: 472 },
      { id: 'xuancheng', name: '宣城市', x: 795, y: 468 }
    ]
  },
  {
    id: 'fujian',
    name: '福建',
    capitalX: 800,
    capitalY: 550,
    path: 'M 760,575 L 775,540 L 780,528 L 808,520 L 812,545 L 805,582 L 785,595 Z',
    cities: [
      { id: 'fuzhou', name: '福州市', x: 802, y: 552 },
      { id: 'xiamen', name: '厦门市', x: 785, y: 588 },
      { id: 'putian', name: '莆田市', x: 796, y: 568 },
      { id: 'sanming', name: '三明市', x: 768, y: 555 },
      { id: 'quanzhou', name: '泉州市', x: 792, y: 578 },
      { id: 'zhangzhou', name: '漳州市', x: 776, y: 592 },
      { id: 'nanping', name: '南平市', x: 774, y: 528 },
      { id: 'longyan', name: '龙岩市', x: 760, y: 575 },
      { id: 'ningde', name: '宁德市', x: 810, y: 538 }
    ]
  },
  {
    id: 'jiangxi',
    name: '江西',
    capitalX: 750,
    capitalY: 530,
    path: 'M 724,562 L 730,510 L 735,490 L 762,485 L 770,512 L 765,568 L 745,582 Z',
    cities: [
      { id: 'nanchang', name: '南昌市', x: 752, y: 512 },
      { id: 'jingdezhen', name: '景德镇市', x: 775, y: 495 },
      { id: 'pingxiang', name: '萍乡市', x: 724, y: 540 },
      { id: 'jiujiang', name: '九江市', x: 748, y: 486 },
      { id: 'xinyu', name: '新余市', x: 735, y: 532 },
      { id: 'yingtan', name: '鹰潭市', x: 768, y: 524 },
      { id: 'ganzhou', name: '赣州市', x: 742, y: 578 },
      { id: 'jian', name: '吉安市', x: 738, y: 548 },
      { id: 'yichun_jx', name: '宜春市', x: 728, y: 524 },
      { id: 'fuzhou_jx', name: '抚州市', x: 760, y: 536 },
      { id: 'shangrao', name: '上饶市', x: 778, y: 512 }
    ]
  },
  {
    id: 'shandong',
    name: '山东',
    capitalX: 755,
    capitalY: 350,
    path: 'M 715,365 L 720,345 L 765,315 L 780,332 L 820,332 L 815,365 L 775,385 Z',
    cities: [
      { id: 'jinan', name: '济南市', x: 752, y: 348 },
      { id: 'qingdao', name: '青岛市', x: 802, y: 355 },
      { id: 'zibo', name: '淄博市', x: 764, y: 348 },
      { id: 'zaozhuang', name: '枣庄市', x: 762, y: 390 },
      { id: 'dongying', name: '东营市', x: 772, y: 332 },
      { id: 'yantai', name: '烟台市', x: 808, y: 326 },
      { id: 'weifang', name: '潍坊市', x: 780, y: 350 },
      { id: 'jining', name: '济宁市', x: 746, y: 382 },
      { id: 'taian', name: '泰安市', x: 752, y: 362 },
      { id: 'weihai', name: '威海市', x: 825, y: 324 },
      { id: 'rizhao', name: '日照市', x: 788, y: 372 },
      { id: 'linyi', name: '临沂市', x: 772, y: 380 },
      { id: 'dezhou', name: '德州市', x: 732, y: 332 },
      { id: 'liaocheng', name: '聊城市', x: 726, y: 348 },
      { id: 'binzhou', name: '滨州市', x: 758, y: 330 },
      { id: 'heze', name: '荷泽市', x: 724, y: 378 }
    ]
  },
  {
    id: 'henan',
    name: '河南',
    capitalX: 710,
    capitalY: 390,
    path: 'M 662,410 L 670,395 L 710,360 L 740,365 L 748,412 L 726,420 L 690,448 Z',
    cities: [
      { id: 'zhengzhou', name: '郑州市', x: 708, y: 392 },
      { id: 'kaifeng', name: '开封市', x: 722, y: 392 },
      { id: 'luoyang', name: '洛阳市', x: 686, y: 395 },
      { id: 'pingdingshan', name: '平顶山市', x: 698, y: 412 },
      { id: 'anyang', name: '安阳市', x: 708, y: 355 },
      { id: 'hebi', name: '鹤壁市', x: 714, y: 362 },
      { id: 'xinxiang', name: '新乡市', x: 712, y: 375 },
      { id: 'jiaozuo', name: '焦作市', x: 698, y: 378 },
      { id: 'puyang', name: '濮阳市', x: 726, y: 368 },
      { id: 'xuchang', name: '许昌市', x: 708, y: 406 },
      { id: 'luohe', name: '漯河市', x: 708, y: 416 },
      { id: 'sanmenxia', name: '三门峡市', x: 658, y: 395 },
      { id: 'nanyang', name: '南阳市', x: 678, y: 430 },
      { id: 'shangqiu', name: '商丘市', x: 735, y: 395 },
      { id: 'xinyang', name: '信阳市', x: 720, y: 460 },
      { id: 'zhoukou', name: '周口市', x: 726, y: 420 },
      { id: 'zhumadian', name: '驻马店市', x: 714, y: 435 },
      { id: 'jiyuan', name: '济源市', x: 690, y: 382 }
    ]
  },
  {
    id: 'hubei',
    name: '湖北',
    capitalX: 700,
    capitalY: 460,
    path: 'M 638,470 L 645,455 L 695,445 L 725,450 L 735,482 L 700,500 L 660,490 Z',
    cities: [
      { id: 'wuhan', name: '武汉市', x: 715, y: 468 },
      { id: 'huangshi', name: '黄石市', x: 730, y: 480 },
      { id: 'shiyan', name: '十堰市', x: 638, y: 436 },
      { id: 'yichang', name: '宜昌市', x: 658, y: 472 },
      { id: 'xiangyang', name: '襄阳市', x: 668, y: 442 },
      { id: 'ezhou', name: '鄂州市', x: 724, y: 472 },
      { id: 'jingmen', name: '荆门市', x: 672, y: 462 },
      { id: 'xiaogan', name: '孝感市', x: 705, y: 458 },
      { id: 'jingzhou', name: '荆州市', x: 675, y: 482 },
      { id: 'huanggang', name: '黄冈市', x: 732, y: 462 },
      { id: 'xianning', name: '咸宁市', x: 715, y: 490 },
      { id: 'suizhou', name: '随州市', x: 692, y: 445 },
      { id: 'enshi', name: '恩施土家族苗族自治州', x: 628, y: 485 },
      { id: 'xiantao', name: '仙桃市', x: 698, y: 474 },
      { id: 'qianjiang', name: '潜江市', x: 686, y: 474 },
      { id: 'tianmen', name: '天门市', x: 692, y: 468 },
      { id: 'shennongjia', name: '神农架林区', x: 638, y: 455 }
    ]
  },
  {
    id: 'hunan',
    name: '湖南',
    capitalX: 690,
    capitalY: 540,
    path: 'M 650,520 L 660,500 L 695,492 L 708,515 L 702,572 L 675,585 L 652,565 Z',
    cities: [
      { id: 'changsha', name: '长沙市', x: 692, y: 532 },
      { id: 'zhuzhou', name: '株洲市', x: 702, y: 542 },
      { id: 'xiangtan', name: '湘潭市', x: 686, y: 536 },
      { id: 'hengyang', name: '衡阳市', x: 685, y: 558 },
      { id: 'shaoyang', name: '邵阳市', x: 660, y: 558 },
      { id: 'yueyang', name: '岳阳市', x: 692, y: 505 },
      { id: 'changde', name: '常德市', x: 668, y: 512 },
      { id: 'zhangjiajie', name: '张家界市', x: 648, y: 510 },
      { id: 'yiyang', name: '益阳市', x: 675, y: 524 },
      { id: 'chenzhou', name: '郴州市', x: 695, y: 582 },
      { id: 'yongzhou', name: '永州市', x: 668, y: 580 },
      { id: 'huaihua', name: '怀化市', x: 638, y: 548 },
      { id: 'loudi', name: '娄底市', x: 670, y: 544 },
      { id: 'xiangxi', name: '湘西土家族苗族自治州', x: 632, y: 515 }
    ]
  },
  {
    id: 'guangdong',
    name: '广东',
    capitalX: 720,
    capitalY: 620,
    path: 'M 668,642 L 672,610 L 690,590 L 735,585 L 754,612 L 748,648 L 700,660 Z',
    cities: [
      { id: 'guangzhou', name: '广州市', x: 715, y: 625 },
      { id: 'shaoguan', name: '韶关市', x: 705, y: 595 },
      { id: 'shenzhen', name: '深圳市', x: 724, y: 638 },
      { id: 'zhuhai', name: '珠海市', x: 712, y: 645 },
      { id: 'shantou', name: '汕头市', x: 768, y: 626 },
      { id: 'foshan', name: '佛山市', x: 708, y: 630 },
      { id: 'jiangmen', name: '江门市', x: 700, y: 638 },
      { id: 'zhanjiang', name: '湛江市', x: 658, y: 672 },
      { id: 'maoming', name: '茂名市', x: 670, y: 658 },
      { id: 'zhaoqing', name: '肇庆市', x: 688, y: 624 },
      { id: 'huizhou', name: '惠州市', x: 730, y: 628 },
      { id: 'meizhou', name: '梅州市', x: 762, y: 608 },
      { id: 'shanwei', name: '汕尾市', x: 745, y: 634 },
      { id: 'heyuan', name: '河源市', x: 738, y: 614 },
      { id: 'yangjiang', name: '阳江市', x: 686, y: 648 },
      { id: 'qingyuan', name: '清远市', x: 702, y: 612 },
      { id: 'dongguan', name: '东莞市', x: 722, y: 632 },
      { id: 'zhongshan', name: '中山市', x: 715, y: 638 },
      { id: 'chaozhou', name: '潮州市', x: 772, y: 618 },
      { id: 'jieyang', name: '揭阳市', x: 764, y: 625 },
      { id: 'yunfu', name: '云浮市', x: 680, y: 634 }
    ]
  },
  {
    id: 'guangxi',
    name: '广西',
    capitalX: 630,
    capitalY: 620,
    path: 'M 580,600 L 590,580 L 645,570 L 655,595 L 650,642 L 620,652 L 590,635 Z',
    cities: [
      { id: 'nanning', name: '南宁市', x: 624, y: 632 },
      { id: 'liuzhou', name: '柳州市', x: 635, y: 602 },
      { id: 'guilin', name: '桂林市', x: 652, y: 585 },
      { id: 'wuzhou', name: '梧州市', x: 662, y: 622 },
      { id: 'beihai', name: '北海市', x: 628, y: 660 },
      { id: 'fangchenggang', name: '防城港市', x: 606, y: 658 },
      { id: 'qinzhou', name: '钦州市', x: 618, y: 648 },
      { id: 'guigang', name: '贵港市', x: 640, y: 622 },
      { id: 'yulin_gx', name: '玉林市', x: 648, y: 636 },
      { id: 'baise', name: '百色市', x: 588, y: 610 },
      { id: 'hezhou', name: '贺州市', x: 665, y: 602 },
      { id: 'hechi', name: '河池市', x: 612, y: 595 },
      { id: 'laibin', name: '来宾市', x: 634, y: 612 },
      { id: 'chongzuo', name: '崇左市', x: 598, y: 640 }
    ]
  },
  {
    id: 'hainan',
    name: '海南',
    capitalX: 640,
    capitalY: 710,
    path: 'M 622,720 L 625,705 L 645,700 L 650,715 L 645,732 L 625,732 Z',
    cities: [
      { id: 'haikou', name: '海口市', x: 638, y: 705 },
      { id: 'sanya', name: '三亚市', x: 634, y: 732 },
      { id: 'sansha', name: '三沙市', x: 660, y: 755 },
      { id: 'danzhou', name: '儋州市', x: 622, y: 715 }
    ]
  },
  {
    id: 'sichuan',
    name: '四川',
    capitalX: 530,
    capitalY: 490,
    path: 'M 470,470 L 525,445 L 545,475 L 560,522 L 515,540 L 488,520 L 465,490 Z',
    cities: [
      { id: 'chengdu', name: '成都市', x: 524, y: 490 },
      { id: 'zigong', name: '自贡市', x: 540, y: 512 },
      { id: 'panzhihua', name: '攀枝花市', x: 486, y: 565 },
      { id: 'luzhou', name: '泸州市', x: 554, y: 525 },
      { id: 'deyang', name: '德阳市', x: 526, y: 480 },
      { id: 'mianyang', name: '绵阳市', x: 532, y: 470 },
      { id: 'guangyuan', name: '广元市', x: 545, y: 448 },
      { id: 'suining', name: '遂宁市', x: 542, y: 492 },
      { id: 'neijiang', name: '内江市', x: 544, y: 506 },
      { id: 'leshan', name: '乐山市', x: 518, y: 514 },
      { id: 'nanchong', name: '南充市', x: 552, y: 480 },
      { id: 'meishan', name: '眉山市', x: 518, y: 500 },
      { id: 'yibin', name: '宜宾市', x: 536, y: 525 },
      { id: 'guangan', name: '广安市', x: 560, y: 490 },
      { id: 'dazhou', name: '达州市', x: 574, y: 468 },
      { id: 'yaan', name: '雅安市', x: 505, y: 502 },
      { id: 'bazhong', name: '巴中市', x: 560, y: 454 },
      { id: 'ziyang', name: '资阳市', x: 535, y: 498 },
      { id: 'aba', name: '阿坝藏族羌族自治州', x: 488, y: 450 },
      { id: 'ganzi', name: '甘孜藏族自治州', x: 455, y: 490 },
      { id: 'liangshan', name: '凉山彝族自治州', x: 492, y: 538 }
    ]
  },
  {
    id: 'guizhou',
    name: '贵州',
    capitalX: 590,
    capitalY: 570,
    path: 'M 558,560 L 565,545 L 598,535 L 608,555 L 604,592 L 580,600 L 562,585 Z',
    cities: [
      { id: 'guiyang', name: '贵阳市', x: 588, y: 568 },
      { id: 'liupanshui', name: '六盘水市', x: 558, y: 566 },
      { id: 'zunyi', name: '遵义市', x: 588, y: 542 },
      { id: 'anshun', name: '安顺市', x: 578, y: 575 },
      { id: 'bijie', name: '毕节市', x: 564, y: 550 },
      { id: 'tongren', name: '铜仁市', x: 610, y: 545 },
      { id: 'qianxinan', name: '黔西南布依族苗族自治州', x: 555, y: 590 },
      { id: 'qiandongnan', name: '黔东南苗族侗族自治州', x: 612, y: 572 },
      { id: 'qiannan', name: '黔南布依族苗族自治州', x: 594, y: 584 }
    ]
  },
  {
    id: 'yunnan',
    name: '云南',
    capitalX: 490,
    capitalY: 610,
    path: 'M 435,595 L 440,560 L 485,550 L 502,572 L 512,624 L 482,652 L 458,638 Z',
    cities: [
      { id: 'kunming', name: '昆明市', x: 495, y: 605 },
      { id: 'qujing', name: '曲靖市', x: 512, y: 596 },
      { id: 'yuxi', name: '玉溪市', x: 486, y: 615 },
      { id: 'baoshan', name: '保山市', x: 432, y: 610 },
      { id: 'zhaotong', name: '昭通市', x: 520, y: 556 },
      { id: 'lijiang', name: '丽江市', x: 448, y: 568 },
      { id: 'puer', name: '普洱市', x: 458, y: 635 },
      { id: 'lincang', name: '临沧市', x: 440, y: 625 },
      { id: 'chuxiong', name: '楚雄彝族自治州', x: 476, y: 602 },
      { id: 'honghe', name: '红河哈尼族彝族自治州', x: 495, y: 635 },
      { id: 'wenshan', name: '文山壮族苗族自治州', x: 516, y: 632 },
      { id: 'xishuangbanna', name: '西双版纳傣族自治州', x: 458, y: 660 },
      { id: 'dali', name: '大理白族自治州', x: 445, y: 592 },
      { id: 'dehong', name: '德宏傣族景颇族自治州', x: 418, y: 615 },
      { id: 'nujiang', name: '怒江傈僳族自治州', x: 425, y: 568 },
      { id: 'diqing', name: '迪庆藏族自治州', x: 435, y: 546 }
    ]
  },
  {
    id: 'tibet',
    name: '西藏',
    capitalX: 280,
    capitalY: 480,
    path: 'M 140,430 L 300,430 L 350,455 L 370,520 L 250,560 L 180,510 L 132,460 Z',
    cities: [
      { id: 'lasa', name: '拉萨市', x: 288, y: 495 },
      { id: 'rikaze', name: '日喀则市', x: 242, y: 508 },
      { id: 'changdu', name: '昌都市', x: 375, y: 468 },
      { id: 'shannan', name: '山南市', x: 302, y: 512 },
      { id: 'linzhi', name: '林芝市', x: 335, y: 502 },
      { id: 'naqu', name: '那曲市', x: 280, y: 448 },
      { id: 'ali', name: '阿里地区', x: 148, y: 448 }
    ]
  },
  {
    id: 'xinjiang',
    name: '新疆',
    capitalX: 250,
    capitalY: 220,
    path: 'M 120,240 L 250,150 L 280,180 L 320,290 L 210,380 L 160,340 L 115,280 Z',
    cities: [
      { id: 'wulumuqi', name: '乌鲁木齐市', x: 252, y: 202 },
      { id: 'kelamayi', name: '克拉玛依市', x: 212, y: 165 },
      { id: 'tulufan', name: '吐鲁番市', x: 278, y: 215 },
      { id: 'hami', name: '哈密市', x: 332, y: 225 },
      { id: 'changji', name: '昌吉回族自治州', x: 246, y: 195 },
      { id: 'bortala', name: '博尔塔拉蒙古自治州', x: 178, y: 182 },
      { id: 'bayingolin', name: '巴音郭楞蒙古自治州', x: 248, y: 278 },
      { id: 'aks_xj', name: '阿克苏地区', x: 168, y: 265 },
      { id: 'kizilsu', name: '克孜勒苏柯尔克孜自治州', x: 110, y: 295 },
      { id: 'kashi', name: '喀什地区', x: 112, y: 312 },
      { id: 'hotan', name: '和田地区', x: 155, y: 345 },
      { id: 'ili', name: '伊犁哈萨克自治州', x: 182, y: 198 },
      { id: 'tacheng', name: '塔城地区', x: 196, y: 145 },
      { id: 'altay', name: '阿勒泰地区', x: 228, y: 110 },
      { id: 'shihezi', name: '石he子市', x: 232, y: 192 }
    ]
  },
  {
    id: 'qinghai',
    name: '青海',
    capitalX: 460,
    capitalY: 370,
    path: 'M 350,340 L 450,300 L 482,345 L 485,410 L 400,430 L 365,400 L 345,360 Z',
    cities: [
      { id: 'xining', name: '西宁市', x: 472, y: 362 },
      { id: 'haidong', name: '海东市', x: 485, y: 365 },
      { id: 'haibei', name: '海北藏族自治州', x: 442, y: 345 },
      { id: 'huangnan', name: '黄南藏族自治州', x: 475, y: 388 },
      { id: 'hainanzz', name: '海南藏族自治州', x: 448, y: 375 },
      { id: 'golog', name: '果洛藏族自治州', x: 432, y: 415 },
      { id: 'yushu', name: '玉树藏族自治州', x: 374, y: 432 },
      { id: 'haixi', name: '海西蒙古族藏族自治州', x: 378, y: 338 }
    ]
  },
  {
    id: 'gansu',
    name: '甘肃',
    capitalX: 580,
    capitalY: 340,
    path: 'M 360,330 L 520,290 L 565,302 L 602,320 L 598,342 L 572,378 L 558,365 L 540,360 Z',
    cities: [
      { id: 'lanzhou', name: '兰州市', x: 558, y: 365 },
      { id: 'jiayuguan', name: '嘉峪关市', x: 410, y: 260 },
      { id: 'jinchang', name: '金昌市', x: 508, y: 302 },
      { id: 'baiyin', name: '白银市', x: 574, y: 350 },
      { id: 'tiansh_gs', name: '天水市', x: 596, y: 395 },
      { id: 'wuwei', name: '武威市', x: 524, y: 312 },
      { id: 'zhangye', name: '张掖市', x: 468, y: 288 },
      { id: 'pingliang', name: '平凉市', x: 610, y: 376 },
      { id: 'qingyang', name: '庆阳市', x: 628, y: 355 },
      { id: 'dingxi', name: '定西市', x: 572, y: 378 },
      { id: 'longnan', name: '陇南市', x: 580, y: 410 },
      { id: 'linxia', name: '临夏回族自治州', x: 546, y: 378 },
      { id: 'gannan', name: '甘南藏族自治州', x: 520, y: 398 },
      { id: 'jiuquan', name: '酒泉市', x: 390, y: 240 }
    ]
  },
  {
    id: 'ningxia',
    name: '宁夏',
    capitalX: 610,
    capitalY: 340,
    path: 'M 602,320 L 618,318 L 624,345 L 610,360 L 598,342 Z',
    cities: [
      { id: 'yinchuan', name: '银川市', x: 610, y: 322 },
      { id: 'shizuishan', name: '石嘴山市', x: 614, y: 310 },
      { id: 'wuzhong', name: '吴忠市', x: 614, y: 335 },
      { id: 'guyuan', name: '固原市', x: 608, y: 360 },
      { id: 'zhongwei', name: '中卫市', x: 595, y: 342 }
    ]
  },
  {
    id: 'neimenggu',
    name: '内蒙古',
    capitalX: 640,
    capitalY: 220,
    path: 'M 480,260 L 560,200 L 720,130 L 800,140 L 825,150 L 792,188 L 755,202 L 712,205 L 668,242 L 648,254 L 608,275 L 520,270 Z',
    cities: [
      { id: 'huhehaote', name: '呼和浩特市', x: 648, y: 254 },
      { id: 'baotou', name: '包头市', x: 628, y: 248 },
      { id: 'wuhai', name: '乌海市', x: 585, y: 295 },
      { id: 'chifeng', name: '赤峰市', x: 755, y: 202 },
      { id: 'tongliao', name: '通辽市', x: 792, y: 188 },
      { id: 'eerduosi', name: '鄂尔多斯市', x: 608, y: 275 },
      { id: 'hulunbeier', name: '呼伦贝尔市', x: 796, y: 88 },
      { id: 'byannaoer', name: '巴彦淖尔市', x: 576, y: 242 },
      { id: 'ulanqab', name: '乌兰察布市', x: 668, y: 242 },
      { id: 'hinggan', name: '兴安盟', x: 808, y: 135 },
      { id: 'xilin_gol', name: '锡林郭勒盟', x: 712, y: 205 },
      { id: 'alxa', name: '阿拉善盟', x: 520, y: 270 }
    ]
  },
  {
    id: 'shaanxi',
    name: '陕西',
    capitalX: 642,
    capitalY: 410,
    path: 'M 648,340 L 640,395 L 678,382 L 690,448 L 642,460 L 638,470 L 620,448 L 610,360 L 624,345 L 618,318 Z',
    cities: [
      { id: 'xian', name: '西安市', x: 642, y: 410 },
      { id: 'tongchuan', name: '铜川市', x: 645, y: 382 },
      { id: 'baoji', name: '宝鸡市', x: 618, y: 408 },
      { id: 'xianyang_sx', name: '咸阳市', x: 636, y: 402 },
      { id: 'weinan', name: '渭南市', x: 658, y: 402 },
      { id: 'yanan', name: '延安市', x: 648, y: 335 },
      { id: 'hanzhong', name: '汉中市', x: 605, y: 442 },
      { id: 'yulin_sx', name: '榆林市', x: 655, y: 285 },
      { id: 'ankang', name: '安康市', x: 638, y: 455 },
      { id: 'shangluo', name: '商洛市', x: 658, y: 425 }
    ]
  },
  {
    id: 'taiwan',
    name: '台湾',
    capitalX: 840,
    capitalY: 590,
    path: 'M 828,598 L 830,578 L 845,570 L 850,590 L 838,620 L 825,620 Z',
    cities: [
      { id: 'taibei', name: '台北市', x: 844, y: 578 },
      { id: 'gaoxiong', name: '高雄市', x: 832, y: 612 },
      { id: 'taizhong', name: '台中市', x: 836, y: 592 }
    ]
  },
  {
    id: 'hongkong',
    name: '香港',
    capitalX: 722,
    capitalY: 635,
    path: 'M 723,641 A 2 2 0 1 1 723,645 A 2 2 0 1 1 723,641 Z',
    cities: [
      { id: 'hongkong_sub', name: '香港特别行政区', x: 722, y: 635 }
    ]
  },
  {
    id: 'macau',
    name: '澳门',
    capitalX: 710,
    capitalY: 638,
    path: 'M 711,642 A 2 2 0 1 1 711,646 A 2 2 0 1 1 711,642 Z',
    cities: [
      { id: 'macau_sub', name: '澳门特别行政区', x: 710, y: 638 }
    ]
  }
];
