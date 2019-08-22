export const columns = [
  {
    Header: 'Name',
    columns: [
      //  {
      //   Header: '_id',
      //   accessor: '_id',
      //   id: '_id',
      //   fieldtype: 'input-hidden' // input-text, input-hidden, textarea, checkbox, select
      // },
      {
        Header: 'title',
        accessor: 'file_title',
        id: 'file_title',
        fieldtype: 'input-text'
      },
      {
        Header: 'desc',
        accessor: 'file_description',
        id: 'file_description',
        fieldtype: 'textarea',
        widthfield: 4
      },
      {
        Header: 'name_origin',
        accessor: 'file_name_origin',
        id: 'file_name_origin'
      },
      {
        Header: 'name',
        accessor: 'file_name',
        id: 'file_name'
      },
      {
        Header: 'ext',
        accessor: 'file_ext',
        id: 'file_ext'
      },
      {
        Header: 'size',
        accessor: 'file_size',
        id: 'file_size'
      },
      {
        Header: 'filecontent',
        accessor: 'filecontent',
        id: 'filecontent',
        fieldtype: 'file',
        show: false
      },
      {
        Header: 'command',
        accessor: 'command',
        id: 'command',
        fieldtype: 'select',
        widthfield: 5
      }
    ]
  }
]
