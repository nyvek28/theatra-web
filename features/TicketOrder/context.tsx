'use client';

import { createContext, PropsWithChildren, FC, useState, useContext } from "react";

import { Tier } from "./types";
import { coreApiClient } from "@/lib/api-client";

export interface HolderData {
  tierId: string;
  name: string;
  email: string;
  id: string;
  serial: number;
}

export interface OrderData {
  items:  {
    tierId: string;
    count: number;
  }[]
}

export interface ImageData {
  file: File;
}

interface TicketOrderContextValue {
  step: number;
  next: () => void;
  submit: () => void;
  tiers: Tier[];
  setHolderData: (newHolderData: HolderData[]) => void;
  setOrderData: (newOrderData: OrderData) => void;
  setImageData: (newImageData: ImageData) => void;
  orderData: OrderData | undefined;
  holderData: HolderData[];
  imageData: ImageData | undefined;
}

export const TicketOrderContext = createContext<TicketOrderContextValue>({
  step: 1,
  next: () => {},
  submit: () => {},
  tiers: [],
  setHolderData: () => {},
  setOrderData: () => {},
  setImageData: () => {},
  orderData: undefined,
  holderData: [],
  imageData: undefined
});

interface TicketOrderProviderProps extends PropsWithChildren {
  initialTiers: Tier[]
}

export const TicketOrderProvider: FC<TicketOrderProviderProps> = ({ children, initialTiers }) => {
  const [step, setStep] = useState(1);
  const [holderData, setHolderData] = useState<HolderData[]>([]);
  const [orderData, setOrderData ] = useState<OrderData>()
  const [imageData, setImageData ] = useState<ImageData>()

  const updateOrderData = (newOrderData: OrderData) => {
    const newHolderData = newOrderData.items.flatMap((item) => {
      const holdersInTier: HolderData[] = Array.from({ length: item.count }).map((_, i) => ({
        tierId: item.tierId,
        name: '',
        email: '',
        id: '',
        serial: i + 1,
      }));

      return holdersInTier;
    })
    
    setOrderData(newOrderData)
    setHolderData(newHolderData)
  }

  const next = () => {
    setStep(step + 1)
  }

  const submit = async () => {
    const formData = new FormData()

    if (imageData) formData.append('image', imageData.file)
    if (holderData.length > 0) formData.append('holderData', JSON.stringify(holderData))

    const completed = await coreApiClient.post('/orders', formData)
    console.log({ completed });
  }

  return (
    <TicketOrderContext.Provider value={{
      step,
      next,
      submit,
      tiers: initialTiers,
      setHolderData,
      setOrderData: updateOrderData,
      setImageData,
      orderData,
      holderData,
      imageData
    }}>
      {children}
    </TicketOrderContext.Provider>
  );
};

export const useTicketOrder = () => {
  const value = useContext(TicketOrderContext);
  return value;
}
