import React, { useEffect, useState } from 'react'
import url from '../BackendURL';
import { useParams } from 'react-router';
import axios from 'axios';

function Detailpage() {
  const [list, setList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("ID ", id );
    getList();
  }, [id]);

  const getList = () => {
    axios.get(url + '/api/lists/' + id)
      .then(res => {
        console.log("HIER", res.data);
        setList(res.data[0]);
      });
  }

  return (
    <>
      <h1>{list.title}</h1>
      <section>

      </section>
    </>
  )
}

export default Detailpage
