import { INTUITION_GRAPHQL_URL } from './constants'

export async function executeIntuitionQuery<T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const res = await fetch(INTUITION_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables ?? {},
    }),
  })

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`)
  }

  const json = await res.json()

  if (json.errors?.length) {
    console.error('GraphQL errors', json.errors)
    const messages = json.errors
      .map((e: any) => e?.message || JSON.stringify(e))
      .join(' | ')
    throw new Error(messages || 'GraphQL response contained errors.')
  }

  return json.data as T
}
