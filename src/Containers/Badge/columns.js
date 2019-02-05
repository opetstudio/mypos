export const columns = [
  {
    Header: 'Badges',
    columns: [
      // {
      //   Header: '_id',
      //   accessor: '_id',
      //   id: '_id',
      //   // fieldtype: 'input-hidden' // input-text, input-hidden, textarea, checkbox, select
      // },
      {
        Header: 'Badge Number',
        accessor: 'badge_number',
        id: 'badge_number',
        fieldtype: 'input-text'
      },
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   id: 'status',
      //   fieldtype: 'select'
      // },
      {
        Header: 'Badge Name',
        id: 'badge_name',
        accessor: d => d.badge_name,
        fieldtype: 'input-text'
      }
    ]
  }
]
