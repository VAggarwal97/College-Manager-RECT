import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import DisplayEvents from '../DisplayEvents';

const UploadEvent = () => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleAddEvent = async () => {
        try {
            // Create a new event object
            const event = {
                title: eventTitle,
                date: eventDate, // You can format this date as needed
                description: eventDescription,
            };

            // Add the event to Firestore
            const eventsRef = collection(firestore, 'events');
            await addDoc(eventsRef, event);

            // Clear the form fields after adding the event
            setEventTitle('');
            setEventDate('');
            setEventDescription('');

            alert('Event added successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Add Event</h2>
            <form className='editstudform'>
                <div className='editstudform'>
                    <label>Event Title:</label>
                    <input className='editstudform'
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                </div>
                <div className='editstudform'>
                    <label className='editstudlable'>Event Date:</label>
                    <input className='editstudform'
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>
                <div className='editstudform'>
                    <label className='editstudlable'>Event Description:</label>
                    <textarea className='editstudform'
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    ></textarea>
                </div>
                <button className='editstudbtn' type="button" onClick={handleAddEvent}>
                    Add Event
                </button>
            </form>

            <div className="DisplayEvents">
                <DisplayEvents />
            </div>
        </div>
    );
};

export default UploadEvent;
