import Image from "next/image"

import { TicketOrder } from "@/features/TicketOrder"
import { coreApiClient } from "@/lib/api-client"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const event = await coreApiClient.get(`/events/${id}`)

  if (event.error) {
    console.error(event.error)
    return <div>Event not found</div>
  }

  return (
    <div className="flex">
      <div className="h-[600px] relative w-1/2">
        <Image
          src={`https://cdn11.bigcommerce.com/s-b72t4x/images/stencil/1280x1280/products/27189/35677/Item241190.jpg__13460.1624831191.jpg?c=2`}
          alt={event.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="w-1/2">
        <h1 className="mb-2 text-5xl">{event.name}</h1>
        <TicketOrder tiers={event.tiers} />
      </div>
    </div>
  )
}