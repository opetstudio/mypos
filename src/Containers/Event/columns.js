export const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'event_title',
        accessor: 'event_title',
        id: 'event_title',
        fieldtype: 'input-text'
      },
      {
        Header: 'event_date',
        // accessor: 'event_date',
        accessor: d => '' + new Date(parseInt(d.event_date || '0')),
        id: 'event_date',
        fieldtype: 'input-date'
        
      },
      {
        Header: 'event_desc',
        accessor: 'event_desc',
        id: 'event_desc',
        fieldtype: 'textarea'
      },
      {
        Header: 'event_address',
        accessor: 'event_address',
        id: 'event_address',
        fieldtype: 'textarea'
      },
      {
        Header: 'event_vanue',
        accessor: 'event_vanue',
        id: 'event_vanue',
        fieldtype: 'input-text'
      },
      {
        Header: 'event_img',
        accessor: 'event_img',
        id: 'event_img',
        fieldtype: 'input-text'
      }
    ]
  }
]
