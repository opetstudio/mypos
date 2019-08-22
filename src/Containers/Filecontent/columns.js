export const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: '_id',
        accessor: '_id',
        id: '_id',
        fieldtype: 'input-hidden' // input-text, input-hidden, textarea, checkbox, select
      },
      {
        Header: 'title',
        accessor: 'title',
        id: 'title',
        fieldtype: 'input-text'
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName
      }
    ]
  }
]
