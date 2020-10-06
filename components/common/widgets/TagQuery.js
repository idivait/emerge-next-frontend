import { useStaticQuery, graphql } from "gatsby"
export const getTagData= (slug) => {
  const { allGhostTag } = useStaticQuery(
    graphql`
        query tagFilter {
            allGhostTag(sort: {order: DESC, fields: id}) {
                edges {
                    node {
                        slug
                        name
                        postCount
                        id
                    }
                }
            }
        }
    `
  )
  return allGhostTag.edges
}