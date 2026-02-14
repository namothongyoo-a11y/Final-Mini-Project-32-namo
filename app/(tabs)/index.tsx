import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CPU = {
    id: string,
    name: string,
    price: string,
    quantity: string
}

export default function Home() {

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

    async function removeCPU(id: string) {
        const newCPU = allCPU.filter(item => item.id !== id)
        await AsyncStorage.setItem("cpu", JSON.stringify(newCPU))
        setAllCPU(newCPU)
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>📦 รายการสินค้า CPU</Text>

            <FlatList
                data={allCPU}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => {

                    const total =
                        Number(item.price) * Number(item.quantity)

                    return (
                        <View style={styles.card}>

                            <Text style={styles.name}>{item.name}</Text>

                            <Text style={styles.detail}>
                                💰 ราคา: {item.price} บาท
                            </Text>

                            <Text style={styles.detail}>
                                📦 จำนวน: {item.quantity}
                            </Text>

                            <Text style={styles.total}>
                                รวมทั้งหมด: {total} บาท
                            </Text>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => removeCPU(item.id)}
                            >
                                <Text style={styles.deleteText}>ลบสินค้า</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eef2ff",
        padding: 20
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1e3a8a",
        marginBottom: 20
    },

    card: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 18,
        marginBottom: 18,
        elevation: 4
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#111827"
    },

    detail: {
        fontSize: 14,
        marginBottom: 4,
        color: "#374151"
    },

    total: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#16a34a",
        marginTop: 8,
        marginBottom: 12
    },

    deleteButton: {
        backgroundColor: "#ef4444",
        padding: 10,
        borderRadius: 12,
        alignItems: "center"
    },

    deleteText: {
        color: "white",
        fontWeight: "bold"
    }

})


