cc = g++
prog = main
objects = main.o HashTable.o SkipList.o

$(prog): $(objects)
	$(cc) -o $(prog) $(objects)

main.o : Container.h HashTable.h SkipList.h
HashTable.o: HashTable.h
SkipList.o: SkipList.h

.PHONY:grade
grade:
	@make
	@./main g

.PHONY:clean
clean:
	rm -rf *.o $(prog) temp