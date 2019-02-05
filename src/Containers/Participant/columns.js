export const columns = [
  {
    Header: 'Participants',
    columns: [
      //  {
      //   Header: '_id',
      //   accessor: '_id',
      //   id: '_id',
      //   fieldtype: 'input-hidden' // input-text, input-hidden, textarea, checkbox, select
      // },
      {
        Header: 'number',
        accessor: 'participant_number',
        id: 'participant_number'
        // fieldtype: 'input-text'
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
        id: 'first_name',
        fieldtype: 'input-text',
        widthfield: 3
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
        id: 'last_name',
        fieldtype: 'input-text',
        widthfield: 3
      },
      {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
        fieldtype: 'input-text',
        widthfield: 4
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
        id: 'phone_number',
        fieldtype: 'input-text',
        widthfield: 2
      },
      {
        Header: 'Church',
        accessor: 'church',
        id: 'church',
        fieldtype: 'input-text',
        widthfield: 4
      },
      {
        Header: 'Conference',
        accessor: 'conference',
        id: 'conference',
        fieldtype: 'select',
        widthfield: 5
      },
      {
        Header: 'Address',
        accessor: 'address',
        id: 'address',
        fieldtype: 'textarea',
        widthfield: 6
      }
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   id: 'status',
      //   fieldtype: 'select',
      //   widthfield: 2
      // }
      // {
      //   Header: 'Profile_picture',
      //   id: 'profile_picture',
      //   accessor: d => d.profile_picture
      // }
    ]
  }
]
