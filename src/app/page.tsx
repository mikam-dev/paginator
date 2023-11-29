"use client"
import { useState, useEffect, Suspense } from 'react'
// server actions
import { getDocs } from "@/lib/helpers"
import revalidate from './actions'
// ui components
import { ModelSelect } from '@/components/settings/ModelSelect'
import { Filters } from '@/components/settings/Filters'
import { Pagination } from '@/components/settings/Pagination'
import { Separator } from '@/components/ui/separator'
import { SingleDoc } from "@/components/cards/SingleDoc"

export default function Page() {
  const [model, setModel] = useState('case')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    try {
      getDocs(model, currentPage, pageSize).then((res) => {
        setDocs(res.data)
        setTotalPages(res.totalPages)
        setTotalDocuments(res.totalDocuments)

        revalidate()
        console.log(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [model, currentPage, pageSize, totalDocuments])

  function handleModelChange(newModel: string) {
    setModel(newModel);
    setCurrentPage(1);
  };

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
  }

  function handlePageSizeChange(newSize: number) {
    setPageSize(newSize);
    setCurrentPage(1);
  }

  function handleDelete() {
    setTotalDocuments(totalDocuments - 1)
  }

  function rangeOfPage() {
    const start = (currentPage * pageSize - pageSize + 1);
    const end = (currentPage * pageSize) > totalDocuments ? totalDocuments : (currentPage * pageSize);
    return `${start} - ${end}`;
  }

  return (
    <section className="flex flex-col w-full min-h-[100vh] items-center bg-muted">
      <div className='w-full max-w-6xl px-12 py-4 flex flex-row justify-between items-center'>
        <div className='flex flex-1 justify-start'>
          <ModelSelect onModelChange={handleModelChange} model={model} />
        </div>
        <div className='flex flex-1 justify-center'>
          {!docs ? <></> :
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageChange={handlePageChange}
            />}
        </div>
        <div className='flex flex-1 justify-end'>
          <Filters
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
          />
        </div>
      </div>
      <Separator className="w-full max-w-6xl" />
      <div className="w-full max-w-6xl px-12 py-4 flex flex-row justify-between items-center">
        {!docs ? <></> :
          <p className="text-sm font-medium text-muted-foreground">
            {rangeOfPage()} of {String(totalDocuments)} results
          </p>}
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 px-8 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(docs) && docs.map((doc: {}) =>
          <SingleDoc
            onDelete={() => handleDelete()}
            data={doc}
            model={model} />
        )}
      </div>
    </section>
  )
}
