import DesktopLayout from "../components/WebDesktop/DesktopLayout";
import transactionBusiness from '../business/transactionBusiness';
import ReactTable from 'react-table';
import 'react-table/react-table.css'


class ListUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.renderEditable = this.renderEditable.bind(this);
  }

  async getdata() {
    const data = await transactionBusiness.listUsersSegment();
    console.log(data);
    this.setState({ list: data });
  }

  componentDidMount() {
    this.getdata();
  }

  renderEditable(cellInfo) {
    console.log("contenido editable:", cellInfo.value);
    //const update = transactionBusiness.updateSegment(this.state.user.id, this.state.merchantCode)
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const list = [...this.state.list];
          list[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ list })
          console.log("valor celda:", e.target.innerHTML);
          console.log("id celda: ", cellInfo.original.id);
          if (e.target.innerHTML != "") {
            console.log("actualizar merchantcode");
            const update = transactionBusiness.updateSegment(cellInfo.original.id, e.target.innerHTML)
          }
        }}
      />
    );
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