import React from 'react';
import {DB_CONFIG} from '../firebase/firebase';
import firebase from 'firebase/app';
import 'firebase/database';

import Cabecera from '../componentes/Cabecera';
import Nota from '../componentes/Nota';
import Forma from '../componentes/Forma';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.agregarNota = this.agregarNota.bind(this);
    this.removerNota = this.removerNota.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.basedatos = this.app.database().ref().child('notas');
    // this.state = {
    //   notas : [
    //     {id: 1, notaContenido: 'primera nota' },
    //     {id: 2, notaContenido: 'segunda nota' }
    //   ]
    // }
      this.state = {
        notas: []
      }
  }
  componentWillMount() {
    const notasPrevias = this.state.notas;
    // agrega un nuevo item al arreglo con Id y el contenido
    // y establece el arreglo al nuevo conjunto
    this.basedatos.on('child_added', snap => {
      notasPrevias.push({
        id: snap.key,
        notaContenido: snap.val().notaContenido
      })
      this.setState({
        notas: notasPrevias
      })
    })
    // elimina un item del arreglo con splice 
    this.basedatos.on('child_removed', snap => {
      for(var i = 0; i < notasPrevias.length; i++){
        if(notasPrevias[i].id === snap.key) {
          notasPrevias.splice(i, 1);
        }
      }
      this.setState({
        notas: notasPrevias
      })
    })
    
  }
  agregarNota = (nota) => {
    // introduce la nueva nota dentro del arreglo
    this.basedatos.push().set({ notaContenido: nota });
  }
  removerNota = (notaId) => {
    // remueve nota dentro del arreglo
    console.log('desde el nodo' + notaId);
    this.basedatos.child(notaId).remove();
  }
  render() {
    return (
      <div>
        
        <Cabecera/>
        
        <div className='wrapper'>
            
        {this.state.notas.length === 0 && <p
          className='widget__mensaje'
      > 
    
      Agrega una opción para empezar!</p> }      

                <div >
                {
                  this.state.notas.map(nota => {
                    return (
                      <Nota
                      key={nota.id}
                      notaContenido={nota.notaContenido}
                      removerNota={this.removerNota}
                      notaId={nota.id}
                      />
                    )
                  })
                }
                </div>
                <Forma
                agregarNota={this.agregarNota}
                />
              
        </div>
        
      </div>
    );
  }
}

export default App;
