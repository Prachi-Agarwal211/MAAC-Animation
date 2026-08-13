"use client";

import type { ComponentProps } from "react";
import { fireGoogleAdsConversion } from "@/lib/tracking";
import { GOOGLE_ADS_CONVERSIONS } from "@/lib/google-ads";

type AdsEvent = keyof typeof GOOGLE_ADS_CONVERSIONS;

type Props = ComponentProps<"a"> & {
  adsEvent: AdsEvent;
};

export default function GoogleAdsLink({ adsEvent, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        fireGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS[adsEvent]);
        onClick?.(e);
      }}
    />
  );
}
