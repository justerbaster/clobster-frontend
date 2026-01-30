import { useEffect, useState } from 'react';

function OceanBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollProgress = Math.min(scrollY / maxScroll, 1) || 0;
  
  // Colors transition from light surface to dark deep
  const surfaceColor = { r: 135, g: 206, b: 235 };
  const midColor = { r: 65, g: 105, b: 175 };
  const deepColor = { r: 20, g: 40, b: 80 };

  const lerp = (start, end, t) => start + (end - start) * t;
  
  const getColor = (progress) => {
    if (progress < 0.5) {
      const t = progress * 2;
      return {
        r: lerp(surfaceColor.r, midColor.r, t),
        g: lerp(surfaceColor.g, midColor.g, t),
        b: lerp(surfaceColor.b, midColor.b, t),
      };
    } else {
      const t = (progress - 0.5) * 2;
      return {
        r: lerp(midColor.r, deepColor.r, t),
        g: lerp(midColor.g, deepColor.g, t),
        b: lerp(midColor.b, deepColor.b, t),
      };
    }
  };

  const bgColor = getColor(scrollProgress);
  const bgStyle = `rgb(${Math.round(bgColor.r)}, ${Math.round(bgColor.g)}, ${Math.round(bgColor.b)})`;

  // Fish configurations
  const fishTypes = [
    { // Small orange fish (like Clobster's friends)
      width: 20, height: 12,
      render: (
        <svg viewBox="0 0 20 12" className="w-full h-full">
          <polygon points="0,6 5,2 5,10" fill="#F4967A" />
          <rect x="5" y="2" width="10" height="8" fill="#E8734A" />
          <rect x="15" y="4" width="5" height="4" fill="#E8734A" />
          <rect x="11" y="4" width="2" height="2" fill="#1a1a2e" />
        </svg>
      )
    },
    { // Blue fish
      width: 24, height: 14,
      render: (
        <svg viewBox="0 0 24 14" className="w-full h-full">
          <polygon points="0,7 6,2 6,12" fill="#7CB9E8" />
          <rect x="6" y="2" width="12" height="10" fill="#5A9BD4" />
          <rect x="18" y="4" width="6" height="6" fill="#5A9BD4" />
          <rect x="13" y="5" width="2" height="2" fill="#1a1a2e" />
        </svg>
      )
    },
    { // Small yellow fish
      width: 16, height: 10,
      render: (
        <svg viewBox="0 0 16 10" className="w-full h-full">
          <polygon points="0,5 4,1 4,9" fill="#FFE066" />
          <rect x="4" y="1" width="8" height="8" fill="#FFD43B" />
          <rect x="12" y="3" width="4" height="4" fill="#FFD43B" />
          <rect x="9" y="3" width="2" height="2" fill="#1a1a2e" />
        </svg>
      )
    },
    { // Green fish
      width: 18, height: 12,
      render: (
        <svg viewBox="0 0 18 12" className="w-full h-full">
          <polygon points="0,6 5,2 5,10" fill="#69DB7C" />
          <rect x="5" y="2" width="9" height="8" fill="#51CF66" />
          <rect x="14" y="4" width="4" height="4" fill="#51CF66" />
          <rect x="10" y="4" width="2" height="2" fill="#1a1a2e" />
        </svg>
      )
    },
    { // Purple fish
      width: 22, height: 14,
      render: (
        <svg viewBox="0 0 22 14" className="w-full h-full">
          <polygon points="0,7 6,2 6,12" fill="#B197FC" />
          <rect x="6" y="2" width="11" height="10" fill="#9775FA" />
          <rect x="17" y="4" width="5" height="6" fill="#9775FA" />
          <rect x="12" y="5" width="2" height="2" fill="#1a1a2e" />
        </svg>
      )
    },
  ];

  // Generate fish schools
  const generateFish = (count, yRange, speedRange, direction, baseDelay) => {
    return [...Array(count)].map((_, i) => ({
      id: `${direction}-${yRange[0]}-${i}`,
      type: fishTypes[i % fishTypes.length],
      y: yRange[0] + (Math.random() * (yRange[1] - yRange[0])),
      speed: speedRange[0] + (Math.random() * (speedRange[1] - speedRange[0])),
      delay: baseDelay + (i * 2),
      direction,
      scale: 0.8 + Math.random() * 0.4,
    }));
  };

  const allFish = [
    // Surface fish - visible immediately
    ...generateFish(4, [5, 20], [15, 25], 'left', 0),
    ...generateFish(3, [10, 25], [18, 28], 'right', 5),
    // Mid-level fish
    ...generateFish(5, [25, 45], [12, 22], 'left', 2),
    ...generateFish(4, [30, 50], [14, 24], 'right', 8),
    // Deep fish
    ...generateFish(3, [55, 75], [10, 18], 'left', 4),
    ...generateFish(3, [60, 80], [12, 20], 'right', 10),
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: bgStyle }}>
      {/* Pixel grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Light rays from surface */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{ 
          opacity: Math.max(0, 1 - scrollProgress * 2),
          background: `
            linear-gradient(180deg, 
              rgba(255,255,200,0.2) 0%, 
              rgba(255,255,200,0.05) 30%, 
              transparent 60%
            )
          `
        }}
      />

      {/* Animated Fish */}
      {allFish.map((fish) => {
        const isVisible = fish.y < 30 || scrollProgress > (fish.y - 30) / 100;
        const opacity = fish.y < 30 ? 0.9 : Math.min(1, (scrollProgress - (fish.y - 30) / 100) * 3);
        
        return (
          <div
            key={fish.id}
            className="absolute transition-opacity duration-1000"
            style={{
              top: `${fish.y}%`,
              opacity: isVisible ? opacity : 0,
              width: fish.type.width * fish.scale,
              height: fish.type.height * fish.scale,
              transform: fish.direction === 'right' ? 'scaleX(-1)' : 'none',
              animation: `swim-${fish.direction} ${fish.speed}s linear infinite`,
              animationDelay: `${fish.delay}s`,
            }}
          >
            {fish.type.render}
          </div>
        );
      })}

      {/* Bubbles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute rounded-sm bg-white/20 border border-white/30"
          style={{
            width: `${4 + (i % 3) * 4}px`,
            height: `${4 + (i % 3) * 4}px`,
            left: `${5 + (i * 5) % 90}%`,
            animation: `float-up ${8 + i % 5}s linear infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      {/* Seaweed at bottom */}
      {scrollProgress > 0.5 && (
        <div 
          className="absolute bottom-0 left-0 right-0 transition-all duration-500"
          style={{ 
            opacity: Math.min(1, (scrollProgress - 0.5) * 2),
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
          }}
        >
          {[...Array(25)].map((_, i) => (
            <div
              key={`seaweed-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${i * 4 + (i % 3)}%`,
                animation: `sway ${2 + i % 3}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <svg width="12" height={30 + (i % 4) * 15} viewBox={`0 0 12 ${30 + (i % 4) * 15}`}>
                <rect x="4" y="0" width="4" height={30 + (i % 4) * 15} fill="#2D5A27" />
                <rect x="2" y={8 + i % 8} width="4" height="6" fill="#3D7A37" />
                <rect x="6" y={16 + i % 10} width="4" height="5" fill="#3D7A37" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Ocean floor */}
      {scrollProgress > 0.65 && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 transition-all duration-500"
          style={{ 
            opacity: Math.min(1, (scrollProgress - 0.65) * 3),
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
          }}
        >
          {/* Sandy floor */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-800 to-amber-700" />
          
          {/* Rocks */}
          {[...Array(10)].map((_, i) => (
            <div
              key={`rock-${i}`}
              className="absolute bottom-1"
              style={{ left: `${i * 10 + 2}%` }}
            >
              <svg width={16 + (i % 3) * 8} height={12 + (i % 2) * 6} viewBox="0 0 24 18">
                <polygon points="0,18 6,6 12,3 18,8 24,18" fill="#4A4A4A" />
                <polygon points="6,6 12,3 12,10 6,12" fill="#5A5A5A" />
              </svg>
            </div>
          ))}

          {/* Shells */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`shell-${i}`}
              className="absolute bottom-3"
              style={{ left: `${8 + i * 16}%` }}
            >
              <svg width="10" height="6" viewBox="0 0 10 6">
                <ellipse cx="5" cy="4" rx="5" ry="3" fill="#F4967A" />
                <rect x="2" y="3" width="2" height="2" fill="#E8734A" />
                <rect x="5" y="2" width="2" height="2" fill="#E8734A" />
              </svg>
            </div>
          ))}

          {/* Starfish */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bottom-2"
              style={{ left: `${15 + i * 30}%` }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <polygon points="7,0 8,5 14,5 9,8 11,14 7,10 3,14 5,8 0,5 6,5" fill="#FF8787" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Depth indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
        <div className="w-2 h-40 bg-white/10 border-2 border-white/20 relative">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-clobster-coral transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          <div 
            className="absolute right-4 whitespace-nowrap text-[10px] font-mono text-white/60 transition-all duration-300"
            style={{ bottom: `${scrollProgress * 100}%`, transform: 'translateY(50%)' }}
          >
            {Math.round(scrollProgress * 1000)}m
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-up {
          0% { 
            transform: translateY(100vh) translateX(0); 
            opacity: 0; 
          }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { 
            transform: translateY(-50px) translateX(30px); 
            opacity: 0; 
          }
        }
        
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        
        @keyframes swim-left {
          0% { left: 110%; }
          100% { left: -10%; }
        }
        
        @keyframes swim-right {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        
        .pixel-fish {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}

export default OceanBackground;
