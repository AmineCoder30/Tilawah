import React, { useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import ReciterCard from "./ReciterCard";

const ReciterCarousel = ({
  reciters,
  selectedReciter,
  onReciterSelect,
  riwayahFilter,
}) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Auto-scroll to selected reciter
  useEffect(() => {
    if (selectedReciter && scrollRef.current) {
      const selectedIndex = reciters.findIndex(
        (r) => r.id === selectedReciter.id
      );
      if (selectedIndex !== -1) {
        const cardWidth = 112; // w-28 = 112px
        const scrollPosition =
          selectedIndex * cardWidth -
          scrollRef.current.clientWidth / 2 +
          cardWidth / 2;
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [selectedReciter, reciters]);

  const filteredReciters = reciters.filter(
    (reciter) => !riwayahFilter || reciter.riwayah.includes(riwayahFilter)
  );

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Select Reciter
        </h3>
        <div className="text-sm text-text-secondary">
          {filteredReciters.length} available
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          shape="circle"
          onClick={scrollLeft}
          iconName="ChevronLeft"
          iconSize={20}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background shadow-gentle border border-border"
          aria-label="Scroll left"
        />

        {/* Reciters Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-x-3 overflow-x-auto scrollbar-hide px-8 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredReciters.map((reciter) => (
            <ReciterCard
              key={reciter.id}
              reciter={reciter}
              isSelected={selectedReciter?.id === reciter.id}
              onClick={onReciterSelect}
              riwayahFilter={riwayahFilter}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          shape="circle"
          onClick={scrollRight}
          iconName="ChevronRight"
          iconSize={20}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background shadow-gentle border border-border"
          aria-label="Scroll right"
        />
      </div>

      {/* Riwayah Filter Info */}
      {riwayahFilter && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary text-xs font-caption rounded-full">
            <Icon name="Filter" size={12} className="mr-1" />
            Filtered by {riwayahFilter}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReciterCarousel;
