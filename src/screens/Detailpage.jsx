import React, { useEffect, useState } from 'react'
import url from '../BackendURL';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import List from '../components/lists/List';
import Swal from 'sweetalert2';

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
        setList(res.data.list[0]);
      })
      .catch(error => {
        console.error('Error fetching the list:', error);
        navigate('/404');
      });
  }

  /**
   * deletes a list by its id
   */
  const deleteList = async () => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      iconColor: '#ff6a6a',
      title: 'Bist du sicher, dass die gesamte Liste inkl. aller Todos gelöscht werden soll',
      showConfirmButton: true,
      confirmButtonText: 'Ja',
      confirmButtonColor: '#bef983',
      showCancelButton: true,
      cancelButtonText: 'Nein',
      cancelButtonColor: '#ff6a6a',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(url + '/api/lists/' + list.id)
          .then((res) => {
            console.log(res.data);
            navigate('/');
          });
      }
    });
  }

  return (
    <article className='detailpage_wrapper'>
      <List list={list} delete={deleteList} update={getList} />
    </article>
  )
}

export default Detailpage
