// // import React, { useEffect, useState } from 'react';
// // import { firestore } from '../../firebase'; // Import Firebase Firestore
// // import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// // const TakeAttendance = () => {
// //     const [date, setDate] = useState('');
// //     const [attendanceData, setAttendanceData] = useState([]);
// //     const [successMessage, setSuccessMessage] = useState('');
// //     const [errorMessage, setErrorMessage] = useState('');

// //     const handleDateChange = (event) => {
// //         setDate(event.target.value);
// //     };

// //     const handleStudentAttendanceChange = (studentEmail, present) => {
// //         // Update the attendance data based on student and attendance status
// //         const updatedAttendanceData = [...attendanceData];
// //         const studentIndex = updatedAttendanceData.findIndex((student) => student.email === studentEmail);

// //         if (studentIndex !== -1) {
// //             updatedAttendanceData[studentIndex].status = present ? 'Present' : 'Absent';
// //             setAttendanceData(updatedAttendanceData);
// //         }
// //     };

// //     const handleSaveAttendance = async () => {
// //         // Save the attendance data to Firebase Firestore
// //         const attendanceCollectionRef = collection(firestore, 'attendance');
// //         const attendanceDocData = {
// //             date,
// //             attendance: attendanceData,
// //         };

// //         try {
// //             await addDoc(attendanceCollectionRef, attendanceDocData);
// //             setSuccessMessage('Attendance saved successfully.');
// //         } catch (error) {
// //             setErrorMessage('Error saving attendance. Please try again later.');
// //             console.error('Error saving attendance:', error);
// //         }
// //     };

// //     // Fetch the list of students from Firestore and initialize the attendance data
// //     useEffect(() => {
// //         const fetchStudents = async () => {
// //             const studentsCollectionRef = collection(firestore, 'users');
// //             const q = query(studentsCollectionRef, where('role', '==', 'Student'));
// //             const querySnapshot = await getDocs(q);

// //             const studentsData = [];
// //             querySnapshot.forEach((doc) => {
// //                 const studentData = doc.data();
// //                 studentsData.push({
// //                     email: doc.id, // Use the email as the identifier
// //                     name: studentData.name,
// //                     status: 'Absent', // Default status is absent
// //                 });
// //             });

// //             setAttendanceData(studentsData);
// //         };

// //         fetchStudents();
// //     }, []);

// //     return (
// //         <div>
// //             <h2>Take Attendance</h2>
// //             <label>
// //                 Date:
// //                 <input type="date" value={date} onChange={handleDateChange} />
// //             </label>
// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>Student Email</th>
// //                         <th>Student Name</th>
// //                         <th>Present</th>
// //                         <th>Absent</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {attendanceData.map((student) => (
// //                         <tr key={student.email}>
// //                             <td>{student.email}</td>
// //                             <td>{student.name}</td>
// //                             <td>
// //                                 <input
// //                                     type="radio"
// //                                     name={`attendance-${student.email}`}
// //                                     value="present"
// //                                     onChange={() => handleStudentAttendanceChange(student.email, true)}
// //                                 />
// //                             </td>
// //                             <td>
// //                                 <input
// //                                     type="radio"
// //                                     name={`attendance-${student.email}`}
// //                                     value="absent"
// //                                     onChange={() => handleStudentAttendanceChange(student.email, false)}
// //                                 />
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //             <button onClick={handleSaveAttendance}>Save Attendance</button>
// //             {successMessage && <p className="success-message">{successMessage}</p>}
// //             {errorMessage && <p className="error-message">{errorMessage}</p>}
// //         </div>
// //     );
// // };

// // export default TakeAttendance;
// import React, { useState, useEffect } from 'react';
// import { firestore } from '../../firebase'; // Import Firebase Firestore
// import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

// const TakeAttendance = () => {
//     const [date, setDate] = useState('');
//     const [students, setStudents] = useState([]);
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleDateChange = (event) => {
//         setDate(event.target.value);
//     };

//     const handleStudentAttendanceChange = (studentId, present) => {
//         // Update the attendance data based on student and attendance status
//         const updatedAttendanceData = [...attendanceData];
//         const studentIndex = updatedAttendanceData.findIndex((student) => student.id === studentId);

//         if (studentIndex !== -1) {
//             updatedAttendanceData[studentIndex].status = present ? 'Present' : 'Absent';
//             setAttendanceData(updatedAttendanceData);
//         }
//     };

//     const handleSaveAttendance = async () => {
//         // Save the attendance data to Firebase Firestore
//         const attendanceCollectionRef = collection(firestore, 'attendance');
//         const attendanceDocData = {
//             date,
//             attendance: attendanceData,
//         };

//         try {
//             await addDoc(attendanceCollectionRef, attendanceDocData);
//             setSuccessMessage('Attendance saved successfully.');
//         } catch (error) {
//             setErrorMessage('Error saving attendance. Please try again later.');
//             console.error('Error saving attendance:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const studentsCollectionRef = collection(firestore, 'users');
//                 const q = query(studentsCollectionRef, where('role', '==', 'Student'));
//                 const querySnapshot = await getDocs(q);

//                 const studentsData = [];
//                 querySnapshot.forEach(async (doc) => {
//                     const studentData = doc.data();
//                     const studentAttendance = {
//                         id: doc.id,
//                         name: studentData.fullName,
//                         status: 'Absent', // Default status is absent
//                     };
//                     studentsData.push(studentAttendance);
//                 });

//                 setStudents(studentsData);
//             } catch (error) {
//                 console.error('Error fetching students:', error);
//             }
//         };

//         fetchStudents();
//     }, []);

//     return (
//         <div>
//             <h2>Take Attendance</h2>
//             <label>
//                 Date:
//                 <input type="date" value={date} onChange={handleDateChange} />
//             </label>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Student ID</th>
//                         <th>Student Name</th>
//                         <th>Present</th>
//                         <th>Absent</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student) => (
//                         <tr key={student.id}>
//                             <td>{student.id}</td>
//                             <td>{student.name}</td>
//                             <td>
//                                 <input
//                                     type="radio"
//                                     name={`attendance-${student.id}`}
//                                     value="present"
//                                     onChange={() => handleStudentAttendanceChange(student.id, true)}
//                                 />
//                             </td>
//                             <td>
//                                 <input
//                                     type="radio"
//                                     name={`attendance-${student.id}`}
//                                     value="absent"
//                                     onChange={() => handleStudentAttendanceChange(student.id, false)}
//                                 />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <button onClick={handleSaveAttendance}>Save Attendance</button>
//             {successMessage && <p className="success-message">{successMessage}</p>}
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </div>
//     );
// };

// export default TakeAttendance;


import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase'; // Import Firebase Firestore
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

const TakeAttendance = () => {
    const [date, setDate] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleStudentAttendanceChange = (studentId, present) => {
        // Update the attendance data based on student and attendance status
        const updatedAttendanceData = [...attendanceData];
        const studentIndex = updatedAttendanceData.findIndex((student) => student.id === studentId);

        if (studentIndex !== -1) {
            updatedAttendanceData[studentIndex].status = present ? 'Present' : 'Absent';
            setAttendanceData(updatedAttendanceData);
        }
    };

    const handleSaveAttendance = async () => {
        // Save the attendance data to Firebase Firestore
        const attendanceCollectionRef = collection(firestore, 'attendance');
        const attendanceDocData = {
            date,
            attendance: attendanceData,
        };

        try {
            await setDoc(doc(attendanceCollectionRef, date), attendanceDocData, { merge: true });
            setSuccessMessage('Attendance saved successfully.');
        } catch (error) {
            setErrorMessage('Error saving attendance. Please try again later.');
            console.error('Error saving attendance:', error);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsCollectionRef = collection(firestore, 'users');
                const q = query(studentsCollectionRef, where('role', '==', 'Student'));
                const querySnapshot = await getDocs(q);

                const studentsData = [];
                querySnapshot.forEach(async (doc) => {
                    const studentData = doc.data();
                    const studentAttendance = {
                        id: doc.id,
                        name: studentData.fullName,
                        status: 'Absent', // Default status is absent
                    };
                    studentsData.push(studentAttendance);
                });

                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Take Attendance</h2>
            <label>
                Date:
                <input type="date" value={date} onChange={handleDateChange} />
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Present</th>
                        <th>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>
                                <input
                                    type="radio"
                                    name={`attendance-${student.id}`}
                                    value="present"
                                    onChange={() => handleStudentAttendanceChange(student.id, true)}
                                />
                            </td>
                            <td>
                                <input
                                    type="radio"
                                    name={`attendance-${student.id}`}
                                    value="absent"
                                    onChange={() => handleStudentAttendanceChange(student.id, false)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSaveAttendance}>Save Attendance</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default TakeAttendance;
