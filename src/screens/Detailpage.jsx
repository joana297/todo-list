import React, { useEffect, useState } from 'react'
import url from '../BackendURL';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import List from '../components/lists/List';
import Swal from 'sweetalert2';

function Detailpage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [allLists, setAllLists] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllLists();
  }, []);

  useEffect(() => {
    getList();
  }, [id]);

  /**
   * get all lists
   */
  const getAllLists = () => {
    axios.get(url + '/api/lists')
      .then(res => {
        setAllLists(res.data.lists);
        //localStorage.setItem('cachedLists', JSON.stringify(res.data.lists));
      }).catch(error => {
        console.log(error);
        setAllLists(JSON.parse(localStorage.getItem('cachedLists')));
      })
  }

  /**
   * get all list by id
   */
  const getList = () => {
    axios.get(url + '/api/lists/' + id)
      .then(res => {
        setList(res.data.list[0]);
      }).catch(error => {
        console.log(error);
        setList(allLists.filter(l => l.id == id)[0]);
      })
  }

  /**
   * deletes a list by its id
   */
  const deleteList = async (list) => {
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
            navigate('/');
          })
          .catch(error => {
            console.log("An error occured: ", error);
            var remList = allLists.filter(l => l.id != list.id);
            localStorage.setItem('cachedLists', JSON.stringify(remList));
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
