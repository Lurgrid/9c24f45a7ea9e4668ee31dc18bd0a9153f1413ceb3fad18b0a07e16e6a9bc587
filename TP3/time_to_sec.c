#include <stdlib.h>
#include <stdio.h>

void time_to_sec(int* h, int* m, int* s);

int main(void){
  printf("Entrez une valeur horaire exprimée sous la forme h:m:s \n");
  int h, m , s;
  scanf("%d:%d:%d", &h, &m, &s);
  
  time_to_sec(&h, &m, &s);
  printf("La valeur horaire donné vaut %d seconde \n", s);
  
  return EXIT_SUCCESS;
};

void time_to_sec(int* h, int* m, int* s){
   *s = *s + (*m * 60) + (*h * 3600);
}