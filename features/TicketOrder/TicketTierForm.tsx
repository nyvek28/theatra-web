'use client'

import { Input } from '@/components/Input';
import { useTicketOrder, OrderData } from './context';
import { useForm, useFieldArray } from 'react-hook-form';

const TicketTierForm: React.FC = () => {
  const { tiers, setOrderData, next } = useTicketOrder();
  const { register, control, handleSubmit } = useForm<OrderData>({ defaultValues: {
    items: tiers.map(tier => ({
      tierId: tier.id,
      count: 0
    }))
  }})
  const { fields } = useFieldArray({
    control,
    name: "items"
  })

  const onSubmit = (data: OrderData) => {
    const orderData: OrderData = {
      ...data,
      items: data.items.filter(item => item.count > 0)
    }
    setOrderData(orderData)
    next()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Select Ticket Quantities</h2>
      <ul>
        {fields.map((field, index) => {
          const tier = tiers[index]
          return (
            <li key={field.id} className="mt-5 border-t-2 border-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                </div>
                <div>
                  <p className="text-lg font-semibold">{tier.price} {tier.currency}</p>
                </div>
              </div>
              <Input
                className="w-16"
                {...register(`items.${index}.count`, { valueAsNumber: true })}
                type="number"
              />
            </li>
          )
        })}
      </ul>
      <button type="submit">
        Next
      </button>
    </form>
  );
};

export default TicketTierForm;
