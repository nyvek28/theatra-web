'use client';

import { useForm } from "react-hook-form";

import { useTicketOrder } from "./context";
import { useMemo } from "react";

interface TicketVoucherFormValues {
  files: FileList
}

const TicketVoucherForm: React.FC = () => {
  const { orderData, tiers, next, setImageData } = useTicketOrder();
  const { register, handleSubmit } = useForm<TicketVoucherFormValues>({
    defaultValues: {
      files: undefined
    }
  })


  const total = useMemo(() => orderData?.items.reduce((acc, item) => {
    const tier = tiers.find((t) => t.id === item.tierId);
    if (!tier) return acc;
    const totalOfItem = tier.price * item.count;
    return acc + totalOfItem
  }, 0), [tiers, orderData])

  const onSubmit = ({ files }: TicketVoucherFormValues) => {
    const file = files.length > 0 && files[0];
    if (!file) return;
    setImageData({ file });
    next();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Your total is: {total}</h2>
      <input
        type="file"
        max={1}
        accept="image/*"
        {...register('files')}
      />
      <button type='submit'>
        Next
      </button>
    </form>
  );
};

export default TicketVoucherForm;
