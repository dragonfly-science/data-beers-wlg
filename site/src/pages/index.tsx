import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Logo from "../components/Logo"
import { useSiteMetadata, useGetMetadata } from "../hooks/SiteMetaData"
import { Content, Edge } from "../types/graphql"

type Props = {
  data: { content: Content }
}

const getContent = (key: string, edges: Edge[]): Edge | null => {
  const content = edges.filter((e: Edge) => {
    const { node } = e
    return node.parent.name === key
  })

  return content.length === 1 ? content[0] : null
}

const getCollection = (key: string, edges: Edge[]): Edge[] => {
  return edges.filter((e: Edge) => {
    const { node } = e
    return node.parent.dir === key
  })
}

const Index = ({ data }: Props): JSX.Element => {
  const { edges } = data.content
  const { title, description, author } = useSiteMetadata()
  const getMetadata = useGetMetadata({
    title,
    description,
    author,
  })

  const content = getContent("content", edges)
  const titleContent = getContent("title", edges)
  const speakers = getContent("speakers", edges)
  const sponsors = getContent("sponsors", edges)
  const postscript = getContent("postscript", edges)
  const footer = getContent("footer", edges)
  const speakerRecords = getCollection("speakers", edges)
  const sponsorsRecords = getCollection("sponsors", edges)

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: "en-nz" }}
        title={title}
        titleTemplate={`%s`}
        meta={getMetadata()}
      />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 mr-auto inline-flex flex-col lg:flex-row lg:mb-24">
          <Logo
            width="201"
            height="200"
            className="mb-4 max-w-6 max-h-6 lg:max-w-full lg:max-h-full lg:mb-0"
          />
          {titleContent ? (
            <div className="border-b-8 ml-0 border-black pb-4 mb-auto lg:ml-8">
              <h1
                className="font-bold text-4xl leading-tight lg:text-6xl"
                dangerouslySetInnerHTML={{
                  __html: titleContent.node.frontmatter?.title ?? "",
                }}
              />
              <span
                className="text-2xl lg:text-4xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: titleContent.node.frontmatter?.subtitle ?? "",
                }}
              />
            </div>
          ) : null}
        </header>
        {content ? (
          <section className="mb-12">
            <div className="prose lg:text-lg xl:text-xl">
              <p
                className="lead"
                dangerouslySetInnerHTML={{
                  __html: content.node.frontmatter?.intro ?? "",
                }}
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: content.node.html,
                }}
              />
            </div>
          </section>
        ) : null}

        <section className="mb-6 border-l-4 border-black px-12 py-8">
          {speakers ? (
            <h2
              className="font-bold text-2xl leading-tight mb-8 lg:text-4xl"
              dangerouslySetInnerHTML={{
                __html: speakers.node.frontmatter?.title ?? "",
              }}
            />
          ) : null}
          {speakerRecords.length !== 0 ? (
            <div className="flex flex-col justify-around mr-auto class prose lg:prose-lg max-w-none lg:flex-row">
              {speakerRecords.map(
                (e: Edge): JSX.Element => (
                  <div className="flex-grow flex-basis-0 mr-0 lg:mr-8">
                    <b className="text-xl block mb-4 lg:text-2xl">
                      {e.node.frontmatter?.name}
                    </b>
                    <p>{e.node.frontmatter?.description}</p>
                  </div>
                )
              )}
            </div>
          ) : null}
        </section>
        <section className="prose lg:text-lg xl:text-xl">
          {footer ? (
            <>
              <p
                dangerouslySetInnerHTML={{
                  __html: footer.node.frontmatter?.footer ?? "",
                }}
              />
              <p
                className="leading-tight"
                dangerouslySetInnerHTML={{
                  __html: footer.node.frontmatter?.signature ?? "",
                }}
              />
            </>
          ) : null}

          {postscript ? (
            <div
              className="italic text-base border-t-2 border-black pt-4"
              dangerouslySetInnerHTML={{
                __html: postscript.node.html ?? "",
              }}
            />
          ) : null}
        </section>
        {sponsors && sponsorsRecords ? (
          <section className="mt-12">
            <b className="block mb-4">{sponsors.node.frontmatter?.title}</b>
            {sponsorsRecords.map((e: Edge) => {
              return (
                <a
                  href={e.node.frontmatter?.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`/${e.node.frontmatter.logo}`}
                    alt={`${e.node.frontmatter?.title ?? ""}`}
                    className="max-w-12"
                  />
                </a>
              )
            })}
          </section>
        ) : null}
      </main>
    </>
  )
}

export const query = graphql`
  query {
    content: allMarkdownRemark(sort: { fields: frontmatter___sort }) {
      edges {
        node {
          frontmatter {
            description
            footer
            intro
            logo
            name
            signature
            subtitle
            title
            url
          }
          html
          parent {
            ... on File {
              name
              dir: relativeDirectory
            }
          }
        }
      }
    }
  }
`

export default Index
