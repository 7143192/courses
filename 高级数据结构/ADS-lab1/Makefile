cc = g++
prog = main
objects = main.o ScapegoatTree.o

$(prog): $(objects)
	$(cc) -o $(prog) $(objects)

main.o : ScapegoatTree.h
ScapegoatTree.o: ScapegoatTree.h

.PHONY:grade
grade:
	@make
	@./main g

.PHONY:clean
clean:
	rm -rf *.o $(prog) temp