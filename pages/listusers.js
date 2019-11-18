import DesktopLayout from "../components/WebDesktop/DesktopLayout";
import transactionBusiness from '../business/transactionBusiness';
import ReactTable from 'react-table';
import 'react-table/react-table.css'


class ListUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  async getdata() {
    const data = await transactionBusiness.listUsersSegment();
    console.log(data);
    this.setState({ list: data });
  }

  componentDidMount() {
    this.getdata();
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id' // String-based value accessors!
    },
    {
      Header: 'serialNumber',
      accessor: 'serialNumber' // String-based value accessors!
    }
      ,
    {
      Header: 'comercialName',
      accessor: 'comercialName' // String-based value accessors!
    }
      ,
    {
      Header: 'identification',
      accessor: 'iidentificationd' // String-based value accessors!
    }
      ,
    {
      Header: 'Celular',
      accessor: 'cellphone' // String-based value accessors!
    }
      ,
    {
      Header: 'email',
      accessor: 'email' // String-based value accessors!
    }
      ,
    {
      Header: 'address',
      accessor: 'address' // String-based value accessors!
    }
      ,
    /* {
      Header: 'userIdSegment',
      accessor: 'userIdSegment' // String-based value accessors!
    }
      ,
    {
      Header: 'deviceIdSegment',
      accessor: 'deviceIdSegment' // String-based value accessors!
    }
      ,
    {
      Header: 'anonymousIdSegment',
      accessor: 'anonymousIdSegment' // String-based value accessors!
    }
      , */
    {
      Header: 'merchantCode',
      accessor: 'merchantCode', // String-based value accessors!
      Cell: this.renderEditable
    }
      ,
    {
      Header: 'date',
      accessor: 'date' // String-based value accessors!
    }]
    return (<DesktopLayout titulo="Listado de Usuarios para Asignación">
      <div><span>Lista de usuarios sin asociar</span></div>
      <ReactTable
        data={this.state.list}
        columns={columns}
      />
    </DesktopLayout>
    )
  }
}


export default ListUsers;