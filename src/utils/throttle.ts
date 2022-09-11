import type { BaseFunction } from "@/types";

export const throttle = <ThrottledFunction extends BaseFunction>({
  requestLimit,
  requestTimes,
  throttledFunction,
  timeframe,
}: {
  requestLimit: number;
  requestTimes: number[];
  throttledFunction: ThrottledFunction;
  timeframe: number;
}) => {
  const checkRequestTimes = () => {
    requestTimes.forEach((requestTime, index) => {
      const timeframeAgo = Date.now() - timeframe;

      if (requestTime < timeframeAgo) requestTimes.splice(index, 1);
    });
  };

  setInterval(checkRequestTimes, 1000);

  return (...args: Parameters<typeof throttledFunction>) => {
    requestTimes.push(Date.now());

    if (requestTimes.length < requestLimit) {
      throttledFunction(...args);
    }
  };
};
