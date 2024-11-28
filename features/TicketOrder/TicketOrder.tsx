'use client';

import { TicketHolderForm, TicketTierForm, Tier, TicketVoucherForm, TicketOrderReview } from './';
import { useTicketOrder, TicketOrderProvider } from './context';

interface TicketOrderProps {
  tiers: Tier[];
}

const TicketOrder: React.FC = () => {
  const { step } = useTicketOrder();

  return (
    <>
      {step === 1 && <TicketTierForm />}
      {step === 2 && <TicketHolderForm />}
      {step === 3 && <TicketVoucherForm />}
      {step === 4 && <TicketOrderReview />}
    </>
  );
};

const TicketOrderWithContext: React.FC<TicketOrderProps> = ({ tiers }) => {
  return (
    <TicketOrderProvider initialTiers={tiers}>
      <TicketOrder />
    </TicketOrderProvider>
  );
}

export default TicketOrderWithContext;
