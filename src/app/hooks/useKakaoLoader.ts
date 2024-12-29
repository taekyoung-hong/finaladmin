// hooks/useKakaoLoader.ts
import { useState, useEffect } from "react";

export const useKakaoLoader = (appkey: string): [boolean, Error | null] => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setLoading(false);
        });
      };
      script.onerror = () => {
        setError(new Error("Failed to load Kakao Maps SDK"));
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    loadKakaoMap();

    return () => {
      const script = document.querySelector(`script[src*="dapi.kakao.com"]`);
      script && document.head.removeChild(script);
    };
  }, [appkey]);

  return [loading, error];
};
