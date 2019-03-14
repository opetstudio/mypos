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
        Header: 'username',
        accessor: 'username',
        id: 'username',
        fieldtype: 'input-text',
        widthfield: 2,
      },
      {
        Header: 'email',
        accessor: 'email',
        id: 'email',
        fieldtype: 'input-text'
      },
      {
        Header: 'password',
        accessor: 'password',
        id: 'password',
        fieldtype: 'input-text',
        show: false
      },
      // {
      //   Header: 'client_id',
      //   accessor: 'client_id',
      //   id: 'client_id',
      //   fieldtype: 'input-text'
      // },
      {
        Header: 'scope',
        accessor: 'scope',
        id: 'scope',
        fieldtype: 'select',
        widthfield: 3
      },
      // {
      //   Header: 'status',
      //   accessor: 'status',
      //   id: 'status',
      //   fieldtype: 'select'
      // },
      {
        Header: 'createdby',
        accessor: 'createdby',
        id: 'createdby'
      },
      {
        Header: 'modifiedby',
        accessor: 'modifiedby',
        id: 'modifiedby'
      },
      {
        Header: 'first_name',
        id: 'first_name',
        fieldtype: 'input-text',
        accessor: d => d.first_name
      },
      {
        Header: 'last_name',
        id: 'last_name',
        fieldtype: 'input-text',
        accessor: d => d.last_name
      },
      {
        Header: 'phone_number',
        id: 'phone_number',
        fieldtype: 'input-text',
        accessor: d => d.phone_number
      },
      {
        Header: 'user_roles',
        accessor: 'user_roles',
        id: 'user_roles',
        fieldtype: 'multiselect-component',
        show: false
      }
    ]
  }
]
