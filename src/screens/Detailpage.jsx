import React, { useEffect, useState } from 'react'
import url from '../BackendURL';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import List from '../components/lists/List';

function Detailpage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, [id]);

  /**
   * gets the list thats specified by the id in the url
   */
  const getList = () => {
    axios.get(url + '/api/lists/' + id)
      .then(res => {
        setList(res.data[0]);
      });
  }

  /**
   * deletes a list by its id
   */
  const deleteList = async () => {
    await axios.delete(url + '/api/lists/' + list.id)
      .then((res) => {
        console.log(res.data);
        navigate('/');
      });
  }

  return (
    <>
      <h1>{list.title}</h1>
      <section className='detailpage_wrapper'>
        <List list={list} delete={deleteList} update={getList} />
      </section>
    </>
  )
}

export default Detailpage
