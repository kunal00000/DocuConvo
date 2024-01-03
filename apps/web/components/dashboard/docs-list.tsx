import Link from 'next/link'

interface singleDocsItem {
  name: string
  websiteUrl: string
  match: string
  cssSelector: string
  maxPageToCrawl: number
  id: number
}

export function DocsLists({ userProjects }) {
  return (
    <div className='flex min-h-[400px] flex-col  rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <div className=' flex w-full flex-wrap gap-5  '>
        {userProjects.map((item: singleDocsItem) => (
          <Link href={'/dashboard/' + item.id} key={item.id}>
            <div className='  w-[250px]  cursor-pointer rounded-sm  border p-5 text-start duration-300 hover:scale-[102%] hover:border-black   hover:shadow-sm '>
              <h2 className='text-lg font-semibold '>{item.name}</h2>
              <p className='truncate'>{item.websiteUrl}</p>
              <p className='truncate'>{item.cssSelector}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
