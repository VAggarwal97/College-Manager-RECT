import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';


const DisplayEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch events from Firestore
                const eventsRef = collection(firestore, 'events');
                const querySnapshot = await getDocs(eventsRef);

                const eventsData = [];
                querySnapshot.forEach((doc) => {
                    eventsData.push({ id: doc.id, ...doc.data() });
                });

                // Sort events by date (you may need to format the date as needed)
                eventsData.sort((a, b) => a.date.localeCompare(b.date));

                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleDeleteEvent = async (eventId) => {
        try {
            // Delete the event document from Firestore
            const eventRef = doc(firestore, 'events', eventId);
            await deleteDoc(eventRef);

            // Remove the deleted event from the local state
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };


    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Events</h2>
            <ul className='editstudform'>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>Date: {event.date}</p>
                        <p>Description: {event.description}</p>
                        <button className='editstudbtn' onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default DisplayEvents;
