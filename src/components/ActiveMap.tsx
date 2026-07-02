/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Sparkles } from 'lucide-react';
import { Province, City, Footprint, MapTheme } from '../types';
import { provincesData } from '../data/chinaProvinces';
import chinaMapPackage from '@svg-maps/china';

const ID_MAP: Record<string, string> = {
  'anhui': 'anhui',
  'beijing': 'beijing',
  'chongqing': 'chongqing',
  'fujian': 'fujian',
  'gansu': 'gansu',
  'guangdong': 'guangdong',
  'guangxi': 'guangxi-zhuang',
  'guizhou': 'guizhou',
  'hainan': 'hainan',
  'hebei': 'hebei',
  'heilongjiang': 'heilongjiang',
  'henan': 'henan',
  'hongkong': 'hong-kong',
  'hubei': 'hubei',
  'hunan': 'hunan',
  'jiangsu': 'jiangsu',
  'jiangxi': 'jiangxi',
  'jilin': 'jilin',
  'liaoning': 'liaoning',
  'macau': 'macau',
  'neimenggu': 'nei-mongol',
  'ningxia': 'ningxia-hui',
  'qinghai': 'quinghai',
  'shaanxi': 'shaanxi',
  'shandong': 'shandong',
  'shanghai': 'shanghai',
  'shanxi': 'shanxi',
  'sichuan': 'sichuan',
  'tianjin': 'tianjin',
  'xinjiang': 'xinjiang-uygur',
  'tibet': 'xizang',
  'yunnan': 'yunnan',
  'zhejiang': 'zhejiang',
};

function getPathCenter(pathStr: string): { x: number; y: number } {
  const commandRegex = /([a-df-z])/gi;
  const parts = pathStr.split(commandRegex);
  
  let currentX = 0, currentY = 0;
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  let currentCommand = '';
  
  for (let idx = 0; idx < parts.length; idx++) {
    const part = parts[idx].trim();
    if (!part) continue;
    
    if (part.match(/^[a-z]$/i)) {
      currentCommand = part;
    } else {
      const nums = part.split(/[\s,]+/g).map(parseFloat).filter(n => !isNaN(n));
      
      if (currentCommand === 'M' || currentCommand === 'm') {
        let isFirst = true;
        for (let i = 0; i < nums.length; i += 2) {
          if (nums[i] === undefined || nums[i+1] === undefined) break;
          if (currentCommand === 'M' || isFirst) {
            currentX = nums[i];
            currentY = nums[i+1];
            isFirst = false;
          } else {
            currentX += nums[i];
            currentY += nums[i+1];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'L' || currentCommand === 'l') {
        for (let i = 0; i < nums.length; i += 2) {
          if (nums[i] === undefined || nums[i+1] === undefined) break;
          if (currentCommand === 'L') {
            currentX = nums[i];
            currentY = nums[i+1];
          } else {
            currentX += nums[i];
            currentY += nums[i+1];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'H' || currentCommand === 'h') {
        for (let i = 0; i < nums.length; i++) {
          if (currentCommand === 'H') {
            currentX = nums[i];
          } else {
            currentX += nums[i];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
        }
      } else if (currentCommand === 'V' || currentCommand === 'v') {
        for (let i = 0; i < nums.length; i++) {
          if (currentCommand === 'V') {
            currentY = nums[i];
          } else {
            currentY += nums[i];
          }
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'C' || currentCommand === 'c') {
        for (let i = 0; i < nums.length; i += 6) {
          if (nums[i+4] === undefined || nums[i+5] === undefined) break;
          if (currentCommand === 'C') {
            currentX = nums[i+4];
            currentY = nums[i+5];
          } else {
            currentX += nums[i+4];
            currentY += nums[i+5];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'S' || currentCommand === 's') {
        for (let i = 0; i < nums.length; i += 4) {
          if (nums[i+2] === undefined || nums[i+3] === undefined) break;
          if (currentCommand === 'S') {
            currentX = nums[i+2];
            currentY = nums[i+3];
          } else {
            currentX += nums[i+2];
            currentY += nums[i+3];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'Q' || currentCommand === 'q') {
        for (let i = 0; i < nums.length; i += 4) {
          if (nums[i+2] === undefined || nums[i+3] === undefined) break;
          if (currentCommand === 'Q') {
            currentX = nums[i+2];
            currentY = nums[i+3];
          } else {
            currentX += nums[i+2];
            currentY += nums[i+3];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'T' || currentCommand === 't') {
        for (let i = 0; i < nums.length; i += 2) {
          if (nums[i] === undefined || nums[i+1] === undefined) break;
          if (currentCommand === 'T') {
            currentX = nums[i];
            currentY = nums[i+1];
          } else {
            currentX += nums[i];
            currentY += nums[i+1];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      } else if (currentCommand === 'A' || currentCommand === 'a') {
        for (let i = 0; i < nums.length; i += 7) {
          if (nums[i+5] === undefined || nums[i+6] === undefined) break;
          if (currentCommand === 'A') {
            currentX = nums[i+5];
            currentY = nums[i+6];
          } else {
            currentX += nums[i+5];
            currentY += nums[i+6];
          }
          if (currentX < minX) minX = currentX;
          if (currentX > maxX) maxX = currentX;
          if (currentY < minY) minY = currentY;
          if (currentY > maxY) maxY = currentY;
        }
      }
    }
  }

  if (minX === Infinity || maxX === -Infinity || minY === Infinity || maxY === -Infinity) {
    return { x: 387, y: 284 };
  }
  
  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2
  };
}

interface ActiveMapProps {
  theme: MapTheme;
  footprints: Footprint[];
  onSelectCity: (city: City, province: Province) => void;
  filteredFootprints: Footprint[];
  filterType: string;
  filterYear: string;
}

export default function ActiveMap({
  theme,
  footprints,
  onSelectCity,
  filteredFootprints,
  filterType,
  filterYear,
}: ActiveMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [unlockedToast, setUnlockedToast] = useState<{ x: number; y: number; name: string } | null>(null);
  const [clickedProvinceId, setClickedProvinceId] = useState<string | null>(null);

  // Map low-quality shapes to premium contiguous accurate shapes
  const mappedProvinces = React.useMemo(() => {
    const packageLocations = chinaMapPackage.locations;
    return provincesData.map((prov) => {
      const pkgId = ID_MAP[prov.id];
      const pkgLoc = packageLocations.find((l) => l.id === pkgId);
      
      if (!pkgLoc) {
        if (prov.id === 'taiwan') {
          const scaledPath = prov.path.replace(/([0-9\.-]+)/g, (match) => {
            const val = parseFloat(match);
            return isNaN(val) ? match : (val * 0.77).toFixed(1);
          });
          const scaledCities = prov.cities.map(c => ({
            ...c,
            x: c.x * 0.77,
            y: c.y * 0.77
          }));
          return {
            ...prov,
            capitalX: prov.capitalX * 0.77,
            capitalY: prov.capitalY * 0.77,
            path: scaledPath,
            cities: scaledCities
          };
        }
        return prov;
      }
      
      const newPath = pkgLoc.path;
      const center = getPathCenter(newPath);
      
      const OCX = prov.capitalX;
      const OCY = prov.capitalY;
      const NCX = center.x;
      const NCY = center.y;
      
      const newCities = prov.cities.map((city) => {
        const dx = city.x - OCX;
        const dy = city.y - OCY;
        return {
          ...city,
          x: Math.round(NCX + dx * 0.52),
          y: Math.round(NCY + dy * 0.52),
        };
      });
      
      return {
        ...prov,
        capitalX: NCX,
        capitalY: NCY,
        path: newPath,
        cities: newCities,
      };
    });
  }, []);

  // Group user footprints by cityId for easy lookups and stats
  const cityVisitCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    filteredFootprints.forEach((fp) => {
      counts[fp.cityId] = (counts[fp.cityId] || 0) + 1;
    });
    return counts;
  }, [filteredFootprints]);

  const activeCityIds = React.useMemo(() => {
    return new Set(filteredFootprints.map((f) => f.cityId));
  }, [filteredFootprints]);

  // Overall footprints city IDs (for permanent dot reference even if currently filtered)
  const allTimeActiveCityIds = React.useMemo(() => {
    return new Set(footprints.map((f) => f.cityId));
  }, [footprints]);

  const handleProvinceClick = (prov: Province, e: React.MouseEvent<SVGPathElement>) => {
    setClickedProvinceId(prov.id);
    setTimeout(() => setClickedProvinceId(null), 300);

    // If province has no footprints in our current filtered state, show "To be unlocked" visual toast
    const provVisitedCities = prov.cities.filter((c) => activeCityIds.has(c.id));
    if (provVisitedCities.length === 0) {
      // Find approximate click location relative to the SVG size
      const svg = e.currentTarget.ownerSVGElement;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const clickX = ((e.clientX - rect.left) / rect.width) * 774;
        const clickY = ((e.clientY - rect.top) / rect.height) * 569;
        setUnlockedToast({
          x: clickX,
          y: clickY,
          name: prov.name,
        });
        setTimeout(() => {
          setUnlockedToast(null);
        }, 2200);
      }
    }
  };

  const handleCityDotClick = (city: City, prov: Province, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCity(city, prov);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none" id="china-map-container">
      {/* Background Dots Grid for Vintage/Celestial feel */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(${theme.gridColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Shifting container moving the map and relative toast up slightly to avoid bottom HUD overlays */}
      <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 -translate-y-9 md:-translate-y-12 z-10">
        {/* Interactive Map SVG */}
        <svg
          viewBox="0 0 774 569"
          className="w-full h-full max-h-[82vh] transition-colors duration-500"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          {/* Gradients */}
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A7BAA" />
            <stop offset="100%" stopColor="#FF9A56" />
          </linearGradient>
          <linearGradient id="vintageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A64B2A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="minimalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A7BAA" />
            <stop offset="100%" stopColor="#1B4D6C" />
          </linearGradient>

          {/* Core drop shadow filter for premium mapping depth */}
          <filter id="premium-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#2A7BAA" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Outer Shadowed China Path Background (for layering/depth) */}
        <g filter="url(#premium-shadow)">
          {mappedProvinces.map((prov) => {
            const isProvinceVisited = prov.cities.some((c) => activeCityIds.has(c.id));
            let fillValue = theme.provinceFillDefault;

            if (isProvinceVisited) {
              if (theme.id === 'vintage') fillValue = 'url(#vintageGradient)';
              else if (theme.id === 'dark') fillValue = 'url(#darkGradient)';
              else if (theme.id === 'minimal') fillValue = 'url(#minimalGradient)';
              else fillValue = 'url(#highlightGradient)';
            }

            return (
              <path
                key={`bg-${prov.id}`}
                d={prov.path}
                className={`transition-all duration-700 ease-out fill-transparent`}
                stroke={theme.id === 'dark' ? '#1E293B' : '#E2E8F0'}
                strokeWidth="4"
              />
            );
          })}
        </g>

        {/* Main interactive Provinces layer */}
        <g id="provinces-layer">
          {mappedProvinces.map((prov) => {
            const hasFootprintsInState = prov.cities.some((c) => activeCityIds.has(c.id));
            const isHovered = hoveredProvince === prov.id;
            const isClicked = clickedProvinceId === prov.id;

            let fillValue = theme.provinceFillDefault;
            if (hasFootprintsInState) {
              if (theme.id === 'vintage') fillValue = 'url(#vintageGradient)';
              else if (theme.id === 'dark') fillValue = 'url(#darkGradient)';
              else if (theme.id === 'minimal') fillValue = 'url(#minimalGradient)';
              else fillValue = 'url(#highlightGradient)';
            }

            return (
              <path
                key={prov.id}
                d={prov.path}
                className={`transition-all duration-500 cursor-pointer ${theme.provinceStroke}`}
                fill={fillValue}
                fillOpacity={hasFootprintsInState ? (isHovered ? 0.95 : 0.8) : (isHovered ? 0.25 : 0.1)}
                strokeWidth={isHovered ? 2.5 : 1.2}
                onClick={(e) => handleProvinceClick(prov, e)}
                onMouseEnter={() => setHoveredProvince(prov.id)}
                onMouseLeave={() => setHoveredProvince(null)}
                style={{
                  transform: isClicked ? 'scale(0.995) translate(4px, 4px)' : isHovered ? 'translate(-1px, -2px)' : 'none',
                  transformOrigin: 'center center',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            );
          })}
        </g>

        {/* Connections and Trails / Flow lines for active trajectories (轨迹连线) */}
        {filteredFootprints.length > 1 && (
          <g id="trajectories-lines" className="pointer-events-none">
            {[...filteredFootprints]
              .sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime())
              .map((fp, idx, arr) => {
                if (idx === 0) return null;
                const prevFp = arr[idx - 1];
                // Resolve cities from standard list
                let cityA: City | undefined;
                let cityB: City | undefined;
                mappedProvinces.forEach((p) => {
                  const matchA = p.cities.find((c) => c.id === prevFp.cityId);
                  if (matchA) cityA = matchA;
                  const matchB = p.cities.find((c) => c.id === fp.cityId);
                  if (matchB) cityB = matchB;
                });

                if (cityA && cityB && cityA.id !== cityB.id) {
                  const midX = (cityA.x + cityB.x) / 2;
                  const midY = (cityA.y + cityB.y) / 2 - 35; // Curve up slightly
                  return (
                    <g key={`trail-${prevFp.id}-${fp.id}`}>
                      {/* Interactive glowing trajectory paths */}
                      <path
                        d={`M ${cityA.x} ${cityA.y} Q ${midX} ${midY} ${cityB.x} ${cityB.y}`}
                        fill="none"
                        stroke={theme.id === 'vintage' ? '#A64B2A' : '#FFA07A'}
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                        className="animate-[dash_25s_linear_infinite] opacity-60"
                      />
                      <path
                        d={`M ${cityA.x} ${cityA.y} Q ${midX} ${midY} ${cityB.x} ${cityB.y}`}
                        fill="none"
                        stroke={theme.id === 'vintage' ? '#D97706' : '#FF9A56'}
                        strokeWidth="1.2"
                        className="opacity-80"
                      />
                    </g>
                  );
                }
                return null;
              })}
          </g>
        )}

        {/* City coordinate pins (点亮的高亮光点与呼吸圈层) */}
        <g id="cities-layer">
          {mappedProvinces.flatMap((prov) =>
            prov.cities.map((city) => {
              const visitCount = cityVisitCounts[city.id] || 0;
              const isCurrentlyActive = activeCityIds.has(city.id);
              const isAllTimeActive = allTimeActiveCityIds.has(city.id);

              if (!isCurrentlyActive) {
                // If it's unlocked alltime but currently filtered out, show a faint gray marker
                if (isAllTimeActive) {
                  return (
                    <circle
                      key={`faint-${city.id}`}
                      cx={city.x}
                      cy={city.y}
                      r="4.5"
                      className="fill-slate-400/40 stroke-slate-300 pointer-events-none"
                    />
                  );
                }
                return null;
              }

              // Visited cities indicators (点常亮呼吸/双环)
              const hasMultipleVisits = visitCount > 1;

              return (
                <g
                  key={city.id}
                  className="cursor-pointer group"
                  onClick={(e) => handleCityDotClick(city, prov, e)}
                >
                  {/* Outer breathing circle 1 */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={hasMultipleVisits ? "18" : "11"}
                    className={`${
                      theme.id === 'vintage' ? 'fill-orange-600/10' : 'fill-sky-500/15'
                    } animate-ping pointer-events-none`}
                    style={{ animationDuration: '3.5s' }}
                  />

                  {/* Outer breathing circle 2 (for multi record cities) */}
                  {hasMultipleVisits && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="28"
                      className="fill-amber-500/10 animate-pulse pointer-events-none"
                      style={{ animationDuration: '2s' }}
                    />
                  )}

                  {/* Core glow shape */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={hasMultipleVisits ? "7.5" : "5.5"}
                    fill={theme.id === 'vintage' ? '#A64B2A' : '#FFA07A'}
                    className="filter drop-shadow-[0_0_8px_rgba(255,154,86,0.9)] animate-pulse"
                    style={{ animationDuration: '1.5s' }}
                  />

                  {/* Centre core white anchor */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="2.5"
                    fill="#FFFFFF"
                    className="pointer-events-none"
                  />

                  {/* Hover visual tag/card labels for fast map navigation */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <rect
                      x={city.x - 35}
                      y={city.y - 32}
                      width="70"
                      height="20"
                      rx="4"
                      fill={theme.id === 'dark' ? '#1E293B' : '#FFFFFF'}
                      stroke={theme.id === 'vintage' ? '#C8BFA2' : '#2A7BAA'}
                      strokeWidth="1"
                      className="shadow-sm"
                    />
                    <text
                      x={city.x}
                      y={city.y - 18}
                      textAnchor="middle"
                      className={`text-[9px] font-medium ${
                        theme.id === 'dark' ? 'fill-slate-200' : 'fill-slate-700'
                      }`}
                    >
                      {city.name}
                    </text>
                  </g>
                </g>
              );
            })
          )}
        </g>
      </svg>

      {/* Floating unlock alerts toast, inside shifted wrapper to sync movement */}
      <AnimatePresence>
        {unlockedToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className={`absolute flex items-center gap-2 p-3 rounded-full shadow-lg border backdrop-blur-xl z-50 pointer-events-none transition-all`}
            style={{
              left: `calc(${(unlockedToast.x / 774) * 100}% - 90px)`,
              top: `calc(${(unlockedToast.y / 569) * 100}% - 45px)`,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Compass className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold leading-tight flex items-center gap-1 text-slate-800 dark:text-slate-100">
                {unlockedToast.name} <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">写下新足迹来点亮城市吧</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>


    </div>
  );
}
