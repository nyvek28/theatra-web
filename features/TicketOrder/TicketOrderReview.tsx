'use client';

import { useTicketOrder } from "./context";

const TicketOrderReview: React.FC = () => {
  const { submit } = useTicketOrder()
  return (
    <div>
      <h3>Go ahead</h3>
      <button onClick={() => submit()} >Submit</button>
    </div>
  )
};

export default TicketOrderReview;
