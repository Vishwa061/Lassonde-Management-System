package backend.classes;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import backend.search.filters.*;

@SuppressWarnings("unused")
public class Department {
	private static final String STUDENT_STORAGE = "Data Storage/Students.txt";
	private static final String PROFESSOR_STORAGE = "Data Storage/Professors.txt";
	private static final String STAFF_STORAGE = "Data Storage/Staff.txt";
	private static final String COURSE_STORAGE = "Data Storage/Courses.txt";
	private static final String EXAM_STORAGE = "Data Storage/Exams.txt";

	private List<Student> students;

	private int studentIndex;

	public Department() {
		this.students = new ArrayList<Student>();
		this.studentIndex = -100;

		loadStudents();
	}

	/*
	 * Utilities
	 */

	// Returns a list, A, where each index is a list, B.
	// Each index in B is a data point such as: a name, room number, date, etc.
	public List<List<String>> read(String fileName) {
		List<List<String>> output = new ArrayList<List<String>>();
		// List<String> linesOfData = new ArrayList<String>();

		try {
			FileReader fReader = new FileReader(fileName);
			BufferedReader bReader = new BufferedReader(fReader);
			String line = bReader.readLine();

			while (line != null) {
				// linesOfData.add(line);
				output.add(a2l(line.split("\\|")));
				line = bReader.readLine();
			}

			bReader.close();
			fReader.close();
		} catch (Exception e) {
			throw new IllegalArgumentException("File Not Found");
		}

		// for (String line : linesOfData) {
		// output.add(a2l(line.split("\\|")));
		// }

		return output;
	}

	// Writes to an existing file.
	// If append is true, then it appends to the file on a new line.
	public void write(String fileName, List<List<String>> data, boolean append) {
		try {
			File file = new File(fileName);
			if (file.exists() == false) {
				throw new IllegalArgumentException("File Not Found");
			}

			FileWriter fWriter;
			BufferedWriter bWriter;

			if (append) {
				fWriter = new FileWriter(file, true);
				bWriter = new BufferedWriter(fWriter);
				bWriter.newLine();
			} else {
				fWriter = new FileWriter(file);
				bWriter = new BufferedWriter(fWriter);
			}

			Iterator<List<String>> iter = data.iterator();
			Iterator<String> iter2;
			String input = "";
			// String line = "";
			List<String> lineOfData = new ArrayList<String>();

			while (iter.hasNext()) {
				lineOfData = iter.next();
				iter2 = lineOfData.iterator();

				while (iter2.hasNext()) {
					input += iter2.next();
					if (iter2.hasNext()) {
						input += "|";
					}
				}

				if (iter.hasNext()) {
					input += "\n";
				}
			}

			bWriter.write(input);

			bWriter.close();
			fWriter.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// Array to list converter
	public List<String> a2l(String[] a) {
		List<String> l = new ArrayList<String>();
		for (String s : a) {
			l.add(s);
		}
		return l;
	}

	/*
	 * Students
	 */

	private void loadStudents() {
		List<List<String>> data = read(STUDENT_STORAGE);
		Student student;
		for (List<String> lineOfData : data) {
			student = new Student(lineOfData);
			this.students.add(student);
		}
		// System.out.println(this.students);
	}

	public boolean addStudent(Student newStudent) {
		if (findStudents("ID", "" + newStudent.getId()).size() == 0) {
			this.students.add(newStudent);

			List<List<String>> toWrite = new ArrayList<List<String>>();
			toWrite.add(newStudent.toList());

			write(STUDENT_STORAGE, toWrite, true);
			return true;
		}
		return false;
	}

	public boolean updateStudent(Student updatedStudent) {
		if (findStudents("ID", "" + updatedStudent.getId()).size() == 1) {
			this.students.remove(this.studentIndex);
			this.students.add(updatedStudent);

			List<List<String>> toWrite = read(STUDENT_STORAGE);
			toWrite.remove(this.studentIndex);
			toWrite.add(updatedStudent.toList());

			write(STUDENT_STORAGE, toWrite, false);
			return true;
		}

		return false;
	}

	public boolean removeStudent(String id) {
		if (findStudents("ID", id).size() == 1) {
			this.students.remove(this.studentIndex);

			List<List<String>> toWrite = read(STUDENT_STORAGE);
			toWrite.remove(this.studentIndex);

			write(STUDENT_STORAGE, toWrite, false);
			return true;
		}

		return false;
	}

	public void showStudents() {

	}

	public void showStudentInfo() {

	}

	// This returns a list because there could be multiple students with the same
	// attributes.
	// Search By: Name, ID
	public List<Student> findStudents(String searchType, String searchEntry) {
		List<String> dataOfStudentToFind = new ArrayList<String>();
		SearchFilter searchFilter;
		int index = -1;

		switch (searchType) {
		case ("Name"): {
			searchFilter = new SearchNameFilter();
			dataOfStudentToFind.add(searchEntry);
			dataOfStudentToFind.add("");
			dataOfStudentToFind.add("0");
			break;
		}
		case ("ID"): {
			searchFilter = new SearchIdFilter();
			dataOfStudentToFind.add("");
			dataOfStudentToFind.add("");
			dataOfStudentToFind.add(searchEntry);
			break;
		}
		default: {
			throw new IllegalArgumentException("Invalid Filter");
		}
		}

		List<Student> copyOfStudents = new ArrayList<Student>(this.students);
		Collections.sort(copyOfStudents, searchFilter);
		List<Student> studentsFound = new ArrayList<Student>();

		index = Collections.binarySearch(copyOfStudents, new Student(dataOfStudentToFind), searchFilter);



		if (index >= 0) {
			//////////////////////////
			// Used in update/remove//
			this.studentIndex = index;
			//////////////////////////
			do {
				studentsFound.add(copyOfStudents.get(index));
				copyOfStudents.remove(index);
				index = Collections.binarySearch(copyOfStudents, new Student(dataOfStudentToFind), searchFilter);
			} while (index >= 0);
		}



		return studentsFound;
	}

	/*
	 * Professors
	 */

	public void addProf() {

	}

	public void updateProf() {

	}

	public void removeProf() {

	}

	public void showProfs() {

	}

	public void showProfInfo() {

	}

	public void findProf() {

	}

	/*
	 * Staff
	 */

	public void addStaff() {

	}

	public void updateStaff() {

	}

	public void removeStaff() {

	}

	public void showStaff() {

	}

	public void showStaffInfo() {

	}

	public void findStaff() {

	}

	/*
	 * Courses
	 */

	public void addCourse() {

	}

	public void updateCourse() {

	}

	public void removeCourse() {

	}

	public void showCourses() {

	}

	public void showCourseInfo() {

	}

	public void findCourse() {

	}

	/*
	 * Exams
	 */

	public void addExam() {

	}

	public void updateExam() {

	}

	public void removeExam() {

	}

	public void showExams() {

	}

	public void showExamInfo() {

	}

	public void findExam() {

	}

	public static void main(String[] args) {
		Department d = new Department();

		List<String> data = new ArrayList<String>();
		data.add("Albert");
		data.add("Albert@gmail.com");
		data.add("999999999");

		Student student = new Student(data);

		d.addStudent(student);
		System.out.println(d.read(STUDENT_STORAGE));
		
		data.add("R21D21");
		student = new Student(data);
		d.updateStudent(student);
		System.out.println(d.read(STUDENT_STORAGE));
		
		d.removeStudent("999999999");
		System.out.println(d.read(STUDENT_STORAGE));
	}
}
