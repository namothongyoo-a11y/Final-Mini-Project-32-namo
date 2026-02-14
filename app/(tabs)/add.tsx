import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CPU = {
  id: string,
  name: string,
  price: string,
  quantity: string
}

export default function Add() {

  const [cpuName, setCpuName] = useState("")
  const [cpuPrice, setCpuPrice] = useState("")
  const [cpuQuantity, setCpuQuantity] = useState("")
  const [allCPU, setAllCPU] = useState<CPU[]>([])

  useEffect(() => {
    loadCPU()
  }, [])

  async function loadCPU() {
    const data = await AsyncStorage.getItem("cpu")
    if (data !== null) {
      setAllCPU(JSON.parse(data))
    }
  }

  async function addCPU() {

    if (!cpuName || !cpuPrice || !cpuQuantity) {
      alert("กรอกข้อมูลให้ครบก่อน")
      return
    }

    const cpu: CPU = {
      id: Date.now().toString(),
      name: cpuName,
      price: cpuPrice,
      quantity: cpuQuantity
    }

    const newCPU = [...allCPU, cpu]

    await AsyncStorage.setItem("cpu", JSON.stringify(newCPU))
    setAllCPU(newCPU)

    setCpuName("")
    setCpuPrice("")
    setCpuQuantity("")
  }

  const total =
    Number(cpuPrice || 0) * Number(cpuQuantity || 0)

  return (
    <View style={styles.container}>

      <Text style={styles.title}>💻 ร้านขาย CPU</Text>

      <Text style={styles.label}>ชื่อ CPU</Text>
      <TextInput
        value={cpuName}
        onChangeText={setCpuName}
        style={styles.input}
        placeholder="เช่น Intel i9"
      />

      <Text style={styles.label}>ราคา (บาท)</Text>
      <TextInput
        value={cpuPrice}
        onChangeText={setCpuPrice}
        style={styles.input}
        keyboardType="numeric"
        placeholder="เช่น 15000"
      />

      <Text style={styles.label}>จำนวน</Text>
      <TextInput
        value={cpuQuantity}
        onChangeText={setCpuQuantity}
        style={styles.input}
        keyboardType="numeric"
        placeholder="เช่น 2"
      />

      <Text style={styles.total}>
        💰 ราคารวม: {total} บาท
      </Text>

      <TouchableOpacity style={styles.button} onPress={addCPU}>
        <Text style={styles.buttonText}>บันทึกสินค้า</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
    padding: 25
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 25
  },

  label: {
    fontWeight: "600",
    marginBottom: 5,
    color: "#374151"
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
    elevation: 3
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 20
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 15,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }

})
