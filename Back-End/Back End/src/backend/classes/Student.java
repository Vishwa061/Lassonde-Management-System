package backend.classes;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Student extends Person {
	private List<String> courses;

	public Student(List<String> list) {
		super(list.subList(0, 3));

		courses = new ArrayList<String>();
		courses.addAll(list.subList(3, list.size()));
	}

	public List<String> getCourses() {
		return this.courses;
	}

	@Override
	public String toString() {
		return super.toString().substring(0, super.toString().length()-1) + ", " + "Courses: "
				+ courses.toString() + "]";
	}
	
	public List<String> toList() {
		List<String> list = new ArrayList<String>();
		
		list.add(getName());
		list.add(getEmail());
		list.add("" + getId());
		for (String s : this.courses) {
			list.add(s);
		}
		
		return list;
	}

	public static void main(String[] args) {
		List<String> list = new ArrayList<String>();
		list.add("Jack-Van Thompson");
		list.add("Jack@gmail.com");
		list.add("123456789");
		list.add("R21D21"); //CAT#
		list.add("X32D21"); //CAT#
		Student s = new Student(list);
		System.out.println(s);
	}

}
