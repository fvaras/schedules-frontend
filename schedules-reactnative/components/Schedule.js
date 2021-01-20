import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, Alert, FlatList, SafeAreaView } from 'react-native';
import format from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
// import { eoLocale } from 'date-fns/locale/eo'

const COLOR_DISPONIBLE = '#0069D9'
const COLOR_NO_DISPONIBLE = '#28A745'
const COLOR_BUSY = '#DC3545'

const Schedule = ({ schedule, isFull, setSchedule }) => {
    const { isAvailable, formattedTime } = schedule

    let bgColor = styles.item.backgroundColor
    if (!isAvailable)
        bgColor = COLOR_NO_DISPONIBLE
    else {
        // Funciona solo en el dispositivo, en modo web los valores están intercambiados
        if (isFull)
            bgColor = COLOR_BUSY
        else
            bgColor = COLOR_DISPONIBLE
    }

    return (
        <TouchableOpacity
            style={[styles.item, { backgroundColor: bgColor, }]}
            onPress={() => setSchedule(schedule)}
        >
            <Text style={styles.title}>
                {formattedTime}
            </Text>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});



export default Schedule