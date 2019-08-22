export const columns = [
  {
    Header: 'Name',
    columns: [
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
