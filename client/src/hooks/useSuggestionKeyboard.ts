import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from "react";

export function nextSuggestionIndex(currentIndex: number, direction: "next" | "previous", itemCount: number): number {
  if (itemCount === 0) return -1;
  if (direction === "next") return currentIndex >= itemCount - 1 ? 0 : currentIndex + 1;
  return currentIndex <= 0 ? itemCount - 1 : currentIndex - 1;
}

interface KeyboardSuggestion {
  id: string;
}

/** Adds standard ArrowUp/ArrowDown/Enter/Escape behaviour to an autocomplete input. */
export function useSuggestionKeyboard<T extends KeyboardSuggestion>(suggestions: T[], onSelect: (suggestion: T) => void) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionSignature = useMemo(() => suggestions.map((suggestion) => suggestion.id).join("|"), [suggestions]);

  useEffect(() => setActiveIndex(-1), [suggestionSignature]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => nextSuggestionIndex(index, "next", suggestions.length));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => nextSuggestionIndex(index, "previous", suggestions.length));
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault();
      onSelect(suggestions[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setActiveIndex(-1);
      event.currentTarget.blur();
    }
  }, [activeIndex, onSelect, suggestions]);

  return { activeIndex, setActiveIndex, onKeyDown };
}
