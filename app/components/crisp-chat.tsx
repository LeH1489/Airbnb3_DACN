"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("369d0a9f-e3f7-4dc2-bd60-6ed5b0b5d007");
  }, []);

  return null;
};
