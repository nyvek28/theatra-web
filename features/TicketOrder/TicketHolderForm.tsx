'use client';

import { useTicketOrder, HolderData } from './context';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/Input';

interface TicketHolderFormValues {
  holderData: HolderData[]
}

const TicketHolderForm: React.FC = () => {
  const { holderData, tiers, setHolderData, next } = useTicketOrder();
  const { register, control, handleSubmit } = useForm<TicketHolderFormValues>({
    defaultValues: {
      holderData
    }
  })
  const { fields } = useFieldArray({
    control,
    name: 'holderData'
  })
  
  const onSubmit = (data: TicketHolderFormValues) => {
    const { holderData } = data;
    setHolderData(holderData)
    next()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Enter Holder Details</h2>

      {fields.map((field, index) => {
        const holder = holderData[index]
        const tier = tiers.find(tier => tier.id === holder.tierId)
        return (
          <div key={field.id}>
            <h4>Ticket {tier?.name} #{holder.serial}</h4>
            <Input className="w-full mb-6" {...register(`holderData.${index}.id`)} />
            <Input className="w-full mb-6" {...register(`holderData.${index}.name`)}/>
            <Input className="w-full mb-6" {...register(`holderData.${index}.email`)}/>
          </div>
        );
      })}
      
      <button type='submit'>
        Next
      </button>
    </form>
  );
};

export default TicketHolderForm;
