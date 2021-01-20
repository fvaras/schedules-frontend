import React, { useEffect, useState, useMemo } from 'react'
import Schedule from './components/Schedule'
import io from 'socket.io-client';

const App = () => {

  // const apiUrl = 'http://localhost:3001'
  const apiUrl = 'https://fvaras-schedules-back-nodejs.herokuapp.com/'
  const socket = useMemo(() => io.connect(apiUrl), [apiUrl]);
  const [schedules, setSchedules] = useState([])
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    if (socket === undefined) return
    socket.on('update', data => {
      // console.log('update schedules', data)
      const { schedules, isFull } = data
      setSchedules(schedules)
      setIsFull(isFull)
    })
  }, [socket])

  const setSchedule = schedule => {
    const { isAvailable, user } = schedule
    const { id: socketId } = socket

    if (!isAvailable && user != socketId) {
      alert('only the owner of this schedule can release the resource')
      return
    }

    if (isFull && user !== socketId) {
      alert('We reach the full capacity, please wait until a resource is available')
      return
    }

    schedule.isAvailable = !schedule.isAvailable
    socket.emit('setSchedule', schedule)
  }

  return (
    <div className="container">
      <div className="row mt-5">
        {schedules.map(schedule => (
          <Schedule
            key={schedule.id}
            schedule={schedule}
            setSchedule={setSchedule}
            isFull={isFull}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
