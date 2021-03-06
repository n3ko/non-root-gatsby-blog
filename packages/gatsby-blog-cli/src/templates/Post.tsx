/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import moment from 'moment'
import { graphql } from 'gatsby'

import BaseLayout from '../layouts/BaseLayout'

export const query = graphql`
  query GetPost($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      fields {
        slug
      }
      frontmatter {
        title
        tag
        image
      }
      correctedDateEpoch
      html
    }
  }
`

const my1 = css`
  margin-top: 1em;
  margin-bottom: 1em;
`

const Post = ({ data }: any) => {
  const fm = data.markdownRemark.frontmatter
  const title = fm.title || data.markdownRemark.fields.slug

  return (
    <BaseLayout>
      <div key={ title } className="card" css={my1}>
        <div className="card-content">
          <h1 className="title">{ title }</h1>
          <div css={css`height: 1.5em; margin-bottom: 2em;`}>
            <small className="is-pulled-right">{ moment(data.markdownRemark.correctedDateEpoch).format('LL') }</small>
          </div>

          { fm.image ? (
            <div className="media">
              <figure className="image">
                <img alt={ title } data-src={ fm.image } className="lazyload" />
              </figure>
            </div>
          ) : null }

          <div className="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </div>
      </div>
    </BaseLayout>
  )
}

export default Post
