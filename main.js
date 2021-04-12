//vue-boolflix - 12/04/2021
// Author: Lore
/*$(document).ready(function () {

});*/
var app = new Vue({
	el: '#root',
	data: {
		searchTxt: '',
		searchResult: [],
		searchResultTv: [],
		pagina: '',
		totPagine: '',
		baseImgPath: '',
		currentMovieCast: [],
		tipo: 'film',
		currentGeneri: [],
		currentGeneriTv: []
	},
	mounted () {
		axios.get('https://api.themoviedb.org/3/configuration?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((configs) => {
				let size = configs.data.images.logo_sizes[4];
				let base = configs.data.images.base_url;
				this.baseImgPath = base+size;

			})
		axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((risposta) => {
				this.currentGeneri = risposta.data.genres

			})
		axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((risposta) => {
				this.currentGeneriTv = risposta.data.genres
				console.log(this.currentGeneriTv)
			})
	},
	computed: {},
	methods: {
		searchMovies: function (searchTxt) {
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt)
				.then((risposta) => {
					this.searchResult = risposta.data.results;
					// this.pagina = risposta.data.page;
					// this.totPagine = risposta.data.total_pages;
				})
			axios.get('https://api.themoviedb.org/3/search/tv?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt)
				.then((risposta) => {
					this.searchResultTv = risposta.data.results;


				})
		},
		/*getFlag: function (lingua) {

			switch (lingua) {
				case "it":
					return './img/it.png';
				case "en":
					return './img/en.png';
				case "de":
					return './img/de.png';
				case "fr":
					return './img/fr.png';
				case "es":
					return './img/es.png';
				default:
					return lingua;
			}

		},*/
		calcStar: function (rating) {
			let base10 = parseFloat(rating);
			let base5 = Math.round(base10 / 2);
			return base5
		},
		getCast: function (movieId) {
			axios.get('https://api.themoviedb.org/3/movie/'+ movieId + '/credits?api_key=db6e548b4cda3f3d5550a22268a7e90c')
				.then((risposta) => {
					this.currentMovieCast = risposta.data.cast;

				})
		},
		getCastTv: function (movieId) {
			axios.get('https://api.themoviedb.org/3/tv/'+ movieId + '/credits?api_key=db6e548b4cda3f3d5550a22268a7e90c')
				.then((risposta) => {
					this.currentMovieCast = risposta.data.cast;
					console.log(risposta.data.cast)
				})
		},
		purgeCast: function () {
			this.currentMovieCast = []
		}

	}
});


