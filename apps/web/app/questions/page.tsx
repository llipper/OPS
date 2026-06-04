import { QuestionResolverClient } from "./question-resolver-client"
import { getResolverPageData, type ResolverSearchParams } from "@/lib/questions/resolver-query"
import { getSecurityContext } from "@/lib/auth/get-security-context"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ResolverSearchParams>
}) {
  const context = await getSecurityContext()
  const params = await searchParams
  
  const data = await getResolverPageData(params, context.userId)

  return (
    <QuestionResolverClient
      initialQuestions={data.questions}
      initialCurrentPage={data.currentPage}
      initialTotalPages={data.totalPages}
      initialTotalCount={data.totalCount}
      initialStats={data.stats}
      notebookId={params.notebookId}
      notebookName={data.notebook?.titulo}
      filterOptions={data.filterOptions}
    />
  )
}
