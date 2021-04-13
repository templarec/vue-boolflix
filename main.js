//vue-boolflix - 12/04/2021
// Author: Lore
/*$(document).ready(function () {

});*/
var app = new Vue({
	el: '#root',
	data: {
		searchTxt: 'life',
		searchResult: [],
		searchResultTv: [],
		currentPagina: 1,
		totPagine: 0,
		baseImgPath: '',
		currentMovieCast: [],
		tipo: 'film',
		currentGeneri: [],
		currentGeneriTv: [],
		generiSearch: [],
		generiSearchTv: [],
		breadCrumb: [],
		selectedGenere: '',
		selectedGenereTv: '',
		breadCrumbTv: [],
		totPagineTv: 0,
		currentPaginaTv: 1,
		totalResults: 0,
		totalResultsTv: 0
	},
	mounted () {
		axios.get('https://api.themoviedb.org/3/configuration?api_key=db6e548b4cda3f3d5550a22268a7e90c')
			.then((configs) => {
				let size = configs.data.images.poster_sizes[3];
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

			})
	},
	computed: {},
	methods: {
		searchMovies: function (searchTxt) {
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt + '&page=' + this.currentPagina)
				.then((risposta) => {
					this.searchResult = risposta.data.results;
					this.totPagine = risposta.data.total_pages;
					this.totalResults = risposta.data.total_results;
					this.generiSearch = [];
					this.breadCrumb = [];
					//mi salvo in array tutti i generi della ricerca
					risposta.data.results.forEach((item)=>{
						item.genre_ids.forEach((elemento)=>{
							if (!this.generiSearch.includes(elemento)){

								this.generiSearch.push(elemento);
							}

						})

					})
					//associo id e name e li pusho in nuovo array
					this.currentGeneri.forEach((item)=>{
						this.generiSearch.forEach((elemento)=>{
							if (item.id === elemento) {
								let tempObj = {
									id: item.id,
									name: item.name
								}
								this.breadCrumb.push(tempObj)

							}

						})

					})

					// this.pagina = risposta.data.page;
					// this.totPagine = risposta.data.total_pages;
				})
			axios.get('https://api.themoviedb.org/3/search/tv?api_key=db6e548b4cda3f3d5550a22268a7e90c&query='+ searchTxt+ '&page=' + this.currentPaginaTv)
				.then((risposta) => {
					this.searchResultTv = risposta.data.results;
					this.totPagineTv = risposta.data.total_pages;
					this.totalResultsTv = risposta.data.total_results;
					this.generiSearchTv = [];
					this.breadCrumbTv = [];
					//mi salvo in array tutti i generi della ricerca
					risposta.data.results.forEach((item)=>{
						item.genre_ids.forEach((elemento)=>{
							if (!this.generiSearchTv.includes(elemento)){
								this.generiSearchTv.push(elemento);
							}

						})

					})
					this.currentGeneriTv.forEach((item)=>{
						this.generiSearchTv.forEach((elemento)=>{
							if (item.id === elemento) {
								let tempObj = {
									id: item.id,
									name: item.name
								}
								this.breadCrumbTv.push(tempObj)
							}

						})
					})
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

				})
		},
		purgeCast: function () {
			this.currentMovieCast = []
		},
		getSelGenere: function (genid) {
			this.selectedGenere = genid
			this.selectedGenereTv = genid




		}

	}
});


