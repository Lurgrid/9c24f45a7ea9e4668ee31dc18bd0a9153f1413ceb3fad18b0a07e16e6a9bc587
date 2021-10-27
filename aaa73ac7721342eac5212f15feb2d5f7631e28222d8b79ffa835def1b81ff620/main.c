#include <stdlib.h>
#include <stdio.h>

void graphic(char c);
void creategrid(char* c, char* b, int x);

int main(void) {

	printf("To create grid, select size ( 1 <= int <= 25)\n");

	int x = 1;

	if (scanf("%d", &x) != 1 || (x < 1 || x > 25) ){
		printf("Error: Create Grid Failed, please select a good size");
		return EXIT_FAILURE;
	};

	char widths[1];
	char hights[1 * 4];

	creategrid(&hights, &widths, x);

	system("pause");

	return EXIT_SUCCESS;
}
void graphic(char c){
}

void creategrid(char(*)[], char(*)[], int x) {
	for (int i = 0; i <= x*4; i++) {
		*c[i] = "*";
	}
	for (int i = 0; i <= x; i++) {
		*b[i] = *c[i];
	}
}