async function run() {
  const query = `
    query GetPostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        id
        databaseId
        slug
        title
        excerpt
        content
        date
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        rankMathSEO {
          title
          description
          canonicalUrl
          focusKeyword
          robots
          schema
        }
      }
    }
  `;
  const res = await fetch('https://amaz.quietpupcare.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: "best-calming-dog-beds", idType: "SLUG" } })
  });
  console.log(JSON.stringify(await res.json(), null, 2));
}
run();
