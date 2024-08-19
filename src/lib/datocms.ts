interface IPerformRequestParams {
  query: string
  variables?: any
  includeDrafts?: boolean
}

const API_DATOCMS_URL = 'https://graphql.datocms.com/'

export const performRequest = async ({
  query,
  variables = {},
  includeDrafts = false,
}: IPerformRequestParams) => {
  console.log(
    '`Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`',
    `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
  )
  const response = await fetch(API_DATOCMS_URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
    },
    next: { revalidate: 0 },
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody
      )}`
    )
  }

  return responseBody
}
