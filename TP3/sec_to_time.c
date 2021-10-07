#include <stdlib.h>
#include <stdio.h>

void time_to_sec(int* h, int* m, int* s);

int main(void){
  printf("Entrez une valeur horaire exprimée en seconde \n");
  int h, m , s;
  scanf("%d", &s);
  
  time_to_sec(&h, &m, &s);
  printf("La valeur horaire donné vaut %d:%d:%d \n", h, m, s);
  
  return EXIT_SUCCESS;
};

void time_to_sec(int* h, int* m, int* s){
  *h = *s / 3600;
  *s = *s % 3600;
  *m = *s / 60;
  *s = *s % 60;
}