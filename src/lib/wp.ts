const WP_GRAPHQL_URL = 'https://amaz.quietpupcare.com/graphql';

export async function fetchGraphQL(query: string, variables = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // cache: 'no-store' // Use this if you want fresh data every request
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
    });

    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch API');
    }
    return json.data;
  } catch (error) {
    console.error('Error fetching WP GraphQL:', error);
    throw error;
  }
}

export async function getAllPosts() {
  const query = `
    query GetAllPosts {
      posts(first: 50) {
        nodes {
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
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.posts?.nodes || [];
}

export async function getPostBySlug(slug: string) {
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
  const variables = {
    id: slug,
    idType: 'SLUG'
  };
  const data = await fetchGraphQL(query, variables);
  return data?.post;
}
