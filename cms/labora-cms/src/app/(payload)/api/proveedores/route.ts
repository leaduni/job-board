import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const { docs } = await payload.find({
    collection: 'courses',
    limit: 2000,
    depth: 0,
    select: { proveedor: true },
  })

  const proveedores = [...new Set(docs.map((d) => d.proveedor).filter(Boolean))].sort((a, b) =>
    String(a).localeCompare(String(b)),
  )

  return Response.json(proveedores)
}
