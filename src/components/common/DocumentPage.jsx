export default function DocumentPage({ document }) {
  if (!document) {
    return <div>Document not found</div>
  }

  return (
    <div className="flex flex-col gap-4 mb-10 mt-10">
      <h1>{document.h1}</h1>
      <h2><i>{document.lastUpdated}</i></h2>
      <p>{document.p}</p>
      <div className="flex flex-col gap-4">
        {document.content.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <h3><b>{item.title}</b></h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
