import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, SafeAreaView } from 'react-native';
import io from 'socket.io-client';
import Schedule from "./components/Schedule";

const connectSocket = () => {
  const socket = io.connect('https://fvaras-schedules-back-nodejs.herokuapp.com/')
  // const socket = io.connect('http://localhost:3001')
  return socket
}

const App = () => {
  const [socket] = useState(connectSocket())
  const [schedules, setSchedules] = useState([])
  const [isFull, setIsFull] = useState(false)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    socket.on('update', data => {
      console.log('update schedules', data)
      const { schedules, isFull } = data
      setSchedules(schedules)
      setIsFull(isFull)
      console.log('schedules', schedules)
    })
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })
  }, [socket])

  const setSchedule = schedule => {
    const { isAvailable, user } = schedule
    const { id: socketId } = socket

    if (!isAvailable && user != socketId) {
      Alert.alert(null, 'only the owner of this schedule can release the resource')
      return
    }

    if (isFull && user !== socketId) {
      Alert.alert(null, 'We reach the full capacity, please wait until a resource is available')
      return
    }

    schedule.isAvailable = !schedule.isAvailable
    socket.emit('setSchedule', schedule)
  }

  const renderItem = ({ item }) => {
    console.log('main isFull', isFull)
    return (
      <Schedule schedule={item} isFull={isFull}></Schedule>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={schedules}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      <FlatList
        data={schedules}
        renderItem={({ item }) => <Schedule schedule={item} isFull={isFull}></Schedule>}
        keyExtractor={schedule => String(schedule.id)}
      />
      {/* <FlatList
        data={schedules}
        renderItem={renderItem}
        keyExtractor={schedule => String(schedule.id)}
      /> */}
    </SafeAreaView>
  );
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

export default App