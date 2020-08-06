import React, { ReactElement, useCallback } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import Logo from "../components/Logo"
import DragonflyLogo from "../components/DragonflyLogo"

// interface Props {}
type SiteMetadata = {
  title: string
  description: string
  author: string
}

type SiteData = {
  site: { siteMetadata: SiteMetadata }
}

type UseSiteMetadataType = () => SiteMetadata

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

type UseGetMetadataType = (
  options: SiteMetadata
) => () => Array<{ name?: string; property?: string; content: string }>

const useGetMetadata: UseGetMetadataType = ({ title, description, author }) =>
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

const Index = (): ReactElement => {
  const { title, description, author } = useSiteMetadata()
  const getMetadata = useGetMetadata({
    title,
    description,
    author,
  })

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
          <div className="border-b-8 ml-0 border-black pb-4 mb-auto lg:ml-8">
            <h1 className="font-bold text-4xl leading-tight lg:text-6xl">
              DataBeers <br />
              Wellington:
            </h1>
            <span className="text-2xl lg:text-4xl font-bold">
              First Edition
            </span>
          </div>
        </header>
        <section className="mb-12">
          <div className="prose lg:text-xl xl:text-2xl">
            <p className="lead">
              We would like to invite you to the inaugural meeting of DataBeers
              Wellington, at 5 pm on [date] at Dragonfly Data Science, Level 4
              Stephenson &amp; Turner House, 158 Victoria Street, Te Aro,
              Pōneke.
            </p>
            <p>
              DataBeers is a community-driven,{" "}
              <a
                href="https://twitter.com/search?f=users&vertical=default&q=databeers"
                target="_blank"
              >
                global
              </a>{" "}
              series of meet-ups aiming at bringing together local technical
              communities to talk about data science over delicious beer,
              alcoholic or not.
            </p>
            <p>
              Wellington has both great craft beer and great data science
              artisans -- as well as data science artisans who love craft beer!
              So this is the perfect opportunity for us all to get together,
              learn new things from others and teach others the things we know!
            </p>
            <p>
              Our first edition will take place on [date] at the Dragonfly Data
              Science [address] at 5 pm. We will have time to chat and catch up
              until about 5:25 pm, when our speakers will deliver their quick
              presentations, in a{" "}
              <a
                href="https://en.wikipedia.org/wiki/PechaKucha"
                target="_blank"
              >
                PechaKucha
              </a>{" "}
              format.
            </p>
          </div>
        </section>
        <section className="mb-6 border-l-4 border-black px-12 py-8">
          <h2 className="font-bold text-2xl leading-tight mb-8 lg:text-4xl">
            We are excited to be hosting
            <br />
            the following speakers:
          </h2>
          <div className="flex flex-col justify-around mr-auto class prose lg:prose-lg max-w-none lg:flex-row">
            <div className="flex-grow flex-basis-0 mr-0 lg:mr-8">
              <b className="text-xl block mb-4 lg:text-2xl">
                Cristian Marquez Russo
              </b>
              <p>
                Will talk about the Argentine space programme and Google's
                fisheries watch thing.
              </p>
              <p>
                <a href="#" target="_blank">
                  @handle
                </a>
              </p>
            </div>
            <div className="flex-grow flex-basis-0 mr-0 lg:mr-8">
              <b className="text-xl block mb-4 lg:text-2xl">Will [Surname]</b>
              <p>Keen AI</p>
            </div>
            <div className="flex-grow flex-basis-0">
              <b className="text-xl block mb-4 lg:text-2xl">Bogdan? or Iggy</b>
              <p>Highly productive land?</p>
            </div>
          </div>
        </section>
        <section className="prose lg:text-xl xl:text-2xl">
          <p>
            For those who need to get home quickly we will aim to be done by 6
            pm. For those who have time to stick around, we will head over to
            [insert pub] for more beer and data.
          </p>
          <p className="leading-tight">
            See you soon,
            <br />
            DataBeers WLG
          </p>

          <p className="italic text-base border-t-2 border-black pt-8">
            P.S.: if you already know you would like to speak at or help
            organize a future DataBeers event, please contact Bogdan State (
            <a href="mailto:bogdan@scie.nz">bogdan@scie.nz</a>) or Finlay
            Thompson (
            <a href="mailto:finlay@dragonfly.co.nz">finlay@dragonfly.co.nz</a>).{" "}
          </p>
        </section>
        <section className="mt-12">
          <b className="block mb-4">Sponsored by:</b>
          <a href="https://www.dragonfly.co.nz" target="_blank">
            <DragonflyLogo
              width={180}
              height={37}
              title="Dragonfly Data Science"
            />
          </a>
        </section>
      </main>
    </>
  )
}

export default Index
