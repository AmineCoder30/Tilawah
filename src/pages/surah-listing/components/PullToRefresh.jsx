import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const PullToRefresh = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef(null);

  const PULL_THRESHOLD = 80;
  const MAX_PULL_DISTANCE = 120;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAtTop = false;

    const handleTouchStart = (e) => {
      if (container.scrollTop === 0) {
        isAtTop = true;
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!isAtTop || isRefreshing) return;

      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      if (diff > 0) {
        e.preventDefault();
        const distance = Math.min(diff * 0.5, MAX_PULL_DISTANCE);
        setPullDistance(distance);
        setIsPulling(distance > 10);
      }
    };

    const handleTouchEnd = () => {
      if (!isAtTop || isRefreshing) return;

      if (pullDistance > PULL_THRESHOLD) {
        setIsRefreshing(true);
        onRefresh().finally(() => {
          setIsRefreshing(false);
          setPullDistance(0);
          setIsPulling(false);
        });
      } else {
        setPullDistance(0);
        setIsPulling(false);
      }
      isAtTop = false;
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh, pullDistance, isRefreshing]);

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const shouldTrigger = pullDistance > PULL_THRESHOLD;

  return (
    <div ref={containerRef} className="h-full overflow-y-auto">
      {/* Pull to Refresh Indicator */}
      <div
        className="flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          height: `${pullDistance}px`,
          opacity: isPulling ? 1 : 0,
        }}
      >
        <div className="flex flex-col items-center gap-y-2">
          <div
            className={`w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center transition-all duration-200 ${
              isRefreshing ? "animate-spin" : ""
            }`}
            style={{
              transform: `rotate(${pullProgress * 180}deg)`,
              borderColor: shouldTrigger
                ? "var(--color-primary)"
                : "var(--color-border)",
            }}
          >
            <Icon
              name={
                isRefreshing
                  ? "Loader2"
                  : shouldTrigger
                  ? "RefreshCw"
                  : "ArrowDown"
              }
              size={16}
              className={`transition-colors duration-200 ${
                shouldTrigger ? "text-primary" : "text-text-secondary"
              }`}
            />
          </div>
          <span
            className={`text-xs font-caption transition-colors duration-200 ${
              shouldTrigger ? "text-primary" : "text-text-secondary"
            }`}
          >
            {isRefreshing
              ? "Refreshing..."
              : shouldTrigger
              ? "Release to refresh"
              : "Pull to refresh"}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PullToRefresh;
