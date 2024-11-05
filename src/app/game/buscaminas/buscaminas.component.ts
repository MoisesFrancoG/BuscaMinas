import { Component, OnInit } from '@angular/core';

interface Celda {
  tieneMina: boolean;
  revelada: boolean;
  minasAlrededor: number;
}

@Component({
  selector: 'app-buscaminas',
  templateUrl: './buscaminas.component.html',
  styleUrls: ['./buscaminas.component.css']
})
export class BuscaminasComponent implements OnInit {

  cuadrilla: Celda[][] = [];
  tamanoCuadrilla: number = 8;
  cantidadMinas: number = 10;  

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.crearCuadrilla();
    this.colocarMinas();
    this.calcularMinasAlrededor();
  }

  crearCuadrilla(): void {
    this.cuadrilla = Array.from({ length: this.tamanoCuadrilla }, () => 
      Array.from({ length: this.tamanoCuadrilla }, () => ({
        tieneMina: false,
        revelada: false,
        minasAlrededor: 0,
      }))
    );
  }

  colocarMinas(): void {
    let minasColocadas = 0;
    while (minasColocadas < this.cantidadMinas) {
      const fila = Math.floor(Math.random() * this.tamanoCuadrilla);
      const columna = Math.floor(Math.random() * this.tamanoCuadrilla);
      if (!this.cuadrilla[fila][columna].tieneMina) {
        this.cuadrilla[fila][columna].tieneMina = true;
        minasColocadas++;
      }
    }
  }

  calcularMinasAlrededor(): void {
    for (let fila = 0; fila < this.tamanoCuadrilla; fila++) {
      for (let columna = 0; columna < this.tamanoCuadrilla; columna++) {
        if (!this.cuadrilla[fila][columna].tieneMina) {
          this.cuadrilla[fila][columna].minasAlrededor = this.contarMinasAdyacentes(fila, columna);
        }
      }
    }
  }

  contarMinasAdyacentes(fila: number, columna: number): number {
    let conteo = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nuevaFila = fila + i;
        const nuevaColumna = columna + j;
        if (this.estaDentroLimites(nuevaFila, nuevaColumna) && this.cuadrilla[nuevaFila][nuevaColumna].tieneMina) {
          conteo++;
        }
      }
    }
    return conteo;
  }

  estaDentroLimites(fila: number, columna: number): boolean {
    return fila >= 0 && fila < this.tamanoCuadrilla && columna >= 0 && columna < this.tamanoCuadrilla;
  }

  revelarCelda(fila: number, columna: number): void {
    const celda = this.cuadrilla[fila][columna];
    if (!celda.revelada) {
      celda.revelada = true;
      if (celda.minasAlrededor === 0 && !celda.tieneMina) {
        this.revelarCeldasAdyacentes(fila, columna);
      }
    }
  }

  revelarCeldasAdyacentes(fila: number, columna: number): void {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nuevaFila = fila + i;
        const nuevaColumna = columna + j;
        if (this.estaDentroLimites(nuevaFila, nuevaColumna) && !this.cuadrilla[nuevaFila][nuevaColumna].revelada) {
          this.revelarCelda(nuevaFila, nuevaColumna);
        }
      }
    }
  }
}
