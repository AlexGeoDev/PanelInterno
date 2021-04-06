const Excel = require('exceljs');
var results = [];

const readXls = async (data) => {

    const workbook = new Excel.Workbook();

    await workbook.xlsx.load(data);
    //Sheet1 name is required
    var worksheet = workbook.getWorksheet("Sheet1");
    worksheet.eachRow({includeEmpty: false}, function(row){
        results.push(row.values);
    });

    //Eliminating first item (getting null)
    results.forEach(result => {
        result.shift();
    });

    //from matrix to array of objects
    const [keys, ...values] = results;
    const ArrayObjects = values.map(array => array.reduce((a, v, i) => ({...a, [keys[i]]: v}), {}));

    //Creating consolidated data
    var reducer = ArrayObjects.reduce((acc,item)=>{
        if(acc[item.Merchant]){
            acc[item.Merchant]['Amount'] += item['Amount'];
            acc[item.Merchant]['com var'] += item['com var']
            acc[item.Merchant]['impuestocomision'] += item['impuestocomision']
            acc[item.Merchant]['Ref'] += ',' + item['Ref']
        }
        else{
            acc[item.Merchant] = item;
        }
        return acc;
    }, {})

    var ConsolidateData = Object.values(reducer);

    //adding "lote" to consolidated data
    var NewConsolidateData = ConsolidateData.map(object =>{
        object.lote  = ''
        object.comvar = object['com var']
        delete object['com var']
        return object;
    })

    return NewConsolidateData;
}

export default readXls;