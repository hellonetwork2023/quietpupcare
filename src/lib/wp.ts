const WP_GRAPHQL_URL = 'https://amaz.quietpupcare.com/graphql';

export async function fetchGraphQL(query: string, variables = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://amaz.quietpupcare.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin'
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

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON. Status:', res.status, 'Response preview:', text.substring(0, 500));
      throw new Error(`Invalid JSON response from WP GraphQL (Status: ${res.status})`);
    }
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
  const allNodes: any[] = [];
  let hasNextPage = true;
  let afterCursor: string | null = null;

  while (hasNextPage) {
    const query = `
      query GetAllPosts($first: Int!, $after: String) {
        posts(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            databaseId
            slug
            title
            excerpt
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
    const variables: Record<string, any> = { first: 100 };
    if (afterCursor) variables.after = afterCursor;

    const data = await fetchGraphQL(query, variables);
    const posts = data?.posts;
    if (!posts) break;

    allNodes.push(...(posts.nodes || []));
    hasNextPage = posts.pageInfo?.hasNextPage || false;
    afterCursor = posts.pageInfo?.endCursor || null;
  }

  return allNodes;
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

export async function getCustomScripts() {
  const query = `
    query GetCustomScripts {
      customScripts {
        headScripts
        bodyScripts
        footerScripts
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.customScripts;
}

export async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        slug
        title
        content
        rankMathSEO {
          title
          description
          robots
        }
      }
    }
  `;
  const variables = {
    id: slug,
    idType: 'URI'
  };
  const data = await fetchGraphQL(query, variables);
  return data?.page;
}
