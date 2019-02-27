export const columns = [
  {
    Header: 'Role',
    columns: [
      {
        Header: 'role_name',
        accessor: 'role_name',
        id: 'role_name',
        fieldtype: 'input-text'
      },
      {
        Header: 'role_rank',
        accessor: 'role_rank',
        id: 'role_rank',
        fieldtype: 'input-text',
        show: false
      }
    ]
  }
]
