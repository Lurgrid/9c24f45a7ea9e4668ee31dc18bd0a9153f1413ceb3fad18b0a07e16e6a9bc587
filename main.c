#include <stdlib.h>
#include <stdio.h>

int main(void){
    int age;
    printf("Donne moi ton age. \n");
    scanf("%d", &age);
    if(age >= 18){
        printf("Tu es majeur car tu as %d. \n", age);
    }else{
        printf("Tu es mineur car tu as %d. \n", age);
    };
    return EXIT_SUCCESS;
};