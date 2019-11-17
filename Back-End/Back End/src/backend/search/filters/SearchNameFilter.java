package backend.search.filters;

import backend.classes.Person;

public class SearchNameFilter implements SearchFilter{

	@Override
	public int compare(Person p1, Person p2) {
		return p1.getName().compareTo(p2.getName());
	}
}
