import { NextResponse } from 'next/server';

// GitHub GraphQL endpoint
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// Helper to execute a GraphQL query against GitHub
async function githubGraphQL(query, variables = {}) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('Missing GITHUB_TOKEN in environment');
  }
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (json.errors) {
    const message = json.errors.map(e => e.message).join('; ');
    throw new Error(message || 'GitHub GraphQL error');
  }
  return json.data;
}

const REPOS_QUERY = `
  query FetchRepos($login: String!, $after: String) {
    user(login: $login) {
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
            name
            nameWithOwner
            description
            homepageUrl
            url
            stargazerCount
            forkCount
            isArchived
            isPrivate
            pushedAt
            repositoryTopics(first: 10) { nodes { topic { name } } }
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges { size node { name color } }
            }
            object(expression: "HEAD:README.md") { ... on Blob { text } }
        }
      }
    }
  }
`;

export async function GET() {
  const login = process.env.GITHUB_USERNAME || 'HedaetShahriar';

  try {
    let after = null;
    let hasNextPage = true;
    const allRepos = [];

    while (hasNextPage) {
      const data = await githubGraphQL(REPOS_QUERY, { login, after });
      const repoConn = data.user?.repositories;
      if (!repoConn) break;
      const { pageInfo, nodes } = repoConn;
      nodes.forEach(r => {
        const languages = (r.languages?.edges || []).map(e => ({ name: e.node.name, color: e.node.color, size: e.size }));
        const topLanguages = languages.slice(0, 3).map(l => l.name);
        const topics = (r.repositoryTopics?.nodes || []).map(n => n.topic.name);
        allRepos.push({
          repoId: r.id,
          name: r.name,
          slug: r.name.toLowerCase(),
          description: r.description || '',
          homepageUrl: r.homepageUrl || '',
          githubLink: r.url,
            stars: r.stargazerCount,
            forks: r.forkCount,
            archived: r.isArchived,
            private: r.isPrivate,
            updatedAt: r.pushedAt,
            topics,
            languages,
            topLanguages,
            techStack: topLanguages,
            readme: r.object?.text || ''
        });
      });
      hasNextPage = pageInfo.hasNextPage;
      after = pageInfo.endCursor;
    }

    // Optionally filter out repos you do not want to show (e.g. config or starter repos)
    const filtered = allRepos.filter(r => !r.slug.startsWith('config-'));

    return NextResponse.json(
      { login, count: filtered.length, repos: filtered },
      { headers: { 'Cache-Control': 's-maxage=21600, stale-while-revalidate=86400' } }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
