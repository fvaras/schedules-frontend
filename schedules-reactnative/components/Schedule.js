import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, FlatList, SafeAreaView } from 'react-native';
import format from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
// import { eoLocale } from 'date-fns/locale/eo'

const Schedule = ({ schedule, isFull }) => {
    const { start, end, isAvailable } = schedule
    const [range, setRange] = useState('')
    const [bgColor, setBgColor] = useState(styles.item.backgroundColor)

    console.log('start', start.slice(-13, -5))
    console.log('isFull', isFull)

    useEffect(() => {
        // start
        const startTime = new Date(start)
        const startTimeOffset = startTime.getTimezoneOffset()
        const startSchedule = addMinutes(startTime, startTimeOffset)

        // end
        const endTime = new Date(end)
        const endTimeOffset = endTime.getTimezoneOffset()
        const endSchedule = addMinutes(endTime, endTimeOffset)

        setRange(`${format(startSchedule, 'HH:mm')} - ${format(endSchedule, 'HH:mm')}`)

        // let btnClass = "btn btn-lg "
        if (!isAvailable)
            setBgColor('#28A745')
        else {
            if (isFull)
                setBgColor('#DC3545')
            else
                setBgColor('#0069D9')
        }
    }, [schedule])


    return (
        <View style={[styles.item, { backgroundColor: bgColor, }]}>
            {/* style={styles.item} */}
            <Text style={styles.title}>
                {/* {format(new Date(start), 'HH:mm')} - {format(new Date(end), 'HH:mm')} */}
                {range}
                {/* {JSON.stringify(schedule)} */}
            </Text>
        </View>)
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