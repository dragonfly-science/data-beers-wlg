export interface Frontmatter {
  title?: string
  intro?: string
  subtitle?: string
  description?: string
  name?: string
  link?: {
    label?: string
    url?: string
  }
  footer?: string
  signature?: string
  url?: string
  logo?: string
}

export interface Node {
  frontmatter: Frontmatter
  html: string
  parent: {
    name: string
    dir: string
  }
}

export interface Edge {
  node: Node
}

export interface Content {
  edges: Edge[]
}
