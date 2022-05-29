import React, { useState, useEffect } from 'react';

function App() {
  const [selectedMonth, setMonth] = useState('');
  const [allEvents, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || []
  );
  const [inputVal, setInputVal] = useState('');
  const [selecetdDate, setSelectedDate] = useState('');
  const [showAllEvents, setShowAllEvent] = useState(false);

  useEffect(() => {
    setMonth(new Date().getMonth());
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(allEvents));
  }, [allEvents]);

  let currentYear = new Date().getFullYear();
  let monthName = new Date(currentYear, selectedMonth, 1).toLocaleString(
    'default',
    { month: 'long' }
  );

  let lastDate = new Date(currentYear, Number(selectedMonth) + 1, 0).getDate();

  let array = [...Array(lastDate).keys()];

  let showEvents = [];

  if (selecetdDate && !showAllEvents) {
    showEvents = [...allEvents].filter((event) => {
      if (
        event.date ===
        new Date(
          currentYear,
          selectedMonth,
          Number(selecetdDate)
        ).toLocaleDateString()
      ) {
        return event;
      }
      return null;
    });
  } else if (!selecetdDate && showAllEvents) {
    showEvents = allEvents.filter((e) => {
      if (
        new Date(e.id) >= new Date(currentYear, selectedMonth, 1) &&
        new Date(e.id) <= new Date(currentYear, selectedMonth, lastDate)
      ) {
        return e;
      }
      return null;
    });
  }

  return (
    <div className='container'>
      <h1>Calender Event App</h1>
      <select
        onChange={(event) => {
          setMonth(event.target.value);
          setSelectedDate('');
          setShowAllEvent(false);
        }}
        className='calender'
        value={selectedMonth}
      >
        <option value=''>Select Month</option>
        <option value='0'>January</option>
        <option value='1'>February</option>
        <option value='2'>March</option>
        <option value='3'>April</option>
        <option value='4'>May</option>
        <option value='5'>June</option>
        <option value='6'>July</option>
        <option value='7'>August</option>
        <option value='8'>September</option>
        <option value='9'>October</option>
        <option value='10'>November</option>
        <option value='11'>December</option>
      </select>
      <div className='flex event-holder'>
        <div className='list-holder'>
          <h2 className='list-heading'>All Events</h2>
          <button
            className='btn pointer'
            onClick={() => {
              setSelectedDate('');
              setShowAllEvent(true);
            }}
          >
            {' '}
            Show All Events in {monthName}
          </button>
          {selecetdDate ? (
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (inputVal) {
                    let newEvents = allEvents.concat({
                      name: inputVal,
                      date: new Date(
                        currentYear,
                        selectedMonth,
                        selecetdDate
                      ).toLocaleDateString(),
                      data: `${selectedMonth} ${Number(selecetdDate)}`,
                      id: new Date(
                        currentYear,
                        selectedMonth,
                        Number(selecetdDate)
                      ),
                    });
                    setEvents(newEvents);
                    setInputVal('');
                  }
                }}
              >
                <input
                  className='event-input'
                  onChange={(event) => setInputVal(event.target.value)}
                  type='text'
                  placeholder={`Add event on ${selecetdDate} of ${monthName}`}
                  value={inputVal}
                />
              </form>
            </div>
          ) : (
            ''
          )}
          <h3>
            {selecetdDate ? `Events on ${selecetdDate} of ${monthName}` : ''}
          </h3>
          <ul className='date-events'>
            {showEvents.length ? (
              showEvents.map((e, i) => {
                return (
                  <li className='single-event' key={i}>
                    <span>{e.name}</span>
                    <span>{e.date}</span>
                    <span
                      className='pointer'
                      onClick={() => {
                        let newEvents = allEvents.filter((elm) => {
                          if (
                            e.name !== elm.name &&
                            e.date !== new Date(elm.id).toLocaleDateString()
                          ) {
                            return elm;
                          }
                          return null;
                        });
                        setEvents(newEvents);
                      }}
                    >
                      ❌{' '}
                    </span>
                  </li>
                );
              })
            ) : (
              <li className='no-event'>
                {showAllEvents && !showEvents.length
                  ? `${monthName} don't have any event....`
                  : ''}
                {selecetdDate
                  ? `${selecetdDate} of ${monthName} don't have any event....`
                  : ''}
              </li>
            )}
          </ul>
        </div>
        <div className='calender-holder'>
          <h2 className='list-heading'>{monthName}</h2>
          <ul className='date-holder'>
            {array.map((e) => {
              return (
                <li
                  onClick={() => {
                    setSelectedDate(e + 1);
                    setShowAllEvent(false);
                  }}
                  key={e}
                  className={
                    allEvents.find(
                      (elm) => elm.data === `${selectedMonth} ${Number(e + 1)}`
                    )
                      ? 'dateNum active pointer'
                      : 'dateNum pointer'
                  }
                  data={`${selectedMonth} ${Number(e + 1)}`}
                  id={new Date(currentYear, selectedMonth, e + 1)}
                >
                  {e + 1}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
