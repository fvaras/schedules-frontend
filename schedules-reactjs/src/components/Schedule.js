import React from 'react'
import format from 'date-fns/format'

const Schedule = ({ schedule, setSchedule, isFull }) => {
    const { isAvailable, formattedTime } = schedule

    let btnClass = "btn btn-lg "
    if (!isAvailable)
        btnClass = btnClass.concat('btn-success')
    else {
        if (isFull)
            btnClass = btnClass.concat('btn-danger')
        else
            btnClass = btnClass.concat('btn-primary')
    }
    return (
        <div className="col-md-3 mb-2">
            <button type="button" className={btnClass} onClick={() => setSchedule(schedule)}>
                {/* {format(new Date(start), 'HH:mm')} - {format(new Date(end), 'HH:mm')} */}
                {formattedTime}
            </button>
        </div>
    )
}

export default Schedule