import React from 'react';
import { useNavigate } from 'react-router';

function Errorpage() {
  const navigate = useNavigate();

  return (
    <section className='errorpage_wrapper'>
      <h1>Ups...</h1>
      <p>es ist ein Fehler aufgetreten. Die gesuchte Liste konnte nicht gefunden werden.</p>
      <button className='btn-default' onClick={() => navigate('/')}>zurück zur Startseite</button>
    </section>
  )
}

export default Errorpage
