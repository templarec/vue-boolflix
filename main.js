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
		getFlag: function (lingua) {

			switch (lingua) {
				case "en":
					return 'gb';
				case "ja":
					return 'jp';
				case "af":
					return 'za';
				case "ak":
					return 'gh';
				case "am":
					return 'et';
				case "ar":
					return 'ae';
				case "as":
					return 'in';
				case "ba":
					return 'ru';
				case "be":
					return 'by';
				case "bi":
					return 'vu';
				case "bm":
					return 'ml';
				case "bn":
					return 'bd';
				case "bo":
					return 'cn';
				case "br":
					return 'fr';
				case "bs":
					return 'ba';
				case "ca":
					return 'es';
				case "ch":
					return 'gu';
				case "co":
					return 'fr';
				case "cr":
					return 'ca';
				case "cu":
					return 'rs';
				case "cv":
					return 'ru';
				case "cy":
					return 'gb';
				case "dz":
					return 'bt';
				case "ee":
					return 'tg';
				case "et":
					return 'ee';
				case "eu":
					return 'fr';
				case "ga":
					return 'ie';
				case "gd":
					return 'ie';
				case "gl":
					return 'es';
				case "gn":
					return 'bo';
				case "gu":
					return 'in';
				case "kg":
					return 'cd';
				case "ki":
					return 'ke';
				case "km":
					return 'kh';
				case "kn":
					return 'in';
				case "kr":
					return 'ng';
				case "kw":
					return 'gb';
				case "ky":
					return 'cn';
				case "la":
					return 'it';
				case "lb":
					return 'lu';
				case "li":
					return 'nl';
				case "lu":
					return 'cd';
				case "ml":
					return 'in';
				case "mn":
					return 'mn';
				case "mo":
					return 'md';
				case "mr":
					return 'in';
				case "ms":
					return 'my';
				case "my":
					return 'mm';
				case "na":
					return 'nr';
				case "ne":
					return 'np';
				case "ng":
					return 'ne';
				case "nr":
					return 'za';
				case "ny":
					return 'zm';
				case "om":
					return 'et';
				case "pa":
					return 'pk';
				case "ps":
					return 'af';
				case "rw":
					return 'ug';
				case "sa":
					return 'in';
				case "sc":
					return 'it';
				case "sd":
					return 'pk';
				case "se":
					return 'no';
				case "sg":
					return 'cf';
				case "sh":
					return 'rs';
				case "si":
					return 'lk';
				case "sl":
					return 'si';
				case "sm":
					return 'ws';
				case "sn":
					return 'zw';
				case "sr":
					return 'rs';
				case "ss":
					return 'za';
				case "st":
					return 'ls';
				case "sv":
					return 'se';
				case "tg":
					return 'ir';
				case "tk":
					return 'tm';
				case "tl":
					return 'ph';
				case "tn":
					return 'bw';
				case "tt":
					return 'ru';
				case "tw":
					return 'gh';
				case "ug":
					return 'kz';
				case "ve":
					return 'za';
				case "vi":
					return 'vn';
				case "za":
					return 'cn';
				default:
					return lingua;
			}

		},
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


