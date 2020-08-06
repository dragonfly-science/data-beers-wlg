import { useCallback } from "react"
import { useStaticQuery, graphql } from "gatsby"

export type SiteMetadata = {
  title: string
  description: string
  author: string
}

export type SiteData = {
  site: { siteMetadata: SiteMetadata }
}

export type UseSiteMetadataType = () => SiteMetadata

export const useSiteMetadata: UseSiteMetadataType = () => {
  const { site }: SiteData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  return site.siteMetadata
}

export type UseGetMetadataType = (
  options: SiteMetadata
) => () => Array<{ name?: string; property?: string; content: string }>

export const useGetMetadata: UseGetMetadataType = ({
  title,
  description,
  author,
}) =>
  useCallback(
    () => [
      {
        name: `description`,
        content: description,
      },
      {
        property: `og:title`,
        content: title,
      },
      {
        property: `og:description`,
        content: description,
      },
      {
        property: `og:type`,
        content: `website`,
      },
      {
        name: `twitter:card`,
        content: `summary`,
      },
      {
        name: `twitter:creator`,
        content: author,
      },
      {
        name: `twitter:title`,
        content: title,
      },
      {
        name: `twitter:description`,
        content: description,
      },
    ],
    [title, description, author]
  )
