cc = g++
prog = main
objects = main.o FixedSP.o
CXXFLAGS = -std=c++11

$(prog): $(objects)
	$(cc) ${CXXFLAGS} -o $(prog) $(objects)

main.o : FixedSP.h
FixedSP.o: FixedSP.h

.PHONY:grade
grade:
	@make
	@./main g

.PHONY:clean
clean:
	rm -rf *.o $(prog) temp
