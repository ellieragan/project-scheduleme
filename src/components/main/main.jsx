import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ClipLoader } from 'react-spinners';
import Event from '../event/event';
import { getEvent, getScheduler } from '../../actions';
import Buttons from '../buttons/buttons';
import Available from '../available/availableGraph';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  const [loading, setLoading] = useState(true); // Track loading state
  const [maxAvail, setMaxAvail] = useState(0);
  const eventIds = useSelector((reduxState) => reduxState.scheduler.current.events);
  const Id = params.SchedulerId;

  /// get the scheduler
  useEffect(() => {
    dispatch(getScheduler(params.SchedulerId))
      .catch((error) => {
        // Handle error fetching event details
        console.log('error', error);
      });
  }, [dispatch, params.schedulerId]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const promises = eventIds.map((id) => dispatch(getEvent(id)));
        const events = await Promise.all(promises);
        setLoading(false); // Set loading state to false when all events are fetched
      } catch (error) {
        // Handle error fetching event details
      }
    };

    // if (eventIds.length > 0) {
    //   fetchEvents();
    // } else {
    //   setLoading(false); // If eventIds is empty, set loading state to false immediately
    // }

    fetchEvents();
  }, [dispatch, eventIds]);

  // style events based on number of people available
  const calcMaxAvailable = () => { // calculate the maximum number of people available
    const eventArray = Object.values(allEvents);
    const availArray = Object.values(eventArray);
    Object.entries(availArray).map(([id, details]) => {
      if (details.count > maxAvail) {
        // console.log(details.count);
        setMaxAvail(details.count);
      }
      return (0);
    });
  };

  useEffect(() => {
    calcMaxAvailable();
  }, [allEvents]);

  return (
    <div>
      <p className="title">Schedule @ Now</p>
      <div id="mainContainer">
        <div id="leftMain">
          <div className="calendarGrid" id="mainCalendar">
            {loading ? (
              <ClipLoader // modified from https://www.npmjs.com/package/react-spinners
                color="#123abc"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              Object.entries(allEvents).map(([id, event]) => (
                <Event
                  key={id}
                  id={event._id}
                  day={event.day}
                  time={event.time}
                  block={event.block}
                  count={event.count}
                  available={event.available}
                  color={color({ count: event.count, max: maxAvail })}
                />
              ))
            )}
          </div>
        </div>
        <div id="rightMain">
          <Available
            max={maxAvail}
          />
          <div>
            <Buttons id={Id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
