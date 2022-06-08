import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyPokemonList } from '../../models/my-pokemon.list';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  search: FormControl = new FormControl('');
  myPokemons: MyPokemonList[]=[];
 
  private offset: number;
  isLoading: boolean;
  isLastPage = false;

  isSearching = false;

  constructor(private pokemonService: PokemonService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) { 
                this.offset = 0 ;
              }

  ngOnInit(): void {
    this.getPage(this.offset);
  }

  getPage(offset: number) {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService.getMyPokemonList(offset)
      .subscribe((myList: MyPokemonList[]) => {
        if(myList.length === 0) {
          this.isLastPage = true;
        }
        if(!this.isLastPage) {
          this.myPokemons = this.myPokemons.concat(myList);
          this.offset +=20;
          this.isLoading = false;
        }
          
      
      });


    }
  }

 onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if(element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }
  
  onDetail(mypokemon: MyPokemonList): void {
    this.bottomSheet.open(PokemonDetailComponent, {
      data: {mypokemon}
    })
  }

}
