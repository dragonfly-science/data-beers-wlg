import { HTMLAttributes } from "react"
import { FluidObject } from "gatsby-image"

export type SVGProps = {
  width?: number | string
  height?: number | string
  viewBox?: string
} & HTMLAttributes<SVGElement>

export type FluidImageType = FluidObject & { originalName: string }
export type FluidImageNode = { node: { fluid: FluidImageType } }
export type FluidImageEdges = { edges: FluidImageNode[] }
