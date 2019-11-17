package backend.classes;

import java.util.List;

public class Exam {
	private int day, year;
	private String month;
	private Room room;
	
	public Exam(List<String> date, Room room) {
		this.month = date.get(0);
		this.day = Integer.valueOf(date.get(1));
		this.year = Integer.valueOf(date.get(2));
		this.room = room;
	}

	public String getDate() {
		return this.month + ", " + this.day + " " + this.year;
	}
	
	public Room getRoom() {
		return this.room;
	}
	
	public static void main(String[] args) {
	}

}
