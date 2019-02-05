export const columns = [
  {
    Header: 'Conference',
    columns: [
      // {
      //   Header: '_id',
      //   accessor: '_id',
      //   id: '_id',
      //   fieldtype: 'input-hidden' // input-text, input-hidden, textarea, checkbox, select
      // },
      {
        Header: 'Conference Code',
        accessor: 'conference_code',
        id: 'conference_code',
        fieldtype: 'input-text'
      },
      {
        Header: 'Conference Name',
        id: 'conference_name',
        fieldtype: 'input-text',
        accessor: d => d.conference_name
      }
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   id: 'status',
      //   fieldtype: 'select'
      // }
    ]
  }
]
