$ LANG = C
$ CC = gcc
$ CFLAGS= -std=c11 -Wall -Wextra -pedantic

all: monty run

monty: monty.c
	@$(CC) $(CFLAGS) monty.c -o monty

run:
	@./monty


.PHONY: run