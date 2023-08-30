interface NumberOfItemsPerViewProps {
  containerWidth: number;
  itemWidth: number;
  gap: number;
}

export function useNumberOfItemsPerView({
  containerWidth,
  itemWidth,
  gap,
}: NumberOfItemsPerViewProps) {
  const itemsPerView = Math.floor(containerWidth / (itemWidth + gap));

  return itemsPerView;
}
