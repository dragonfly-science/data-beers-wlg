import { HTMLAttributes } from "react"

export type SVGProps = {
  width?: number | string
  height?: number | string
  viewBox?: string
} & HTMLAttributes<SVGElement>
