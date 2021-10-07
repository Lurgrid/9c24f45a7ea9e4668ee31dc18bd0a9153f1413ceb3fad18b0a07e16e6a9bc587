#include <stdlib.h>
#include <stdio.h>

double moyenne(double x, double y);

int main(void){
  printf("Entrez une valeur réelle : ");
  double x;
  double y;
  scanf("%lf%lf", &x, &y);
    
  double r = moyenne(x, y);
  printf("La moyenne de %lf et %lf est %lf.\n", x, y, r);
  
  return EXIT_SUCCESS;
};

double moyenne(double x, double y){
  double resultat;

  resultat = (x + y) / 2;

  return resultat;  
}