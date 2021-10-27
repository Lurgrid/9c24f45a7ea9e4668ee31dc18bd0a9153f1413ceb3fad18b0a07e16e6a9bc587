#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(void) {

	system("arp -a");
	char* name = malloc(100);
	if (name == NULL) {
		printf("No memory\n");
		return 1;
	}
	while (1 == 1) {
		printf("\n Entrez une commande (ping etc...)\n ");
		fgets(name, 100, stdin);

		if ((strlen(name) > 0) && (name[strlen(name) - 1] == '\n'))
			name[strlen(name) - 1] = '\0';
		system(name);
		for (int i = 0; name[i]; i++) {
			name[i] = tolower(name[i]);
		}
	}
	system("pause");

	return EXIT_SUCCESS;
}