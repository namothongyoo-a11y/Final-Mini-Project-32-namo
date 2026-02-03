import {View, TextInput,Button,StyleSheet,Text,} from "react-native";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Book ={
    id: string,
    name: string,
    price: string
}
// y = 3
// x = [1,2,3]
// x[2] == 3
export default function Add(){
    const [bookName, setBookName] = useState("")
    const [bookPrice, setBookPrice] = useState("")
    const [allBook, setAllBook] = useState<Book[]>([])

    useEffect(()=> {
        loadBook()
    },[allBook])

    async function loadBook(){
        const data = await AsyncStorage.getItem("book")
        if(data !== null){
            setAllBook(JSON.parse(data))
        }
    }
   async function addBook(){
    const book ={
        id : Date.now().toString(),
        name: bookName,
        price: bookPrice
    }
    console.log("หนังสือที่จะบันทึก =>"+ book)
    const newBooK = [...allBook, book]
    await AsyncStorage.setItem("book", JSON.stringify(newBooK))
    setAllBook(newBooK)

    setBookName("")
    setBookPrice("")
}


    return(
        <View>
          <Text>ชื่อหนังสือ</Text>
            <TextInput
             value={bookName}
             onChangeText={setBookName}
             style={myStyles.input} /> 
            <Text>ราคาหนังสือ</Text>
            <TextInput
             value={bookPrice}
             onChangeText={setBookPrice}
             style={myStyles.input} />
            <Button title="บันทึก" onPress={()=> addBook()}/>
        </View>
    )
}


const myStyles = StyleSheet.create({
    input: {
        width: "80%",
        borderWidth: 1,
        
    }
})