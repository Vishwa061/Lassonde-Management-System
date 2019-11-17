package backend.search.filters;

import backend.classes.Person;

public class SearchIdFilter implements SearchFilter{

	@Override
	public int compare(Person p1, Person p2) {
		return p1.getId() - p2.getId();
	}
}
