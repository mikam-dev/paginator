"use client"
import { useState, useEffect } from 'react'
// npm assets
import { format } from 'date-fns'
// helper functions
import { getDocs } from '@/lib/helpers'
// ui components
import { Header } from '@/components/display/Header';
import { ModelSelect } from '@/components/settings/ModelSelect'
import { Filters } from '@/components/settings/Filters'
import { Pagination } from '@/components/settings/Pagination'
import { Separator } from '@/components/ui/separator'
import { SingleDoc } from '@/components/cards/SingleDoc'
import { useToast } from '@/components/ui/use-toast'

export default function Page() {
  // pagination states
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  // filter states
  const [pageSize, setPageSize] = useState(10);
  const [fromDate, setFromDate] = useState<Date | undefined>() // default to undefined to show all existing docs
  const [toDate, setToDate] = useState<Date | undefined>(new Date()) // default to today
  const [model, setModel] = useState('case')
  // documents array state
  const [docs, setDocs] = useState([{}]);
  // toaster hook
  const { toast } = useToast()

  useEffect(() => {
    retrieveDocs()
  }, [model, currentPage, pageSize, fromDate, toDate, totalDocuments])

  function retrieveDocs() {
    const newerThan = fromDate ? format(fromDate, "yyyy-MM-dd") : undefined
    const olderThan = toDate ? format(toDate, "yyyy-MM-dd") : undefined
    try {
      getDocs(model, currentPage, pageSize, olderThan, newerThan).then((res) => {
        setDocs(res.data)
        setTotalPages(res.totalPages)
        setTotalDocuments(res.totalDocuments)

        console.log(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

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

  function handleFromDateChange(newDate: Date | undefined) {
    setFromDate(newDate);
    setCurrentPage(1);
  }

  function handleToDateChange(newDate: Date | undefined) {
    setToDate(newDate);
    setCurrentPage(1);
  }

  function handleFormSubmit() {
    setCurrentPage(totalPages);

    toast({
      description: `New document created successfully!`,
    })
  }

  function handleDelete() {
    setTotalDocuments(totalDocuments - 1)
    retrieveDocs()
  }

  function rangeOfPage() {
    const start = (currentPage * pageSize - pageSize + 1);
    const end = (currentPage * pageSize) > totalDocuments ? totalDocuments : (currentPage * pageSize);
    return `${start} - ${end}`;
  }

  return (
    <main className="flex flex-col flex-1">
      <Header formSubmit={handleFormSubmit} />

      <section className="flex flex-col w-full min-h-[100vh] items-center bg-muted">
        <div className='w-full max-w-6xl px-12 py-4 flex flex-row justify-between items-center'>
          <div className='flex flex-1 justify-start'>
            <ModelSelect onModelChange={handleModelChange} model={model} />
          </div>
          <div className='flex flex-1 justify-center'>
            {docs ?
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageChange={handlePageChange}
              /> : <></>}
          </div>
          <div className='flex flex-1 justify-end'>
            <Filters
              onPageSizeChange={handlePageSizeChange}
              pageSize={pageSize}
              fromDate={fromDate}
              toDate={toDate}
              onSetFromDate={handleFromDateChange}
              onSetToDate={handleToDateChange}
            />
          </div>
        </div>
        <Separator className="w-full max-w-6xl" />
        <div className="w-full max-w-6xl px-12 py-4 flex flex-row justify-between items-center">
          {docs ?
            <p className="text-sm font-medium text-muted-foreground">
              {rangeOfPage()} of {String(totalDocuments)} results
            </p> : <></>}
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 px-8 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs ? docs.map((doc: {}) =>
            <SingleDoc
              onDelete={() => handleDelete()}
              data={doc}
              model={model} />
          ) : <></>}
        </div>
      </section>
    </main>
  )
}
