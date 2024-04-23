import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Text, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  /* CRIAR AS PROPRIEDADES - ENTRADA */
  //const [nome_da_propridade, nome_do_método] = useState([])
  const [listaPaises,setListaPaises] = useState([])

  /* PROCESSAMENTO (geralmente consumo de serviço) */

  function carregaListaPaises(){
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag') //consume os dados da API
    .then((response) => response.json()) //se tem dado faço a 'recepção dos dados'.
    .then((json) => setListaPaises(json)) //uma vez os dados recebidos, agora vamos atribuir a propriedade listaPaises
    .catch((error) => console.error(error)) //se por algum motivo, a API ocasionar erro, você trata o erro aqui.
  }

  //prepara as informações(estado do conteúdo a ser exibido)
  useEffect(()=>{
    carregaListaPaises();
  })

  /* CRIAR AS PROPRIEDADES - SAÍDA(TELA) */

  return (
    <>
      <StatusBar style='light'/>
      <FlatList
        data={listaPaises} //aqui estamos recebendo adicionando a lista de valores para o componente FlatList
        contentContainerStyle={styles.container}
        keyExtractor={ item => item.name.common} //keyExtractor diz à lista para usar os ids para as chaves react em vez da propriedade de chave padrão
        renderItem={({item}) => ( //item para para ser exibido
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.flag }} />
            <Text
              onPress={()=> {
                Alert.alert(`A capital do país ${item.name.common} é ${item.capital}`);
              }}
              style={styles.text}
            > {item.name.common} </Text>
          </View>
        )}
        />
    </>
  );
} //fecha a classe APP

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    //padding: 2
  },
  itemContainer: {
    flexDirection: 'row', //Organiza a imagem e texto lado a lado
    alignItems: 'center', //Alinha verticalmente a imagem e texto
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 30,
    marginRight: 10, //Espaço entre a imagem e o texto
  },
  text: {
    fontSize: 12,
  }
});
