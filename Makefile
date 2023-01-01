FLAGS=-Wall -Wextra -Wconversion -pedantic

all: main.c
	cc $(FLAGS) -o test main.c
	./test

clean:
	rm ./test
