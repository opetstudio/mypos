import moment from 'moment'
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
        Header: 'fasilitator',
        accessor: 'fasilitator',
        id: 'fasilitator'
      },
      {
        Header: 'badge',
        accessor: 'badge',
        id: 'badge',
        fieldtype: 'select',
        widthfield: 2
      },
      {
        Header: 'venue',
        accessor: 'venue',
        id: 'venue',
        fieldtype: 'input-text'
      },
      {
        Header: 'starting_date',
        // accessor: 'starting_date',
        id: 'starting_date',
        fieldtype: 'input-date',
        accessor: d =>
          d.starting_date
            ? moment(parseInt(d.starting_date || '0'))
              .format('ll')
              .toString()
            : ''
      },
      {
        Header: 'description',
        accessor: 'description',
        id: 'description',
        fieldtype: 'textarea',
        widthfield: 4
      },
      {
        Header: 'status',
        accessor: 'status',
        id: 'status',
        fieldtype: 'select',
        widthfield: 2
      },
      {
        Header: 'class_participants',
        accessor: 'class_participants',
        id: 'class_participants',
        fieldtype: 'multiselect-component',
        show: false
      }
    ]
  }
]
