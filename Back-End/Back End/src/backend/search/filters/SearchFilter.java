package backend.search.filters;

import java.util.Comparator;

import backend.classes.Person;

public interface SearchFilter extends Comparator<Person>{
	
	@Override
	public int compare(Person s1, Person s2);
}
