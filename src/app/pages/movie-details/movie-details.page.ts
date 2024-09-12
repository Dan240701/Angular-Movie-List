import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any | null = null
  imageBaseUrl = environment.images

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (res) => {
          this.movie = res;
        },
        error: (err) => {
          console.error('Failed to load movie details', err);
          // Optionally handle the error here
        }
      });
    } else {
      console.error('Movie ID is not available in route parameters');
      // Optionally handle the case where ID is not available
    }
  }
  openHomePage(URL: string){
    window.open(URL, '_blank');
  }
}
