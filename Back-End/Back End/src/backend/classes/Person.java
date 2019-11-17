package backend.classes;

import java.util.List;

public abstract class Person {
	private String name;
	private String email;
	private int id;

	public Person(List<String> list) {
		if (list.size() != 3) {
			throw new IllegalArgumentException(
					"List size must be 3.\n" + "Where Indices:\n" + "0 : name" + "1 : email" + "2 : id");
		}
		this.name = list.get(0);
		this.email = list.get(1);
		this.id = Integer.parseInt(list.get(2));
	}

	public String getName() {
		return this.name;
	}

	public String getEmail() {
		return this.email;
	}

	public int getId() {
		return this.id;
	}
	
	@Override
	public String toString() {
		return "[Name: " + getName() + ", " + "Email: " + getEmail() + ", " + "ID: " + getId() + "]";
	}
	
}
