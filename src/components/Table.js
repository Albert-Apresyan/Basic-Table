import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

export default function Table() {
    const DATA_QUERY = `
    query{
      allPlanets{
        planets {
          population
          name
          diameter
          gravity
        }
      }
    }
`
useEffect(()=>{
    fetch('https://swapi-graphql.netlify.app/.netlify/functions/index/',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({query:DATA_QUERY})
    })
    .then(response=>response.json())
    .then( data => {setUserList(data.data.allPlanets.planets)
    })
  }, [])

    const [userList, setUserList] = useState([]);

    const columns = [
        {dataField:'population', text:'Population of Planet', sort:true, filter:textFilter()},
        {dataField:'name', text:'Name of Planet',sort:true, filter:textFilter()},
        {dataField:'diameter', text:'Diameter of Planet',sort:true,filter:textFilter()},
        {dataField:'gravity', text:'Gravity of Planet',sort:true,filter:textFilter()},
    ]

    const pagination = paginationFactory({
        page:1,
        sizePerPage:10,
        lastPageText:'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
    })

    return (
        <div>
        <h2 className='header'>Planet Details of Star Wars</h2>
        <BootstrapTable
         bootstrap4 
         keyField='Population' 
         keyField='Name'
         keyField='Diameter'
         keyField='Gravity'
         columns={columns} 
         data={userList}
         pagination={pagination}
         filter={filterFactory()}
         />
         </div>
    )
}
