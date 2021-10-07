#include <stdio.h>
#include <stdlib.h>

double eval_poly(double x);

int main(void) {
  printf("Entrez une valeur réelle : ");
  double v;
  scanf("%lf", &v);

  double r = eval_poly(v);
  printf("La valeur du polynome pour %lf est %lf.\n", v, r);

  return EXIT_SUCCESS;
}

double eval_poly(double x) {
  double resultat;

  resultat = 3 * x * x - 4 * x + 1;

  return resultat;
}