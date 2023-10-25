import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
} from 'firebase/firestore';
import StudentList from './StudentList';

const AssignCourses = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    // const [courses, setCourses] = useState([]);

    // Fetch the list of students
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsRef = collection(firestore, 'users');
                const q = query(
                    studentsRef,
                    where('role', '==', 'Student'),
                    // You can add more filters if needed
                );
                const querySnapshot = await getDocs(q);

                const studentsData = [];
                querySnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    studentsData.push({ id: doc.id, ...studentData });
                });

                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Fetch the list of courses (you need to implement this)
    // useEffect(() => {
    //   const fetchCourses = async () => {
    //     // Fetch courses from Firestore and set them in the state
    //   };
    //   fetchCourses();
    // }, []);

    const handleAssignCourse = async () => {
        try {
            if (selectedStudent && selectedCourse) {
                // Update the student's course assignment in Firestore
                const studentDocRef = doc(firestore, 'users', selectedStudent);
                await setDoc(
                    studentDocRef,
                    { course: selectedCourse },
                    { merge: true } // Merge the new data with existing data
                );
                alert('Student assigned to the course successfully.');
                window.location.reload();
            } else {
                alert('Please select a student and a course to assign.');
            }
        } catch (error) {
            console.error('Error assigning course:', error);
        }
    };

    return (
        <div className="editstudentdetail">
            <h2 className='editstudheading'>Assign Courses to Students</h2>

            <div className="editstudform">
                <div className='editstudlable'>
                    <label className='assignlabel'>Select Student by Roll Number:</label>
                    <select className='editstudinput'
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Select a Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.rollNumber} - {student.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='editstudform'>
                    <label className='editstudlable'>Select Course:</label>
                    <select className='editstudinput'
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Select a Course</option>
                        <option value="Course1">Course 1</option>
                        <option value="Course2">Course 2</option>
                        <option value="Course3">Course 3</option>
                        <option value="Course4">Course 4</option>
                        {/* Add other course options */}
                    </select>
                </div>
            </div>
            <button className='editstudbtn' onClick={handleAssignCourse}>Assign Course</button>

            <div className="studentdetails">
                <StudentList filterRole="Student" />
            </div>
        </div>
    );
};

export default AssignCourses;
