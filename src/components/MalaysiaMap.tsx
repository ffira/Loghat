import React, { useState, useRef, useEffect } from 'react';
import { Compass } from 'lucide-react';

interface MalaysiaMapProps {
  onSelectState: (state: string | null) => void;
  selectedState: string | null;
  entryCountsByState: Record<string, number>;
  isInsideSimulator?: boolean;
}

interface StateNode {
  name: string;
  short: string;
  region: 'Peninsular' | 'East Malaysia';
  x: number; // percentage of viewBox width (0-100)
  y: number; // percentage of viewBox height (0-100)
  hasActivity: boolean;
  hotWord: string;
}

export default function MalaysiaMap({ onSelectState, selectedState, entryCountsByState, isInsideSimulator = false }: MalaysiaMapProps) {
  const [hoveredState, setHoveredState] = useState<StateNode | null>(null);

  const states: StateNode[] = [
    { name: 'Kedah', short: 'KDH', region: 'Peninsular', x: 12, y: 15, hasActivity: true, hotWord: 'Ketegaq' },
    { name: 'Penang', short: 'PNG', region: 'Peninsular', x: 9, y: 25, hasActivity: true, hotWord: 'Kaypoh' },
    { name: 'Perlis', short: 'PLS', region: 'Peninsular', x: 9, y: 7, hasActivity: true, hotWord: 'Ghaqbaq' },
    { name: 'Kelantan', short: 'KTN', region: 'Peninsular', x: 31, y: 20, hasActivity: true, hotWord: 'Bekwoh' },
    { name: 'Terengganu', short: 'TRG', region: 'Peninsular', x: 44, y: 26, hasActivity: true, hotWord: 'Gu' },
    { name: 'Pahang', short: 'PHG', region: 'Peninsular', x: 38, y: 48, hasActivity: true, hotWord: 'Kome' },
    { name: 'Selangor', short: 'SGR', region: 'Peninsular', x: 21, y: 58, hasActivity: true, hotWord: 'Gostan' },
    { name: 'Kuala Lumpur', short: 'KUL', region: 'Peninsular', x: 25, y: 63, hasActivity: true, hotWord: 'Tapau' },
    { name: 'Negeri Sembilan', short: 'N9', region: 'Peninsular', x: 32, y: 70, hasActivity: true, hotWord: 'Ekau' },
    { name: 'Melaka', short: 'MLK', region: 'Peninsular', x: 37, y: 76, hasActivity: true, hotWord: 'Hawau' },
    { name: 'Johor', short: 'JHR', region: 'Peninsular', x: 47, y: 84, hasActivity: true, hotWord: 'Kepeng' },
    { name: 'Perak', short: 'PRK', region: 'Peninsular', x: 15, y: 42, hasActivity: true, hotWord: 'Teq' },
    { name: 'Sarawak', short: 'SWK', region: 'East Malaysia', x: 75, y: 64, hasActivity: true, hotWord: 'Kamek' },
    { name: 'Sabah', short: 'SBH', region: 'East Malaysia', x: 91, y: 26, hasActivity: true, hotWord: 'Bah' },
    { name: 'Labuan', short: 'LBN', region: 'East Malaysia', x: 81, y: 33, hasActivity: true, hotWord: 'Damit' }
  ];

  // Zoom/pan state using viewBox manipulation (no CSS transform conflicts)
  const [mapState, setMapState] = useState({ zoom: 1, pan: { x: 0, y: 0 } });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Base viewBox dimensions
  const VB_W = 1050;
  const VB_H = 450;

  // Compute current viewBox based on zoom and pan
  const getViewBox = () => {
    const w = VB_W / mapState.zoom;
    const h = VB_H / mapState.zoom;
    // Center the view, then apply pan offset
    const x = (VB_W - w) / 2 + mapState.pan.x;
    const y = (VB_H - h) / 2 + mapState.pan.y;
    return `${x} ${y} ${w} ${h}`;
  };

  // Clamp pan to valid bounds
  const clampPan = (px: number, py: number, z: number) => {
    const w = VB_W / z;
    const h = VB_H / z;
    const maxPanX = (VB_W - w) / 2;
    const maxPanY = (VB_H - h) / 2;
    return {
      x: Math.min(Math.max(px, -maxPanX), maxPanX),
      y: Math.min(Math.max(py, -maxPanY), maxPanY),
    };
  };

  // Focus a specific region or reset
  const handleFocusRegion = (region: 'Northern' | 'East Coast' | 'Central' | 'Borneo' | 'Peninsular' | 'Reset') => {
    if (region === 'Reset') {
      setMapState({ zoom: 1, pan: { x: 0, y: 0 } });
      onSelectState(null);
      return;
    }
    
    let targetZoom = 1;
    let targetPan = { x: 0, y: 0 };
    
    switch (region) {
      case 'Northern':
        targetZoom = 2.4;
        targetPan = clampPan((0.15 * VB_W) - VB_W / 2, (0.18 * VB_H) - VB_H / 2, 2.4);
        onSelectState('Penang');
        break;
      case 'East Coast':
        targetZoom = 2.0;
        targetPan = clampPan((0.38 * VB_W) - VB_W / 2, (0.32 * VB_H) - VB_H / 2, 2.0);
        onSelectState('Pahang');
        break;
      case 'Central':
        targetZoom = 2.0;
        targetPan = clampPan((0.33 * VB_W) - VB_W / 2, (0.70 * VB_H) - VB_H / 2, 2.0);
        onSelectState('Melaka');
        break;
      case 'Borneo':
        targetZoom = 1.8;
        targetPan = clampPan((0.85 * VB_W) - VB_W / 2, (0.45 * VB_H) - VB_H / 2, 1.8);
        onSelectState('Sarawak');
        break;
      case 'Peninsular':
        targetZoom = 1.6;
        targetPan = clampPan((0.32 * VB_W) - VB_W / 2, (0.45 * VB_H) - VB_H / 2, 1.6);
        onSelectState('Selangor');
        break;
    }
    
    setMapState({
      zoom: targetZoom,
      pan: targetPan
    });
  };

  // Center & zoom on selectedState when it changes externally
  useEffect(() => {
    if (!selectedState) {
      setMapState(prev => {
        if (prev.zoom === 1) return prev;
        return { zoom: 1, pan: { x: 0, y: 0 } };
      });
      return;
    }

    const stateNode = states.find(s => s.name === selectedState);
    if (!stateNode) return;

    // Use a decent zoom level to bring it into focus
    const targetZoom = 2.3;
    const targetX = (stateNode.x / 100) * VB_W;
    const targetY = (stateNode.y / 100) * VB_H;
    
    const targetPanX = targetX - VB_W / 2;
    const targetPanY = targetY - VB_H / 2;
    
    const clamped = clampPan(targetPanX, targetPanY, targetZoom);
    
    setMapState({
      zoom: targetZoom,
      pan: clamped
    });
  }, [selectedState]);

  // Pointer-focused zoom-wheel logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const rx = mx / rect.width;
      const ry = my / rect.height;

      const zoomFactor = 0.15;
      
      setMapState((prev) => {
        let newZoom = prev.zoom + (e.deltaY < 0 ? zoomFactor : -zoomFactor);
        newZoom = Math.min(Math.max(newZoom, 1), 4.5);
        
        if (newZoom === 1) {
          return { zoom: 1, pan: { x: 0, y: 0 } };
        }

        // Calculate point in viewBox before zoom
        const w1 = VB_W / prev.zoom;
        const h1 = VB_H / prev.zoom;
        const x1 = (VB_W - w1) / 2 + prev.pan.x;
        const y1 = (VB_H - h1) / 2 + prev.pan.y;

        const pointX = x1 + rx * w1;
        const pointY = y1 + ry * h1;

        // Calculate new viewBox size
        const w2 = VB_W / newZoom;
        const h2 = VB_H / newZoom;

        // Calculate new pan to keep point under cursor
        const newPanX = pointX - rx * w2 - (VB_W - w2) / 2;
        const newPanY = pointY - ry * h2 - (VB_H - h2) / 2;

        const clamped = clampPan(newPanX, newPanY, newZoom);
        return {
          zoom: newZoom,
          pan: clamped
        };
      });
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mapState.zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setPanStart({ ...mapState.pan });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || mapState.zoom <= 1) return;
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    // Convert pixel drag to viewBox units
    const scaleX = (VB_W / mapState.zoom) / rect.width;
    const scaleY = (VB_H / mapState.zoom) / rect.height;
    
    const dx = -(e.clientX - dragStart.x) * scaleX;
    const dy = -(e.clientY - dragStart.y) * scaleY;
    
    const clamped = clampPan(panStart.x + dx, panStart.y + dy, mapState.zoom);
    setMapState(prev => ({ ...prev, pan: clamped }));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
    } else if (e.touches.length === 1 && mapState.zoom > 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setPanStart({ ...mapState.pan });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchStartDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist;
      setMapState((prev) => {
        let newZoom = prev.zoom * (factor > 1 ? 1.05 : 0.95);
        newZoom = Math.min(Math.max(newZoom, 1), 4.5);
        if (newZoom === 1) {
          return { zoom: 1, pan: { x: 0, y: 0 } };
        }
        return { ...prev, zoom: newZoom };
      });
      setTouchStartDist(dist);
    } else if (e.touches.length === 1 && isDragging && mapState.zoom > 1) {
      const container = containerRef.current;
      if (!container) return;
      
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const scaleX = (VB_W / mapState.zoom) / rect.width;
      const scaleY = (VB_H / mapState.zoom) / rect.height;
      
      const dx = -(touch.clientX - dragStart.x) * scaleX;
      const dy = -(touch.clientY - dragStart.y) * scaleY;
      
      const clamped = clampPan(panStart.x + dx, panStart.y + dy, mapState.zoom);
      setMapState(prev => ({ ...prev, pan: clamped }));
    }
  };

  const handleTouchEnd = () => {
    setTouchStartDist(null);
    setIsDragging(false);
  };

  const selectedNode = states.find(s => s.name === selectedState);
  const isPeninsularSelected = selectedNode?.region === 'Peninsular';
  const isEastSelected = selectedNode?.region === 'East Malaysia';

  return (
    <div id="MalaysiaMap" className="w-full bg-card border border-white/10 rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-2xl">
      {/* Batik vector background simulation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-color-dodge">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="batik-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#FFD700" strokeWidth="1" />
            <circle cx="20" cy="20" r="4" fill="#E31C25" />
            <path d="M0 0 L10 10 M30 30 L40 40 M40 0 L30 10 M10 30 L0 40" stroke="#FFD700" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#batik-pattern)" />
        </svg>
      </div>

      <div className={`flex flex-col mb-4 sm:mb-6 gap-3 relative z-10 ${
        isInsideSimulator ? 'items-start w-full' : 'sm:flex-row justify-between sm:items-center sm:gap-4'
      }`}>
        <div className="min-w-0 w-full">
          <h3 className="text-base sm:text-lg font-bold text-gold font-sans tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 animate-spin-slow text-crimson shrink-0" />
            <span className="break-words">Dialect Activity Map</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-white/50 leading-normal mt-0.5">
            Click states to filter regional slang. Glowing circles indicate high crowdsourcing activity!
          </p>
        </div>
        <div className={`flex flex-wrap gap-2 text-xs shrink-0 ${isInsideSimulator ? 'w-full' : ''}`}>
          {selectedState && (
            <button
              onClick={() => onSelectState(null)}
              className="px-3 py-1.5 bg-crimson/10 hover:bg-crimson/20 text-crimson border border-crimson/30 rounded-lg transition-all font-semibold cursor-pointer"
            >
              Clear Filter ({selectedState})
            </button>
          )}
          <button
            onClick={() => handleFocusRegion('Peninsular')}
            className={`px-3 py-1.5 border rounded-lg transition-all font-semibold flex items-center gap-1 cursor-pointer select-none text-[10px] sm:text-xs ${
              mapState.zoom > 1 && mapState.pan.x < 0
                ? 'bg-gold/15 border-gold text-gold shadow-sm shadow-gold/10'
                : 'bg-interior border-white/5 text-white/60 hover:text-white hover:border-white/10'
            }`}
          >
            Peninsular Focus 🇲🇾
          </button>
          <button
            onClick={() => handleFocusRegion('Borneo')}
            className={`px-3 py-1.5 border rounded-lg transition-all font-semibold flex items-center gap-1 cursor-pointer select-none text-[10px] sm:text-xs ${
              mapState.zoom > 1 && mapState.pan.x > 0
                ? 'bg-gold/15 border-gold text-gold shadow-sm shadow-gold/10'
                : 'bg-interior border-white/5 text-white/60 hover:text-white hover:border-white/10'
            }`}
          >
            Borneo Focus 🌅
          </button>
          <div className="px-3 py-1.5 bg-interior border border-white/5 rounded-lg text-white/80 flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Live Hotspots
          </div>
        </div>
      </div>

      {/* Responsive SVG Map — scales to fit any container width */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full border border-white/5 rounded-[21px] bg-interior relative select-none ${
          mapState.zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        <svg
          viewBox={getViewBox()}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
          style={{ 
            aspectRatio: '1050 / 450',
            maxHeight: '450px',
            transition: isDragging ? 'none' : 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Separator between West and East Malaysia */}
          <line x1="651" y1="0" x2="651" y2="450" stroke="var(--map-sep)" strokeDasharray="6 4" />
          <text x="660" y="20" fill="var(--map-sea)" fontSize="11" fontFamily="monospace" letterSpacing="1">South China Sea</text>

          {/* Region Labels */}
          <text x="20" y="20" fill="var(--map-label)" fontSize="11" fontFamily="monospace" letterSpacing="2" textAnchor="start">PENINSULAR MALAYSIA</text>
          <text x="1030" y="20" fill="var(--map-label)" fontSize="11" fontFamily="monospace" letterSpacing="2" textAnchor="end">EAST MALAYSIA</text>

          {/* Peninsular Malaysia coastline */}
          <path
            id="PeninsularCoastline"
            d="M 90,30
               C 110,25 210,35 320,60
               C 360,70 420,95 460,115
               C 490,130 520,150 545,175
               C 565,195 575,220 570,250
               C 565,275 550,300 555,320
               C 560,335 585,345 580,370
               C 575,390 545,410 525,412
               C 490,415 470,390 445,365
               C 410,340 395,335 375,325
               C 345,315 310,295 280,280
               C 245,275 220,255 210,230
               C 200,205 180,195 160,210
               C 140,225 125,200 130,175
               C 135,150 115,135 110,140
               C 100,145 90,130 95,120
               C 100,110 95,95 100,80
               C 102,70 90,60 85,50
               C 78,43 85,35 90,30 Z"
            fill={isPeninsularSelected ? "var(--map-fill-strong)" : "var(--map-fill)"}
            stroke={isPeninsularSelected ? "var(--map-coast-strong)" : "var(--map-coast)"}
            strokeWidth={isPeninsularSelected ? "1.6" : "0.8"}
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={(e) => {
              e.stopPropagation();
              onSelectState(isPeninsularSelected ? null : 'Selangor');
            }}
            style={{
              filter: isPeninsularSelected 
                ? 'drop-shadow(0 0 6px rgb(251, 191, 36)) drop-shadow(0 0 12px rgba(227, 28, 37, 0.5))' 
                : hoveredState?.region === 'Peninsular' ? 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.4))' : 'none',
              opacity: isPeninsularSelected ? 1 : hoveredState?.region === 'Peninsular' ? 0.75 : 0.45,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          />
          {/* East Malaysia (Sarawak & Sabah) coastline */}
          <path
            id="EastMalaysiaCoastline"
            d="M 640,370 
               C 660,355 680,350 690,355 
               C 710,365 730,335 755,310 
               C 775,290 785,270 790,245 
               C 795,220 815,200 830,180 
               C 835,175 845,180 850,170 
               C 855,160 860,165 865,155 
               C 870,145 875,150 880,150 
               C 890,130 900,110 910,95 
               C 920,80 930,60 940,40 
               C 945,35 950,50 955,60 
               C 960,70 955,80 960,85 
               C 965,90 980,100 995,115 
               C 1010,130 1025,140 1030,155 
               C 1035,170 1015,180 1005,195 
               C 995,210 980,215 970,215 
               C 945,215 915,225 900,235 
               C 885,245 865,275 825,295 
               C 785,315 760,365 725,385 
               C 705,395 680,390 640,370 Z"
            fill={isEastSelected ? "var(--map-fill-strong)" : "var(--map-fill)"}
            stroke={isEastSelected ? "var(--map-coast-strong)" : "var(--map-coast)"}
            strokeWidth={isEastSelected ? "1.6" : "0.8"}
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={(e) => {
              e.stopPropagation();
              onSelectState(isEastSelected ? null : 'Sarawak');
            }}
            style={{
              filter: isEastSelected 
                ? 'drop-shadow(0 0 6px rgb(251, 191, 36)) drop-shadow(0 0 12px rgba(227, 28, 37, 0.5))' 
                : hoveredState?.region === 'East Malaysia' ? 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.4))' : 'none',
              opacity: isEastSelected ? 1 : hoveredState?.region === 'East Malaysia' ? 0.75 : 0.45,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          />

          {/* Interactive state nodes rendered inside SVG for proper scaling */}
          {states.map((state) => {
            const count = entryCountsByState[state.name] || 0;
            const isSelected = selectedState === state.name;
            const cx = (state.x / 100) * VB_W;
            const cy = (state.y / 100) * VB_H;

            return (
              <g
                key={state.name}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => onSelectState(isSelected ? null : state.name)}
                style={{ cursor: 'pointer' }}
              >
                {/* Activity ping ring */}
                {state.hasActivity && (
                  <circle cx={cx} cy={cy} r="18" fill="rgba(227, 28, 37, 0.15)" className="animate-ping" />
                )}

                {/* Main marker background */}
                <rect
                  x={cx - 17}
                  y={cy - 17}
                  width="34"
                  height="34"
                  rx="8"
                  fill={isSelected ? 'url(#goldCrimsonGradient)' : '#1A1A1A'}
                  stroke={isSelected ? '#FFD700' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isSelected ? '2' : '1'}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 2px 8px rgba(227, 28, 37, 0.4))' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
                    transition: 'all 0.3s ease',
                  }}
                />

                {/* State short code text */}
                <text
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isSelected ? '#121212' : '#F5F5F5'}
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="monospace"
                  letterSpacing="0.5"
                >
                  {state.short}
                </text>

                {/* Count badge */}
                {count > 0 && (
                  <>
                    <circle
                      cx={cx + 14}
                      cy={cy - 14}
                      r="9"
                      fill={isSelected ? '#121212' : '#E31C25'}
                    />
                    <text
                      x={cx + 14}
                      y={cy - 13}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={isSelected ? '#FFD700' : '#fff'}
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {count}
                    </text>
                  </>
                )}

                {/* State name label below marker */}
                <rect
                  x={cx - state.name.length * 3.2}
                  y={cy + 20}
                  width={state.name.length * 6.4}
                  height="16"
                  rx="3"
                  fill={isSelected ? '#FFD700' : 'rgba(26, 26, 26, 0.9)'}
                  stroke={isSelected ? 'none' : 'rgba(255,255,255,0.05)'}
                  strokeWidth="0.5"
                />
                <text
                  x={cx}
                  y={cy + 29}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isSelected ? '#121212' : 'rgba(255,255,255,0.5)'}
                  fontSize="9"
                  fontWeight={isSelected ? '600' : '400'}
                >
                  {state.name}
                </text>
              </g>
            );
          })}

          {/* Gradient definition for selected state markers */}
          <defs>
            <linearGradient id="goldCrimsonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#E31C25" />
            </linearGradient>
          </defs>

          {/* Tooltip rendered inside SVG for proper positioning at any zoom */}
          {hoveredState && (() => {
            const hx = (hoveredState.x / 100) * VB_W;
            const hy = (hoveredState.y / 100) * VB_H;
            const tooltipX = hoveredState.region === 'Peninsular' ? hx + 30 : hx - 170;
            const tooltipY = hy - 10;
            const hoverCount = entryCountsByState[hoveredState.name] || 0;

            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect x={tooltipX} y={tooltipY} width="160" height={hoveredState.hasActivity ? 80 : 60} rx="8" 
                  fill="#1A1A1A" stroke="rgba(255, 215, 0, 0.4)" strokeWidth="1" 
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }} />
                <text x={tooltipX + 10} y={tooltipY + 18} fill="#FFD700" fontSize="12" fontWeight="bold">{hoveredState.name}</text>
                <text x={tooltipX + 150} y={tooltipY + 18} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" textAnchor="end">{hoveredState.region}</text>
                <line x1={tooltipX + 8} y1={tooltipY + 26} x2={tooltipX + 152} y2={tooltipY + 26} stroke="rgba(255,255,255,0.05)" />
                <text x={tooltipX + 10} y={tooltipY + 42} fill="rgba(245,245,245,0.7)" fontSize="10">Total Dialects:</text>
                <text x={tooltipX + 150} y={tooltipY + 42} fill="#FFD700" fontSize="10" fontWeight="bold" textAnchor="end">{hoverCount} words</text>
                {hoveredState.hasActivity && (
                  <text x={tooltipX + 10} y={tooltipY + 60} fill="#E31C25" fontSize="10">
                    🔥 Hot: "{hoveredState.hotWord}"
                  </text>
                )}
              </g>
            );
          })()}
        </svg>

        {/* Zoom controls overlay */}
        <div className="absolute bottom-3 left-3 z-30 flex flex-row gap-1 bg-[#121212]/75 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-md">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMapState(prev => {
                const newZ = Math.min(prev.zoom + 0.5, 4.5);
                return { ...prev, zoom: newZ };
              });
            }}
            className="w-5.5 h-5.5 flex items-center justify-center bg-interior hover:bg-gold/15 hover:text-gold border border-white/5 rounded text-white/90 text-xs font-bold transition-all cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMapState(prev => {
                const newZ = Math.max(prev.zoom - 0.5, 1);
                const newPan = newZ === 1 ? { x: 0, y: 0 } : prev.pan;
                return { zoom: newZ, pan: newPan };
              });
            }}
            className="w-5.5 h-5.5 flex items-center justify-center bg-interior hover:bg-gold/15 hover:text-gold border border-white/5 rounded text-white/90 text-xs font-bold transition-all cursor-pointer"
            title="Zoom Out"
          >
            −
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMapState({ zoom: 1, pan: { x: 0, y: 0 } });
              onSelectState(null);
            }}
            className="px-1.5 text-[8px] font-mono font-bold uppercase tracking-wide h-5.5 flex items-center justify-center bg-interior hover:bg-gold/15 hover:text-gold border border-white/5 rounded text-white/75 transition-all cursor-pointer"
            title="Reset View"
          >
            Reset
          </button>
        </div>

        {/* Zoom level indicator */}
        {mapState.zoom > 1 && (
          <div className="absolute top-3 right-3 z-30 px-2 py-1 bg-card/90 backdrop-blur-md rounded-md border border-white/10 text-[9px] font-mono text-gold font-bold">
            {mapState.zoom.toFixed(1)}×
          </div>
        )}
      </div>

      {/* Quick stats / tips bar — Clickable Focus Buttons */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 bg-interior p-2 sm:p-3 rounded-xl border border-white/5">
        <button
          onClick={() => handleFocusRegion('Northern')}
          className="p-2 sm:p-3 bg-card/30 hover:bg-gold/5 active:scale-[0.98] rounded-lg border border-white/5 hover:border-gold/20 flex flex-col justify-center items-center gap-1 min-w-0 overflow-hidden transition-all cursor-pointer text-center outline-none focus:border-gold/30"
          title="Zoom to Northern Region"
        >
          <span className="text-[9px] sm:text-[10px] text-white/45 uppercase tracking-widest font-mono">Northern</span>
          <span className="text-[10px] font-extrabold text-[#F5F5F5] sm:hidden leading-tight">PLS, KDH, PNG</span>
          <span className="hidden sm:block text-xs font-extrabold text-[#F5F5F5] mt-1 leading-tight">Perlis, Kedah, Penang</span>
        </button>
        <button
          onClick={() => handleFocusRegion('East Coast')}
          className="p-2 sm:p-3 bg-card/30 hover:bg-gold/5 active:scale-[0.98] rounded-lg border border-white/5 hover:border-gold/20 flex flex-col justify-center items-center gap-1 min-w-0 overflow-hidden transition-all cursor-pointer text-center outline-none focus:border-gold/30"
          title="Zoom to East Coast Region"
        >
          <span className="text-[9px] sm:text-[10px] text-white/45 uppercase tracking-widest font-mono">East Coast</span>
          <span className="text-[10px] font-extrabold text-[#F5F5F5] sm:hidden leading-tight">KTN, TRG, PHG</span>
          <span className="hidden sm:block text-xs font-extrabold text-[#F5F5F5] mt-1 leading-tight">Kelantan, Terengganu, Pahang</span>
        </button>
        <button
          onClick={() => handleFocusRegion('Central')}
          className="p-2 sm:p-3 bg-card/30 hover:bg-gold/5 active:scale-[0.98] rounded-lg border border-white/5 hover:border-gold/20 flex flex-col justify-center items-center gap-1 min-w-0 overflow-hidden transition-all cursor-pointer text-center outline-none focus:border-gold/30"
          title="Zoom to Central & Southern Region"
        >
          <span className="text-[9px] sm:text-[10px] text-white/45 uppercase tracking-widest font-mono">Central & South</span>
          <span className="text-[10px] font-extrabold text-[#F5F5F5] sm:hidden leading-tight">KUL, SGR, N9, MLK, JHR</span>
          <span className="hidden sm:block text-xs font-extrabold text-[#F5F5F5] mt-1 leading-tight">Kuala Lumpur, Selangor, N. Sembilan, Melaka, Johor</span>
        </button>
        <button
          onClick={() => handleFocusRegion('Borneo')}
          className="p-2 sm:p-3 bg-[#E31C25]/5 hover:bg-gold/10 active:scale-[0.98] rounded-lg border border-[#E31C25]/15 hover:border-gold/30 flex flex-col justify-center items-center gap-1 min-w-0 overflow-hidden transition-all cursor-pointer text-center outline-none focus:border-gold/45"
          title="Zoom to Borneo Region (Sabah & Sarawak)"
        >
          <span className="text-[9px] sm:text-[10px] text-white/45 uppercase tracking-widest font-mono text-[#E31C25]">Borneo</span>
          <span className="text-[10px] font-extrabold text-gold sm:hidden leading-tight">SBH, SWK</span>
          <span className="hidden sm:block text-xs font-extrabold text-gold mt-1 leading-tight">Sabah, Sarawak</span>
        </button>
      </div>
    </div>
  );
}
